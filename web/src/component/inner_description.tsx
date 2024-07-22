import { Group, Radio, Select, TextInput, Textarea } from "@mantine/core";
import CommonStore from "../pages/common_store/commonStore";
import { useEffect } from "react";
import { InventoryRequestSchema } from "../models/inventory_request";
import { UseFormReturnType } from "@mantine/form";
import { ProductTypeName } from "../utils/common_utils";

export default function InnerDescription({
  form,
  type,
}: {
  form: UseFormReturnType<InventoryRequestSchema>;
  type: string;
}) {
  const { neckTypeData, neckType, sleeveTypeData, sleeveType } = CommonStore();

  const handleRadioChange = (value: string) => {
    form.setFieldValue("multiColor", value === "True");
  };

  useEffect(() => {
    neckType();
    sleeveType();
  }, []);
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("productDescription")}
        label="Special Feature"
        description="Enter special feature"
        withAsterisk
        variant="filled"
      />
      {type == ProductTypeName.InnerWears ? (
        <div>
          {" "}
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
        </div>
      ) : (
        <>
          {" "}
          <TextInput
            {...form.getInputProps("waist")}
            label="Waist"
            placeholder="Enter waist"
            withAsterisk
            variant="filled"
          />
        </>
      )}
      <TextInput
        {...form.getInputProps("weight")}
        label="Weight"
        placeholder="Enter weight"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("length")}
        label="Length"
        placeholder="Enter length"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("type")}
        label="Type"
        placeholder="Enter type"
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
        {...form.getInputProps("packageContains")}
        label="Package contains"
        placeholder="Enter package contains"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("lookAndFeel")}
        label="Look and feel"
        placeholder="Enter look and feel"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("printAndPattern")}
        label="Print & Pattern"
        placeholder="Enter print and pattern"
        withAsterisk
        variant="filled"
      />{" "}
      <Radio.Group
        name="Multicolors"
        label="Multi colors"
        withAsterisk
        onChange={handleRadioChange}
      >
        <Group mt="xs">
          <Radio value="True" label="Yes" />
          <Radio value="False" label="No" />
        </Group>
      </Radio.Group>
    </div>
  );
}
