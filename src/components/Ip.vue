<template>
  <section class="mt-20 float-right w-11/12 p-4">
    <div class="p-3 pl-2 flex justify-start">
      <input
        v-model="ip"
        v-on:keyup.enter.stop.prevent="handleSubmit"
        class="rounded border border-gray-900 p-2 mt-2 mx-1 w-1/6"
        type="text"
        placeholder="IP"
      />
      <input
        v-model="domain"
        v-on:keyup.enter.stop.prevent="handleSubmit"
        class="rounded border border-gray-900 p-2 mt-2 mx-1 w-1/6"
        type="text"
        placeholder="Domain"
      />
      <button
        @click="handleSubmit"
        class="mt-2 mx-1 bg-gray-900 hover:bg-gray-700 hover:text-yellow-500 rounded text-white font-medium text-base px-4"
      >
        Search
      </button>
    </div>
    <div class="flex mt-3">
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium mb-3 p-3">查詢結果</div>
        <Spinner v-if="isLoading" />
        <div v-if="isSlp" class="">
          <div v-if="!isLoading" class="">
            <div class="text-gray-900 font-medium pl-3">Hostname</div>
            <span class="text-gray-900 pl-3">{{ hostname }}</span
            ><br /><br />
            <div class="text-gray-900 font-medium pl-3">目前正在使用的IP</div>
            <span class="text-gray-900 pl-3">{{ currentIp }}</span
            ><br /><br />
            <div class="text-gray-900 font-medium pl-3">原始設定的IP</div>
            <span class="text-gray-900 pl-3">{{ originalIp }}</span
            ><br /><br />
            <div class="text-gray-900 font-medium pl-3">可使用IP列表</div>
            <div
              v-for="(item, index) in availableIps"
              :key="index"
              class="text-gray-900 pl-3"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3">修改SLB IP</div>
        <div v-if="isSlp" class="flex mt-3">
          <div class="px-3 w-1/2">
            <div class="text-gray-900 font-medium mb-3">原始設定的IP</div>
            <button
              @click.stop="getNewIp"
              type="button"
              class="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white border border-gray-700 hover:border-transparent rounded mb-1 mr-1 h-8 focus:bg-gray-700 focus:text-white w-80 p-1"
            >
              {{ originalIp }}
            </button>
          </div>
          <div class="px-3 w-1/2">
            <div class="text-gray-900 font-medium mb-3">可使用IP列表</div>
            <button
              @click.stop="getNewIp"
              v-for="(item, index) in availableIps"
              :key="index"
              type="button"
              class="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white border border-gray-700 hover:border-transparent rounded mb-1 mr-1 h-8 focus:bg-gray-700 focus:text-white w-80 p-1"
            >
              {{ item }}
            </button>
          </div>
        </div>
        <div v-if="isSlp" class="grid place-items-center p-3 mt-5">
          <button
            @click="editIp"
            type="button"
            class="bg-red-600 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-red-500 h-12 w-1/2"
            :disabled="isProcessing"
            :class="{ isProcessing }"
          >
            確認修改
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import infoAPI from "./../apis/info";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      isLoading: false,
      isSlp: false,
      isProcessing: false,
      ip: "",
      domain: "",
      availableIps: "",
      hostname: "",
      originalIp: "",
      currentIp: "",
      cookie: "",
      newIp: ""
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.ip && !this.domain) {
        Toast.fire({
          icon: "warning",
          title: "請先輸入 IP 或 Domain"
        });
        return;
      } else {
        this.availableIps = "";
        this.hostname = "";
        this.originalIp = "";
        this.currentIp = "";
        try {
          this.isLoading = true;
          const res = await infoAPI.searchSlbIp({
            ip: this.ip,
            domain: this.domain
          });
          this.hostname = res.data.value.hostname;
          this.currentIp = res.data.value["目前正在使用的IP"];
          this.originalIp = res.data.value["原始設定的IP"];
          this.availableIps = res.data.value["---- 可使用IP列表 ----"];
          this.isSlp = true;
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.isSlp = false;
          if (error.response.status === 400) {
            Toast.fire({
              icon: "warning",
              title: "查無資料"
            });
            return;
          }
          Toast.fire({
            icon: "error",
            title: "Cannot get info. Please wait for a moment"
          });
          console.error(error.message);
        }
      }
    },
    getNewIp(e) {
      this.newIp = e.target.textContent.trim();
    },
    async editIp() {
      if (!this.newIp) {
        Toast.fire({
          icon: "warning",
          title: "請先選擇新的IP"
        });
        return;
      }
      this.cookie = JSON.parse(JSON.stringify(localStorage.getItem("cookie")));
      if (!this.cookie) {
        Toast.fire({
          icon: "warning",
          title: "請先登出。再登入操作"
        });
        this.$router.push("login");
        return;
      }
      this.isProcessing = true;
      try {
        const res = await infoAPI.editSlbIp({
          cookie: this.cookie,
          hostname: this.hostname,
          ip: this.newIp
        });
        console.log(res);
        if (res.status === 200) {
          Toast.fire({
            icon: "success",
            title: "修改成功"
          });
        }
        this.isProcessing = false;
      } catch (error) {
        this.isLoading = false;
        this.isSlp = false;
        if (error.response.status === 400) {
          Toast.fire({
            icon: "warning",
            title: "請先登出。再登入操作"
          });
          this.$router.push("login");
          return;
        }
        Toast.fire({
          icon: "error",
          title: "Cannot edit SLB IP. Please wait for a moment"
        });
        console.error(error.message);
      }
    }
  }
};
</script>

<style scoped>
.isProcessing {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
