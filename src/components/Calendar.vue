<script setup>
import Header from './Header.vue'
</script>

<template>
  <div class="backgroud">
    <v-card class="card">
      <Header />
    </v-card>
  </div>
</template>

<style scoped>
.backgroud {
  background-color: bisque;
  padding: 16px;
  height: 100vh;
}
.card {
  padding: 16px;
  height: calc(100vh - 32px);
}
</style>
