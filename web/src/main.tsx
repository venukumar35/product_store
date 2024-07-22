import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import MainPage from "./pages/main.page";
import GetUserInventory from "./pages/inventory/inventory";
import "./index.css";
import Invoice from "./pages/invoice/invoice";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/" element={<MainPage />}>
        <Route path="/inventory" element={<GetUserInventory />} />
        <Route path="/invoice" element={<Invoice />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={route} />
);
