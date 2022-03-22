import { defineStore } from "pinia";
import vehiclesApi from "~/api/vehiclesApi";
interface Vehicle {
  id:number
  vehicleType:string
  vehiclePlate:string
  spotToFill:number
  dateOfEntrance:string | Date
}
export interface vehiclesState {
  allVehicles:Vehicle[]
}
const useVehicleStore = defineStore('vehicles',{
  state:():vehiclesState=>({
    allVehicles:[]
  }),

  actions:{
    async getAllVehicles(){
      try {
        const {data} = await vehiclesApi.get('/parkedVehicles')
        this.allVehicles = data;
      } catch (error) {
        console.log(error)
      }
    },
  },

  getters:{
    vehiclesAvailable:(state)=> state.allVehicles
  }  
})

export default useVehicleStore;


