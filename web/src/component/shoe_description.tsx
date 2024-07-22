import { TextInput, Textarea } from "@mantine/core";
import { InventoryRequestSchema } from "../models/inventory_request";
import { UseFormReturnType } from "@mantine/form";
import { ProductTypeName } from "../utils/common_utils";

export default function ShoesDescription({
  form,
  type,
}: {
  form: UseFormReturnType<InventoryRequestSchema>;
  type: string;
}) {
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("productDescription")}
        label="Special Feature"
        description="Enter special feature"
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
      />
      <TextInput
        {...form.getInputProps("weight")}
        label="Weight"
        placeholder="Enter weight"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("colorFamily")}
        label="Color family"
        placeholder="Enter color family"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("toeType")}
        label="Toe type"
        placeholder="Enter toe type"
        withAsterisk
        variant="filled"
      />
      {type != ProductTypeName.FootWear ? (
        <div>
          <TextInput
            {...form.getInputProps("soleMaterial")}
            label="Sole material"
            placeholder="Enter material"
            withAsterisk
            variant="filled"
          />
          <TextInput
            {...form.getInputProps("upperMaterial")}
            label="Upper material"
            placeholder="Enter upper material"
            withAsterisk
            variant="filled"
          />{" "}
          <TextInput
            {...form.getInputProps("closure")}
            label="Closure"
            placeholder="Enter closure"
            withAsterisk
            variant="filled"
          />
          <TextInput
            {...form.getInputProps("warrantyPeriod")}
            label="Warranty period"
            placeholder="Enter warranty period in month"
            withAsterisk
            variant="filled"
          />{" "}
        </div>
      ) : (
        <>
          <TextInput
            {...form.getInputProps("packageContains")}
            label="Package contains"
            placeholder="Enter package contains"
            withAsterisk
            variant="filled"
          />
        </>
      )}
    </div>
  );
}
