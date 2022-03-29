import { defineStore } from "pinia";
import vehiclesApi from "~/api/vehiclesApi";
interface Vehicle {
  id: number;
  vehicleType: string;
  vehiclePlate: string;
  spotToFill: number;
  dateOfEntrance: string | Date;
}

interface Spots {  
  bikesEmptySpots: number[];
  carEmptySpots: number[];
}
export interface vehiclesState {
  allVehicles: Vehicle[];
  spotsAvailable: Spots;
}
const useVehicleStore = defineStore("vehicles", {
  state: (): vehiclesState => ({
    allVehicles: [],
    spotsAvailable: { carEmptySpots: [], bikesEmptySpots: [] },
  }),

  actions: {
    async getAllVehicles() {
      try {
        const { data  } = await vehiclesApi.get("/parkedVehicles");
        this.allVehicles = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAvailableSpots() {
      try {
        const { data } = await vehiclesApi.get<Spots>("/availableSpots");   
        this.spotsAvailable.bikesEmptySpots = data.bikesEmptySpots
        this.spotsAvailable.carEmptySpots = data.carEmptySpots
      } catch (error) {
        console.log(error);
      }
    },
    async updateSpots(){
      try {
        const { data } = await vehiclesApi.post("/availableSpots", this.spotsAvailable);   
        this.spotsAvailable = data        
      } catch (error) {
        
      }
    }
  },

  getters: {
    vehiclesAvailable: (state) => state.allVehicles,
    getSpotsAvailable: (state) => state.spotsAvailable,
  },
});

export default useVehicleStore;
