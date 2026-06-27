import axios from "axios";

export const httpsService = axios.create({
  baseURL: "https://vpic.nhtsa.dot.gov/api/",
});
