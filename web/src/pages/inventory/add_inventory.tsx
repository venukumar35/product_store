import { useForm } from "@mantine/form";
import { TextInput, MultiSelect } from "@mantine/core";
import ModalComponent from "../../component/model";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CommonStore from "../common_store/commonStore";
import provider from "../../network/apiProvider";
import { InventoryRequestSchema } from "../../models/inventory_request";
import { Stepper, Button, Group } from "@mantine/core";
import TopDescription from "../../component/top_descriptiom";
import CommonDescription from "../../component/common_description";
import BottomDescription from "../../component/bottom_description";
import KurtasDescription from "../../component/kurtas_description";
import ShoesDescription from "../../component/shoe_description";
import WatchDescription from "../../component/watch_description";
import PerfumeDescription from "../../component/perfume_description";
import InnerDescription from "../../component/inner_description";
import { ProductCategory, ProductTypeName } from "../../utils/common_utils";
import SportsDescription from "../../component/sports_description";
import { getValidationSchema } from "../../validate_request/inventory_validation";
import Category from "../../component/category";
import AddColors from "../../component/addColors";
interface seasonType {
  id: number;
  seasonalName: string;
}

function AddInventory() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [seasons, setSeasons] = useState<seasonType[]>([]);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 5 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [colorsData, setColorsData] = useState([
    { color: "", quantities: [], images: [] },
  ]);
  const [categoryName, setCategoryName] = useState("");
  const [productTypeName, setProductTypeName] = useState("");
  const { productCatgories } = CommonStore();
  // Initialize the form with useForm hook and validating
  const form = useForm<InventoryRequestSchema>({
    initialValues: {
      productCatgoriesId: "",
      productTypeId: "",
      productSizeId: [],
      title: "",
      price: "",
      brandName: "",
      fit: "",
      care: "",
      seasons: [],
      occasion: "",
      origin: "",
      material: "",
      specialFeature: "",
      productDescription: "",
      weight: "",
      chest: "",
      shoulder: "",
      type: "",
      sleeveType: "",
      neckType: "",
      colorFamily: "",
      printAndPattern: "",
      pocket: "",
      length: "",
      bottomColorFamily: "",
      bottomLength: "",
      bottomPrintAndPattern: "",
      bottomProductDescription: "",
      bottomType: "",
      bottomWeight: "",
      bottomPocket: "",
      waist: "",
      hip: "",
      beltLoop: false,
      typeOfPantId: "",
      pantLengthId: "",
      pantPleatsId: "",
      work: "",
      transparencyOfTheFabric: false,
      closure: "",
      upperMaterial: "",
      toeType: "",
      dialColor: "",
      dialDiameter: "",
      model: "",
      strapColor: "",
      dialShape: "",
      warrantyPeriod: "",
      materialDescription: "",
      lookAndFeel: "",
      multiColor: false,
      packageContains: "",
      category: "",
      soleMaterial: "",
      productCategoryType: "",
      deliveryForMetroCitys: "",
      deliveryForOtherCitys: "",
      returns: "",
    },
    // Set up validation using Zod schema resolver
    validateInputOnChange: true,
    validate: (values) => {
      const category = values.category;
      const type = values.productCategoryType;
      const validationSchema = getValidationSchema(category, type);
      const validationResult = validationSchema.safeParse(values);
      if (validationResult.success) {
        return {};
      } else {
        const errors = {};
        validationResult.error.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        return errors;
      }
    },
  });
  // Function to clear form and close modal
  function clearForm() {
    setOpen(false);
    form.reset();
    setActive(0);
  }
  const onSubmit = async (values: typeof form.values) => {
    setLoading(true); // Set loading state to true
    const formData: any = new FormData();

    const imageData: string[] = [];

    colorsData.forEach((color) => {
      imageData.push(...color.images);
    });

    colorsData.forEach((colorData) => {
      colorData.images.forEach((image) => {
        formData.append("images", image);

        const imageName = image.name;
        // Append other fields as needed
        Object.entries(colorData.quantities).forEach(
          ([sizeId, quantityData]) => {
            formData.append(
              "quantities[]", // Ensure your backend expects 'quantities[]' as an array
              `${sizeId},${quantityData},${imageName},${colorData.color}`
            );
          }
        );
      });
    });

    values.seasons.forEach((item, index) => {
      formData.append(`seasons[${index}]`, item);
    });

    formData.append("productCatgoriesId", values.productCatgoriesId.toString());
    formData.append("productTypeId", values.productTypeId);
    formData.append("title", String(values.title));
    formData.append("brandName", values.brandName);
    formData.append("fit", values.fit);
    formData.append("care", values.care);
    formData.append("material", JSON.stringify(values.material));
    formData.append("origin", values.origin);
    formData.append("occasion", values.occasion);
    formData.append("specialFeature", values.specialFeature);
    formData.append("price", values.price);
    formData.append("deliveryForMetroCitys", values.deliveryForMetroCitys);
    formData.append("deliveryForOtherCitys", values.deliveryForOtherCitys);
    formData.append("returns", values.returns);

    if (
      values.category == ProductCategory.TopWear ||
      (values.category == ProductCategory.SportsWear &&
        (values.productCategoryType == ProductTypeName.SportsTShirts ||
          values.productCategoryType === ProductTypeName.SportsTrackSuit))
    ) {
      formData.append("productDescription", values.productDescription);
      formData.append("weight", values.weight);
      formData.append("chest", values.chest);
      formData.append("shoulder", values.shoulder);
      formData.append("colorFamily", values.colorFamily);
      formData.append("printAndPattern", values.printAndPattern);
      formData.append("pocket", values.pocket);
      formData.append("sleeveType", values.sleeveType);
      formData.append("neckType", values.neckType);
      formData.append("type", values.type);
      formData.append("length", values.length);
    }
    if (
      values.category == ProductCategory.BottomWear ||
      (values.category == ProductCategory.SportsWear &&
        (values.productCategoryType == ProductTypeName.ShortsTrackPants ||
          values.productCategoryType === ProductTypeName.SportsShorts ||
          values.productCategoryType === ProductTypeName.SportsTrackSuit)) ||
      (values.category == ProductCategory.EthnicWear &&
        (values.productCategoryType === ProductTypeName.EthicSet ||
          values.productCategoryType === ProductTypeName.EthicBottom))
    ) {
      formData.append(
        "bottomProductDescription",
        values.bottomProductDescription
      );
      formData.append("bottomWeight", values.bottomWeight);
      formData.append("bottomType", values.bottomType);
      formData.append("bottomColorFamily", values.bottomColorFamily);
      formData.append("bottomPrintAndPattern", values.bottomPrintAndPattern);
      formData.append("bottomPocket", values.bottomPocket);
      formData.append("bottomLength", values.bottomLength);
      formData.append("waist", values.waist);
      formData.append("hip", values.hip);
      formData.append("typeOfPantId", values.typeOfPantId);
      formData.append("pantLengthId", values.pantLengthId);
      formData.append("pantPleatsId", values.pantPleatsId);
      formData.append("beltLoop", values.beltLoop);
    }

    if (
      values.category == ProductCategory.EthnicWear &&
      (values.productCategoryType === ProductTypeName.EthicKurtas ||
        values.productCategoryType === ProductTypeName.EthicSet ||
        values.productCategoryType === ProductTypeName.EthicJackets)
    ) {
      formData.append("productDescription", values.productDescription);
      formData.append("sleeveType", values.sleeveType);
      formData.append("neckType", values.neckType);
      formData.append("weight", values.weight);
      formData.append("chest", values.chest);
      formData.append("shoulder", values.shoulder);
      formData.append("type", values.type);
      formData.append("colorFamily", values.colorFamily);
      formData.append("printAndPattern", values.printAndPattern);
      formData.append("pocket", values.pocket);
      formData.append("work", values.work);
      formData.append(
        "transparencyOfTheFabric",
        values.transparencyOfTheFabric
      );
      formData.append("length", values.length);
    }

    if (values.category == ProductCategory.Footwear) {
      formData.append("productDescription", values.productDescription);
      formData.append("printAndPattern", values.printAndPattern);
      formData.append("type", values.type);
      formData.append("length", values.length);

      formData.append("toeType", values.toeType);
      formData.append("weight", values.weight);
      formData.append("colorFamily", values.colorFamily);

      if (values.productCategoryType != ProductTypeName.FootWear) {
        formData.append("soleMaterial", values.soleMaterial);
        formData.append("upperMaterial", values.upperMaterial);
        formData.append("closure", values.closure);
        formData.append("warrantyPeriod", values.warrantyPeriod);
      } else {
        formData.append("packageContains", values.packageContains);
      }
    }
    if (values.category == ProductCategory.Watches) {
      formData.append("productDescription", values.productDescription);
      formData.append("type", values.type);
      formData.append("weight", values.weight);
      formData.append("colorFamily", values.colorFamily);
      formData.append("printAndPattern", values.printAndPattern);
      formData.append("model", values.model);
      formData.append("dialColor", values.dialColor);
      formData.append("strapColor", values.strapColor);
      formData.append("dialShape", values.dialShape);
      formData.append("dialDiameter", values.dialDiameter);
      formData.append("warrantyPeriod", values.warrantyPeriod);
    }
    if (values.category == ProductCategory.Fragrances) {
      formData.append("productDescription", values.productDescription);
      formData.append("materialDescription", values.materialDescription);
      formData.append("weight", values.weight);
      formData.append("type", values.type);
    }
    if (values.category == ProductCategory.Innerwear) {
      formData.append("productDescription", values.productDescription);
      formData.append("weight", values.weight);
      formData.append("waist", values.waist);
      formData.append("length", values.length);
      formData.append("colorFamily", values.colorFamily);
      formData.append("packageContains", values.packageContains);
      formData.append("lookAndFeel", values.lookAndFeel);
      formData.append("printAndPattern", values.printAndPattern);
      formData.append("multiColor", values.multiColor);
      formData.append("type", values.type);
      if (values.productCategoryType === ProductTypeName.InnerWears) {
        formData.append("sleeveType", values.sleeveType);
        formData.append("neckType", values.neckType);
      }
    }
    //AS like it take a data
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    const response = await provider.AddInventory(formData);
    if (response) {
      // setColorsData([{ color: "", quantities: [], images: [] }]);
      // clearForm(); // Clear form and close modal on successful response
    }
    setLoading(false);
  };

  const haveNextStep = async () => {
    if (active == 0) {
      const data = form.validateField("productCatgoriesId");
      const data2 = form.validateField("productTypeId");
      const titleValidation = form.validateField("title");
      if (!data.hasError && !data2.hasError && !titleValidation.hasError) {
        nextStep();
      } else {
        console.log("Errors:", form.errors);
      }
    }

    if (active == 1) {
      nextStep();
    }
    if (active == 2) {
      const brandNameValidation = form.validateField("brandName");
      const materailValidation = form.validateField("material");
      const careValidation = form.validateField("care");
      const fitValidation = form.validateField("fit");
      const originValidation = form.validateField("origin");
      const occasionValidation = form.validateField("occasion");
      const specicalFeatureValidation = form.validateField("specialFeature");
      if (
        !brandNameValidation.hasError &&
        !materailValidation.hasError &&
        !careValidation.hasError &&
        !fitValidation.hasError &&
        !originValidation.hasError &&
        !occasionValidation.hasError &&
        !specicalFeatureValidation.hasError
      ) {
        nextStep();
      } else {
        console.log("Errors:", form.errors);
      }
    }

    if (active == 3) {
      const productDescriptionValidation =
        form.validateField("productDescription");
      const neckTypeValidation = form.validateField("neckType");
      const sleeveTypeValidation = form.validateField("sleeveType");
      const weightTypeValidation = form.validateField("weight");
      const chestTypeValidation = form.validateField("chest");
      const shoulderTypeValidation = form.validateField("shoulder");
      const typeValidation = form.validateField("type");
      const colorFamilyValidation = form.validateField("colorFamily");
      const printAndPatternValidation = form.validateField("printAndPattern");
      const pocketValidation = form.validateField("pocket");
      const lengthValidation = form.validateField("length");
      const waistTypeValidation = form.validateField("waist");
      const hipTypeValidation = form.validateField("hip");
      const pantTypeValidation = form.validateField("typeOfPantId");
      const pantLengthTypeValidation = form.validateField("pantLengthId");
      const pantPleatsTypeValidation = form.validateField("pantPleatsId");
      const beltLoopValidation = form.validateField("beltLoop");
      const workValidation = form.validateField("work");
      const transFabricValidation = form.validateField(
        "transparencyOfTheFabric"
      );
      const shoeMaterialValidation = form.validateField("shoeMaterial");
      const upperMaterialValidation = form.validateField("upperMaterial");
      const closureValidation = form.validateField("closure");
      const toeTypeValidation = form.validateField("toeType");
      const modelValidation = form.validateField("model");
      const dailColorValidation = form.validateField("dialColor");
      const dailShapeValidation = form.validateField("dialShape");
      const strapColorValidation = form.validateField("strapColor");
      const dailDaimeterValidation = form.validateField("dialDiameter");
      const warrantyValidation = form.validateField("warrantyPeriod");
      const materDescValidation = form.validateField("materialDescription");
      const packageValidation = form.validateField("packageContains");
      const lookAndFeelValidation = form.validateField("lookAndFeel");

      const bottomLengthValidation = form.validateField("bottomLength");
      const bottomProductDescriptionValidation = form.validateField(
        "bottomProductDescription"
      );
      const bottomWeightValidation = form.validateField("bottomWeight");
      const bottomTypeValidation = form.validateField("bottomType");
      const bottomPrintAndPatternValidation = form.validateField(
        "bottomPrintAndPattern"
      );
      const bottomColorFamilyValidation =
        form.validateField("bottomColorFamily");
      const bottomPocketValidation = form.validateField("bottomPocket");

      const common =
        !productDescriptionValidation.hasError &&
        !weightTypeValidation.hasError &&
        !typeValidation.hasError &&
        !colorFamilyValidation.hasError &&
        !printAndPatternValidation.hasError &&
        !lengthValidation.hasError;
      const commonBottom =
        !bottomLengthValidation.hasError &&
        !bottomProductDescriptionValidation.hasError &&
        !bottomWeightValidation.hasError &&
        !bottomTypeValidation.hasError &&
        !bottomPrintAndPatternValidation.hasError &&
        !bottomColorFamilyValidation.hasError &&
        !bottomPocketValidation.hasError;
      const top =
        common &&
        !neckTypeValidation.hasError &&
        !sleeveTypeValidation.hasError &&
        !chestTypeValidation.hasError &&
        !shoulderTypeValidation.hasError &&
        !pocketValidation.hasError;
      const bottom =
        commonBottom &&
        !waistTypeValidation.hasError &&
        !hipTypeValidation.hasError &&
        !pantTypeValidation.hasError &&
        !pantLengthTypeValidation.hasError &&
        !pantPleatsTypeValidation.hasError &&
        !beltLoopValidation.hasError;
      const kurtas =
        top && !workValidation.hasError && !transFabricValidation.hasError;
      const footwear =
        !shoeMaterialValidation.hasError &&
        common &&
        !upperMaterialValidation.hasError &&
        !closureValidation.hasError &&
        !toeTypeValidation.hasError &&
        !warrantyValidation.hasError &&
        !lengthValidation.hasError;

      const watches =
        common &&
        !modelValidation.hasError &&
        !dailColorValidation.hasError &&
        !dailShapeValidation.hasError &&
        !strapColorValidation.hasError &&
        !dailDaimeterValidation.hasError &&
        !warrantyValidation.hasError;
      const perfume =
        !materDescValidation.hasError &&
        !productDescriptionValidation.hasError &&
        !weightTypeValidation.hasError &&
        !typeValidation.hasError;
      const inner =
        common &&
        !waistTypeValidation.hasError &&
        !packageValidation.hasError &&
        !lookAndFeelValidation.hasError;

      if (categoryName === ProductCategory.TopWear) {
        if (top) {
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }
      if (categoryName === ProductCategory.BottomWear) {
        if (bottom && commonBottom) {
          console.log("enter into bottom");
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }
      if (categoryName === ProductCategory.EthnicWear) {
        if (
          kurtas &&
          ProductTypeName.EthicSet != productTypeName &&
          ProductTypeName.EthicBottom != productTypeName
        ) {
          console.log("enter into ethnic");
          nextStep();
        } else if (ProductTypeName.EthicSet == productTypeName) {
          if (kurtas && bottom) {
            nextStep();
          } else {
            console.log("Errors:", form.errors);
          }
        } else if (ProductTypeName.EthicBottom == productTypeName) {
          if (bottom && commonBottom) {
            nextStep();
          } else {
            console.log("Errors:", form.errors);
          }
        }
      }
      if (categoryName === ProductCategory.SportsWear) {
        if (ProductTypeName.SportsTShirts == productTypeName && top) {
          nextStep();
        } else if (
          (ProductTypeName.ShortsTrackPants == productTypeName ||
            ProductTypeName.SportsShorts == productTypeName) &&
          bottom
        ) {
          nextStep();
        } else if (
          ProductTypeName.SportsTrackSuit == productTypeName &&
          bottom
        ) {
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }

      if (categoryName === ProductCategory.Footwear) {
        if (footwear && ProductTypeName.FootWear != productTypeName) {
          nextStep();
        } else if (ProductTypeName.FootWear == productTypeName) {
          if (
            !toeTypeValidation.hasError &&
            !packageValidation.hasError &&
            !lengthValidation.hasError &&
            common
          ) {
            console.log("data ");
            nextStep();
          }
        } else {
          console.log("Errors:", form.errors);
        }
      }
      if (categoryName === ProductCategory.Watches) {
        if (watches) {
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }
      if (categoryName === ProductCategory.Fragrances) {
        if (perfume) {
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }
      if (categoryName === ProductCategory.Innerwear) {
        if (
          inner &&
          ProductTypeName.InnerWears == productTypeName &&
          !neckTypeValidation.hasError &&
          !sleeveTypeValidation.hasError
        ) {
          nextStep();
        } else if (inner && ProductTypeName.InnerWears != productTypeName) {
          nextStep();
        } else {
          console.log("Errors:", form.errors);
        }
      }
    }

    if (active == 4) {
      const result = form.validate();

      if (!result.hasErrors) {
        nextStep();
      }
    }
  };

  useEffect(() => {
    productCatgories();
  }, []);
  return (
    <>
      <ModalComponent
        title={"Add Product"}
        size={"80%"}
        onClose={clearForm}
        opened={open}
      >
        <div>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step label="First step">
                <div>
                  <Category
                    form={form}
                    setCategoryName={setCategoryName}
                    setProductTypeName={setProductTypeName}
                    setSeasons={setSeasons}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step label="Second step">
                <div>
                  <AddColors
                    setColorsData={setColorsData}
                    colorsData={colorsData}
                  />
                </div>
              </Stepper.Step>
              <Stepper.Step label="Third step">
                <div>
                  <CommonDescription form={form} />
                </div>
              </Stepper.Step>
              <Stepper.Step label="Fourth step">
                <div>
                  {categoryName === ProductCategory.TopWear ? (
                    <TopDescription form={form} />
                  ) : categoryName === ProductCategory.BottomWear ? (
                    <BottomDescription form={form} />
                  ) : categoryName === ProductCategory.EthnicWear ? (
                    <KurtasDescription form={form} type={productTypeName} />
                  ) : categoryName === ProductCategory.Footwear ? (
                    <ShoesDescription form={form} type={productTypeName} />
                  ) : categoryName === ProductCategory.Watches ? (
                    <WatchDescription form={form} />
                  ) : categoryName === ProductCategory.Fragrances ? (
                    <PerfumeDescription form={form} />
                  ) : categoryName === ProductCategory.Innerwear ? (
                    <InnerDescription form={form} type={productTypeName} />
                  ) : categoryName === ProductCategory.SportsWear ? (
                    <SportsDescription form={form} type={productTypeName} />
                  ) : (
                    <></>
                  )}
                </div>
              </Stepper.Step>

              <Stepper.Step label="Final step">
                <div>
                  <TextInput
                    {...form.getInputProps("price")}
                    label="Price"
                    placeholder="Enter price"
                    withAsterisk
                    variant="filled"
                  />
                  <MultiSelect
                    {...form.getInputProps("seasons")}
                    label="Seasonal"
                    placeholder="Select seasonal"
                    variant="filled"
                    data={seasons.map((e) => ({
                      label: e.seasonalName,
                      value: e.id.toString(),
                    }))}
                  />
                  <TextInput
                    {...form.getInputProps("deliveryForMetroCitys")}
                    label="Meto city delivery"
                    placeholder="Enter delivery days"
                    withAsterisk
                    variant="filled"
                  />
                  <TextInput
                    {...form.getInputProps("deliveryForOtherCitys")}
                    label="Other city delivery"
                    placeholder="Enter delivery days"
                    withAsterisk
                    variant="filled"
                  />{" "}
                  <TextInput
                    {...form.getInputProps("returns")}
                    label="returns"
                    placeholder="Enter returns days"
                    withAsterisk
                    variant="filled"
                  />
                </div>
              </Stepper.Step>
              <Stepper.Completed>
                <div>Completed, click back button to get to previous step</div>
              </Stepper.Completed>
            </Stepper>
            <Group justify="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              {active < 5 ? (
                <Button onClick={haveNextStep}>Next</Button>
              ) : (
                <Button loading={loading} type="submit">
                  Create
                </Button>
              )}
            </Group>
          </form>
        </div>
      </ModalComponent>
      <Button
        onClick={() => setOpen(true)}
        leftSection={<Plus size={16} />}
        variant="light"
        className="bg-blue-400 text-white"
      >
        Add Product
      </Button>
    </>
  );
}

export default AddInventory;
