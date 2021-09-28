<template>
  <div class="h-screen">
    <div class="h-screen bg-container">

    <div class="w-80 mx-auto my-20 px-6 py-6 shadow rounded-md bg-gradient-to-b from-yellow-500 to-yellow-100">
    <h1 class="text-gray-50 font-bold font-sans text-3xl text-center">
      A8 Dashboard
    </h1>
    <div class="h-0.5 bg-gray-100 w-36 mx-auto mt-2.5"></div>
    <form action="" @submit.prevent.stop="handleSubmit">
      <div class="flex flex-col my-5">
        <label class="my-2" for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          v-model="username"
          class="required mb-3 h-8 p-2 border-none focus:ring-transparent rounded-sm bg-gray-100 text-yellow-500"
        />
        <label class="my-2" for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="required mb-3 h-8 p-2 border-none focus:ring-transparent rounded-sm bg-gray-100 text-yellow-500"
        />
        <label class="my-2" for="token">otpToken</label>
        <input
          type="text"
          id="otpToken"
          name="otpToken"
          v-model="otpToken"
          class="required mb-3 h-8 p-2 border-none focus:ring-transparent rounded-sm bg-gray-100 text-yellow-500"
        />
      </div>
      <div class="text-center mt-3">
        <button
          type="submit"
          class="px-7 py-2 w-full font-semibold text-white bg-yellow-500 rounded disabled:opacity-50"
          :disabled="isProcessing"
          :class="{ isProcessing }"
        >
          Login
        </button>
      </div>
    </form>
  </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import authAPI from "./../apis/auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      otpToken: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.username || !this.password || !this.otpToken) {
          Toast.fire({
            icon: "warning",
            title: "Please fill in username, password, and otpToken"
          });
          return;
        }
        this.isProcessing = true;
        const res = await authAPI.logIn({
          username: this.username,
          password: this.password,
          otpToken: this.otpToken
        });
        const cookie = res.data.value.setCookie;
        localStorage.setItem("cookie", cookie);
        this.$router.push("/home");
        this.isProcessing = false;
      } catch (e) {
        this.isProcessing = false;
        this.password = "";
        this.otpToken = "";
        Toast.fire({
          icon: "error",
          title: "Please check your username/password/otpToken"
        });
        console.error(e.message);
      }
    }
  }
};
</script>

<style scoped>
.bg-container {
  background-image: url("https://i.redd.it/vda9rbt01en01.png");
  width:100%;
  height:100%; 
  box-sizing:border-box;
  background-size:cover;
  background-repeat:no-repeat;
  background-position:center center;
  position: fixed;
}
.isProcessing {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
