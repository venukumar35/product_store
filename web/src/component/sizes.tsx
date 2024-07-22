import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { TbHorseshoe } from "react-icons/tb";
import { SlSizeActual } from "react-icons/sl";
import { inventorySize } from "../models/inventory_responsetype";
export default function Sizes({
  size,
  title,
}: {
  size: inventorySize[];
  title: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="inline-flex space-x-2">
            <div className="font-bold text-2xl"> Title : </div>
            <div className="mt-1 text-lg">{title}</div>
          </div>
        }
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <div className="p-1 mb-3">
          {size &&
            size.map((e, index) => (
              <div key={index} className="flex flex-col space-y-3">
                {e.colorSize.map((size, index) => (
                  <div key={index} className="flex items-center space-x-7">
                    <div className="h-5 flex items-center justify-center">
                      <TbHorseshoe />
                    </div>
                    <div className="font-light">Size</div>
                    <div>{size.productTypeSize.size}</div>
                    <div className="font-light">Quantity</div>
                    <div>{size.quantity}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </Modal>
      <SlSizeActual onClick={open} size={15} />
    </>
  );
}
