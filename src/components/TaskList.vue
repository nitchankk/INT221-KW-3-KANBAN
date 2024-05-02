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
              <th class="border px-4 py-2">
                <button
                  @click="handleAddTask"
                  style="border: none; background: none; padding: 0"
                >
                  <img
                    src="../assets/add.png"
                    alt="Add Icon"
                    style="width: 30px; height: 30px"
                  />
                </button>
              </th>
              <th class="border px-4 py-2">Title</th>
              <th class="border px-4 py-2">Assignees</th>
              <th class="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(task, index) in sortedTasks"
              :key="task.taskId"
              class="itbkk-item"
            >
              <td class="border px-4 py-2">{{ index + 1 }}</td>
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

    <task-modal
      v-if="selectedTask"
      :task="selectedTask"
      :timezone="timezone"
      :createdDate="formatLocalDate(selectedTask.createdOn)"
      :updatedDate="formatLocalDate(selectedTask.updatedOn)"
      :closeModal="closeModal"
    />

    <add-modal v-if="showAddModal" @save="saveTask" @cancel="cancelAdd" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import TaskModal from './TaskModal.vue'
import AddModal from './AddModal.vue'

// State variables
const tasks = ref([])
const selectedTask = ref(null)
const showAddModal = ref(false)

// Use the route hook to get the current route
const route = useRoute()

// Function to format dates
const formatLocalDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB')
}

// Compute timezone
const timezone = computed(
  () => Intl.DateTimeFormat().resolvedOptions().timeZone
)

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

// Function to handle adding a new task
const handleAddTask = () => {
  // Show the AddModal component
  showAddModal.value = true
}

// Function to handle saving a new task
const saveTask = (newTask) => {
  // Implement your logic to save the new task here
  console.log('Saving new task:', newTask)
  // For example, you can add the new task to the tasks array
  tasks.value.push(newTask)
  // Close the AddModal component
  showAddModal.value = false
}

// Function to handle canceling the addition of a new task
const cancelAdd = () => {
  // Close the AddModal component
  showAddModal.value = false
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
</style>
