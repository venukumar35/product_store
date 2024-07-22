import {
  UserCreationRequest,
  loginRequestinput,
} from "../models/login_request";
import apiClient from "./apiclient";
import {
  FindInventoryRequestSchema,
  InventoryUpdateRequestSchema,
} from "../models/inventory_request";
import { apiResponseSchema } from "../models/inventory_responsetype";
import notification from "./utils/notification";

class ApiProvider {
  async AddUser(input: UserCreationRequest) {
    try {
      const response = await apiClient.post("/user", input);
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: true };
      } else {
        notification.showAlertNotification(response.data.message, false);
        return { status: false };
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return { status: false };
    }
  }
  async Login(input: loginRequestinput) {
    try {
      const response = await apiClient.post("/auth/login", input);

      const message = response.data?.message ?? "Something went wrong";
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: response.status, response };
      } else {
        notification.showAlertNotification(message, false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }

  async GetInventory(input: FindInventoryRequestSchema) {
    try {
      const response = await apiClient.get<apiResponseSchema | null>(
        "/product/userproduct",
        {
          params: input,
        }
      );

      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response: response.data };
      } else {
        notification.showAlertNotification("Something went wrong", false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async AddInventory(input: any) {
    try {
      const response = await apiClient.post("/product/create", input);
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: true };
      } else {
        notification.showAlertNotification(response.data.message, false);
        return { status: false };
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return { status: false };
    }
  }
  async UpdateInventory(input: InventoryUpdateRequestSchema) {
    try {
      const data = {
        quantity: Number(input.quantity),
      };

      const response = await apiClient.patch(
        `/inventory/${Number(input.id)}`,
        data
      );
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: true };
      } else {
        notification.showAlertNotification(response.data.message, false);
        return { status: false };
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return { status: false };
    }
  }
  async CalculateInvoice(input: any) {
    try {
      const data = {
        productId: input.productId.map((e: number) => Number(e)),
        quantity: +input.quantity,
      };
      const response = await apiClient.post("/invoice", data);
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: true, data: response.data };
      } else {
        notification.showAlertNotification(response.data.message, false);
        return { status: false };
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return { status: false };
    }
  }

  async CreateInvoice(input: any) {
    try {
      const data = {
        productId: input.productId.map((e: number) => Number(e)),
        cost: +input.cost,
        quantity: +input.quantity,
        name: input.name,
      };
      const response = await apiClient.post("/invoice/create", data);
      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(response.data.message, true);
        return { status: true };
      } else {
        notification.showAlertNotification(response.data.message, false);
        return { status: false };
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return { status: false };
    }
  }
  async GetInvoice(input: FindInventoryRequestSchema) {
    try {
      const response = await apiClient.get<any | null>("/invoice/find", {
        params: input,
      });

      if (response.status == 200 || response.status == 201) {
        return { status: response.status, response };
      } else {
        notification.showAlertNotification("Some thing went wrong", false);
        return null;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async CalculateOfferPrice(input: any) {
    try {
      const response = await apiClient.post("/offer/calculate", { input });

      if (response.status == 200 || response.status == 201) {
        return response;
      } else {
        notification.showAlertNotification("Some thing went wrong", false);
        return null;
      }
    } catch (err) {
      notification.showAxiosErrorAlert(err);
      return null;
    }
  }
  async PromtionDays() {
    try {
      const response = await apiClient.get("/offer/promotion", {});
      if (response.status == 200 || response.status == 201) {
        return response;
      }
    } catch (err) {
      notification.showAxiosErrorAlert(err);
      return null;
    }
  }
  async CreateOffer(input: any) {
    try {
      const response = await apiClient.post("/offer/create", { input });

      if (response.status == 200 || response.status == 201) {
        notification.showAlertNotification(
          "Offer add for the product successfully",
          true
        );
      }
    } catch (err) {
      notification.showAxiosErrorAlert(err);
      return null;
    }
  }
}

const provider = new ApiProvider();

export default provider;
