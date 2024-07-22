import { Button, FileInput, NumberInput, TextInput } from "@mantine/core";
import { Plus, Trash } from "lucide-react";
import CommonStore from "../pages/common_store/commonStore";
interface ColorData {
  color: string;
  quantities: { [key: string]: any };
  images: File[];
}
interface formProps {
  colorsData: ColorData[];
  setColorsData: React.Dispatch<React.SetStateAction<ColorData[]>>;
}
export default function AddColors({ setColorsData, colorsData }: formProps) {
  const { productTypeSizesData } = CommonStore();
  const addColorFields = () => {
    setColorsData([...colorsData, { color: "", quantities: [], images: [] }]);
  };

  const removeColor = () => {
    if (colorsData.length > 1) {
      const newColorsData = colorsData.slice(0, -1);
      setColorsData(newColorsData);
    }
  };
  const handleInputChanges = (index: number, field, value, sizeId = null) => {
    const newColorsData = [...colorsData];
    if (newColorsData[index]) {
      if (sizeId !== null) {
        newColorsData[index].quantities[sizeId] = value;
      } else {
        newColorsData[index][field] = value;
      }
      setColorsData(newColorsData);
    }
  };

  const handleFileChange = (index: number, files) => {
    const newColorsData = [...colorsData];
    if (newColorsData[index]) {
      newColorsData[index].images = files;
      setColorsData(newColorsData);
    }
  };
  return (
    <div className="space-y-4 p-5">
      {colorsData.map((fields, index) => (
        <div key={index} className="space-y-4">
          <TextInput
            label="Color"
            description="Enter color"
            value={fields.color}
            variant="filled"
            onChange={(event) =>
              handleInputChanges(index, "color", event.target.value)
            }
            withAsterisk
          />
          <div className="flex flex-row space-x-3">
            {productTypeSizesData?.map((sizeData) => (
              <div key={sizeData.id}>
                <div className="ml-2">{sizeData.size}</div>
                <NumberInput
                  type="text"
                  placeholder="Enter quantity"
                  variant="filled"
                  value={fields.quantities[sizeData.id] || ""}
                  onChange={(value) =>
                    handleInputChanges(index, "quantity", value, sizeData.id)
                  }
                />
              </div>
            ))}
          </div>
          <FileInput
            value={fields.images}
            onChange={(files) => handleFileChange(index, files)}
            label="Upload images"
            placeholder="Upload images"
            variant="filled"
            multiple
          />
        </div>
      ))}
      <div className="flex justify-between p-1">
        <Button
          onClick={addColorFields}
          leftSection={<Plus size={16} />}
          variant="light"
          className="bg-blue-400 text-white"
        >
          Add Colors
        </Button>
        <Button
          color="red"
          onClick={() => removeColor()}
          leftSection={<Trash />}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
