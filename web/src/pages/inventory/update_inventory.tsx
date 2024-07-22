import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import ModalComponent from "../../component/model";
import { InventoryRequestSchema } from "../../models/inventory_request";
import { Edit } from "iconsax-react";
import provider from "../../network/apiProvider";
import inventoryStore from "./inventory_store";
type InventoryData = {
  inventoryData: {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    userId: number;
  };
};
function UpdateInventory({ inventoryData }: InventoryData) {
  const [loading, setLoading] = useState(false); // State to track loading state of API requests
  const [open, setOpen] = useState(false); // State to manage modal open/close
  const { inventory } = inventoryStore();
  const form = useForm<InventoryRequestSchema>({
    initialValues: {
      name: "",
      description: "",
      quantity: "",
      price: "",
    },
    validateInputOnChange: true,
  });
  // Function to initialize form data with inventoryData
  const initData = async () => {
    form.setFieldValue("name", inventoryData.name);
    form.setFieldValue("description", inventoryData.description);
    form.setFieldValue("quantity", inventoryData.quantity.toString());
    form.setFieldValue("price", inventoryData.price.toString());
  };
  // Function to handle form submission
  const onSubmit = async (value: typeof form.values) => {
    setLoading(true);
    const data = {
      id: inventoryData.id,
      quantity: value.quantity,
    };
    // Call API to update inventoryData
    const response = await provider.UpdateInventory(data);
    if (response) {
      clearForm(); // If update successful, clear the form and close modal
      inventory();
    }
    setLoading(false); // Set loading state to false after API call completes
  };

  function clearForm() {
    setOpen(false); // Close modal
    form.reset(); // Reset form fields to initial values
  }
  // Effect hook to initialize form data when modal opens
  useEffect(() => {
    if (open) initData(); // Initialize form data with current inventoryData
  }, [open]); // Run this effect when 'open' state changes
  return (
    <div>
      <ModalComponent
        title={"Update Product"}
        size={"50%"}
        onClose={clearForm}
        opened={open}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <TextInput
              {...form.getInputProps("name")}
              label="Name"
              placeholder="Enter name"
              variant="filled"
              withAsterisk
              disabled
              className="w-11/12 font-semibold"
            />
            <Textarea
              {...form.getInputProps("description")}
              label="Description"
              placeholder="Enter product description"
              autosize
              required
              mt="md"
              minRows={1}
              maxRows={4}
              disabled
              className="w-11/12 font-semibold"
            />
            <TextInput
              {...form.getInputProps("quantity")}
              label="Quantity"
              placeholder="Enter quantity"
              variant="filled"
              withAsterisk
              className="w-11/12 "
            />
            <TextInput
              {...form.getInputProps("price")}
              label="Price"
              placeholder="Enter price"
              variant="filled"
              withAsterisk
              disabled
              className="w-11/12  font-semibold"
            />
          </div>
          <div className="mt-8">
            <Button type="submit" loading={loading} className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </ModalComponent>
      <Button
        onClick={() => setOpen(true)}
        leftSection={<Edit size={14} />}
        variant="light"
        loading={loading}
        className="bg-blue-100 hover:text-black"
      >
        Update
      </Button>
    </div>
  );
}
export default UpdateInventory;
