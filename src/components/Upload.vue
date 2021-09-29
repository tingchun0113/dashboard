<template>
  <section class="mt-20 float-right w-11/12 p-4">
    <div class="flex">
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3">
          上傳黑名單 (.txt)
        </div>
        <input
          @change="uploadFile"
          class="mb-5 ml-3"
          type="file"
          accept=".txt"
        />
      </div>
      <div class="w-1/2">
        <div class="flex">
          <input
            v-model="ip"
            v-on:keyup.enter.stop.prevent="searchIp"
            class="rounded border border-gray-900 p-2 mt-2 ml-2"
            type="text"
            placeholder="Try 1.9.167.227"
          />
          <button
            @click="searchIp"
            class="mt-2 bg-gray-900 hover:bg-gray-700 hover:text-yellow-500 rounded text-white font-medium text-base px-4 mt-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="flex mt-3">
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3">黑名單清單</div>
        <div class="pl-3">
          <div>更新時間: {{ updatedTime }}</div>
          <br />
          <Spinner v-if="isLoading" />
          <div v-for="(item, index) in list" :key="index">{{ item }}</div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3">查詢結果</div>
        <div class="pl-3">{{ searchedResult }}</div>
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
      blacklist: {},
      ip: "",
      list: "",
      searchedResult: "",
      updatedTime: "",
      isLoading: true
    };
  },
  created() {
    this.getBlacklist();
  },
  methods: {
    async getBlacklist() {
      try {
        this.list = "";
        this.isLoading = true;
        const res = await infoAPI.getBlacklisted();
        this.updatedTime = res.data.value.time;
        this.list = res.data.value.list;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "Cannot get info. Please wait for a moment"
        });
        console.error(error.message);
      }
    },
    async searchIp() {
      if (!this.ip) {
        this.searchedResult = "請確認有輸入IP";
        return;
      } else {
        try {
          const res = await infoAPI.getSearchedIp({ ip: this.ip });
          this.searchedResult = res.data.value.Result;
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: "Cannot get info. Please wait for a moment"
          });
          console.error(error.message);
        }
      }
    },
    async uploadFile(e) {
      this.blacklist = {};
      this.searchedResult = "";
      this.ip = "";

      const file = e.target.files[0];
      const text = await file.text();
      this.blacklist.ip = JSON.parse(JSON.stringify(text));

      try {
        const res = await infoAPI.uploadBlacklist({
          blacklist: this.blacklist
        });
        if (res.status === 200) {
          Toast.fire({
            icon: "success",
            title: "上傳成功"
          });
          this.getBlacklist();
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Cannot upload file. Please wait for a moment"
        });
        console.error(error.message);
      }
      e.target.value = "";
    }
  }
};
</script>
