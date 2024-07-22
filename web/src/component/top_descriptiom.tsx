import { Select, TextInput, Textarea } from "@mantine/core";
import CommonStore from "../pages/common_store/commonStore";
import { useEffect } from "react";
import { InventoryRequestSchema } from "../models/inventory_request";
import { useForm } from "@mantine/form";

interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
}

export default function TopDescription({ form }: formProps) {
  const { neckTypeData, neckType, sleeveTypeData, sleeveType } = CommonStore();

  useEffect(() => {
    neckType();
    sleeveType();
  }, []);
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("productDescription")}
        label="Product description"
        placeholder="Enter product description"
        withAsterisk
        variant="filled"
      />
      <Select
        {...form.getInputProps("neckType")}
        label="Select neck Type"
        placeholder="select neck type"
        variant="filled"
        data={neckTypeData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
      />
      <Select
        {...form.getInputProps("sleeveType")}
        label="Select sleeve Type"
        placeholder="select sleeve type"
        variant="filled"
        data={sleeveTypeData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
      />
      <TextInput
        {...form.getInputProps("chest")}
        label="Chest"
        placeholder="Enter chest"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("shoulder")}
        label="Shoulder"
        placeholder="Enter shoulder"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("type")}
        label="Type"
        placeholder="Enter type"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("length")}
        label="Length"
        placeholder="Enter length"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("colorFamily")}
        label="Color family"
        placeholder="Enter color family"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("printAndPattern")}
        label="Print & Pattern"
        placeholder="Enter print and pattern"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("weight")}
        label="Weight"
        placeholder="Enter weight"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("pocket")}
        label="Pocket"
        placeholder="Enter pocket"
        withAsterisk
        variant="filled"
      />
    </div>
  );
}
