<template>
  <div>
    <h1 class="text-2xl font-bold">IT Bangmod Kradan Kanban by kw-3</h1>
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
              <th class="border px-4 py-2">Action</th>
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
              <td class="border px-4 py-2" style="width: 70px">
                <button
                  @click="openDeleteModal(task.taskId)"
                  style="
                    border: none;
                    background: none;
                    padding: 0;
                    margin-right: 10px;
                  "
                >
                  <img
                    src="../assets/delete1.png"
                    alt="Delete Icon"
                    style="width: 30px; height: 30px"
                  />
                </button>
                <button
                  @click="openEditModal(task.taskId)"
                  style="border: none; background: none; padding: 0"
                >
                  <img
                    src="../assets/edit.png"
                    alt="Edit Icon"
                    style="width: 30px; height: 30px"
                  />
                </button>
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

    <add-modal
      v-if="showAddModal"
      @taskSaved="handleTaskSaved"
      @showStatusModal="handleShowStatusModal"
      :closeModal="cancelAdd"
    />

    <status-modal
      :showModal="showSuccessModal"
      :statusCode="statusCode"
      :closeModal="closeSuccessModal"
    />

    <delete-modal
      v-if="showDeleteModal"
      :closeModal="closeDeleteModal"
      :taskId="taskIdToDelete"
      @deleted="handleTaskDeleted"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import TaskModal from './TaskModal.vue'
import AddModal from './AddModal.vue'
import DeleteModal from './DeleteModal.vue'
import StatusModal from './StatusModal.vue'
import FetchUtils from '../lib/fetchUtils'

const tasks = ref([])
const selectedTask = ref(null)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)
const statusCode = ref(null)
const taskIdToDelete = ref([])

const route = useRoute()

const formatLocalDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB')
}

const timezone = computed(
  () => Intl.DateTimeFormat().resolvedOptions().timeZone
)

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
  return tasks.value.sort(
    (a, b) => new Date(a.createdOn) - new Date(b.createdOn)
  )
})

const getStatusLabel = (status) => {
  return status === 'ToDo' ? 'To Do' : status
}

const openModal = async (taskId) => {
  if (!taskId) {
    console.error('Task ID is invalid or missing.')
    return
  }
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

const handleTaskClick = (taskId) => {
  if (taskId) {
    openModal(taskId)
  } else {
    console.error('Invalid taskId:', taskId)
  }
}

const handleAddTask = () => {
  showAddModal.value = true
}

const handleTaskSaved = (savedTask) => {
  tasks.value.push(savedTask)
  showAddModal.value = false
  tasks.value.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn))
}

const cancelAdd = () => {
  showAddModal.value = false
}

const closeModal = () => {
  selectedTask.value = null
}

const openDeleteModal = (taskId) => {
  taskIdToDelete.value = taskId
  showDeleteModal.value = true
}

const handleTaskDeleted = (deletedTaskId) => {
  tasks.value = tasks.value.filter((task) => task.taskId !== deletedTaskId)
  closeDeleteModal()
  // Show success modal after deletion
  showSuccessModal.value = true
  statusCode.value = 200 // You can set your own success status code here
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const handleShowStatusModal = (status) => {
  if (status === 201) {
    showSuccessModal.value = true
    statusCode.value = status
  }
}

onMounted(() => {
  fetchTasks()
})

onMounted(() => {
  const taskId = route.params.taskId
  if (taskId) {
    openModal(taskId)
  }
})
</script>

<style scoped>
#app {
  width: 1500px;
  margin: 0 auto;
}

table-container {
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
