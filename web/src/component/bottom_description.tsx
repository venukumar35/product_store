import { useEffect } from "react";
import CommonStore from "../pages/common_store/commonStore";
import { useForm } from "@mantine/form";
import { InventoryRequestSchema } from "../models/inventory_request";
import { Group, Radio, Select, TextInput, Textarea } from "@mantine/core";
interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
}
export default function BottomDescription({ form }: formProps) {
  const {
    bottomType,
    bottomTypeData,
    bottomTypesOfPleats,
    TypesOfPleatsData,
    TypesOfLengthBottomData,
    TypesOfLengthBottom,
  } = CommonStore();

  const handleRadioChange = (value: string) => {
    form.setFieldValue("beltLoop", value === "True");
  };
  useEffect(() => {
    bottomType(), bottomTypesOfPleats(), TypesOfLengthBottom();
  }, []);
  console.log(TypesOfPleatsData, TypesOfLengthBottomData);
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("bottomProductDescription")}
        label="Special Feature"
        placeholder="Enter product description"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("bottomWeight")}
        label="Weight"
        placeholder="Enter weight"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("bottomType")}
        label="Type"
        placeholder="Enter type"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("bottomColorFamily")}
        label="Color family"
        placeholder="Enter color family"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("bottomPrintAndPattern")}
        label="Print & Pattern"
        placeholder="Enter print and pattern"
        withAsterisk
      />{" "}
      <TextInput
        {...form.getInputProps("bottomLength")}
        label="Length"
        placeholder="Enter length in inches"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("waist")}
        label="Waist"
        placeholder="Enter waist in inches"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("hip")}
        label="Hip"
        placeholder="Enter hip in inches"
        withAsterisk
      />
      <Select
        {...form.getInputProps("typeOfPantId")}
        label="Select pant fit"
        placeholder="select pant type"
        variant="filled"
        data={bottomTypeData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
      />
      <Select
        {...form.getInputProps("pantLengthId")}
        label="Select pant length"
        placeholder="select pant length"
        variant="filled"
        data={TypesOfLengthBottomData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
      />
      <Select
        {...form.getInputProps("pantPleatsId")}
        label="Select pant pleats"
        placeholder="select pant pleats"
        variant="filled"
        data={TypesOfPleatsData?.map((e) => ({
          value: e.id.toString(),
          label: e.name,
        }))}
      />
      <Radio.Group
        name="Belt loop"
        label="belt loop"
        withAsterisk
        variant="filled"
        onChange={handleRadioChange}
      >
        <Group mt="xs">
          <Radio value="True" label="Yes" />
          <Radio value="False" label="No" />
        </Group>
      </Radio.Group>
      <TextInput
        {...form.getInputProps("bottomPocket")}
        label="Pocket"
        placeholder="Enter pocket"
        withAsterisk
      />
    </div>
  );
}
