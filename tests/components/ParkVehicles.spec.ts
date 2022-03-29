import ParkVehicles from "../../src/pages/ParkVehicles/ParkVehicles.vue"
import { mount } from "@vue/test-utils";
import { Quasar } from "quasar";
import { createTestingPinia } from "@pinia/testing";
import useVehicleStore from '../../src/stores/vehicles';
import vehiclesApi from '~/api/vehiclesApi';
import { ParkVehicleDto } from "~/interfaces/vehiclesInterfaces";

const mockVehicleSpots = {
  bikesEmptySpots: [1, 7, 5],
  carEmptySpots: [3, 9, 10],
};
describe("testo to see", () => {
  let wrapper = mount(ParkVehicles, {
    global: {
      plugins: [createTestingPinia({ stubActions: false }), Quasar],
    },
  });

  let store = useVehicleStore()

  afterEach(() => {
    vi.clearAllMocks();
  });
  

  beforeEach(() => {
    vi.spyOn(vehiclesApi,'get').mockResolvedValue({data:mockVehicleSpots});
    vi.spyOn(vehiclesApi,'post').mockResolvedValue;
    wrapper = mount(ParkVehicles, {
      global: {
        plugins: [createTestingPinia({ stubActions: false }), Quasar],
      },
    });
  
    store = useVehicleStore()
    
  });

  test("should be call the action and the getter when the component was mounted", async () => {
    expect(store.getAvailableSpots).toBeCalled();
    expect(store.getAvailableSpots).toHaveBeenCalled();
    expect(store.getAvailableSpots).toHaveBeenCalledTimes(1);
    
  });

  test("should call parkVehcile then false data Checker", async ()=>{
    wrapper.get("[data-id= 'inputPlate']").setValue('abcdef')
    wrapper.vm.vehicleType="Bike"    
    const parkVehicleMock = vi.spyOn(wrapper.vm, "parkVehcile")

    await wrapper.get("[data-id= 'btnSubmit']").trigger("click")

    expect(parkVehicleMock).toBeCalled()
        
  })

  test("should call parkVehcile", async ()=>{
    wrapper.get("[data-id= 'inputPlate']").setValue('abc480')
    wrapper.vm.vehicleType="Bike"    
    const parkVehicleMock = vi.spyOn(wrapper.vm, "parkVehcile")

    await wrapper.get("[data-id= 'btnSubmit']").trigger("click")

    expect(parkVehicleMock).toBeCalled()
        
  })

  test("should call Data Checker and return false",async () => {
    wrapper.vm.vehicleType="Bike"
    wrapper.vm.vehiclePlate="abcd48"

    let res = wrapper.vm.vehicleDataChecker()

    expect(res).toBeFalsy()
    
  })

  test("should call Data Checker and return true",async () => {
    wrapper.vm.vehicleType="Bike"
    wrapper.vm.vehiclePlate="abc480"

    let res = wrapper.vm.vehicleDataChecker()

    expect(res).toBeTruthy()
    
  })

  test("should return a DTO with type Bike",async () => {
    
    wrapper.vm.vehicleType="Bike"
    wrapper.vm.vehiclePlate="bik480"
    await store.getAvailableSpots();
    const type= "Bike"

    let res:ParkVehicleDto = wrapper.vm.parkDtoBuilder(type)
    
    expect(res.spotToFill === mockVehicleSpots.bikesEmptySpots[0]).toBeTruthy()    
  })

  test("should return a DTO with type car",async () => {
    wrapper.vm.vehicleType="Car"
    wrapper.vm.vehiclePlate="Car480"
    const type= "Car"

    let res:ParkVehicleDto = wrapper.vm.parkDtoBuilder(type)
    expect(res.spotToFill === mockVehicleSpots.carEmptySpots[0]).toBeTruthy()    
  })
});
