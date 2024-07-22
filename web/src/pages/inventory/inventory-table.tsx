import inventoryStore from "./inventory_store";
import Table from "../../component/table";
import { inventorySchema } from "../../models/inventory_responsetype";
import Description from "../../component/description";
import Colors from "../../component/colors";
import Sizes from "../../component/sizes";
import { Images } from "../../component/images";
import { AddCircle, Edit } from "iconsax-react";
import AddOffers from "../offers/add_offers";

function InventoryTable() {
  //Destructing the inventoryStore
  const { setPage, page, inventoryData } = inventoryStore();

  const onPageChanged = (page: number) => {
    setPage(page);
  };

  return (
    <Table
      isLoading={false}
      columns={[
        "S.No",
        "Title",
        "Category",
        "description",
        "price",
        "total quantity",
        "description",
        "color",
        "size",
        "image",
        "update",
        "add offer",
      ]}
      from={inventoryData?.from ?? 0}
      to={inventoryData?.to ?? 0}
      total={inventoryData?.total ?? 0}
      totalPages={inventoryData?.totalPages ?? 0}
      currentPage={page}
      onPageChanged={onPageChanged}
    >
      {inventoryData?.data?.map((element: inventorySchema, index: number) => (
        <tr
          key={index}
          className="border border-solid border-gray-300 border-x-0"
        >
          <td className="table-body">{index + (inventoryData?.from ?? 0)}</td>
          <td className="table-body-active ">{element?.title ?? "None"}</td>
          <td className="table-body">
            {element.productType.ProductCategory.name ?? "None"}
          </td>
          <td className="table-body">
            {element.productType.itemsName ?? "None"}
          </td>
          <td className="table-body">{element.price ?? "None"}</td>
          <td className="table-body">
            {element.color.reduce((totalCount, color) => {
              const colorSizeTotal = color.colorSize.reduce(
                (sum, size) => sum + size.quantity,
                0
              );
              return totalCount + colorSizeTotal;
            }, 0) ?? "None"}
          </td>
          <td className="table-body">
            <Description
              description={element?.commonDescription}
              title={element.title}
              category={element.productType.ProductCategory.name}
            />
          </td>
          <td className="table-body" key={index}>
            {element.color && element.color.length > 0 ? (
              <Colors colors={element.color} title={element.title} />
            ) : (
              "None"
            )}
          </td>
          <td className="table-body" key={index}>
            {element.color && element.color.length > 0 ? (
              <Sizes size={element.color} title={element.title} />
            ) : (
              "None"
            )}
          </td>
          <td className="table-body">
            {" "}
            <Images images={element.color} />
          </td>
          <td className="table-body">
            <Edit size="20" color="#555555" />
          </td>
          <td className="table-body">
            <AddOffers
              productId={element.id}
              productPrice={element.price}
              color={element.color}
            />
          </td>
        </tr>
      ))}
    </Table>
  );
}
export default InventoryTable;
