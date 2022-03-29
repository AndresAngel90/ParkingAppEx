<template>
  <div class="q-pa-lg">
    <h3 id="loginTitle">Welcome!, would you like to park?</h3>
    <div>
      <div class="row">
        <div class="col-5 self-center">
          <h4>What Kind of vehicle want to park?</h4>
        </div>
        <div class="col-4 self-center">
          <q-radio dense v-model="vehicleType" val="Bike" label="Bike " />
          <br />
          <q-radio dense v-model="vehicleType" val="Car" label="Car" />
        </div>
      </div>
      <div class="row">
        <div class="col-5 self-center">
          <h4>Please Enter the vehicle's plate</h4>
        </div>
        <div class="col-2 self-center">
          <q-input
            rounded
            outlined
            v-model="vehiclePlate"
            class="inputPlate"
            data-id="inputPlate"
            :maxlength="max"
            :rules="[
              (val) => !!val || 'plate Required',
              () => validatePlate() || 'Invalid Type Of Plate',
            ]"
          >
          </q-input>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn
          color="orange-7"
          size="27px"
          icon-right="send"
          label="park!"
          @click="parkVehcile()"
          data-id = "btnSubmit"
        />
      </div>
    </div>
    <InfoDialog
      :msg="infoDialogProps.msg"
      :show="infoDialogProps.show"
      :key="modalDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useVehicleStore from "../../stores/vehicles";
import InfoDialog from "~/components/InfoDialog.vue";
import { ParkVehicleDto } from "~/interfaces/vehiclesInterfaces";
import { parkVehcle } from "../../api/vehiclesApi";
import { Loading, QSpinnerOrbit } from "quasar";

const store = useVehicleStore();
store.getAvailableSpots();

const vehicleType = ref<string>("");
const vehiclePlate = ref<string>("");
const modalDialog = ref<number>(0);
const max = 6;
let loading = ref<boolean>(false);

let infoDialogProps = {
  show: false,
  msg: "",
};

/*const sum = computed(() => {
  return 2 + 2;
});*/

function validatePlate() {
  const carPlate = /^([ A-Za-z]{3}[0-9]{3})$/;
  const bikePlate = /^[ A-Za-z]{3}[0-9]{2}[ A-Za-z]{1}$/;
  return (
    carPlate.test(vehiclePlate.value) || bikePlate.test(vehiclePlate.value)
  );
}

async function parkVehcile() {
  loading.value = true;
  if (vehicleDataChecker()) {
    let parkVehcileDto:ParkVehicleDto = parkDtoBuilder(vehicleType.value)

    let resp = await parkVehcle(parkVehcileDto);
    let indexToDelete = 0;
    if(vehicleType.value === "Bike" ){
      indexToDelete = store.spotsAvailable.bikesEmptySpots.indexOf(parkVehcileDto.spotToFill)
      store.spotsAvailable.bikesEmptySpots.splice(indexToDelete, 1)
    }else{
      indexToDelete = store.spotsAvailable.carEmptySpots.indexOf(parkVehcileDto.spotToFill)
      store.spotsAvailable.carEmptySpots.splice(parkVehcileDto.spotToFill, 1)
    }
    await store.updateSpots()
    if (resp.error || resp.resul==="Fail") {
      let msg: string = "Something went wrong please try it again";
      riseInfoDialog(msg);
    }
    loading.value = false;
  } else {
    let msg: string = "Either Plate or Vehicle are not correctly filled";
    loading.value = false;    
    riseInfoDialog(msg);
  }
}

function parkDtoBuilder(vehicleTypeStr:string):ParkVehicleDto{
  let parkVehcileDto:ParkVehicleDto = {

      vehicleType: vehicleType.value,
      vehiclePlate: vehiclePlate.value,
      spotToFill:
        vehicleTypeStr === "Bike"
          ? store.spotsAvailable.bikesEmptySpots[0]
          : store.spotsAvailable.carEmptySpots[0],
      dateOfEntrance: new Date().toLocaleString()
    } 
    return parkVehcileDto
}

function vehicleDataChecker(): boolean {
  if (
    !validatePlate() ||
    vehiclePlate.value === "" ||
    vehicleType.value === ""
  ) {
    return false;
  }
  return true;
}
function riseInfoDialog(msg: string) {
  console.log("ENTREEE AL Dialog!!!!");    
  infoDialogProps.msg = msg;
  infoDialogProps.show = true;
  modalDialog.value++;
}
function showLoading(): void {
  if (loading.value) {
    Loading.show({
      spinner: QSpinnerOrbit,
      spinnerColor: "white",
      spinnerSize: 150,
      message: "Getting availavility...",
      messageColor: "white",
    });
  } else {
    Loading.hide();
  }
}

watch(
  () => loading.value,
  () => {
    showLoading();
  }
);
</script>

<style scoped>
.inputPlate {
  text-transform: uppercase;
  text-align: right;
  font-size: 40px;
  /*background-color: chartreuse;*/
  border-radius: 30px;
}
</style>
