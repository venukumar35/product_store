import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { InventoryRequestSchema } from "../models/inventory_request";

interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
}
export default function PerfumeDescription({ form }: formProps) {
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("productDescription")}
        label="Special Feature"
        description="Enter special feature"
        withAsterisk
        variant="filled"
      />
      <Textarea
        {...form.getInputProps("materialDescription")}
        label="Material description"
        description="Enter material description"
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
        {...form.getInputProps("type")}
        label="Type"
        placeholder="Enter type"
        withAsterisk
        variant="filled"
      />{" "}
    </div>
  );
}
