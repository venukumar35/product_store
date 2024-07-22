import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { InventoryRequestSchema } from "../models/inventory_request";

interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
}
export default function CommonDescription({ form }: formProps) {
  return (
    <div className="space-y-4 p-5">
      <TextInput
        {...form.getInputProps("brandName")}
        label="Brand Name"
        placeholder="Enter brand name"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("origin")}
        label="Origin"
        placeholder="Enter origin"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("material")}
        label="Materail"
        placeholder="Enter materail"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("fit")}
        label="Fit"
        placeholder="Enter fit"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("occasion")}
        label="Occasion"
        placeholder="Enter occasion"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("care")}
        label="Care"
        placeholder="Enter care"
        withAsterisk
        variant="filled"
      />
      <Textarea
        {...form.getInputProps("specialFeature")}
        label="Special Feature"
        placeholder="Enter special feature"
        withAsterisk
        variant="filled"
      />
    </div>
  );
}
