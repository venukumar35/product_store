import { z } from "zod";
import { ProductCategory, ProductTypeName } from "../utils/common_utils";

const inventoryRequest = z.object({
  title: z
    .string()
    .min(2, { message: "name should contain minimum 2 characters" })
    .max(25, {
      message: "name should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "name should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  productCatgoriesId: z.string().min(1, "Select catogery"),
  productTypeId: z.string().min(1, "Select product type"),

  brandName: z
    .string()
    .min(2, { message: "Brand name should contain minimum 2 characters" })
    .max(25, {
      message: "Brand name should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Brand name should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  fit: z
    .string()
    .min(2, { message: "Fit name should contain minimum 2 characters" })
    .max(25, {
      message: "Fit name should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Fit name should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  sleeveType: z.string().min(1, "Select sleeve type"),
  neckType: z.string().min(1, "Select neck type"),
  care: z
    .string()
    .min(2, { message: "Care name should contain minimum 2 characters" })
    .max(25, {
      message: "Care name should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Care name should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  occasion: z
    .string()
    .min(2, { message: "Occasion should contain minimum 2 characters" })
    .max(25, {
      message: "Occasion should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Occasion should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  origin: z
    .string()
    .min(2, { message: "Origin should contain minimum 2 characters" })
    .max(25, {
      message: "Origin should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Origin should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  material: z
    .string()
    .min(2, { message: "Material should contain minimum 2 characters" })
    .max(25, {
      message: "Material should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Material should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  specialFeature: z
    .string()
    .min(2, {
      message: "Special feature should contain minimum 2 characters",
    })
    .max(25, {
      message: "Special feature should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Special feature should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .nullable(),
  productDescription: z
    .string()
    .min(2, {
      message: "Product description should contain minimum 2 characters",
    })
    .max(25, {
      message: "Product description should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Product description should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  weight: z
    .string()
    .min(1, "Enter Weight")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  chest: z
    .string()
    .min(1, "Enter Chest")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  shoulder: z
    .string()
    .min(1, "Enter Shoulder")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  type: z
    .string()
    .min(2, {
      message: "Type should contain minimum 2 characters",
    })
    .max(25, {
      message: "Type should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Type should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  colorFamily: z
    .string()
    .min(2, {
      message: "Color family should contain minimum 2 characters",
    })
    .max(25, {
      message: "Color family should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Color family should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  printAndPattern: z
    .string()
    .min(2, {
      message: "Print and pattern should contain minimum 2 characters",
    })
    .max(25, {
      message: "Print and pattern should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Print and pattern should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),

  pocket: z
    .string()
    .min(1, "Enter Pocket")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  length: z
    .string()
    .min(1, "Enter length")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  waist: z
    .string()
    .min(1, "Enter Waist size")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  hip: z
    .string()
    .min(1, "Enter Hip size")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  beltLoop: z.boolean(),
  typeOfPantId: z.string().min(1, { message: "Select bottom type" }),
  pantLengthId: z.string().min(1, { message: "Select bottom length type" }),
  pantPleatsId: z.string().min(1, { message: "Select bottom pleats type" }),
  work: z
    .string()
    .min(2, {
      message: "Work should contain minimum 2 characters",
    })
    .max(25, {
      message: "Work should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Work should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  transparencyOfTheFabric: z.boolean(),
  closure: z
    .string()
    .min(2, {
      message: "Closure should contain minimum 2 characters",
    })
    .max(25, {
      message: "Closure should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Closure should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  upperMaterial: z
    .string()
    .min(2, {
      message: "Upper material should contain minimum 2 characters",
    })
    .max(25, {
      message: "Upper material should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Upper material should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  soleMaterial: z
    .string()
    .min(2, {
      message: "Upper material should contain minimum 2 characters",
    })
    .max(25, {
      message: "Upper material should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Upper material should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  toeType: z
    .string()
    .min(2, {
      message: "Toe type should contain minimum 2 characters",
    })
    .max(25, {
      message: "Toe type should not contain more than 20 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Toe type should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  dialColor: z
    .string()
    .min(2, {
      message: "Dial color should contain minimum 2 characters",
    })
    .max(25, {
      message: "Dial color should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Dial color should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  dialDiameter: z
    .string()
    .min(2, {
      message: "Dial diameter should contain minimum 2 characters",
    })
    .max(25, {
      message: "Dial diameter should not contain more than 15 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Dial diameter should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  model: z
    .string()
    .min(2, {
      message: "Model should contain minimum 2 characters",
    })
    .max(25, {
      message: "Model should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Model should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  strapColor: z
    .string()
    .min(2, {
      message: "Strap color contain minimum 2 characters",
    })
    .max(25, {
      message: "Strap color not contain more than 15 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Strap color not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  dialShape: z
    .string()
    .min(2, {
      message: "Dail shape contain minimum 2 characters",
    })
    .max(25, {
      message: "Dail shape not contain more than 20 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Dail shape not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  warrantyPeriod: z
    .string()
    .min(1, "Enter Warranty period")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter in number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter in number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  materialDescription: z
    .string()
    .min(2, {
      message: "Material description should contain minimum 2 characters",
    })
    .max(25, {
      message:
        "Material description should not contain more than 100 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Material description should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  lookAndFeel: z
    .string()
    .min(2, {
      message: "Look and feel should contain minimum 2 characters",
    })
    .max(25, {
      message: "Look and feel should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Look and feel should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  multiColor: z.boolean(),
  packageContains: z
    .string()
    .min(1, "Enter Package contains")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Enter in number",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Enter in number",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  seasons: z
    .array(z.string())
    .optional()
    .refine((val) => val === undefined || val.length > 0, {
      message: "Select one or more product seasons",
    }),
  productSizeId: z.array(z.string()).optional(),
  category: z.string(),
  productCategoryType: z.string(),
  price: z
    .string()
    .min(1, "Enter price")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  deliveryForMetroCitys: z
    .string()
    .min(1, "Enter delevery for city")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  deliveryForOtherCitys: z
    .string()
    .min(1, "Enter delevery for city")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  returns: z
    .string()
    .min(1, "Enter returning days")
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid alphabet charcters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid alphabet charctesr",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  //bottom
  bottomLength: z
    .string()
    .min(2, {
      message: "Look and feel should contain minimum 2 characters",
    })
    .max(8, {
      message: "Look and feel should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Look and feel should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomProductDescription: z
    .string()
    .min(2, {
      message: "Look and feel should contain minimum 2 characters",
    })
    .max(300, {
      message: "Look and feel should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Look and feel should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomWeight: z
    .string()
    .min(1, {
      message: "Weight should contain minimum 2 characters",
    })
    .max(5, {
      message: "Weight should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Weight should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomType: z
    .string()
    .min(2, {
      message: "Type should contain minimum 2 characters",
    })
    .max(25, {
      message: "Type should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Type should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomColorFamily: z
    .string()
    .min(2, {
      message: "Color family should contain minimum 2 characters",
    })
    .max(25, {
      message: "Color family should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Color family should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomPrintAndPattern: z
    .string()
    .min(2, {
      message: "Print and pattern should contain minimum 2 characters",
    })
    .max(25, {
      message: "Print and pattern should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Print and pattern should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  bottomPocket: z
    .string()
    .min(1, {
      message: "Bottom pocket should contain minimum 2 characters",
    })
    .max(10, {
      message: "Bottom pocket should not contain more than 10 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "Bottom pocket should not start or end with a space",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
});

export const getValidationSchema = (category: string, type: string) => {
  if (category === ProductCategory.TopWear) {
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      neckType: true,
      sleeveType: true,
      weight: true,
      chest: true,
      shoulder: true,
      type: true,
      colorFamily: true,
      printAndPattern: true,
      pocket: true,
      price: true,
      deliveryForMetroCitys: true,
      deliveryForOtherCitys: true,
      returns: true,
      seasons: true,
      length: true,
    });
  } else if (category === ProductCategory.BottomWear) {
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      bottomWeight: true,
      bottomColorFamily: true,
      bottomLength: true,
      bottomPocket: true,
      bottomPrintAndPattern: true,
      bottomProductDescription: true,
      bottomType: true,
      waist: true,
      hip: true,
      typeOfPantId: true,
      pantLengthId: true,
      pantPleatsId: true,
      beltLoop: true,
    });
  } else if (category === ProductCategory.EthnicWear) {
    if (type == ProductTypeName.EthicSet) {
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        productDescription: true,
        neckType: true,
        sleeveType: true,
        weight: true,
        chest: true,
        shoulder: true,
        type: true,
        colorFamily: true,
        printAndPattern: true,
        pocket: true,
        work: true,
        transparencyOfTheFabric: true,
        length: true,
        waist: true,
        hip: true,
        typeOfPantId: true,
        pantLengthId: true,
        pantPleatsId: true,
        beltLoop: true,
        bottomWeight: true,
        bottomColorFamily: true,
        bottomLength: true,
        bottomPocket: true,
        bottomPrintAndPattern: true,
        bottomProductDescription: true,
        bottomType: true,
      });
    }

    if (type == ProductTypeName.EthicBottom) {
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        bottomWeight: true,
        bottomColorFamily: true,
        bottomLength: true,
        bottomPocket: true,
        bottomPrintAndPattern: true,
        bottomProductDescription: true,
        bottomType: true,
        waist: true,
        hip: true,
        typeOfPantId: true,
        pantLengthId: true,
        pantPleatsId: true,
        beltLoop: true,
      });
    }
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      neckType: true,
      sleeveType: true,
      weight: true,
      chest: true,
      shoulder: true,
      type: true,
      colorFamily: true,
      printAndPattern: true,
      pocket: true,
      work: true,
      transparencyOfTheFabric: true,
      length: true,
    });
  } else if (category === ProductCategory.SportsWear) {
    if (type === ProductTypeName.SportsTShirts) {
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        productDescription: true,
        neckType: true,
        sleeveType: true,
        weight: true,
        chest: true,
        shoulder: true,
        type: true,
        colorFamily: true,
        printAndPattern: true,
        pocket: true,
      });
    }
    if (
      type === ProductTypeName.ShortsTrackPants ||
      type === ProductTypeName.SportsShorts
    ) {
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        bottomWeight: true,
        bottomColorFamily: true,
        bottomLength: true,
        bottomPocket: true,
        bottomPrintAndPattern: true,
        bottomProductDescription: true,
        bottomType: true,
        waist: true,
        hip: true,
        typeOfPantId: true,
        pantLengthId: true,
        pantPleatsId: true,
        beltLoop: true,
      });
    }
    // if (type === ProductTypeName.SportsTrackSuit) {
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      neckType: true,
      sleeveType: true,
      weight: true,
      chest: true,
      shoulder: true,
      type: true,
      colorFamily: true,
      printAndPattern: true,
      pocket: true,
      waist: true,
      hip: true,
      typeOfPantId: true,
      pantLengthId: true,
      pantPleatsId: true,
      beltLoop: true,
    });
    // }
  } else if (category === ProductCategory.Footwear) {
    if (type == ProductTypeName.FootWear) {
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        productDescription: true,
        length: true,
        type: true,
        colorFamily: true,
        printAndPattern: true,
        toeType: true,
        weight: true,
        packageContains: true,
      });
    }

    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      length: true,
      type: true,
      colorFamily: true,
      printAndPattern: true,
      soleMaterial: true,
      upperMaterial: true,
      closure: true,
      toeType: true,
      weight: true,
      warrantyPeriod: true,
    });
  } else if (category === ProductCategory.Watches) {
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      weight: true,
      type: true,
      colorFamily: true,
      printAndPattern: true,
      model: true,
      dialColor: true,
      strapColor: true,
      dialShape: true,
      dialDiameter: true,
      warrantyPeriod: true,
    });
  } else if (category === ProductCategory.Fragrances) {
    return inventoryRequest.pick({
      brandName: true,
      fit: true,
      care: true,
      material: true,
      origin: true,
      occasion: true,
      title: true,
      specialFeature: true,
      productCatgoriesId: true,
      productTypeId: true,
      productDescription: true,
      materialDescription: true,
      weight: true,
      type: true,
    });
  } else if (category === ProductCategory.Innerwear) {
    if (category === ProductCategory.Innerwear) {
      if (type === ProductTypeName.InnerWears) {
        return inventoryRequest.pick({
          brandName: true,
          fit: true,
          care: true,
          material: true,
          origin: true,
          occasion: true,
          title: true,
          specialFeature: true,
          productCatgoriesId: true,
          productTypeId: true,
          weight: true,
          waist: true,
          length: true,
          type: true,
          colorFamily: true,
          packageContains: true,
          lookAndFeel: true,
          printAndPattern: true,
          multiColor: true,
          neckType: true,
          sleeveType: true,
        });
      }
      return inventoryRequest.pick({
        brandName: true,
        fit: true,
        care: true,
        material: true,
        origin: true,
        occasion: true,
        title: true,
        specialFeature: true,
        productCatgoriesId: true,
        productTypeId: true,
        weight: true,
        waist: true,
        length: true,
        type: true,
        colorFamily: true,
        packageContains: true,
        lookAndFeel: true,
        printAndPattern: true,
        multiColor: true,
      });
    }
  } else {
    return inventoryRequest;
  }
};
