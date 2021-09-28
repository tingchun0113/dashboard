<template>
  <section class="mt-20 float-right w-11/12 p-4">
    <div class="flex">
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3">
          選擇客戶
        </div>
        <div @click.stop="getClient" class="pl-3">
          <button
            v-for="(cdn, index) in cdnResult"
            :key="index"
            type="button"
            class="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white border border-gray-700 hover:border-transparent rounded mb-1 mr-1 h-8 focus:bg-gray-700 focus:text-white"
            style="width: 100px;"
          >
            {{ cdn }}
          </button>
        </div>
        <div class="text-gray-900 text-2xl font-medium p-3 mt-5">
          選擇功能
        </div>
        <button
          @click="searchEmpty"
          class="ml-3 my-1 p-3 w-1/4 bg-yellow-500 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-yellow-600"
        >
          查空site
        </button>
        <button
          @click="downloadDomains"
          class="ml-3 my-1 p-3 w-1/4 bg-yellow-500 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-yellow-600"
        >
          下載域名
        </button>
        <button
          @click="searchSLBIp"
          class="ml-3 my-1 p-3 w-1/4 bg-yellow-500 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-yellow-600"
        >
          查SLB IP list
        </button>
        <button
          @click="showInput"
          class="ml-3 my-1 p-3 w-1/4 bg-yellow-500 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-yellow-600"
        >
          清除緩存
        </button>
      </div>
      <div class="w-1/2">
        <div class="text-gray-900 text-2xl font-medium p-3 ">
          {{ isInput ? `請輸入相關資訊` : displayTitle }}
        </div>
        <Spinner v-if="isLoading" />
        <div class="pl-3">
          <div v-for="(item, index) in result" :key="index">{{ item }}</div>
        </div>
        <table
          v-if="isTable"
          class="ml-3 rounded border-collapse border border-gray-700"
        >
          <thead>
            <tr>
              <th class="border border-gray-700 p-1">IP Prefix</th>
              <th class="border border-gray-700 p-1">Line business</th>
              <th class="border border-gray-700 p-1">Lines</th>
              <th class="border border-gray-700 p-1">Prefix</th>
              <th class="border border-gray-700 p-1">cdnGroup</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in table" :key="index">
              <td class="border border-gray-700 p-1 text-center">
                {{ item["cdnGroup"] }}
              </td>
              <td class="border border-gray-700 p-1 text-center">
                {{ item["Prefix"] }}
              </td>
              <td class="border border-gray-700 p-1 text-center">
                {{ item["Lines"] }}
              </td>
              <td class="border border-gray-700 p-1 text-center">
                {{ item["Line business"] }}
              </td>
              <td class="border border-gray-700 p-1 text-center">
                {{ item["IP Prefix"] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="isInput" class="pl-3 flex flex-col">
          <div class="">{{ client }}</div>
          <textarea
            type="text"
            id="domain"
            name="domain"
            v-model="domain"
            class="required focus:ring-transparent p-2 rounded-sm bg-gray-100 text-yellow-600 h-48 mb-2"
            placeholder="Domain (必填)"
          ></textarea>
          <textarea
            type="text"
            id="key"
            name="key"
            v-model="key"
            class="required focus:ring-transparent p-2 rounded-sm bg-gray-100 text-yellow-600 h-20"
            placeholder="Key (未填代表全部清除)"
          ></textarea>
          <button
            @click="clearCache"
            type="button"
            class="bg-red-500 rounded cursor-pointer text-center text-lg font-semibold text-white items-center hover:bg-red-600 h-12 mt-5"
            :disabled="isProcessing"
            :class="{ isProcessing }"
          >
            清除
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
      cdnResult: "",
      client: "",
      result: "",
      table: "",
      domain: "",
      key: "",
      displayTitle: "查詢結果",
      isLoading: false,
      isTable: false,
      isInput: false,
      isProcessing: false
    };
  },
  created() {
    this.getCdnGroup();
  },
  methods: {
    async getCdnGroup() {
      try {
        const res = await infoAPI.getCdnList();
        this.cdnResult = res.data.value.Result;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Cannot get info. Please wait for a moment"
        });
        console.error(error.message);
      }
    },
    getClient(e) {
      if (e.target.textContent.trim().length > 10) {
        return;
      }
      this.client = e.target.textContent.trim();
    },
    async searchEmpty() {
      if (!this.client) {
        Toast.fire({
          icon: "warning",
          title: "請先選擇客戶"
        });
        return;
      } else {
        this.result = "";
        this.isInput = false;
        this.isTable = false;
        try {
          this.isLoading = true;
          const res = await infoAPI.getEmptySites({ client: this.client });
          this.result = res.data.value.Result;
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          Toast.fire({
            icon: "error",
            title: "Cannot get info. Please wait for a moment"
          });
          console.error(error.message);
        }
      }
    },
    async downloadDomains() {
      if (!this.client) {
        Toast.fire({
          icon: "warning",
          title: "請先選擇客戶"
        });
        return;
      } else {
        this.result = "";
        this.isInput = false;
        this.isTable = false;
        try {
          this.isLoading = true;
          const res = await infoAPI.getDomains({ client: this.client });

          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = `${this.client}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          if (error.response.status === 400) {
            Toast.fire({
              icon: "warning",
              title: "無檔案可下載"
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
    async searchSLBIp() {
      if (!this.client) {
        Toast.fire({
          icon: "warning",
          title: "請先選擇客戶"
        });
        return;
      } else {
        this.result = "";
        this.isInput = false;
        this.table = "";
        try {
          this.isLoading = true;
          const res = await infoAPI.getSLBIpList({ client: this.client });
          if (res.data.value.length === 0) {
            this.isLoading = false;
            Toast.fire({
              icon: "warning",
              title: "查無資料"
            });
            return;
          }
          this.isTable = true;
          this.table = res.data.value;
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          Toast.fire({
            icon: "error",
            title: "Cannot get info. Please wait for a moment"
          });
          console.error(error.message);
        }
      }
    },
    showInput() {
      if (!this.client) {
        Toast.fire({
          icon: "warning",
          title: "請先選擇客戶"
        });
        return;
      } else {
        this.result = "";
        this.domain = "";
        this.key = "";
        this.isTable = false;
        this.isInput = true;
      }
    },
    async clearCache() {
      if (!this.client || !this.domain) {
        Toast.fire({
          icon: "warning",
          title: "請先輸入相關資訊"
        });
        return;
      } else {
        this.result = "";
        this.isTable = false;
        this.isProcessing = true;
        try {
          const res = await infoAPI.clearCache({
            cdn: this.client,
            domain: this.domain,
            key: this.key
          });
          if (res.status === 200) {
            Toast.fire({
              icon: "success",
              title: "清除成功"
            });
          }
          this.isProcessing = false;
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: "Cannot get info. Please wait for a moment"
          });
          console.error(error.message);
        }
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
