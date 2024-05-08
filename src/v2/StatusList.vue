<template>
  <div class="status-table">
    <h1>IT Bangmod Kradan Kanban by kw-3</h1>
    <h2>Status Manager</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 20px"></th>
            <th style="width: 150px">Name</th>
            <th style="width: 400px">Description</th>
            <th style="width: 80px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(status, index) in statuses" :key="status.id">
            <td class="itbkk-status" style="text-align: centerg">
              {{ index + 1 }}
            </td>
            <td class="itbkk-status">{{ status.statusName }}</td>
            <td>{{ status.statusDescription }}</td>
            <td>
              <div class="action-buttons">
                <button
                  @click="clickStatus"
                  style="margin-right: 15px"
                  class="itbkk-button-action"
                >
                  <img
                    src="../assets/pencil.png"
                    alt="EditStatus"
                    class="action-icon"
                  />
                </button>
                <button @click="clickStatus" class="itbkk-button-action">
                  <img
                    src="../assets/delete-status.png"
                    alt="DeleteStatus"
                    class="action-icon"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import fetchUtils from '../lib/fetchUtils'

const statuses = ref([])

async function fetchData() {
  try {
    const responseData = await fetchUtils.fetchData('statuses')
    statuses.value = responseData
  } catch (error) {
    console.error('Error fetching status data:', error)
    // Handle error if necessary
  }
}

const clickStatus = () => {
  console.log('Hello CLicked')
}

onMounted(fetchData)
</script>

<style scoped>
.status-table {
  width: 1500px;
  margin: 0 auto;
}

.table-container {
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
  overflow-x: auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #d3e7fc;
}

th,
td {
  padding: 12px;
  border: 1px solid #e2e8f0;
  text-align: left;
  height: 40px;
}

th {
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #ebebeb;
}

tbody tr:hover {
  background-color: #acc1ca;
}

.action-buttons {
  text-align: center;
}

.itbkk-button-action {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.action-icon {
  width: 25px;
  height: 25px;
  display: block;
  margin: 0 auto;
}
</style>
