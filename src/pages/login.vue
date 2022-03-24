<template>
  <div class="column q-pa-lg">
    <div class="row">
      <q-card square class="shadow-24" style="width: 350px; height: 400px">
        <q-card-section class="bg-deep-purple-7">
          <h4 class="text-h5 text-white q-my-sm text-center">
            Parking Management App
          </h4>
          <h4 class="text-h5 text-white q-my-md text-center">🚗🚧🛵</h4>
        </q-card-section>
        <q-form @submit="login" class="q-px-sm q-pt-lg">
          <q-card-section>
            <q-input
              square
              clearable
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { useRouter } from "vue-router";
import login from "../api/loginApi";

export default defineComponent({
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      email: "josedanielparra05@outlook.com",
      password: "123456",
    };
  },
  methods: {
    login() {
      login(this.email, this.password)
        .then((response) => {
          if (response.accessToken) {
            this.saveToken(response.accessToken);
            this.router.push({ name: "index" });
          }
        })
        .catch((error) => {
          Notify.create({
            type: "negative",
            message: error.message,
          });
        });
    },
    saveToken(token: string) {
      localStorage.setItem("authToken", token);
    },
  },
});
</script>

<route>
{
  meta: {
    requiresAuth: false
  }
}
</route>
