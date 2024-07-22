import { create } from "zustand";
import objOfCountry from "../../network/commonclient";
import z from "zod";

const countryResponse = z.object({
  id: z.number(),
  name: z.string(),
  timezoneOffset: z.number(),
  dialCode: z.number(),
});
const countryStateResponse = z.object({
  id: z.number(),
  name: z.string(),
  countryId: z.number(),
});
const productCatgoriesResponse = z.object({
  id: z.number(),
  name: z.string(),
  genderId: z.number(),
});
const productCatgoriesTypeResponse = z.object({
  id: z.number(),
  itemsName: z.string(),
  productCategoryId: z.number(),
});
const productTypeSizesResponse = z.object({
  id: z.number(),
  size: z.string(),
  ietmsId: z.number(),
});
const nextType = z.object({
  id: z.number(),
  name: z.string(),
});
export type countryResponseSchema = z.infer<typeof countryResponse>;
export type countrySateResponseSchema = z.infer<typeof countryStateResponse>;
export type productCatgoriesResponseSchema = z.infer<
  typeof productCatgoriesResponse
>;
export type productCatgoriesTypeResponseSchema = z.infer<
  typeof productCatgoriesTypeResponse
>;
export type productTypeSizesResponseSchema = z.infer<
  typeof productTypeSizesResponse
>;
export type nextTypeSchema = z.infer<typeof nextType>;
interface storeType {
  countryData: countryResponseSchema[] | null;
  country: () => void;
  stateData: countrySateResponseSchema[] | null;
  state: () => void;
  countryId: number;
  setCountryId: (countryId: number) => void;
  productCatgoryData: productCatgoriesResponseSchema[] | null;
  productCatgories: () => void;
  productCatgoriesId: number;
  setProductCatgoriesId: (productCatgoriesId: number) => void;
  productTypeData: productCatgoriesTypeResponseSchema[] | null;
  productType: () => void;
  productTypeId: number;
  productTypeSizesData: productTypeSizesResponseSchema[] | null;
  setProductTypeId: (productTypeId: number) => void;
  productTypeSizes: () => void;
  neckTypeData: nextTypeSchema[] | null;
  neckType: () => void;
  sleeveTypeData: nextTypeSchema[] | null;
  sleeveType: () => void;
  bottomTypeData: nextTypeSchema[] | null;
  bottomType: () => void;
  TypesOfPleatsData: nextTypeSchema[] | null;
  bottomTypesOfPleats: () => void;
  TypesOfLengthBottomData: nextTypeSchema[] | null;
  TypesOfLengthBottom: () => void;
  kurtasLengthData: nextTypeSchema[] | null;
  kurtasLengthType: () => void;
}

const CommonStore = create<storeType>((set, get) => ({
  countryData: null,
  stateData: null,
  countryId: 1,
  productCatgoryData: null,
  productTypeData: null,
  productCatgoriesId: 0,
  productTypeId: 0,
  productTypeSizesData: null,
  neckTypeData: null,
  sleeveTypeData: null,
  bottomTypeData: null,
  kurtasLengthData: null,
  TypesOfPleatsData: null,
  TypesOfLengthBottomData: null,
  country: async () => {
    const response = await objOfCountry.getCountry();
    if (response != null) {
      set({ countryData: response });
    }
  },
  state: async () => {
    const { countryId } = get();
    const response = await objOfCountry.getCountryState(countryId);
    if (response != null) {
      set({ stateData: response ?? [] });
    }
  },
  setCountryId: (countryId: number) => set(() => ({ countryId })),
  productCatgories: async () => {
    const response = await objOfCountry.getProductCatagories();
    if (response != null) {
      set({ productCatgoryData: response.data ?? [] });
    }
  },
  productType: async () => {
    const { productCatgoriesId } = get();
    const response = await objOfCountry.getProductType(productCatgoriesId);
    if (response != null) {
      set({ productTypeData: response ?? [] });
    }
  },
  setProductCatgoriesId: (productCatgoriesId: number) =>
    set(() => ({ productCatgoriesId })),
  setProductTypeId: (productTypeId: number) => set(() => ({ productTypeId })),
  productTypeSizes: async () => {
    const { productTypeId } = get();
    const response = await objOfCountry.getProductTypeSizes(productTypeId);
    if (response != null) {
      set({ productTypeSizesData: response.data ?? [] });
    }
  },
  neckType: async () => {
    const response = await objOfCountry.getNeckType();
    if (response) {
      set({ neckTypeData: response.response.data.data });
    }
  },
  sleeveType: async () => {
    const response = await objOfCountry.getSleeveType();
    if (response) {
      set({ sleeveTypeData: response.response.data.data });
    }
  },
  bottomType: async () => {
    const response = await objOfCountry.getBottomType();
    if (response) {
      set({ bottomTypeData: response.response.data.data });
    }
  },
  bottomTypesOfPleats: async () => {
    const response = await objOfCountry.bottomTypesOfPleats();
    if (response) {
      set({ TypesOfPleatsData: response.response.data.data });
    }
  },
  TypesOfLengthBottom: async () => {
    const response = await objOfCountry.TypesOfLengthBottom();
    if (response) {
      set({ TypesOfLengthBottomData: response.response.data.data });
    }
  },
  kurtasLengthType: async () => {
    const response = await objOfCountry.kurtasLengthType();
    if (response) {
      set({ kurtasLengthData: response.response.data.data });
    }
  },
}));
export default CommonStore;
