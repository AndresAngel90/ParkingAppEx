import { defineStore } from "pinia";
import vehiclesApi from "~/api/vehiclesApi";

const useVehicleStore = defineStore('vehicles',{
  state:()=>({
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
    }
  },
  getters:{
    vehiclesAvailable:(state)=> state.allVehicles
  }  
})

export default useVehicleStore;