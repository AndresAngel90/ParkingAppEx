import {  mount } from '@vue/test-utils'
import { test, expect ,describe ,vi} from 'vitest'
import { Quasar } from 'quasar'
import TableVehicles from '../../src/components/TableVehicles.vue';
import { createTestingPinia } from '@pinia/testing'
import useVehicleStore from '../../src/stores/vehicles';
import vehiclesApi from '~/api/vehiclesApi';
import { formatHour } from '../../src/utils/formatHour';
import { calculateHours } from '../../src/utils/calculateHours';

const allVehiclesResponse=[
  {
    id: 1,
    vehicleType: "Bike",
    vehiclePlate: "PXH55B",
    spotToFill: 9,
    dateOfEntrance: "2022-03-04T13:06:17.146Z"
  },
]
describe('testing in the TableVehicle Component', () => {  
  let wrapper = mount(TableVehicles,{
    global:{
      plugins:[createTestingPinia({stubActions:false}),Quasar]
    }
  })
  
  let store = useVehicleStore()

  // beforeEach(()=>{
  //   wrapper = mount(TableVehicles,{
  //     global:{
  //       plugins:[createTestingPinia({stubActions:false}),Quasar]
  //     }
  //   });    
  //   store = useVehicleStore();    
  // });

  afterEach(()=>{
    vi.clearAllMocks();
  })
  
  test('should be call the action and the getter when the component was mounted', async() => {
    expect(store.getAllVehicles).toBeCalled()
    expect(store.getAllVehicles).toHaveBeenCalled()
    expect(store.getAllVehicles).toHaveBeenCalledTimes(1)
  });

  test('should be show the mock data in the table',async ()=>{
    vi.spyOn(vehiclesApi,'get').mockResolvedValue({data:allVehiclesResponse});
    await store.getAllVehicles();
    const countOfVehicles =  wrapper.get('tbody').element.childElementCount;
    expect(countOfVehicles).toBe(1);
    const allCellInfo = wrapper.findAll('td')
    const cellPlate = allCellInfo[0].text();
    const typeOfVehicle = allCellInfo[1].text();
    const DateOfEntry = allCellInfo[2].text();
    const hours = allCellInfo[3].text();

    expect(cellPlate).toBe(allVehiclesResponse[0].vehiclePlate);
    expect(typeOfVehicle).toBe(allVehiclesResponse[0].vehicleType);
    expect(DateOfEntry).toBe(formatHour(allVehiclesResponse[0].dateOfEntrance));
    expect(hours).toBe(calculateHours(allVehiclesResponse[0].dateOfEntrance).toString())
  })
});