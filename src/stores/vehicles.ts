import { defineStore } from "pinia";
import vehiclesApi from "~/api/vehiclesApi";

const useVehicleStore = defineStore('vehicles',{
  state:()=>({
    allVehicles:[]
  }),
  actions:{
    async getaAllVehicles(){
      try {
        const {data} = await vehiclesApi.get('/parkedVehicles')

      } catch (error) {
        console.log(error)
      }
    }
  }
})

export default useVehicleStore;