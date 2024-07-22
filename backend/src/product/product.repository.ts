import { PrismaService } from 'database/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PaginationResponse,
  ProductCategory,
  ProductTypeName,
} from 'utils/common';
import { CreateProductDto } from './dto/create-product.dto';
import * as fs from 'fs';
@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}
  async isProductNameExist(name: string, userId: number) {
    return (
      (await this.prisma.product.count({
        where: {
          title: name,
          userId: userId,
          isActive: true,
        },
      })) > 0
    );
  }
  async create(
    createProductDto: CreateProductDto,
    file: any[],
    userId: number,
  ) {
    return await this.prisma.$transaction(
      async (prisma) => {
        type MapType = {
          size: number;
          quanity: number;
          imageName: string;
        };
        const mapData: Map<string, MapType[]> = new Map();
        for (const data of createProductDto.quantities) {
          const stringData = String(data).split(',');

          const key = stringData[stringData.length - 1];
          const value: MapType = {
            imageName: stringData[2],
            quanity: +stringData[1],
            size: +stringData[0],
          };
          if (mapData.has(key)) {
            mapData.get(key).push(value);
          } else {
            mapData.set(stringData[stringData.length - 1], [value]);
          }
        }

        console.log(mapData);

        const productCategoryType = await prisma.productType.findFirst({
          where: {
            id: +createProductDto.productTypeId,
          },
          select: {
            id: true,
            itemsName: true,
            ProductCategory: {
              select: {
                name: true,
              },
            },
          },
        });

        const productIdDetails = await prisma.product.create({
          data: {
            title: createProductDto.title,
            price: +createProductDto.price,
            productTypeId: +createProductDto.productTypeId,
            userId: userId,
            delivery: {
              create: {
                deliveryForMetroCitys: +createProductDto.deliveryForMetroCitys,
                deliveryForOtherCitys: +createProductDto.deliveryForOtherCitys,
              },
            },
            returns: {
              create: {
                returns: +createProductDto.returns,
              },
            },
            priceHistory: {
              create: {
                price: +createProductDto.price,
              },
            },
            seasonalDresses: {
              createMany: {
                data: createProductDto.seasons.map((e) => ({
                  seasonalId: +e,
                })),
              },
            },
          },
        });

        const commonDescriptionId = await prisma.commonDescription.create({
          data: {
            brandName: createProductDto.brandName,
            fit: createProductDto.fit,
            materail: createProductDto.material,
            care: createProductDto.care,
            origin: createProductDto.origin,
            occasion: createProductDto.occasion,
            specialFeature: createProductDto.specialFeature,
            productId: productIdDetails.id,
          },
        });

        const name = productCategoryType.ProductCategory.name;

        switch (name) {
          case ProductCategory.TopWear:
            this.createTopDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
            );
            break;
          case ProductCategory.BottomWear:
            await this.createBottomDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
              0,
              0,
            );

            break;
          case ProductCategory.EthnicWear:
            if (productCategoryType.itemsName == ProductTypeName.EthicSet) {
              const setId = await this.createKurtasDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
              );
              await this.createBottomDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
                setId.id,
                0,
              );
            } else if (
              productCategoryType.itemsName == ProductTypeName.EthicBottom
            ) {
              await this.createBottomDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
                0,
                0,
              );
            } else {
              await this.createKurtasDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
              );
            }
            break;
          case ProductCategory.SportsWear:
            if (
              productCategoryType.itemsName == ProductTypeName.SportsTShirts
            ) {
              await this.createTopDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
              );
            } else if (
              productCategoryType.itemsName == ProductTypeName.SportsTrackSuit
            ) {
              const setId = await this.createTopDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
              );
              await this.createBottomDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
                0,
                setId.id,
              );
            } else {
              await this.createBottomDescription(
                commonDescriptionId.id,
                createProductDto,
                prisma,
                0,
                0,
              );
            }
            break;
          case ProductCategory.Fragrances:
            await this.createPerfumesDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
            );
            break;
          case ProductCategory.Footwear:
            await this.createShoesDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
              productCategoryType.itemsName,
            );
            break;

          case ProductCategory.Innerwear:
            await this.createInnersDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
              productCategoryType.itemsName,
            );
            break;

          case ProductCategory.Watches:
            await this.createWatchesDescription(
              commonDescriptionId.id,
              createProductDto,
              prisma,
            );
            break;
          default:
            console.log('No such category is founded');
            break;
        }

        for (const [key, value] of mapData) {
          const colorData = await prisma.productColor.create({
            data: {
              colors: key,
              productId: productIdDetails.id,
            },
          });

          value.map(async (e) => {
            await prisma.productAviableSizes.create({
              data: {
                productTypeSizeId: e.size,
                quantity: e.quanity,
                productColorId: colorData.id,
                history: {
                  create: {
                    quantity: e.quanity,
                  },
                },
              },
            });
          });

          for (const imageData of file) {
            if (imageData.originalName == value[0].imageName) {
              const fileBuffer = fs.readFileSync(
                `${process.cwd()}/./public/task/${imageData.filename}`,
              );
              console.log(fileBuffer);

              await prisma.productImages.create({
                data: {
                  imageUrl: imageData.filename,
                  productColorId: colorData.id,
                  imageBytes: fileBuffer,
                },
              });
              break;
            }
          }
        }
      },
      {
        timeout: 30000,
      },
    );
  }

  async createTopDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
  ) {
    return await prisma.topDescription.create({
      data: {
        productDescription: createProductDto.productDescription,
        sleeveTypeId: +createProductDto.sleeveType,
        weight: +createProductDto.weight,
        chest: +createProductDto.chest,
        shoulder: +createProductDto.shoulder,
        neckTypeId: +createProductDto.neckType,
        colorFamily: createProductDto.colorFamily,
        printAndPattern: createProductDto.printAndPattern,
        length: +createProductDto.length,
        pocket: createProductDto.pocket,
        commonDescriptionId: id,
        type: createProductDto.type,
      },
    });
  }
  async createBottomDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
    kurtasDescriptionid: number,
    topDescriptionId: number,
  ) {
    return await prisma.bottomDescription.create({
      data: {
        commonDescriptionId: id,
        weight: +createProductDto.bottomWeight,
        printAndPattern: createProductDto.bottomPrintAndPattern,
        productDescription: createProductDto.bottomProductDescription,
        colorFamily: createProductDto.bottomColorFamily,
        length: +createProductDto.bottomLength,
        pocket: createProductDto.bottomPocket,
        waist: +createProductDto.waist,
        hip: +createProductDto.hip,
        beltLoop: Boolean(createProductDto.beltLoop),
        typeOfPantId: +createProductDto.typeOfPantId,
        typesOfLengthId: +createProductDto.pantLengthId,
        typesOfPleatsId: +createProductDto.pantPleatsId,
        type: createProductDto.type,
        kurtasDescriptionId:
          kurtasDescriptionid > 0 ? kurtasDescriptionid : null,
        topDescriptionId: topDescriptionId > 0 ? topDescriptionId : null,
      },
    });
  }
  async createKurtasDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
  ) {
    return await prisma.kurtasDescription.create({
      data: {
        commonDescriptionId: id,
        weight: +createProductDto.weight,
        printAndpattern: createProductDto.printAndPattern,
        productDescription: createProductDto.productDescription,
        colorFamily: createProductDto.colorFamily,
        pocket: createProductDto.pocket,
        work: createProductDto.work,
        kurtasLengthTypeId: +createProductDto.length,
        chest: +createProductDto.chest,
        shoulder: +createProductDto.shoulder,
        kurtasNeckTypeId: +createProductDto.neckType,
        kurtasSleeveTypeId: +createProductDto.sleeveType,
        type: createProductDto.type,
        transparencyOfTheFabric: Boolean(
          createProductDto.transparencyOfTheFabric,
        ),
      },
    });
  }
  async createShoesDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
    type: string,
  ) {
    if (
      +createProductDto.packageContains <= 0 &&
      type == ProductTypeName.Footwear
    ) {
      throw new BadRequestException('Package should contains more than of one');
    }
    if (
      +createProductDto.packageContains > 0 &&
      type == ProductTypeName.Footwear
    ) {
      return await prisma.shoesDescription.create({
        data: {
          commonDescriptionId: id,
          footLength: createProductDto.length,
          printAndPattern: createProductDto.printAndPattern,
          weight: +createProductDto.weight,
          toeType: createProductDto.toeType,
          productDescription: createProductDto.productDescription,
          colorFamily: createProductDto.colorFamily,
          type: createProductDto.type,
          packageContains: +createProductDto.packageContains,
        },
      });
    } else {
      return await prisma.shoesDescription.create({
        data: {
          commonDescriptionId: id,
          footLength: createProductDto.length,
          printAndPattern: createProductDto.printAndPattern,
          weight: +createProductDto.weight,
          soleMaterial: createProductDto.soleMaterial,
          upperMaterial: createProductDto.upperMaterial,
          closure: createProductDto.closure,
          toeType: createProductDto.toeType,
          productDescription: createProductDto.productDescription,
          colorFamily: createProductDto.colorFamily,
          type: createProductDto.type,
          warranty: {
            create: {
              warrantyPeriod: +createProductDto.warrantyPeriod,
            },
          },
        },
      });
    }
  }
  async createWatchesDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
  ) {
    return await prisma.watchesDescription.create({
      data: {
        commonDescriptionId: id,
        printAndPattern: createProductDto.printAndPattern,
        weight: +createProductDto.weight,
        productDescription: createProductDto.productDescription,
        colorFamily: createProductDto.colorFamily,
        type: createProductDto.type,
        dialColor: createProductDto.dialColor,
        model: createProductDto.model,
        dialShape: createProductDto.dialShape,
        dialDiameter: createProductDto.dialDiameter,
        strapColor: createProductDto.strapColor,
        warranty: {
          create: {
            warrantyPeriod: +createProductDto.warrantyPeriod,
          },
        },
      },
    });
  }
  async createInnersDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
    type: string,
  ) {
    if (type === ProductTypeName.Inner) {
      if (createProductDto.sleeveType == undefined) {
        throw new BadRequestException('Sleeve type must needed');
      }
      if (createProductDto.neckType == undefined) {
        throw new BadRequestException('Neck type must needed');
      }
    }
    return await prisma.innersDescription.create({
      data: {
        commonDescriptionId: id,
        printAndPattern: createProductDto.printAndPattern,
        weight: +createProductDto.weight,
        productDescription: createProductDto.productDescription,
        colorFamily: createProductDto.colorFamily,
        type: createProductDto.type,
        length: createProductDto.length,
        waistRise:
          createProductDto.waist == undefined
            ? undefined
            : createProductDto.waist,
        lookAndFeel: createProductDto.lookAndFeel,
        multiColors: Boolean(createProductDto.multiColor),
        packageContains: +createProductDto.packageContains,
        vestsSleeveTypeId:
          createProductDto.sleeveType == undefined
            ? undefined
            : +createProductDto.sleeveType,
        vestsNeckTypeId:
          createProductDto.neckType == undefined
            ? undefined
            : +createProductDto.neckType,
      },
    });
  }
  async createPerfumesDescription(
    id: number,
    createProductDto: CreateProductDto,
    prisma: any,
  ) {
    return await prisma.perfumesDescription.create({
      data: {
        commonDescriptionId: id,
        productDescription: createProductDto.productDescription,
        type: createProductDto.type,
        weight: +createProductDto.weight,
        materialDescription: createProductDto.materialDescription,
      },
    });
  }

  async findAllProduct(page: number, search: string, userId: number) {
    const itemsPerPage = 10;
    const count = await this.prisma.product.count({
      where: {
        userId: userId,
        OR: [
          {
            productType: {
              itemsName: {
                contains: search.length > 0 ? search : undefined,
              },
            },
          },
          {
            productType: {
              ProductCategory: {
                name: {
                  contains: search.length > 0 ? search : undefined,
                },
              },
            },
          },
        ],
      },
    });
    const data = await this.prisma.product.findMany({
      where: {
        userId: userId,
        OR: [
          {
            productType: {
              itemsName: {
                contains: search.length > 0 ? search : undefined,
              },
            },
          },
          {
            productType: {
              ProductCategory: {
                name: {
                  contains: search.length > 0 ? search : undefined,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        price: true,
        createdAt: true,
        seasonalDresses: {
          select: {
            seasonal: {
              select: {
                seasonalName: true,
              },
            },
          },
        },
        color: {
          select: {
            id: true,
            colors: true,
            productImages: {
              select: {
                id: true,
                imageUrl: true,
                productColorId: true,
                createdAt: true,
              },
            },
            colorSize: {
              select: {
                id: true,
                quantity: true,
                productTypeSize: {
                  select: {
                    id: true,
                    size: true,
                  },
                },
              },
            },
          },
        },

        productType: {
          select: {
            id: true,
            itemsName: true,
            ProductCategory: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        commonDescription: {
          select: {
            id: true,
            brandName: true,
            fit: true,
            care: true,
            materail: true,
            origin: true,
            specialFeature: true,
            occasion: true,
            topDescription: {
              select: {
                weight: true,
                chest: true,
                shoulder: true,
                type: true,
                colorFamily: true,
                printAndPattern: true,
                length: true,
                pocket: true,
                productDescription: true,
                sleeveType: {
                  select: {
                    name: true,
                  },
                },
                neckType: {
                  select: {
                    name: true,
                  },
                },
                bottomDescription: {
                  select: {
                    productDescription: true,
                    weight: true,
                    printAndPattern: true,
                    length: true,
                    waist: true,
                    hip: true,
                    type: true,
                    colorFamily: true,
                    pocket: true,
                    beltLoop: true,
                    typesOfPants: {
                      select: {
                        name: true,
                      },
                    },
                    typesOfLength: {
                      select: {
                        name: true,
                      },
                    },
                    typesOfPleats: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            pantDescription: {
              select: {
                productDescription: true,
                weight: true,
                printAndPattern: true,
                length: true,
                waist: true,
                hip: true,
                type: true,
                colorFamily: true,
                pocket: true,
                beltLoop: true,
                typesOfPants: {
                  select: {
                    name: true,
                  },
                },
                typesOfLength: {
                  select: {
                    name: true,
                  },
                },
                typesOfPleats: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            kurtasDescription: {
              select: {
                productDescription: true,
                work: true,
                chest: true,
                shoulder: true,
                transparencyOfTheFabric: true,
                kurtasLengthType: {
                  select: {
                    name: true,
                  },
                },
                weight: true,
                colorFamily: true,
                pocket: true,
                printAndpattern: true,
                neckType: {
                  select: {
                    name: true,
                  },
                },
                sleeveType: {
                  select: {
                    name: true,
                  },
                },
                bottomDescription: {
                  select: {
                    productDescription: true,
                    weight: true,
                    printAndPattern: true,
                    length: true,
                    waist: true,
                    hip: true,
                    type: true,
                    colorFamily: true,
                    pocket: true,
                    beltLoop: true,
                    typesOfPants: {
                      select: {
                        name: true,
                      },
                    },
                    typesOfLength: {
                      select: {
                        name: true,
                      },
                    },
                    typesOfPleats: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            shoesDescription: {
              select: {
                pattern: true,
                footLength: true,
                type: true,
                soleMaterial: true,
                printAndPattern: true,
                upperMaterial: true,
                closure: true,
                toeType: true,
                weight: true,
                colorFamily: true,
                productDescription: true,
                packageContains: true,
                warranty: {
                  select: {
                    warrantyPeriod: true,
                  },
                },
              },
            },
            innerDescription: {
              select: {
                type: true,
                productDescription: true,
                weight: true,
                length: true,
                waistRise: true,
                printAndPattern: true,
                packageContains: true,
                lookAndFeel: true,
                colorFamily: true,
                multiColors: true,
                sleeveType: {
                  select: {
                    name: true,
                  },
                },
                neckType: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            watchesDescription: {
              select: {
                type: true,
                weight: true,
                model: true,
                dialShape: true,
                printAndPattern: true,
                dialDiameter: true,
                dialColor: true,
                strapColor: true,
                colorFamily: true,
                productDescription: true,
                warranty: {
                  select: {
                    warrantyPeriod: true,
                  },
                },
              },
            },
            perfumesDescription: {
              select: {
                productDescription: true,
                type: true,
                materialDescription: true,
                weight: true,
              },
            },
          },
        },
      },
      skip: page == null || page == 0 ? 0 : (page - 1) * itemsPerPage,
      take: itemsPerPage,
    });
    return PaginationResponse(page, count, itemsPerPage, data);
  }
}
