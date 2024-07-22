import { z } from "zod";

const productImageSchema = z.object({
  imageUrl: z.string(),
  productColorId: z.number(),
  createdAt: z.string().datetime(),
});

const colorSizeSchema = z.object({
  quantity: z.number(),
  productTypeSize: z.object({
    size: z.string(),
  }),
});

const colorSchema = z.object({
  id: z.number(),
  colors: z.string(),
  productImages: z.array(productImageSchema),
  colorSize: z.array(colorSizeSchema),
});

const topDescriptionSchema = z.object({
  weight: z.number(),
  chest: z.number(),
  shoulder: z.number(),
  type: z.string(),
  colorFamily: z.string(),
  printAndPattern: z.string(),
  length: z.number(),
  pocket: z.string(),
  productDescription: z.string(),
  sleeveType: z.object({
    name: z.string(),
  }),
  neckType: z.object({
    name: z.string(),
  }),
  bottomDescription: z.array(z.any()),
});

const commonDescriptionSchema = z.object({
  brandName: z.string(),
  fit: z.string(),
  care: z.string(),
  materail: z.string(),
  origin: z.string(),
  specialFeature: z.string(),
  occasion: z.string(),
  topDescription: z.array(topDescriptionSchema),
  pantDescription: z.array(z.any()),
  kurtasDescription: z.array(z.any()),
  shoesDescription: z.array(z.any()),
  innerDescription: z.array(z.any()),
  watchesDescription: z.array(z.any()),
  perfumesDescription: z.array(z.any()),
});

const productTypeSchema = z.object({
  id: z.number(),
  itemsName: z.string(),
  ProductCategory: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

const seasonalSchema = z.object({
  seasonalName: z.string(),
});

const seasonalDressesSchema = z.object({
  seasonal: seasonalSchema,
});

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  createdAt: z.string().datetime(),
  seasonalDresses: z.array(seasonalDressesSchema),
  color: z.array(colorSchema),
  productType: productTypeSchema,
  commonDescription: z.array(commonDescriptionSchema),
});

const inventoryData = z.object({
  from: z.number(),
  to: z.number(),
  total: z.number(),
  totalPages: z.number(),
  data: productSchema.array().nullable(),
});

export type inventoryDescription = z.infer<typeof commonDescriptionSchema>;
export type inventoryColors = z.infer<typeof colorSchema>;
export type inventorySize = z.infer<typeof colorSchema>;
export type inventoryImage = z.infer<typeof productImageSchema>;

export type apiResponseSchema = z.infer<typeof inventoryData>;
export type inventorySchema = z.infer<typeof productSchema>;
