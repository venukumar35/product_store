import provider from "../../network/apiProvider";
import { create } from "zustand";
import { apiResponseSchema } from "../../models/inventory_responsetype";
// Define the shape of the inventory store
interface InvntoryStore {
  page: number;
  search: string;
  inventoryData: apiResponseSchema | null;
  inventory: () => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  reset: () => void;
  loading: boolean;
}
// Creating the inventory store using Zustand's create function
const inventoryStore = create<InvntoryStore>((set, get) => ({
  page: 1,
  search: "",
  inventoryData: null,
  loading: true,
  inventory: async () => {
    try {
      const { page, search } = get(); // Destructure page and search from current state
      const data = {
        page: page,
        searchQuery: search,
      }; // Call API provider to get inventory data
      const result = await provider.GetInventory(data);
      // If API call is successful and data is not null, update inventoryData state
      if (result?.response != null) {
        set({ inventoryData: result.response });
      }
    } finally {
      set({ loading: false }); // Set loading state to false after API call completes
    }
  },
  // Function to set the current page number
  setPage: (page: number) => set(() => ({ page })),
  // Function to set the search query and reset page to 1
  setSearch: (search: string) => set(() => ({ page: 1, search })),
  // Function to reset page and search query to initial values
  reset: () => {
    set({
      page: 1,
      search: "",
    });
  },
}));
export default inventoryStore;
