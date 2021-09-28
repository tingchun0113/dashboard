<template>
  <div>
    <Header />
    <Sidebar />
    <Upload />
  </div>
</template>

<script>
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Upload from "../components/Upload";

export default {
  components: {
    Header,
    Sidebar,
    Upload
  }
};
</script>
