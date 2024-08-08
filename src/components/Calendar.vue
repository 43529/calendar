<template>
  <v-table>
    <thead class="bg-primary">
      <tr>
        <th v-for="(value, index) in weeks" class="text-center">
          {{ value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name" class="text-center row">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
        <td>{{ item.name }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup>
const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  },
  {
    name: 'Frozen Yogurt',
    calories: 159
  },
  {
    name: 'Ice cream sandwich',
    calories: 237
  }
]
</script>
<style scoped>
.row {
  height: calc((100vh - 52px) / 4);
}
</style>
