<template>
  <section class="mt-20 float-right w-11/12 p-4 flex">
    <div class="w-1/2">
      <div class="flex">
        <div class="text-gray-900 text-2xl font-medium p-3">清洗中心清單</div>
        <button
          @click="refresh"
          class="ml-3 p-3 m-1 bg-gray-900 rounded cursor-pointer text-base font-medium text-white items-center hover:bg-gray-700 hover:text-blue-300"
        >
          Refresh
        </button>
      </div>
      <Spinner v-if="isLoading" />
      <div class="p-3">
        <div v-html="prefix" class=""></div>
      </div>
    </div>
    <div class="w-1/2">
      <div class="flex">
        <input
          v-model="keyword"
          v-on:keyup.enter.stop.prevent="searchPrefix"
          class="rounded border border-gray-900 p-2 mt-2 ml-2"
          type="text"
          placeholder="Try 209"
        />
        <button
          @click="searchPrefix"
          class="mt-2 bg-gray-900 hover:bg-gray-700 hover:text-blue-300 rounded text-white font-medium text-base px-4 mt-1"
        >
          Search
        </button>
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
      cdns: [],
      keyword: "",
      prefix: "",
      isLoading: true
    };
  },
  created() {
    this.getMitigationPrefix();
  },
  methods: {
    async getMitigationPrefix() {
      try {
        this.isLoading = true;
        const res = await infoAPI.getPrefix();
        this.cdns = res.data.value;
        this.renderPrefix(this.cdns);
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
    renderPrefix(cdns, keyword) {
      this.prefix = "";
      cdns.forEach(cdn => {
        cdn.forEach(val => {
          if (!keyword) {
            this.prefix += Object.values(val) + "</br>";
          }
          Object.keys(val).find(key => {
            if (key === keyword) {
              this.prefix += val[key] + "</br>";
            }
          });
        });
      });
      if (!this.prefix) {
        this.prefix = "該客戶不在清洗中心";
      }
    },
    refresh() {
      this.prefix = "";
      this.getMitigationPrefix();
    },
    searchPrefix() {
      this.renderPrefix(this.cdns, this.keyword);
    }
  }
};
</script>
