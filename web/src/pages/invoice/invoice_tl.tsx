import { Input } from "@mantine/core";
import { SearchNormal1 } from "iconsax-react";
import { useEffect } from "react";
import invoiceStore from "./invoice_store";
import InvoiceTable from "./invoice_table";

function GetInvoiceTable() {
  const { page, search, setPage, setSearch, reset, invoice } = invoiceStore();

  const handleSearch = (searchValue: string) => {
    if (search !== searchValue) {
      setSearch(searchValue);
      setPage(1);
    }
  };

  useEffect(() => {
    invoice();
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
            <div className="text-2xl font-bold text-black">Invoice</div>
          </div>
          <div className="flex justify-end space-x-5">
            <Input
              size="md"
              radius={"md"}
              variant="filled"
              rightSectionPointerEvents="all"
              rightSection={
                <SearchNormal1 variant="Broken" size="20" color="blue" />
              }
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              className="w-72 border border-solid border-gray-400 focus:border-blue-500"
            ></Input>{" "}
          </div>
        </div>
        <div>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
}
export default GetInvoiceTable;
