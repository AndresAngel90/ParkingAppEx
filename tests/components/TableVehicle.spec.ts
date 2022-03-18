import {  mount } from '@vue/test-utils'
import { test, expect ,describe ,vi} from 'vitest'
import { Quasar } from 'quasar'
import TableVehicles from '../../src/components/TableVehicles.vue';
import { createTestingPinia } from '@pinia/testing'
import useVehicleStore from '../../src/stores/vehicles';
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
describe('testing in the TableVehicle Component', () => {
  //vi.spyOn(vehiclesApi,'get').mockResolvedValue({data:allVehiclesResponse})
  const wrapper = mount(TableVehicles,{
    global:{
      plugins:[createTestingPinia({stubActions:false}),Quasar]
    }
  })
  const store = useVehicleStore()
  test('should be render correctly', async() => {
    //await wrapper.get('.q-table__bottom').trigger('click')
    console.log(wrapper.html())
    expect(store.getAllVehicles).toBeCalled()
    expect(store.getAllVehicles).toHaveBeenCalled()
    expect(store.getAllVehicles).toHaveBeenCalledTimes(1)
  });
});