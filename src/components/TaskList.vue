<template>
  <div>
    <h1 class="text-2xl font-bold text-green-600 text-center">
      IT Bangmod Kradan Kanban by kw-3
    </h1>
    <div id="app">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="border px-4 py-2">Title</th>
              <th class="border px-4 py-2">Assignees</th>
              <th class="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in sortedTasks"
              :key="task.taskId"
              class="itbkk-item"
            >
              <td
                class="border px-4 py-2 itbkk-title"
                @click="handleTaskClick(task.taskId)"
              >
                {{ task.title }}
              </td>
              <td
                class="border px-4 py-2 itbkk-assignees"
                :style="{ fontStyle: task.assignees ? 'normal' : 'italic' }"
              >
                {{ task.assignees || 'Unassigned' }}
              </td>
              <td
                class="border px-4 py-2 itbkk-status"
                :data-status="task.status"
              >
                {{ getStatusLabel(task.status) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal overlay -->
    <div v-if="selectedTask" class="modal-overlay"></div>
    <!-- Modal -->
    <div v-if="selectedTask" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2 class="modal-title">{{ selectedTask.title }}</h2>

        <div class="grid-container">
          <!-- Description box -->
          <div class="description-box grid-item">
            <strong>Description</strong>
            <p class="itbkk-description">
              <span v-if="!selectedTask.description" class="no-data"
                >No Description Provided</span
              >
              <span v-else>{{ selectedTask.description }}</span>
            </p>
          </div>

          <!-- Assignees and Status box -->
          <div class="assignees-status-box grid-item">
            <div class="assignees-box">
              <strong>Assignees</strong>
              <p class="itbkk-assignees">
                <template v-if="selectedTask.assignees">
                  {{ selectedTask.assignees }}
                </template>
                <template v-else>
                  <i class="no-data">Unassigned</i>
                </template>
              </p>
            </div>

            <div class="status-box">
              <strong>Status</strong>
              <p class="itbkk-status">
                <template v-if="selectedTask.status">
                  {{ selectedTask.status }}
                </template>
                <template v-else>
                  <i class="no-data">Unassigned</i>
                </template>
              </p>
            </div>
          </div>
        </div>

        <!-- Timezone, Created Date, and Updated Date -->
        <div class="additional-info">
          <div class="timezone-box">
            <strong>Timezone</strong>
            <p class="timezone itbkk-timezone">
              {{ Intl.DateTimeFormat().resolvedOptions().timeZone }}
            </p>
          </div>

          <div class="created-date-box">
            <strong>Created Date</strong>
            <p class="itbkk-created-on">
              {{ formatLocalDate(selectedTask.createdOn) }}
            </p>
          </div>

          <div class="updated-date-box">
            <strong>Updated Date</strong>
            <p class="itbkk-updated-on">
              {{ formatLocalDate(selectedTask.updatedOn) }}
            </p>
          </div>

          <div class="modal-buttons">
            <button class="itbkk-button button-done" @click="closeModal">
              Done
            </button>
            <button class="itbkk-button button-close" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

// State variables
const tasks = ref([])
const selectedTask = ref(null)

// Use the route hook to get the current route
const route = useRoute()

// Function to format dates
const formatLocalDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB')
}

// Fetch tasks from the API
const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:8080/itb-kk/v1/tasks')
    const data = await response.json()
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

// Compute sorted tasks based on creation date
const sortedTasks = computed(() => {
  return tasks.value.sort(
    (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
  )
})

// Function to get status labels
const getStatusLabel = (status) => {
  return status === 'ToDo' ? 'To Do' : status
}

// Function to open the modal and fetch task details
const openModal = async (taskId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/itb-kk/v1/tasks/${taskId}`
    )
    const data = await response.json()
    selectedTask.value = data
  } catch (error) {
    console.error('Error fetching task details:', error)
  }
}

// Function to handle a task click event
const handleTaskClick = (taskId) => {
  openModal(taskId)
}

// Function to close the modal
const closeModal = () => {
  selectedTask.value = null
}

// Fetch tasks on component mount
onMounted(() => {
  fetchTasks()
})

// Fetch task details based on route parameters (taskId) when the component mounts
onMounted(() => {
  const taskId = route.params.taskId
  if (taskId) {
    openModal(taskId)
  }
})
</script>

<style scoped>
.table-container {
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
  overflow-x: auto;
}

.table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.table th,
.table td {
  border: 1px solid #e2e8f0;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #edf2f7;
  font-weight: bold;
}

.itbkk-status {
  padding: 8px 12px;
  border-radius: 4px;
  text-transform: uppercase;
}

.itbkk-status[data-status='To Do'] {
  background-color: #f67c5e;
  color: #333;
}

.itbkk-status[data-status='Doing'] {
  background-color: #f6e05e;
  color: #333;
}

.itbkk-status[data-status='Done'] {
  background-color: #68d391;
  color: #333;
}

.itbkk-status[data-status='No Status'] {
  background-color: #f5f5f5;
  color: #888;
  font-style: italic;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
}

.modal-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.modal-content .no-data {
  font-style: italic;
  color: #888;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

h2 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
}

strong {
  font-weight: bold;
}

i {
  font-style: italic;
}

.timezone {
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
}

.no-data {
  font-style: italic;
  color: #888;
}

.description-box {
  width: 500px;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  word-wrap: break-word;
  text-align: left;
}

.assignees-box {
  width: 250px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  word-wrap: break-word;
}

.status-box {
  width: 150px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  word-wrap: break-word;
}

.timezone-box {
  width: 150px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  word-wrap: break-word;
}

.created-date-box,
.updated-date-box {
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  word-wrap: break-word;
}

.modal-title {
  max-width: 800px;
  word-wrap: break-word;
  text-align: left;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
}

.grid-item {
  margin-bottom: 20px;
}

.assignees-status-box {
  display: grid;
  grid-template-rows: auto auto;
}

.additional-info {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
}

.modal-buttons {
  position: absolute;
  bottom: 50px;
  right: 30px;
}

.itbkk-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-done {
  background-color: #68d391;
  color: #fff;
}

.button-close {
  background-color: #f67c5e;
  color: #fff;
}

.button-done:hover,
.button-close:hover {
  opacity: 0.8;
}
</style>
