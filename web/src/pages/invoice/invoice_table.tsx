import invoiceStore from "./invoice_store";
import { InvoiceSchema } from "../../models/invoice_response";
import Table from "../../component/table";

function InvoiceTable() {
  const { setPage, page, invoiceData } = invoiceStore();
  const onPageChanged = (page: number) => {
    setPage(page);
  };

  return (
    <Table
      columns={[
        "S.No",
        "Name",
        "Invoice quantity",
        "Cost",
        "CreatedAt",
        "Total Product",
      ]}
      from={invoiceData?.from ?? 0}
      to={invoiceData?.to ?? 0}
      total={invoiceData?.total ?? 0}
      totalPages={invoiceData?.totalPages ?? 0}
      currentPage={page}
      onPageChanged={onPageChanged}
    >
      {invoiceData?.data.map((element: InvoiceSchema, index: number) => (
        <tr
          key={index}
          className="border border-solid border-gray-300 border-x-0"
        >
          {" "}
          <td className="table-body">{index + (invoiceData?.from ?? 0)}</td>
          <td className="table-body-active ">{element.name ?? "None"}</td>
          <td className="table-body-active ">
            {element?.invoiceQuantity ?? "None"}
          </td>
          <td className="table-body-active ">
            {element?.cost.totalCost ?? "None"}
          </td>
          <td className="table-body-active ">{element?.createdAt ?? "None"}</td>
          <td className="table-body-active ">
            {element?.invoiceProducts.length ?? "None"}
          </td>
        </tr>
      ))}
    </Table>
  );
}
export default InvoiceTable;
