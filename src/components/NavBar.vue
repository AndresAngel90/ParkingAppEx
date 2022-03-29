<template>
  <q-toolbar class="text-primary">
      <q-toolbar-title>
        Parkin Ceiba 🌳
      </q-toolbar-title>
      <q-btn flat round dense icon="logout" @click="logout()">
        <q-tooltip> Logout </q-tooltip></q-btn
      >
    </q-toolbar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
function logout() {
    localStorage.removeItem("authToken");
    router.push("/login");
}
</script>

<style scoped>

</style>