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
                @click="handleTaskClick(task)"
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
        <h2>{{ selectedTask.title }}</h2>

        <p class="itbkk-description">
          <strong>Description:</strong>
          <span v-if="!selectedTask.description" class="no-data"
            >No Description Provided</span
          >
          <span v-else>{{ selectedTask.description }}</span>
        </p>
        <span v-if="selectedTask.description" class="c"> </span>

        <p>
          <strong>Assignees:</strong>
          <template v-if="selectedTask.assignees">
            {{ selectedTask.assignees }}
          </template>
          <template v-else>
            <i class="no-data">Unassigned</i>
          </template>
        </p>
        <p>
          <strong>Status:</strong>
          <template v-if="selectedTask.status">
            {{ selectedTask.status }}
          </template>
          <template v-else>
            <i class="no-data">Unassigned</i>
          </template>
        </p>
        <p class="timezone itbkk-timezone">
          <strong>Timezone:</strong>
          {{ Intl.DateTimeFormat().resolvedOptions().timeZone }}
        </p>
        <p class="itbkk-created-on">
          <strong>Created Date:</strong>
          {{ formatLocalDate(selectedTask.createdOn) }}
        </p>
        <p class="itbkk-updated-on">
          <strong>Updated Date:</strong>
          {{ formatLocalDate(selectedTask.updatedOn) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const tasks = ref([])

const taskId = ref([])

const formatLocalDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB')
}

onMounted(() => {
  fetchTasks()
})

const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:8080/itb-kk/v1/tasks')
    const data = await response.json()
    tasks.value = data
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const sortedTasks = computed(() => {
  return tasks.value.sort((a, b) => {
    return new Date(a.createdOn) - new Date(b.createdOn)
  })
})

const getStatusLabel = (status) => {
  if (status === 'ToDo') {
    return 'To Do'
  }
  return status
}

const selectedTask = ref(null)

const openModal = async (task) => {
  // try {
  //   const response = await fetch(`http://localhost:8080/itb-kk/v1/tasks/${task.taskId}`)
  //   const data = await response.json()
  //   taskId.value = data
  // } catch (error) {
  //   console.error('Error fetching tasks:', error)
  // }
  // if (!task) {
  //   // Check ข้อ 6
  //   alert('The requested task does not exist')
  //   window.history.back()
  //   return
  // }
  // // Check if the task has a description, if not, set it to "No description provided"
  // if (!task.description) {
  //   task.description = 'No description provided'
  // }
  // selectedTask.value = taskId
  // console.log(selectedTask)
  try {
    const response = await fetch(
      `http://localhost:8080/itb-kk/v1/tasks/${task.taskId}`
    )
    const data = await response.json()

    // Directly return the raw data without modifying it
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return null
  }
}

const closeModal = () => {
  selectedTask.value = null
}

const handleTaskClick = async (task) => {
  const rawData = await openModal(task)
  if (rawData) {
    // Process the raw data as needed
    console.log('Raw data:', rawData)
    // Set the selected task to the raw data
    selectedTask.value = rawData
  } else {
    // Handle the case when the task data is not found
    alert('The requested task does not exist')
    window.history.back()
  }
}
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

.itbkk-status[data-status='ToDo'] {
  background-color: #f67c5e;
  color: #333;
}

.itbkk-status[data-status=''],
.itbkk-status[data-status='No Status'] {
  font-style: italic;
  color: #888;
}

.itbkk-status[data-status='Doing'] {
  background-color: #f6e05e;
  color: #333;
}

.itbkk-status[data-status='Done'] {
  background-color: #68d391;
  color: #333;
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
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  z-index: 1000;
}

.modal-content {
  padding: 30px;
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
</style>
