import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { inventoryColors } from "../models/inventory_responsetype";
import { Image } from "iconsax-react";
export function Images({ images }: { images: inventoryColors[] }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={"75%"}
      >
        <div>
          {images.map((e, index) => (
            <div key={`${index}`}>
              {e.productImages.map((img) => (
                <div className="p-2">
                  <img
                    src={`http://192.168.1.123:3000/api/task/${img?.imageUrl}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
      <div>
        <Image onClick={open} size="22" color="#555555" />
      </div>
    </div>
  );
}
