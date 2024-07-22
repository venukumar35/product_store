import { TextInput, Textarea } from "@mantine/core";

import { InventoryRequestSchema } from "../models/inventory_request";
import { useForm } from "@mantine/form";

interface formProps {
  form: ReturnType<typeof useForm<InventoryRequestSchema>>;
}

export default function WatchDescription({ form }: formProps) {
  return (
    <div className="space-y-4 p-5">
      <Textarea
        {...form.getInputProps("productDescription")}
        label="Special Feature"
        description="Enter special feature"
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
        {...form.getInputProps("model")}
        label="Model"
        placeholder="Enter model"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("dialColor")}
        label="Dail color"
        placeholder="Enter dail color"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("strapColor")}
        label="Strap color"
        placeholder="Enter strap color"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("dialShape")}
        label="Dail shape"
        placeholder="Enter dail shape"
        withAsterisk
        variant="filled"
      />
      <TextInput
        {...form.getInputProps("dialDiameter")}
        label="Dial diameter"
        placeholder="Enter dial diameter"
        withAsterisk
        variant="filled"
      />{" "}
      <TextInput
        {...form.getInputProps("warrantyPeriod")}
        label="Warranty period"
        placeholder="Enter warranty period"
        withAsterisk
        variant="filled"
      />{" "}
    </div>
  );
}
