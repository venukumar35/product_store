import { create } from "zustand";

interface OfferType {
  price: number;
  calculaatePrice: () => void;
}

const offerStore = create<OfferType>((set, get) => ({
  price: 0,
  calculaatePrice: () => {},
}));

export default offerStore;
