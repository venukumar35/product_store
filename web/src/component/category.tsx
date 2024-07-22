import { TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { InventoryRequestSchema } from "../models/inventory_request";
import { useEffect } from "react";
import CommonStore from "../pages/common_store/commonStore";
import objOfCountry from "../network/commonclient";
interface seasonType {
  id: number;
  seasonalName: string;
}
interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  //  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setProductTypeName: React.Dispatch<React.SetStateAction<string>>;
  setSeasons: React.Dispatch<React.SetStateAction<seasonType[]>>;
}
export default function Category({
  form,
  setCategoryName,
  setProductTypeName,
  setSeasons,
}: formProps) {
  const {
    productCatgories,
    productCatgoryData,
    setProductCatgoriesId,
    productTypeData,
    productType,
    productTypeSizes,
    setProductTypeId,
  } = CommonStore();
  const handleProductCategoryChange = async (value: any) => {
    form.setFieldValue("productCatgoriesId", value);
    form.setFieldValue("productTypeId", null);

    const catName = productCatgoryData?.find((e) => e.id.toString() == value);

    if (catName) {
      setCategoryName(catName?.name);
      form.setFieldValue("category", catName?.name);
    }
    setProductCatgoriesId(+value);
    productType();
  };
  const handleProductTypeChange = async (value: string) => {
    form.setFieldValue("productTypeId", value);

    const productTypeIdData = productTypeData?.find(
      (e) => e.id.toString() === value
    );

    if (productTypeIdData) {
      setProductTypeName(productTypeIdData.itemsName);
      form.setFieldValue("productCategoryType", productTypeIdData?.itemsName);
    }
    setProductTypeId(Number(value));
    productTypeSizes();
    const data = await objOfCountry.getProductTypeSeasons();
    setSeasons(data.data);
  };
  useEffect(() => {
    productCatgories();
  }, []);
  return (
    <div className="space-y-4 p-5">
      {" "}
      <TextInput
        {...form.getInputProps("title")}
        label="Title"
        placeholder="Enter title"
        withAsterisk
        variant="filled"
      />
      <Select
        {...form.getInputProps("productCatgoriesId")}
        label="Category"
        placeholder="Select category"
        withAsterisk
        variant="filled"
        data={productCatgoryData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
        onChange={(e: any) => handleProductCategoryChange(e)}
      />
      <Select
        {...form.getInputProps("productTypeId")}
        label="Product type"
        withAsterisk
        variant="filled"
        placeholder="Select product type"
        data={productTypeData?.map((e) => ({
          value: e.id.toString(),
          label: e.itemsName,
        }))}
        onChange={(e: any) => handleProductTypeChange(e)}
      />
    </div>
  );
}
