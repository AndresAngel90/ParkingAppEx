<template>
<div class="window-height window-width row justify-center items-center">
  <div class="column q-pa-lg">
    <div class="row">
       <div class="column">
      <div class="row justify-center ">
        <h5 class="text-h5 text-balck q-my-md">Parking App 🛵🚖</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-form class="q-gutter-md" data-test="loginForm" @submit="login()">
          <q-card-section>
              <q-input square filled clearable v-model="email" type="email" label="email" data-test="emailInput" :rules="[(val:string) => !!val || 'Field is required']"/>
              <br/>
              <q-input square filled clearable v-model="password" type="password" label="password" data-test="passInput" :rules="[(val:string) => !!val || 'Field is required']"/>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Login" type="submit"/>
          </q-card-actions>
            </q-form>
        </q-card>
      </div>
    </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import loginApi from "../api/loginApi";

const router = useRouter();

const email= ref<string> ("");
const password= ref<string> ("");

function login() {
  loginApi(email.value, password.value)
    .then((response) => {
      if (response.accessToken) {            
        saveToken(response.accessToken);
        router.push({ name: "index" });
      }
    })
    .catch((error) => {
      Notify.create({
        type: "negative",
        message: error.message,
      });
    });
}

function saveToken(token: string) {
  localStorage.setItem("authToken", token);
}
</script>

<route>
{
  meta: {
    layout: "no-toolbar-layout",
    requiresAuth: false
  }
}
</route>
