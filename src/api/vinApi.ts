import { API_BASE_URL } from "../constants/global.constants";

export const vinApi = {
  decodeVin: async (vin: string) => {
    const res = await fetch(`${API_BASE_URL}/vehicles/decodevin/${vin}?format=json`);
    const data = await res.json();
    return data.Results || [];
  },

  getAllVariables: async () => {
    const res = await fetch(`${API_BASE_URL}/vehicles/getvehiclevariablelist?format=json`);
    const data = await res.json();
    return data.Results || [];
  },
};
