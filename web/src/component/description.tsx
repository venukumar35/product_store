import { Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { inventoryDescription } from "../models/inventory_responsetype";
import { Book } from "iconsax-react";
import { useEffect, useState } from "react";
import {
  TopProductionDescription,
  BottomProductionDescription,
  KurtasProductDescription,
  ShoesProductDescription,
  InnerProductDescription,
  WatchesProductDescription,
  PerfumesProductDescription,
} from "./productDescription";
import { ProductCategory } from "../utils/common_utils";

export default function Description({
  description,
  title,
  category,
}: {
  description: inventoryDescription[];
  title: string;
  category: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"50%"}
        title={
          <div className="inline-flex space-x-2">
            <div className="font-bold text-2xl"> Title : </div>
            <div className="mt-1 text-lg">{title}</div>
          </div>
        }
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <div className="p-4 mb-3 bg-slate-100 rounded-lg">
          {description &&
            description.map((e, index) => (
              <div key={index} className="flex flex-col space-y-3 ">
                <div className="inline-flex space-x-2">
                  <label>brand name :</label>
                  <div className="font-light">{e.brandName}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>materail :</label>
                  <div className="font-light">{e.materail}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>care :</label>
                  <div className="font-light">{e.care}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>fit :</label>
                  <div className="font-light">{e.fit}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>origin :</label>
                  <div className="font-light">{e.origin}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>occasion :</label>
                  <div className="font-light">{e.occasion}</div>
                </div>
                <div className="inline-flex space-x-2">
                  <label>special feature :</label>
                  <div className="font-light">{e.specialFeature}</div>
                </div>
                <div>
                  {e.topDescription.length > 0 &&
                  category == ProductCategory.TopWear ? (
                    <div>
                      <TopProductionDescription topdes={e.topDescription} />
                    </div>
                  ) : e.pantDescription.length > 0 &&
                    category == ProductCategory.BottomWear ? (
                    <BottomProductionDescription
                      bottomDes={e.pantDescription}
                    />
                  ) : e.kurtasDescription.length > 0 &&
                    category == ProductCategory.EthnicWear ? (
                    <KurtasProductDescription kurtasDes={e.kurtasDescription} />
                  ) : e.shoesDescription.length > 0 &&
                    category == ProductCategory.Footwear ? (
                    <ShoesProductDescription shoesDes={e.shoesDescription} />
                  ) : e.innerDescription.length > 0 &&
                    category == ProductCategory.Innerwear ? (
                    <InnerProductDescription innerDes={e.innerDescription} />
                  ) : e.watchesDescription.length > 0 &&
                    category == ProductCategory.Watches ? (
                    <WatchesProductDescription
                      watchesDes={e.watchesDescription}
                    />
                  ) : e.perfumesDescription.length > 0 &&
                    category == ProductCategory.Fragrances ? (
                    <PerfumesProductDescription
                      perfumesDes={e.perfumesDescription}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Modal>
      <Book size="18" color="#555555" onClick={open} />
    </>
  );
}
