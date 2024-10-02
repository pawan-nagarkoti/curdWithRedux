import axios from "axios";
import { apiUrl } from "./constant";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: apiUrl,
});

// Define common API methods
const _get = (url, config = {}) => apiClient.get(url, config);
export { _get };
