<template>
  <section class="mt-20 float-right w-11/12 p-4 flex">
    <div class="">
      <div class="flex">
        <div class="text-gray-900 text-2xl font-medium p-3">
          Protect mode資訊
        </div>
        <button
          @click="refresh"
          class="ml-3 p-3 m-1 bg-gray-900 rounded cursor-pointer text-base font-medium text-white items-center hover:bg-gray-700 hover:text-yellow-500"
        >
          Refresh
        </button>
      </div>

      <Spinner v-if="isLoading" />
      <table
        v-if="isProtected"
        class="ml-3 mt-3 rounded border-collapse border border-gray-700"
      >
        <thead v-if="!isLoading">
          <tr>
            <th class="border border-gray-700 p-1">cdnGroup</th>
            <th class="border border-gray-700 p-1">Profile</th>
            <th class="border border-gray-700 p-1">Site</th>
            <th class="border border-gray-700 p-1">Domain</th>
            <th class="border border-gray-700 p-1">Time</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in protectModeTable" :key="index">
            <td class="border border-gray-700 p-1 text-center">
              {{ item["cdnGroup"] }}
            </td>
            <td class="border border-gray-700 p-1 text-center">
              {{ item["Profile"] }}
            </td>
            <td class="border border-gray-700 p-1 text-center">
              {{ item["Site"] }}
            </td>
            <td class="border border-gray-700 p-1 text-center">
              {{ item["Doamin"] }}
            </td>
            <td class="border border-gray-700 p-1 text-center">
              {{ item["Time"] }}
            </td>
          </tr>
        </tbody>
      </table>
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
      isLoading: true,
      isProtected: false,
      protectModeTable: ""
    };
  },
  created() {
    this.checkProtectMode();
  },
  methods: {
    async checkProtectMode() {
      this.protectModeTable = "";
      try {
        this.isLoading = true;
        const res = await infoAPI.checkProtect();
        if (res.data.value.length === 1) {
          this.isLoading = false;
          this.isProtected = false;
          Toast.fire({
            icon: "warning",
            title: "查無資料"
          });
          return;
        }
        this.isProtected = true;
        this.protectModeTable = res.data.value;
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
    refresh() {
      this.protectModeTable = "";
      this.checkProtectMode();
    }
  }
};
</script>
