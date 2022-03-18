import axios from "axios";

const vehiclesApi = axios.create({
  baseURL: "http://localhost:3000",
});

export default vehiclesApi;
