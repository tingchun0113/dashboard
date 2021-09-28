<template>
  <div>
    <Header />
    <Sidebar />
    <Query />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Query from "../components/Query";

export default {
  components: {
    Header,
    Sidebar,
    Query
  }
};
</script>
