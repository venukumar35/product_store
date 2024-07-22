import {
  ProductCategory,
  bottom,
  ethnic,
  footWears,
  sizesForPants,
  sizesForShirts,
  sports,
  top,
  footwear,
  accessories,
  empty,
  innerWear,
} from 'utils/common';
import { PrismaService } from './db';
import * as bcrypt from 'bcrypt';
import { country, state } from 'country/country';

async function addRoles(prisma: PrismaService) {
  const count = (await prisma.roles.count()) == 0;
  const roles = ['user', 'StoreCustomer'];
  if (count) {
    await prisma.roles.createMany({
      data: roles.map((e) => ({ name: e })),
    });
  }
}
async function addGender(prisma: PrismaService) {
  const count = (await prisma.gender.count()) == 0;
  const gend = ['Male', 'Female'];
  if (count) {
    for (const iter of gend) {
      await prisma.gender.create({
        data: {
          name: iter,
        },
      });
    }
  }
}
async function addDefaultUser(prisma: PrismaService) {
  const countUser = (await prisma.user.count()) == 0;
  const saltOrRounds = 10;
  const password = 'venu@123';
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  if (countUser) {
    await prisma.user.create({
      data: {
        username: 'venukumar',
        email: 'venukumar@gmail.com',
        mobile: '6380666892',
        password: hashedPassword,
        roleId: 1,
        genderId: 1,
      },
    });
  }
}

async function addProductCategory(prisma: PrismaService) {
  const count = (await prisma.productCategory.count()) == 0;
  if (count) {
    const category = [
      'Top',
      'Bottom',
      'Ethnic',
      'Sports',
      'Fragrances',
      'Footwear',
      'Accessories',
      'Inner',
      'Watches',
    ];

    for (const categoryData of category) {
      const categoryId = await prisma.productCategory.create({
        data: {
          name: categoryData,
          genderId: 1,
        },
      });
      const name = categoryId.name;
      switch (name) {
        case ProductCategory.TopWear:
          addProductTypes(categoryId.id, top, sizesForShirts, prisma);
          break;
        case ProductCategory.BottomWear:
          addProductTypes(categoryId.id, bottom, sizesForPants, prisma);
          break;
        case ProductCategory.EthnicWear:
          addProductTypes(categoryId.id, ethnic, sizesForShirts, prisma);
          break;
        case ProductCategory.SportsWear:
          addProductTypes(categoryId.id, sports, sizesForShirts, prisma);
          break;
        case ProductCategory.Footwear:
          addProductTypes(categoryId.id, footwear, footWears, prisma);
          break;
        case ProductCategory.Accessories:
          addProductTypes(categoryId.id, accessories, empty, prisma);
          break;
        case ProductCategory.Innerwear:
          addProductTypes(categoryId.id, innerWear, sizesForPants, prisma);
          break;
        case ProductCategory.Fragrances:
          addProductTypes(categoryId.id, ['Fragrances'], empty, prisma);
          break;
        case ProductCategory.Watches:
          addProductTypes(categoryId.id, ['Watches'], empty, prisma);
          break;
        default:
          console.log(`Their is no ProductCategory like this ${name}`);

          break;
      }
    }
  }
}
async function addProductTypes(
  id: number,
  productType: string[],
  size: string[],
  prisma: PrismaService,
) {
  for (const type of productType) {
    const productTypeId = await prisma.productType.create({
      data: {
        itemsName: type,
        productCategoryId: id,
      },
    });

    if (productTypeId.itemsName == 'Socks') {
      size = [' 6-8', ' 8-10', ' 10-12', ' 12-14'];
    } else if (
      productTypeId.itemsName == 'Track Pants' ||
      productTypeId.itemsName == 'Shorts'
    ) {
      size = ['28', '30', '32', '36', '38', '40', '42'];
    }
    for (const sizesOfProductType of size) {
      await prisma.productTypeSize.create({
        data: {
          size: sizesOfProductType,
          ietmsId: productTypeId.id,
        },
      });
    }
  }
}
async function initOfferPromationPeriods(prisma: PrismaService) {
  const count = (await prisma.offerPromotionPeriods.count()) == 0;
  const data = ['Week end offer', 'Week days offer', 'Full Week'];
  if (count) {
    for (const peroids of data) {
      await prisma.offerPromotionPeriods.create({
        data: {
          name: peroids,
        },
      });
    }
  }
}
async function addCountry(prisma: PrismaService) {
  const count = (await prisma.country.count()) == 0;

  if (count) {
    for (const data of country) {
      await prisma.country.create({
        data: {
          name: data.Name,
          dialCode: data.DailCode,
          timezoneOffset: data.TimeOffset,
        },
      });
    }
  }
}

