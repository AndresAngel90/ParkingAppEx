<template>
  <div class="q-pa-md">
    <q-table title="Vehicles" row-key="name" :rows="rows" :columns="columns">
      <template v-slot:body-cell-action="props" >
          <q-td key="action" :props="props" >
            <q-btn
              label="Pay"
              color="secondary"
              icon="paid"
              @click="paid(props)"
            />
          </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>import { QTableProps } from 'quasar';
const paid =(props:any)=>{
  console.log(props)
}
const rows = [
  {
    id:'13',
    plate: "MIK381",
    type: "Car",
    entryDate:new Date()
  },
  {
    plate: "NOL38F",
    type: "Bike",
  },
];


const columns:QTableProps['columns']=[
        {
          name: 'plate',
          label: 'Plate',
          align: 'left',
          field: 'plate',
        },
        {
          name:'type',          
          label:'Type Of Vehicle',
          field:'type',          
          align: 'left',          
        },
        {
          name:'entryDate',
          label:'Date of Entry',
          field:'entryDate',                 
          format:val=> `${new Date(val).toLocaleDateString('en-US',{hour:'2-digit',minute:'2-digit'})}` ,
          align: 'left',
        },
        {
          name:'action',
          label:'Action',
          align: 'left',
          field:'action'
        }
      ]

</script>
