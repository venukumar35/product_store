import { Group, Radio, Select, TextInput, Textarea } from "@mantine/core";
import CommonStore from "../pages/common_store/commonStore";
import { useEffect } from "react";
import { InventoryRequestSchema } from "../models/inventory_request";
import { UseFormReturnType } from "@mantine/form";
import { ProductTypeName } from "../utils/common_utils";
import BottomDescription from "./bottom_description";

export default function KurtasDescription({
  form,
  type,
}: {
  form: UseFormReturnType<InventoryRequestSchema>;
  type: string;
}) {
  const {
    neckTypeData,
    neckType,
    sleeveTypeData,
    sleeveType,
    kurtasLengthType,
    kurtasLengthData,
  } = CommonStore();

  const handleRadioChange = (value: string) => {
    form.setFieldValue("transparencyOfTheFabric", value === "True");
  };
  useEffect(() => {
    neckType();
    sleeveType();
    kurtasLengthType();
  }, []);
  return (
    <div className="space-y-4 p-5">
      {type != ProductTypeName.EthicBottom ? (
        <div>
          <Textarea
            {...form.getInputProps("productDescription")}
            label="Special Feature"
            placeholder="Enter special feature"
            withAsterisk
            variant="filled"
          />
          <Select
            {...form.getInputProps("length")}
            label="Select length"
            placeholder="select length"
            variant="filled"
            data={kurtasLengthData?.map((e) => ({
              value: e.id.toString(),
              label: e.name,
            }))}
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
            {...form.getInputProps("work")}
            label="Work"
            placeholder="Enter work"
            withAsterisk
            variant="filled"
          />
          <TextInput
            {...form.getInputProps("weight")}
            label="Weight"
            placeholder="Enter weight"
            withAsterisk
            variant="filled"
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
            {...form.getInputProps("pocket")}
            label="Pocket"
            placeholder="Enter pocket"
            withAsterisk
            variant="filled"
          />{" "}
          <Radio.Group
            name="transparencyOfTheFabric"
            label="Transparency fabric"
            withAsterisk
            onChange={handleRadioChange}
          >
            <Group mt="xs">
              <Radio value="True" label="Yes" />
              <Radio value="False" label="No" />
            </Group>
          </Radio.Group>
        </div>
      ) : (
        <></>
      )}

      {type === ProductTypeName.EthicSet ||
      type === ProductTypeName.EthicBottom ? (
        <div>
          <div className="">Ethic pant</div>
          <BottomDescription form={form} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
