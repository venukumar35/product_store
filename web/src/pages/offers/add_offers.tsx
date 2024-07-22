import { useEffect, useState } from "react";
import ModalComponent from "../../component/model";
import { AddCircle } from "iconsax-react";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox } from "@mantine/core";
import { Group, TextInput } from "@mantine/core";
import { Select } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
import { offerValidateSchema } from "../../validate_request/offer_validation";
import provider from "../../network/apiProvider";
import notification from "../../network/utils/notification";
import { inventoryColors } from "../../models/inventory_responsetype";
import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

type promotionDetailsType = {
  id: number;
  name: string;
};
export default function AddOffers({
  productId,
  productPrice,
  color,
}: {
  productId: number;
  productPrice: number;
  color: inventoryColors[];
}) {
  const [open, setOpen] = useState(false);
  const [calculateButton, setCalculateButton] = useState<boolean>(true);
  const [promotionDetails, setPromotionDetails] = useState<
    promotionDetailsType[]
  >([]);
  const [mapDays, setMapDays] = useState(new Map());
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const form = useForm({
    initialValues: {
      price: "",
      offerPercentage: "",
      offerPrice: "",
      quantity: "",
      offerQuantity: "",
      fromDate: "",
      toDate: "",
      fromTime: "",
      toTime: "",
      offerPromotionPeriodId: "",
    },
    validateInputOnChange: true,
    validate: (values) => {
      const isCalculated = calculateButton;
      const validateSchema = offerValidateSchema(isCalculated);
      const result = validateSchema.safeParse(values);

      if (result.success) {
        return {};
      } else {
        const errors = {};
        result.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        return errors;
      }
    },
  });

  const clearForm = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.currentTarget;

    setMapDays((days) => {
      const newMapDays = new Map(days);
      if (newMapDays.get(value)) {
        newMapDays.set(value, false);
      } else {
        newMapDays.set(value, true);
      }
      return newMapDays;
    });
  };

  const caluculateOfferPrice = async (value: typeof form.values) => {
    const validatePrice = form.validateField("price");
    const validateOfferPercentage = form.validateField("offerPercentage");
    const validateQuantity = form.validateField("quantity");
    const validateOfferQuantity = form.validateField("offerQuantity");

    const calculate =
      !validatePrice.hasError &&
      !validateOfferPercentage.hasError &&
      !validateOfferQuantity.hasError &&
      !validateQuantity.hasError;
    if (calculate) {
      try {
        const data = {
          productId: productId,
          percentage: +value.offerPercentage,
          price: value.price,
          offerQuantity: value.offerQuantity,
        };
        const response = await provider.CalculateOfferPrice(data);

        if (response?.status == 200 || response?.status == 201) {
          form.setFieldValue("offerPrice", response.data.toString());
          setCalculateButton(false);
        }
      } catch (err) {
        notification.showAxiosErrorAlert(err);
        return null;
      }
    } else {
      console.log("Errors:", form.errors);
    }
  };

  const promation = async () => {
    const promotionData = await provider.PromtionDays();
    if (promotionData?.status == 200 || promotionData?.status == 201) {
      setPromotionDetails([...promotionData.data]);
    }
  };

  const submit = (value: typeof form.values) => {
    const data = {
      productId: productId,
      offerPercntage: +value.offerPercentage,
      offerPrice: value.offerPrice,
      currentPrice: value.price,
      offerQuantity: value.offerQuantity,
      currentQuantity: value.quantity,
      fromDate: value.fromDate,
      toDate: value.toDate,
      fromTime: value.fromTime,
      toTime: value.toTime,
      days: mapDays,
    };
    console.log(data);
  };

  useEffect(() => {
    form.setFieldValue("price", productPrice.toString());
    const total = color.reduce((totalCount, color) => {
      const colorSizeTotal = color.colorSize.reduce(
        (sum, size) => sum + size.quantity,
        0
      );
      return totalCount + colorSizeTotal;
    }, 0);
    promation();
    form.setFieldValue("quantity", total.toString());
  }, [open]);
  return (
    <div>
      <ModalComponent
        title={"Add offers"}
        size={"60%"}
        onClose={clearForm}
        opened={open}
      >
        <form
          onSubmit={form.onSubmit(
            calculateButton ? caluculateOfferPrice : submit
          )}
        >
          <div className="space-y-3 p-3">
            <TextInput
              {...form.getInputProps("price")}
              label="Price"
              placeholder="Enter price"
              disabled
              variant="filled"
            />
            <TextInput
              {...form.getInputProps("offerPercentage")}
              label="Offer percentage"
              placeholder="Enter offer percentage"
              variant="filled"
            />
            <div className="flex flex-row space-x-5">
              <TextInput
                {...form.getInputProps("quantity")}
                label="Quantity"
                placeholder="Enter exist quantity"
                disabled
                className="font-semibold"
                variant="filled"
                style={{ width: "50%" }}
              />{" "}
              <TextInput
                {...form.getInputProps("offerQuantity")}
                label="Offer quantity"
                placeholder="Enter offer quantity"
                variant="filled"
                style={{ width: "50%" }}
              />
            </div>
            {calculateButton ? (
              <div className="pt-3">
                <Button variant="filled" type="submit">
                  Calculate offer price
                </Button>
              </div>
            ) : (
              <div className="space-y-3 p-3">
                <TextInput
                  {...form.getInputProps("offerPrice")}
                  label="Offer price"
                  placeholder="Enter offer price"
                  disabled
                  variant="filled"
                />
                <div className="flex flex-row space-x-10">
                  <DatePickerInput
                    {...form.getInputProps("fromDate")}
                    label="From date"
                    placeholder="Pick from date"
                    valueFormat="YYYY MMM DD"
                    minDate={new Date()}
                    variant="filled"
                    style={{ width: "50%" }}
                  />{" "}
                  <DatePickerInput
                    {...form.getInputProps("toDate")}
                    label="To date"
                    placeholder="Pick to date"
                    valueFormat="YYYY MMM DD"
                    minDate={new Date()}
                    variant="filled"
                    style={{ width: "50%" }}
                  />
                </div>
                <div className="flex flex-row space-x-10">
                  <TimeInput
                    {...form.getInputProps("fromTime")}
                    label="From time"
                    ref={ref}
                    rightSection={pickerControl}
                    variant="filled"
                    style={{ width: "50%" }}
                  />{" "}
                  <TimeInput
                    {...form.getInputProps("toTime")}
                    label="To time"
                    ref={ref}
                    rightSection={pickerControl}
                    variant="filled"
                    style={{ width: "50%" }}
                  />
                </div>
                <Checkbox.Group label="Offer days" withAsterisk>
                  <Group mt="xs">
                    <Checkbox
                      value="Monday"
                      label="Monday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Tuesday"
                      label="Tuesday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Wednesday"
                      label="Wednesday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Thursday"
                      label="Thursday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Friday"
                      label="Friday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Saturday"
                      label="Saturday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                    <Checkbox
                      value="Sunday"
                      label="Sunday"
                      color="green"
                      iconColor="dark"
                      onChange={handleCheckboxChange}
                    />
                  </Group>
                </Checkbox.Group>
                <div className="pt-2">
                  <Select
                    {...form.getInputProps("offerPromotionPeriodId")}
                    label="Select offer type"
                    placeholder="Pick value"
                    data={promotionDetails.map((ele) => ({
                      value: ele.id.toString(),
                      label: ele.name,
                    }))}
                    defaultValue="React"
                    clearable
                    variant="filled"
                  />
                </div>
                <div className="pt-2">
                  <Button
                    variant="filled"
                    type="submit"
                    style={{ width: "20%" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </ModalComponent>
      <AddCircle onClick={() => setOpen(true)} size="22" color="#555555" />;
    </div>
  );
}
