<template>
  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Warning</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ modalMessage }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
          @click="closeDialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from "vue";

const props = defineProps<PropsAlertDialog>();
let alert = ref<boolean>(props.show);
let modalMessage = ref<string>(props.msg);

function closeDialog() {
  alert = ref<boolean>(false);
}
onUnmounted(() => {
  console.log(" me desmonte");
});
interface PropsAlertDialog {
  show: boolean;
  msg: string;
}
</script>


<style lang="scss" scoped></style>
