<template>
<div class="window-height window-width row justify-center items-center">
  <div class="column q-pa-lg">
    <div class="row">
      <q-card square class="shadow-24" style="width: 350px; height: 400px">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-sm text-center">
            Parking Management App
          </h4>
          <h4 class="text-h5 text-white q-my-md text-center">🚗🚧🛵</h4>
        </q-card-section>
        <q-form @submit="login()" class="q-px-sm q-pt-lg" data-test="loginForm">
          <q-card-section>
            <q-input
              square
              clearable
              data-test="emailInput"
              v-model="email"
              label="Email"
              :rules="[(val:string) => !!val || 'Field is required']"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              type="password"
              square
              clearable
              data-test="passInput"
              v-model="password"
              label="Password"
              :rules="[(val:string) => !!val || 'Field is required']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              data-test="buttonForm"
              size="md"
              color="secondary"
              class="full-width text-white"
              label="Log in"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
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
