import { create } from "zustand";

export const useTextStore = create((set) => ({
  sparqlText: "",
  setSPARQLText: (text) => set({ sparqlText: text }),
}));

export default useTextStore;
