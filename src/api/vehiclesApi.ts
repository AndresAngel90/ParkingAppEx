import axios from "axios";
import { ParkVehicleDto } from "~/interfaces/vehiclesInterfaces";

const vehiclesApi = axios.create({
  baseURL: "http://localhost:3000",
});

export async function parkVehcle(dto: ParkVehicleDto) {
  try {
    const req = await vehiclesApi.post("/parkedVehicles", dto);
    const response = await req.data;
    return response;
  } catch (error) {
    return {
      error: error,
    };
  }
}
export default vehiclesApi;
