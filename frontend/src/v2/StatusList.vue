<script setup>
import { ref, onMounted } from 'vue'
import fetchUtils from '../lib/fetchUtils'
import { useRoute, useRouter } from 'vue-router'

const statuses = ref([])
const tasks = ref([])
const route = useRoute()
const router = useRouter()

// Fetch data function
async function fetchData() {
  try {
    statuses.value = await fetchUtils.fetchData('statuses')
    tasks.value = await fetchUtils.fetchData('tasks')

    const statusId = route.params.statusId

    if (statusId) {
      const status = statuses.value.find(
        (s) => s.statusId === parseInt(statusId)
      )
      status ? openEditModal(status) : router.push({ name: 'taskView' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Back to Homepage functions
const backToHomePage = () => {
  router.push({ name: 'taskView' })
}

// Add modal
import AddStatusModal from './AddStatusModal.vue'
const isAddOpen = ref(false)
const openAddModal = () => (isAddOpen.value = true)
const closeModal = () => {
  isAddOpen.value = false
  isEditOpen.value = false
  isDeleteOpen.value = false
  isTransferOpen.value = false
}
const handleStatusAdded = () => fetchData()

// Edit modal
import EditStatusModal from './EditStatusModal.vue'
const isEditOpen = ref(false)
const selectedStatus = ref(null)
const selectedStatusIdToEdit = ref(null)
const openEditModal = (status) => {
  selectedStatus.value = { ...status }
  selectedStatusIdToEdit.value = status.statusId
  isEditOpen.value = true
}
const handleStatusEdited = () => fetchData()

// Delete modal
import DeleteStatusModal from './DeleteStatusModal.vue'
const isDeleteOpen = ref(false)
const selectedStatusIdToDelete = ref(null)
const openDeleteModal = (status) => {
  selectedStatusIdToDelete.value = status.statusId
  isDeleteOpen.value = true
}
const handleDelete = () => fetchData()

// Transfer modal
import TransferStatusModal from './TransferStatusModal.vue'
const isTransferOpen = ref(false)
const selectedStatusIdToTransfer = ref(null)
const openTransferModal = (status) => {
  selectedStatusIdToTransfer.value = status.statusId
  isTransferOpen.value = true
}
const handleTransfer = () => fetchData()

// Check if status is in use
const checkTasksBeforeDelete = (status) => {
  const statusInUse = tasks.value.some(
    (task) => task.statusName === status.statusName
  )
  statusInUse ? openTransferModal(status) : openDeleteModal(status)
}

// Fetch data for update
onMounted(fetchData)

// Status Style function
const statusStyle = (status) => {
  const statusUpperCase = status.toUpperCase()
  switch (statusUpperCase) {
    case 'TO DO':
      return { background: 'linear-gradient(to right, #FF9A9E, #F67C5E)' }
    case 'DOING':
      return { background: 'linear-gradient(to right, #FFE066, #F6E05E)' }
    case 'DONE':
      return { background: 'linear-gradient(to right, #AAF6BE, #68D391)' }
    case 'NO STATUS':
      return {
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        color: '#888',
        fontStyle: 'italic'
      }
    case 'WAITING':
      return { background: 'linear-gradient(to right, #D9A3FF, #B473FF)' }
    case 'IN PROGRESS':
      return { background: 'linear-gradient(to right, #FFB347, #FFA733)' }
    case 'REVIEWING':
      return { background: 'linear-gradient(to right, #FFB6C1, #FF69B4)' } 
    case 'TESTING':
      return { background: 'linear-gradient(to right, #ADD8E6, #87CEEB)' } 
    default:
      return { background: 'linear-gradient(to right, #A0CED9, #6CBEE6)' }
  }
}
</script>

<template>
  <div>
    <h1 class="heading">IT Bangmod Kradan Kanban by kw-3</h1>
    <div id="app">
      <h2 class="subheading">Status Manager</h2>
      <div class="back-home">
        <button
          @click="backToHomePage"
          class="btn-hover color itbkk-button-home"
        >
          Home
        </button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center" class="add-icon">
                <button
                  @click="openAddModal"
                  style="border: none; background: none; padding: 0"
                  class="itbkk-button-add"
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
            <tr
              v-for="(status, index) in statuses"
              :key="status.id"
              class="itbkk-item"
            >
              <td class="itbkk-status" style="text-align: center">
                {{ index + 1 }}
              </td>
              <td
                class="itbkk-status-name"
                :style="statusStyle(status.statusName)"
              >
                {{ status.statusName }}
              </td>
              <td class="itbkk-status-description" style="text-align: left">
                <span
                  v-if="status.statusDescription"
                  v-html="status.statusDescription"
                ></span>
                <span
                  v-else
                  class="no-description"
                  style="font-style: italic; color: #808080"
                  >No description provided</span
                >
              </td>
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
                    <button
                      class="itbkk-button-delete"
                      @click="checkTasksBeforeDelete(status)"
                    >
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
    </AddStatusModal>
    <EditStatusModal
      :isOpen="isEditOpen"
      @closeModal="closeModal"
      @statusEdited="handleStatusEdited"
      :statusData="selectedStatus"
      :selectedStatusIdToEdit="selectedStatusIdToEdit"
    >
    </EditStatusModal>
    <DeleteStatusModal
      :isOpen="isDeleteOpen"
      @closeModal="closeModal"
      @statusDeleted="handleDelete"
      :statusIdToDelete="selectedStatusIdToDelete"
    >
    </DeleteStatusModal>
    <TransferStatusModal
      :isOpen="isTransferOpen"
      @closeModal="closeModal"
      @statusTransfered="handleTransfer"
      :statusIdToTransfer="selectedStatusIdToTransfer"
    >
    </TransferStatusModal>
  </div>
</template>

<style scoped>
#app {
  width: 1200px;
  margin: 0 auto;
}

.heading {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  animation: glow 2s infinite alternate;
}

.subheading {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes glow {
  from {
    text-shadow: 2px 2px 4px rgba(59, 192, 233, 0.747);
  }
  to {
    text-shadow: 4px 4px 8px rgba(230, 70, 245, 0.8);
  }
}

.table-container {
  margin: 0 auto;
  width: 80%;
  max-width: 1500px;
  border-radius: 8px;
  overflow-x: hidden;
  font-size: 19px;
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
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

th {
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #ffedf7ea;
}

tbody tr:nth-child(odd) {
  background-color: #daf6f8cb;
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  text-align: right;
  margin: 10px;
}

.add-icon button:hover {
  transform: translateY(1px);
}

.add-icon button:active {
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

.btn-hover {
  width: 130px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 60px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color {
  background-image: linear-gradient(
    to right,
    #1ac47a,
    #4ecca4,
    #31e990,
    #3fc082
  );
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
</style>
