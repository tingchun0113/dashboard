<template>
  <div>
    <Header />
    <Sidebar />
    <Protect />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Protect from "../components/Protect";

export default {
  components: {
    Header,
    Sidebar,
    Protect
  }
};
</script>
