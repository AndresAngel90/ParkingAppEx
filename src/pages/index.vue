<template>
  <div class="row">
    <div class="column col-3 q-mx-auto q-mt-lg">
      <span class="text-center text-subtitle2 q-my-sm">
        Count:
        <span data-id="counter">{{ counter }}</span>
      </span>
      <q-btn data-id="add" @click="add">+</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);

function add() {
  counter.value += 1;
}
</script>

<style lang="postcss"></style>

<route lang="JSON5">
{
  name: "index"
}
</route>
