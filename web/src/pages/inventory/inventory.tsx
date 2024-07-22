import { useEffect } from "react";
import inventoryStore from "./inventory_store";
import { Input } from "@mantine/core";
import { SearchNormal1 } from "iconsax-react";
import InventoryTable from "./inventory-table";
import AddInventory from "./add_inventory";
function GetUserInventory() {
  const { page, search, setPage, setSearch, reset, inventory } =
    inventoryStore();

  const handleSearch = (searchValue: string) => {
    if (search !== searchValue) {
      setSearch(searchValue);
      setPage(1);
    }
  };

  useEffect(() => {
    inventory();
  }, [page, search]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div>
      {" "}
      <div className="card px-6 pt-4 pb-6 space-y-4 mt-3 mx-3">
        <div className="flex flex-row justify-between items-center space-x-4 shadow-sm pb-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-black">Product</div>
          </div>
          <div className="flex justify-end space-x-5">
            <div className="p-1">
              <AddInventory />
            </div>
            <Input
              size="md"
              variant="filled"
              rightSectionPointerEvents="all"
              rightSection={
                <SearchNormal1 variant="Broken" size="20" color="blue" />
              }
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              className="w-72"
            ></Input>{" "}
          </div>
        </div>
        <div>
          <InventoryTable />
        </div>
      </div>
    </div>
  );
}
export default GetUserInventory;
