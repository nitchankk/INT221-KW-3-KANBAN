<template>
  <div>
    <h1 class="text-2xl font-bold">IT Bangmod Kradan Kanban by kw-3</h1>
    <div id="app">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="border px-4 py-2 itbkk-button-add">
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
              <th class="border px-4 py-2" style="text-align: center">
                <button
                  @click="toggleActionButtons"
                  style="
                    border: none;
                    background: none;
                    padding: 0;
                    font-size: x-large;
                    font-weight: bold;
                    color: grey;
                  "
                  class="itbkk-button-action"
                >
                  <img
                    src="../assets/menu-bar.png"
                    alt="Action Icon"
                    style="
                      width: 25px;
                      height: 25px;
                      display: block;
                      margin: 0 auto;
                    "
                  />
                </button>
              </th>
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
              <td class="border px-4 py-2" style="width: 60px">
                <div class="action-buttons">
                  <div v-if="showActionButtons" class="action-button-options">
                    <button
                      @click="openEditModal(task.taskId)"
                      style="
                        border: none;
                        background: none;
                        padding: 0;
                        margin-right: 10px;
                      "
                    >
                      <img
                        src="../assets/edit.png"
                        alt="Edit Icon"
                        style="width: 25px; height: 25px"
                      />
                    </button>

                    <button
                      @click="openDeleteModal(task.taskId)"
                      style="border: none; background: none; padding: 0"
                      class="itbkk-button-action"
                    >
                      <img
                        src="../assets/delete2.png"
                        alt="Delete Icon"
                        style="width: 25px; height: 25px"
                      />
                    </button>
                  </div>
                </div>
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
      :operationType="operationType"
    />

    <delete-modal
      v-if="showDeleteModal"
      :closeModal="closeDeleteModal"
      :taskId="taskIdToDelete"
      :taskTitle="taskTitleToDelete"
      :taskIndex="taskIndexToDelete"
      @deleted="handleTaskDeleted"
    />
    <edit-modal
      v-if="showEditModal"
      :task="taskToEdit"
      :closeModal="closeEditModal"
      :onTaskUpdated="onTaskUpdated"
      @editSuccess="handleEditSuccess"
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
import EditModal from './EditModal.vue'
import FetchUtils from '../lib/fetchUtils'

const tasks = ref([])
const selectedTask = ref(null)
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const showSuccessModal = ref(false)
const statusCode = ref(null)
const taskIdToDelete = ref(null)
const showEditModal = ref(false)
const taskToEdit = ref(null)
const operationType = ref('')
const taskTitleToDelete = ref(null)
const taskIndexToDelete = ref(null)
const showActionButtons = ref(false)

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
    const data = await FetchUtils.fetchData('tasks')
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
    const data = await FetchUtils.fetchData(`tasks/${taskId}`)
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
  operationType.value = 'add'
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
  const task = tasks.value.find((task) => task.taskId === taskId)
  if (task) {
    taskIdToDelete.value = taskId
    taskTitleToDelete.value = task.title
    taskIndexToDelete.value = tasks.value.indexOf(task) + 1
    operationType.value = 'delete'
    showDeleteModal.value = true
  }
}

const handleTaskDeleted = (deletedTaskId, receivedStatusCode) => {
  console.log('Received deletion status code:', receivedStatusCode)
  statusCode.value = receivedStatusCode // Set statusCode here
  tasks.value = tasks.value.filter((task) => task.taskId !== deletedTaskId)
  closeDeleteModal()
  // Show success modal after deletion
  showSuccessModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const handleShowStatusModal = (status) => {
  if (status === 201 || status === 200) {
    // If the status is 201 or 200, show the success modal
    showSuccessModal.value = true
    statusCode.value = status
  }
}

const openEditModal = async (taskId) => {
  try {
    const data = await FetchUtils.fetchData('tasks', taskId)
    taskToEdit.value = data
    if (taskToEdit.value) {
      operationType.value = 'edit' // Set operationType to 'edit' when opening edit modal
      showEditModal.value = true
    }
  } catch (error) {
    console.error('Error fetching task details:', error)
  }
}

const closeEditModal = () => {
  showEditModal.value = false
}

const onTaskUpdated = (updatedTask) => {
  const taskIndex = tasks.value.findIndex(
    (task) => task.taskId === updatedTask.taskId
  )
  if (taskIndex !== -1) {
    tasks.value[taskIndex] = updatedTask
  }
}

const handleEditSuccess = (status) => {
  console.log('Received status code after edit:', status)
  statusCode.value = status
  showSuccessModal.value = true
}

const toggleActionButtons = () => {
  showActionButtons.value = !showActionButtons.value
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
  height: 40px;
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

.action-buttons {
  display: flex;
}

.action-button {
  display: flex;
  border: none;
  background: none;
  padding: 0;
  margin-right: 10px;
}
</style>
