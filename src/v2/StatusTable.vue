<template>
  <div class="status-table">
    <h1>IT Bangmod Kradan Kanban by kw-3</h1>
    <h2>Status Manager</h2>
    <table>
      <thead>
        <tr>
          <th style="width: 150px">Name</th>
          <th style="width: 400px">Description</th>
          <th style="width: 100px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="status in statuses" :key="status.id">
          <td>{{ status.statusName }}</td>
          <td>{{ status.statusDescription }}</td>
          <td>
            <div class="action-buttons">
              <button
                style="border: none; background: none; padding: 0"
                class="itbkk-button-action"
              ></button>
              <button
                @click="clickStatus"
                style="
                  border: none;
                  background: none;
                  padding: 0;
                  margin-right: 15px;
                "
                class="itbkk-button-edit"
              >
                <img
                  src="../assets/pencil.png"
                  alt="EditStatus"
                  style="
                    width: 25px;
                    height: 25px;
                    display: block;
                    margin: 0 auto;
                  "
                />
              </button>

              <button
                @click="clickStatus"
                style="
                  border: none;
                  background: none;
                  padding: 0;
                  margin-right: 10px;
                "
                class="itbkk-button-edit"
              >
                <img
                  src="../assets/delete-status.png"
                  alt="DeleteStatus"
                  style="
                    width: 25px;
                    height: 25px;
                    display: block;
                    margin: 0 auto;
                  "
                />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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

<style>
.status-table {
  width: 80%;
  max-width: 700px;
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
}
h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #f0f0f0;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  text-align: left;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f5f5f5;
}

.status-name {
  color: #007bff;
}

.status-description {
  color: #666;
}

.action-buttons {
  text-align: center;
}
</style>
