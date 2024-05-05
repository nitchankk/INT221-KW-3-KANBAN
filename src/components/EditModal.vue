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

          <!-- Modal Buttons -->
          <div class="modal-buttons">
            <button class="itbkk-button itbkk-button-confirm" type="submit">
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
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
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

const statusOptions = ref(['No Status', 'To Do', 'Doing', 'Done'])
const editedTask = ref(null)

if (props.task) {
  editedTask.value = { ...props.task }
}

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

    if (response) {
      // If update is successful, refresh the task data and close the modal
      props.onTaskUpdated(response)
      props.closeModal()
    } else {
      console.error('Failed to update task')
    }
  } catch (error) {
    console.error('Error updating task:', error)
  }
}

const cancelModal = () => {
  props.closeModal()
}
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
  width: 100%;
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
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.details-group {
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
