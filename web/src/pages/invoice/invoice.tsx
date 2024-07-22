import { Tabs } from "@mantine/core";
import AddInvoice from "./add_invoice";
import GetInvoiceTable from "./invoice_tl";
//Tabs setups
function Invoice() {
  return (
    <div>
      <Tabs color="" defaultValue="first" radius={"lg"}>
        <Tabs.List className="">
          <div className="flex w-full ml-8 space-x-5">
            <Tabs.Tab value="first">
              <p className="">Add invoice</p>
            </Tabs.Tab>

            <Tabs.Tab value="second">
              <p className="tracking-wider">All Invoice</p>
            </Tabs.Tab>
          </div>
        </Tabs.List>

        <Tabs.Panel value="first">
          <AddInvoice />
        </Tabs.Panel>

        <Tabs.Panel value="second">
          <GetInvoiceTable />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default Invoice;
