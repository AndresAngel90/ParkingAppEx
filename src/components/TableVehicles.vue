<template>
  <div class="q-pa-md">
    <q-table
      title="Vehicles"
      row-key="name"
      :rows="allVehicles"
      :columns="columns"
    >
      <template v-slot:body-cell-action="props">
        <q-td key="action" :props="props">
          <q-btn
            label="Pay"
            color="secondary"
            icon="paid"
            @click="paid(props)"
          />
        </q-td>
      </template>

      <template #body-cell-hours="props" >
        <q-td :props="props" >
          {{calculateHours(props.row.dateOfEntrance)}}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { QTableProps } from "quasar";
import { computed } from "vue";
import useVehicleStore from "../stores/vehicles";
import { calculateHours } from '../utils/calculateHours';

const store = useVehicleStore();
store.getAllVehicles();

const paid = (props: any) => {
  console.log(props);
};

const allVehicles = computed(() => store.allVehicles);
const columns: QTableProps["columns"] = [
  {
    name: "plate",
    label: "Plate",
    align: "left",
    field: "vehiclePlate",
  },
  {
    name: "type",
    label: "Type Of Vehicle",
    field: "vehicleType",
    align: "left",
  },
  {
    name: "entryDate",
    label: "Date of Entry",
    field: "dateOfEntrance",
    format: (val) =>
      `${new Date(val).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    align: "left",
  },
  {
    name:'hours',
    label:'hours',
    field:'hourse',
    align:'left'
  },
  {
    name: "action",
    label: "Action",
    align: "left",
    field: "action",
  },
];
</script>
