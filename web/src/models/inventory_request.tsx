import { z } from "zod";
const findInventoryRequest = z.object({
  page: z.number(),
  searchQuery: z.string(),
});

const inventoryRequest = z.object({
  productCatgoriesId: z.string(),
  productTypeId: z.string().nullable(),
  productSizeId: z.string().array().optional(),
  title: z.string(),
  brandName: z.string(),
  material: z.string(),
  fit: z.string(),
  care: z.string(),
  occasion: z.string(),
  origin: z.string(),
  specialFeature: z.string().optional().nullable(),
  productDescription: z.string(), //top
  weight: z.string(),
  chest: z.string(),
  sleeveType: z.string(),
  neckType: z.string(),
  shoulder: z.string(),
  type: z.string(),
  colorFamily: z.string(),
  printAndPattern: z.string(),
  pocket: z.string(),
  length: z.string().optional().nullable(),
  bottomLength: z.string(), //bottom
  bottomProductDescription: z.string(),
  bottomWeight: z.string(),
  bottomType: z.string(),
  bottomColorFamily: z.string(),
  bottomPrintAndPattern: z.string(),
  bottomPocket: z.string(),
  waist: z.string().optional().nullable(),
  hip: z.string().optional().nullable(),
  beltLoop: z.boolean().optional().nullable(),
  typeOfPantId: z.string().optional().nullable(),
  pantLengthId: z.string().optional().nullable(),
  pantPleatsId: z.string().optional().nullable(),
  work: z.string().optional(), //enthic
  transparencyOfTheFabric: z.boolean().optional(),
  upperMaterial: z.string().optional(), //shoes
  soleMaterial: z.string().optional(),
  closure: z.string().optional(),
  toeType: z.string().optional(),
  model: z.string().optional(),
  dialDiameter: z.string().optional(),
  dialColor: z.string().optional(),
  strapColor: z.string().optional(),
  dialShape: z.string().optional(),
  warrantyPeriod: z.string().optional(),
  materialDescription: z.string().optional(),
  packageContains: z.string().optional(),
  lookAndFeel: z.string().optional(),
  multiColor: z.boolean().optional(),
  category: z.string().optional(),
  productCategoryType: z.string().optional(),
  deliveryForMetroCitys: z.string(),
  deliveryForOtherCitys: z.string(),
  returns: z.string(),
  price: z.string(),
  seasons: z.number().array(),
});

const inventoryUpdateRequest = z.object({
  id: z.number(),
  quantity: z.string(),
});
export type FindInventoryRequestSchema = z.infer<typeof findInventoryRequest>;
export type InventoryRequestSchema = z.infer<typeof inventoryRequest>;
export type InventoryUpdateRequestSchema = z.infer<
  typeof inventoryUpdateRequest
>;
