/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, MultiSelect, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import inventoryStore from "../inventory/inventory_store";
import provider from "../../network/apiProvider";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { z } from "zod";
// Define the shape of data for adding invoice
type addInvoiceData = {
  productId: [];
  quantity: string;
  cost?: number;
  name: string;
};
// Validation schema for invoice creation
const createInvoiceValidation = z.object({
  name: z
    .string()
    .min(2, { message: "name should contain minimum 2 characters" })
    .max(25, {
      message: "name should not contain more than 25 characters",
    })
    .refine((val) => !/^ /.test(val) && !/ $/.test(val), {
      message: "name should not start or end with a space",
    }),
  quantity: z
    .string()
    .refine((value) => !/[a-z]/.test(value), {
      message: "Avoid small letters ",
    })
    .refine((value) => !/[A-Z]/.test(value), {
      message: "Avoid capital letters",
    })
    .refine((value) => !/[$&+,:=?@#|'<>.^*()%!-]/.test(value), {
      message: "Avoid special character",
    }),
  productId: z.array(z.string()).refine((value) => value.length >= 2, {
    message: "Select minimum one product",
  }),
});

function AddInvoice() {
  const [loading, setLoading] = useState(false); // State to track loading state of API requests
  const { inventoryData, inventory } = inventoryStore(); // Fetch inventory data from store
  const [openCost, setOpenCost] = useState(false); // State to manage opening of cost modal
  // Form handling with Mantine's useForm hook
  const allInvoiceForm: any = useForm<addInvoiceData>({
    initialValues: {
      name: "",
      productId: [],
      quantity: "",
      cost: 0,
    },
    validate: zodResolver(createInvoiceValidation),
    validateInputOnChange: true,
  });
  // Fetch inventory data on  mount
  useEffect(() => {
    inventory();
  }, []);
  // Function to open confirmation modal before submitting invoice
  const openModal = (values: typeof allInvoiceForm.values) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Check the invoice cost of the selected products.If is ok you can
          create a invoice.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        setLoading(true); // Set loading state to true during API request
        const data = {
          productId: values.productId,
          cost: Number(values.cost),
          name: values.name,
          quantity: +values.quantity,
        };
        // Call API to create invoice
        const response = await provider.CreateInvoice(data);

        if (response.status) {
          allInvoiceForm.reset(); // If successful, reset the form
        }
        setOpenCost(false); // Close cost modal after submission
        setLoading(false); // Set loading state to false after API request completes
      },
    });
  // Function to calculate invoice cost based on selected products
  const collectId = async (values: typeof allInvoiceForm.values) => {
    setLoading(true); // Set loading state to true during API request

    const data = {
      productId: values.productId,
      quantity: values.quantity,
    };
    // Call API to calculate invoice cost
    const response = await provider.CalculateInvoice(data);

    if (response.status) {
      allInvoiceForm.setFieldValue("cost", response.data.price); // Update form field with calculated cost
      setOpenCost(true); // Open cost modal after calculation
    }
    setLoading(false);
  };

  return (
    <div className="w-full  h-auto flex relative top-40 justify-center flex-row ">
      <form
        onSubmit={allInvoiceForm.onSubmit(openCost ? openModal : collectId)} // Submit form with appropriate handler based on openCost state
        className="flex flex-col w-1/2 space-y-5 border border-solid p-10 border-gray-200 shadow-sm"
      >
        <div className="flex ml-10">
          <TextInput
            {...allInvoiceForm.getInputProps("name")}
            label="Name"
            placeholder="Invoice name"
            withAsterisk
            className="w-1/2"
          />
        </div>
        <div className="flex flex-row justify-around ">
          <div className="flex max-w-60">
            <MultiSelect
              {...allInvoiceForm.getInputProps("productId")}
              label="Select product"
              placeholder="Pick product"
              withAsterisk
              data={inventoryData?.data?.map((val) => ({
                label: val.name,
                value: val.id.toString(),
              }))}
            />
          </div>
          <div className="flex h-16">
            <TextInput
              {...allInvoiceForm.getInputProps("quantity")}
              label="Quantity"
              placeholder="Enter quantity"
              withAsterisk
              className="w-10/12"
            />
          </div>
          <div className="mt-6">
            <Button type="submit" loading={loading} className="w-full">
              Calculate the price
            </Button>
          </div>
        </div>
        {openCost ? (
          <div className="flex flex-col">
            <div className="flex ml-14 font-extrabold text-black">
              <TextInput
                {...allInvoiceForm.getInputProps("cost")}
                label="Invoice cost"
                placeholder="Cost"
                withAsterisk
                disabled
              />
            </div>
            <div className="flex w-1/2 ml-14 mt-12">
              <Button type="submit" loading={loading} className="w-full">
                Submit
              </Button>
            </div>
          </div>
        ) : undefined}
      </form>
    </div>
  );
}

export default AddInvoice;
