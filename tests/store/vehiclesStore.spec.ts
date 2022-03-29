import { setActivePinia ,createPinia} from "pinia";
import useVehicles from '../../src/stores/vehicles'
import { vehiclesState } from '../../src/stores/vehicles';
import vehiclesApi from '~/api/vehiclesApi';


const allVehiclesResponse=[
  {
    id: 1,
    vehicleType: "Bike",
    vehiclePlate: "PXH55B",
    spotToFill: 9,
    dateOfEntrance: "2022-03-04T13:06:17.146Z"
  },
]

describe('testing the vehicle store', () => {
  beforeEach(()=>{
    setActivePinia(createPinia());
  });

  test('intial state', () => {
    const initialState:vehiclesState={
      allVehicles:[],spotsAvailable:{bikesEmptySpots:[],carEmptySpots:[]}
    }
    const store = useVehicles();
    const vehiclesState = store.$state;
    expect(vehiclesState).toEqual(initialState)
  });

  test('testing getAllVehicles should be save all vehicles in the store', async() => {
    vi.spyOn(vehiclesApi,'get').mockResolvedValue({data:allVehiclesResponse});
    const store = useVehicles();
    await store.getAllVehicles();
    const allVehicles = store.allVehicles;
    //console.log(allVehicles)
    expect(allVehicles).toEqual(allVehiclesResponse)
  });

  test('testing:vehiclesAvailable  ', () => {
    const store = useVehicles();
    store.allVehicles = allVehiclesResponse
    expect(store.vehiclesAvailable).toEqual(allVehiclesResponse)
  });


});
