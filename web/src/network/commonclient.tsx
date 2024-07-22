import z from "zod";
import {
  countryResponseSchema,
  countrySateResponseSchema,
  productCatgoriesResponseSchema,
  productCatgoriesTypeResponseSchema,
  productTypeSizesResponseSchema,
} from "../pages/common_store/commonStore";
import apiClient from "./apiclient";
import notification from "./utils/notification";

const seasonalType = z.object({
  id: z.number(),
  seasonalName: z.string(),
});
type seasonalTypeSchema = z.infer<typeof seasonalType>;
class CountryApiProvider {
  async getCountry() {
    try {
      console.log("data");
      const response = await apiClient.get<countryResponseSchema[]>("/country");
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getCountryState(id: number) {
    try {
      const response = await apiClient.get<countrySateResponseSchema[]>(
        "/country/get",
        {
          params: { id: Number(id) },
        }
      );
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getProductCatagories() {
    try {
      const response = await apiClient.get<productCatgoriesResponseSchema>(
        "/common/catogries"
      );
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getProductType(id: number) {
    try {
      const response = await apiClient.get<
        productCatgoriesTypeResponseSchema[]
      >("/common/types", {
        params: { id: Number(id) },
      });
      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getProductTypeSizes(id: number) {
    try {
      const response = await apiClient.get<productTypeSizesResponseSchema[]>(
        "/common/sizes",
        {
          params: { id: Number(id) },
        }
      );
      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getProductTypeSeasons() {
    try {
      const response = await apiClient.get<seasonalTypeSchema[]>(
        "/common/seasons"
      );
      if (response.status == 200 || response.status == 201) {
        return response.data;
      }
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getNeckType() {
    try {
      const response = await apiClient.get("/common/neck");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getSleeveType() {
    try {
      const response = await apiClient.get("/common/sleeve");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async getBottomType() {
    try {
      const response = await apiClient.get("/common/bottomtype");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async kurtasLengthType() {
    try {
      const response = await apiClient.get("/common/kurtaslength");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async bottomTypesOfPleats() {
    try {
      const response = await apiClient.get("/common/bottompleats");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
  async TypesOfLengthBottom() {
    try {
      const response = await apiClient.get("/common/bottomlengthtype");
      return { status: true, response: response };
    } catch (error) {
      notification.showAxiosErrorAlert(error);
      return null;
    }
  }
}
const objOfCountry = new CountryApiProvider();
export default objOfCountry;
