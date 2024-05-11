<template>
  <div>
    <h1 class="text-3xl font-bold">IT Bangmod Kradan Kanban by kw-3</h1>
    <div id="app">
      <h2 class="text-2xl">Status Manager</h2>
      <div class="back-home">
        <button @click="backToHomePage" class="itbkk-button-home">HOME</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th
                class="itbkk-button-add"
                style="width: 30px; text-align: center"
              >
                <button
                  @click="openAddModal"
                  style="border: none; background: none; padding: 0"
                >
                  <img
                    src="../assets/add-status.png"
                    alt="Add Icon"
                    style="width: 25px; height: 25px"
                  />
                </button>
              </th>
              <th style="width: 150px">Name</th>
              <th style="width: 400px">Description</th>
              <th style="width: 80px">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(status, index) in statuses" :key="status.id">
              <td class="itbkk-status" style="text-align: center">
                {{ index + 1 }}
              </td>
              <td class="itbkk-status">{{ status.statusName }}</td>
              <td>{{ status.statusDescription }}</td>
              <td>
                <div class="action-buttons">
                  <button class="itbkk-button-action">
                    <button
                      style="margin-right: 15px"
                      class="itbkk-button-edit"
                      @click="openEditModal(status)"
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
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AddStatusModal
      :isAddOpen="isAddOpen"
      @closeModal="closeModal"
      @statusAdded="handleStatusAdded"
    >
      <h2>Add Status</h2>
    </AddStatusModal>
    <EditStatusModal
      :isOpen="isEditOpen"
      @closeModal="closeModal"
      @submit="handleStatusEdited"
      :statusData="selectedStatus"
    >
    </EditStatusModal>
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
  }
}

const clickStatus = () => {
  console.log('อย่ากดเล่น ไปทำงาน')
}

const backToHomePage = () => {
  window.location.href = '/task'
}

// Add ----------------------------------------------------------
import AddStatusModal from './AddStatusModal.vue'

let isAddOpen = ref(false)

const openAddModal = () => {
  isAddOpen.value = true
}

const closeModal = () => {
  isAddOpen.value = false
  isEditOpen.value = false
}

const handleStatusAdded = () => {
  fetchData()
}

// Edit ----------------------------------------------------------

import EditStatusModal from './EditStatusModal.vue'

const isEditOpen = ref(false)
const selectedStatus = ref(null)

const openEditModal = (status) => {
  selectedStatus.value = { ...status }
  console.log(selectedStatus.value) // Log the selectedStatus here
  isEditOpen.value = true
}
const handleStatusEdited = () => {
  //here you do whatever
}
onMounted(fetchData)
</script>

<style scoped>
#app {
  width: 1200px;
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

.back-home {
  text-align: right;
  margin: 10px;
}

.back-home button {
  background-color: #276fad;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  text-align: center;
}

.back-home button:hover {
  background-color: #aebac4;
}

.back-home button:focus {
  outline: none;
}

.back-home button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.itbkk-button-add button:hover {
  transform: translateY(1px);
}

.itbkk-button-add button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.itbkk-button-action button:hover {
  transform: translateY(1px);
}

.itbkk-button-action button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
