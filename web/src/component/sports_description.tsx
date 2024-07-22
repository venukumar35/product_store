import { UseFormReturnType } from "@mantine/form";
import { InventoryRequestSchema } from "../models/inventory_request";
import { ProductTypeName } from "../utils/common_utils";
import BottomDescription from "./bottom_description";
import TopDescription from "./top_descriptiom";

export default function SportsDescription({
  form,
  type,
}: {
  form: UseFormReturnType<InventoryRequestSchema>;
  type: string;
}) {
  console.log(type, "type of the sports data");

  return (
    <div className="space-y-4 p-5">
      {type === ProductTypeName.SportsTShirts ? (
        <TopDescription form={form} />
      ) : type === ProductTypeName.ShortsTrackPants ||
        type === ProductTypeName.SportsShorts ? (
        <BottomDescription form={form} />
      ) : type === ProductTypeName.SportsTrackSuit ? (
        <div className="space-y-4">
          <div>
            <div>Track Top</div>
            <div>
              <TopDescription form={form} />
            </div>
          </div>
          <div>
            <div>Track Bottom</div>
            <div>
              <BottomDescription form={form} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
