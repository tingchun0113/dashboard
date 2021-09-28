<template>
  <div>
    <Header />
    <Sidebar />
    <Prefix />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Prefix from "../components/Prefix";

export default {
  components: {
    Header,
    Sidebar,
    Prefix
  }
};
</script>
