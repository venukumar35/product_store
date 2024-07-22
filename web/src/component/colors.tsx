import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { inventoryColors } from "../models/inventory_responsetype";
import { Colorfilter } from "iconsax-react";
export default function Colors({
  colors,
  title,
}: {
  colors: inventoryColors[];
  title: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"40%"}
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
          {colors &&
            colors.map((e, index) => (
              <div key={index} className="flex flex-col items-center mb-4">
                <div
                  className="p-3 rounded"
                  style={{ backgroundColor: `${e.colors}` }}
                ></div>
                <div>{e.colors}</div>
              </div>
            ))}
        </div>
      </Modal>
      <Colorfilter size="20" color="#555555" onClick={open} />
    </>
  );
}
