<template>
  <aside
    class="fixed w-1/12 mt-20 h-screen bg-gray-800 flex flex-col shadow-md hidden sm:block"
  >
    <div class="flex flex-col p-4 bg-gray-800">
      <router-link
        to="client"
        class="bg-gray-900 text-white text-lg p-2 rounded my-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
      >
        查詢客戶資料
      </router-link>
      <router-link
        to="mitigation"
        class="bg-gray-900 text-white text-lg p-2 rounded my-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
      >
        清洗中心清單
      </router-link>
      <router-link
        to="blacklist"
        class="bg-gray-900 text-white text-lg p-2 rounded my-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
      >
        上傳黑名單
      </router-link>

      <button
        @click="logout"
        class="p-3 mt-9 bg-red-500 rounded cursor-pointer text-center text-sm font-semibold text-white items-center hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('cookie');
      this.$router.push("/login");
    }
  }
};
</script>
