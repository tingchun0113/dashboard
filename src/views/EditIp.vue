<template>
  <div>
    <Header />
    <Sidebar />
    <Ip />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Ip from "../components/Ip";

export default {
  components: {
    Header,
    Sidebar,
    Ip
  }
};
</script>
