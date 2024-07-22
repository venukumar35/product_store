import { ApiInvoiceResponseSchema } from "../../models/invoice_response";
import provider from "../../network/apiProvider";
import { create } from "zustand";
// Define the shape of the store
interface InvoiceStoreType {
  page: number;
  search: string;
  invoiceData: ApiInvoiceResponseSchema | null;
  loading: boolean;
  invoice: () => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}
// Creating the inventory store using Zustand's create function
const invoiceStore = create<InvoiceStoreType>((set, get) => ({
  page: 1,
  search: "",
  invoiceData: null,
  loading: true,
  invoice: async () => {
    try {
      const { page, search } = get(); // Destructure page and search from current state
      const data = {
        page: page,
        searchQuery: search,
      };
      // If API call is successful and data is not null, update invoice
      const result = await provider.GetInvoice(data);
      if (result?.response.data?.data != null) {
        set({ invoiceData: result.response.data }); // Update invoiceData in store if data is not null
      }
    } finally {
      set({ loading: false }); // Set loading state to false after API call completes
    }
  },
  setPage: (page: number) => set(() => ({ page })),
  setSearch: (search: string) => set(() => ({ page: 1, search })),
  reset: () => {
    set({
      page: 1,
      search: "",
    });
  },
}));
export default invoiceStore;
