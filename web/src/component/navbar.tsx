import { NavLink } from "react-router-dom";
import { Divider, Tooltip } from "@mantine/core";
import { SiMaterialformkdocs } from "react-icons/si";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function Sidenav() {
  return (
    <div className="flex fixed flex-col w-[95px] h-screen top-0 bottom-0 left-0 bg-blue-200 z-50 shadow-soft">
      <div className="flex justify-center p-1.5 w-full">
        <div className="flex justify-center items-center text-white p-2 rounded-lg font-extrabold text-xl tracking-wider  no-underline active:scale-95">
          Stock
        </div>
      </div>
      <Divider className="mx-2 border border-black" />
      <div className="grow w-full flex flex-col items-center space-y-4 py-2 mt-3">
        <Tooltip label="Product" position="right" offset={4}>
          <NavLink className="mini-nav-link" to={"/inventory"}>
            <SiMaterialformkdocs size={20} />
            <div className="font-bold text-sm">Product</div>
          </NavLink>
        </Tooltip>

        <Tooltip label="Invoice" position="right" offset={4}>
          <NavLink className="mini-nav-link" to={"/invoice"}>
            <FaMoneyBillTrendUp size={20} />
            <div className="font-semibold text-sm">Invoice</div>
          </NavLink>
        </Tooltip>
      </div>
    </div>
  );
}
