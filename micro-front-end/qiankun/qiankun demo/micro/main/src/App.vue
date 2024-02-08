<template>
  <div class="outer">
    <div class="left">
      <Nav />
    </div>
    <div class="right">
      <RouterView />
      <div id="sub-container" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Nav from './components/Nav.vue';
</script>

<style scoped>
.outer {
  display: flex;
  height: 100vh;
}

.left {
  background-color: #bfa;
}

.right {
  flex: 1;
  background: yellow;
}
</style>
<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>