async function addState(prisma: PrismaService) {
  const count = (await prisma.state.count()) == 0;
  if (count) {
    for (const data of state) {
      await prisma.state.create({
        data: {
          name: data,
          countryId: 77,
        },
      });
    }
  }
}
async function addSeasonal(prisma: PrismaService) {
  const count = (await prisma.seasonal.count()) == 0;
  const seasons = ['Summer', 'Winter', 'Rainy', 'Spring', 'Autumn'];
  if (count) {
    for (const data of seasons) {
      await prisma.seasonal.create({
        data: {
          seasonalName: data,
        },
      });
    }
  }
}
async function bottomTypes(prisma: PrismaService) {
  const bottomTypes = [
    'Slim Fit Pants',
    'Straight Leg Pants',
    'Tapered Pants',
    'Chinos',
    'Trousers',
    'Khakis',
    'Pleated Pants',
    'Cargo Pants',
    'Joggers',
    'Bootcut Pants',
  ];

  const count = (await prisma.typesOfBottom.count()) == 0;

  if (count) {
    for (const data of bottomTypes) {
      await prisma.typesOfBottom.create({
        data: {
          name: data,
        },
      });
    }
  }
}
async function pleatTypesBottoms(prisma: PrismaService) {
  const pleatTypes = [
    'Single Pleat',
    'Double Pleat',
    'Inverted Pleat',
    'Box Pleat',
    'Knife Pleat',
  ];
  const count = (await prisma.typesOfPleats.count()) == 0;

  if (count) {
    for (const data of pleatTypes) {
      await prisma.typesOfPleats.create({
        data: {
          name: data,
        },
      });
    }
  }
}
async function LengthTypesBottom(prisma: PrismaService) {
  const lengthTypes = [
    'Full Length',
    'Ankle Length',
    'Cropped',
    'Capri',
    'Bermuda Shorts',
    'Shorts',
    '7/8 Length',
    'Dhoti',
  ];
  const count = (await prisma.typesOfLengthBottom.count()) == 0;

  if (count) {
    for (const data of lengthTypes) {
      await prisma.typesOfLengthBottom.create({
        data: {
          name: data,
        },
      });
    }
  }
}

async function LengthTypesKurtas(prisma: PrismaService) {
  const lengthTypes = [
    'Short Kurta',
    'Waist-Length Kurta',
    'Hip-Length Kurta',
    'Knee-Length Kurta',
    'Calf-Length Kurta',
    'Ankle-Length Kurta',
  ];
  const count = (await prisma.kurtasLengthType.count()) == 0;

  if (count) {
    for (const data of lengthTypes) {
      await prisma.kurtasLengthType.create({
        data: {
          name: data,
        },
      });
    }
  }
}
async function neckType(prisma: PrismaService) {
  const kurtaNeckTypes = [
    'Round Neck',
    'V-Neck',
    'Mandarin Collar',
    'Boat Neck',
    'Square Neck',
    'Keyhole Neck',
    'Collar Neck',
    'Sweetheart Neck',
    'U-Neck',
    'Henley Neck',
    'Cowl Neck',
    'High Neck',
    'Asymmetric Neck',
    'Scoop Neck',
  ];

  const count = (await prisma.neckType.count()) == 0;

  if (count) {
    for (const data of kurtaNeckTypes) {
      await prisma.neckType.create({
        data: {
          name: data,
        },
      });
    }
  }
}
async function sleeveType(prisma: PrismaService) {
  const sleeveType = [
    'Sleeveless',
    'Cap Sleeves',
    'Short Sleeves',
    'Elbow Length Sleeves',
    '3/4 Sleeves',
    'Full Sleeves',
    'Bell Sleeves',
    'Bishop Sleeves',
    'Butterfly Sleeves',
    'Raglan Sleeves',
    'Kimono Sleeves',
    'Cold Shoulder Sleeves',
    'Puff Sleeves',
    'Slit Sleeves',
  ];
  const count = (await prisma.sleeveType.count()) == 0;

  if (count) {
    for (const data of sleeveType) {
      await prisma.sleeveType.create({
        data: {
          name: data,
        },
      });
    }
  }
}
export default async function initDatabase(prisma: PrismaService) {
  await addRoles(prisma);
  await addGender(prisma);
  await addDefaultUser(prisma);
  await addProductCategory(prisma);
  await initOfferPromationPeriods(prisma);
  await addCountry(prisma);
  await addState(prisma);
  await addSeasonal(prisma);
  await bottomTypes(prisma);
  await pleatTypesBottoms(prisma);
  await LengthTypesBottom(prisma);
  await LengthTypesKurtas(prisma);
  await neckType(prisma);
  await sleeveType(prisma);
}
