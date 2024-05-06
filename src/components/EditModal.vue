<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Edit Task</h2>

        <form @submit.prevent="handleEditTask">
          <!-- Title Input -->
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              id="title"
              v-model="editedTask.title"
              class="itbkk-title"
              required
            />
          </div>

          <!-- Description Input -->
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              v-model="editedTask.description"
              class="itbkk-description"
              :placeholder="
                editedTask.description ? '' : 'No Description Provided'
              "
            ></textarea>
          </div>

          <!-- Assignees Input -->
          <div class="form-group">
            <label for="assignees">Assignees:</label>
            <input
              type="text"
              id="assignees"
              v-model="editedTask.assignees"
              class="itbkk-assignees"
              :placeholder="editedTask.assignees ? '' : 'Unassigned'"
            />
          </div>

          <!-- Status Select -->
          <div class="form-group">
            <label for="status">Status:</label>
            <select
              id="status"
              v-model="editedTask.status"
              class="itbkk-status"
            >
              <option
                v-for="statusOption in statusOptions"
                :key="statusOption"
                :value="statusOption"
              >
                {{ statusOption }}
              </option>
            </select>
          </div>

          <!-- Display timezone, created date, and updated date -->
          <div class="modal-buttons">
            <button
              class="itbkk-button itbkk-button-confirm"
              type="submit"
              :class="{ disabled: isSaveDisabled }"
              :disabled="isSaveDisabled"
            >
              Save
            </button>
            <button
              class="itbkk-button itbkk-button-cancel"
              type="button"
              @click="cancelModal"
            >
              Cancel
            </button>
          </div>

          <!-- Details Container -->
          <div class="details-container">
            <div class="details-group">
              <strong>Timezone:</strong> {{ timezone }}
              <p>
                <strong>Created Date:</strong>
                {{ formatLocalDate(task.createdOn) }}
              </p>
              <p>
                <strong>Updated Date:</strong>
                {{ formatLocalDate(task.updatedOn) }}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import FetchUtils from '../lib/fetchUtils'

const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  closeModal: {
    type: Function,
    required: true
  },
  onTaskUpdated: {
    type: Function,
    required: true
  }
})
const emit = defineEmits(['editSuccess'])
const editedTask = ref(null)
const statusOptions = ref(['No Status', 'To Do', 'Doing', 'Done']) // Define statusOptions here

if (props.task) {
  editedTask.value = { ...props.task }
}

// Compute the initial state of the task to compare later
const initialTask = JSON.parse(JSON.stringify(props.task))

const isSaveDisabled = computed(() => {
  // Check if the editedTask is different from the initialTask
  return JSON.stringify(editedTask.value) === JSON.stringify(initialTask)
})

const handleEditTask = async () => {
  try {
    const updatedTask = {
      title: editedTask.value.title,
      description: editedTask.value.description,
      assignees: editedTask.value.assignees,
      status: editedTask.value.status,
      updatedOn: new Date().toISOString() // Set updated date to now
    }

    // Make API request to update the task
    const response = await FetchUtils.putData(
      `tasks/${props.task.taskId}`, // Ensure taskId is properly accessed here
      updatedTask
    )

    if (response && response.success) {
      // If update is successful, refresh the task data and close the modal
      props.onTaskUpdated(response.data)
      props.closeModal()
      if (response.statusCode === 200) {
        console.log('StatusCode', response.statusCode)
        emit('editSuccess', response.statusCode) // Emit the event with status code
      }
    } else {
      console.error('Failed to update task')
    }
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

// Function to format local date
const formatLocalDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB')
}

// Compute timezone
const timezone = computed(
  () => Intl.DateTimeFormat().resolvedOptions().timeZone
)
</script>

<style scoped>
/* Styles for EditModal */
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 700px;
}

.modal-content {
  padding: 30px;
}

.modal-title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  text-align: left;
}

input[type='text'],
textarea,
select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

input[type='text'] {
  width: 500px;
}

textarea {
  width: 500px;
  height: 200px;
  resize: none;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
}

.itbkk-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.itbkk-button-confirm {
  background-color: #68d391;
  color: #fff;
}

.itbkk-button-cancel {
  background-color: #f67c5e;
  color: #fff;
}

.itbkk-button-confirm:hover,
.itbkk-button-cancel:hover {
  opacity: 0.8;
}

.details-container {
  position: absolute;
  top: 30px;
  right: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  height: 90px;
  text-align: right;
  background-color: #ffffffb7;
}

.details-group {
  margin-bottom: 10px;
  font-size: 13px;
  padding: 10px;
}

.disabled {
  background-color: gray;
  cursor: not-allowed;
}

.itbkk-description::placeholder,
.itbkk-assignees::placeholder {
  font-style: italic;
}
</style>
