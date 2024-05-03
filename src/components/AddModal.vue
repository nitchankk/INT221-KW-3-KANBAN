<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Add Task</h2>

        <form @submit.prevent="saveTask">
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              type="text"
              id="title"
              v-model="taskDetails.title"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              v-model="taskDetails.description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="assignees">Assignees:</label>
            <input type="text" id="assignees" v-model="taskDetails.assignees" />
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select id="status" v-model="taskDetails.status">
              <option
                v-for="statusOption in statusOptions"
                :key="statusOption"
                :value="statusOption"
              >
                {{ statusOption }}
              </option>
            </select>
          </div>

          <div class="modal-buttons">
            <button class="itbkk-button button-done" type="submit">Save</button>
            <button
              class="itbkk-button button-close"
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

<script>
export default {
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      taskDetails: {
        title: '',
        description: '',
        assignees: '',
        status: 'No Status' 
      },
      statusOptions: ['No Status', 'To Do', 'Doing', 'Done'] 
    }
  },
  methods: {
    async saveTask() {
      try {
        const response = await fetch('http://localhost:8080/itb-kk/v1/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.taskDetails)
        })

        if (response.ok) {
          // Get the newly created task from the response
          const newTask = await response.json()

          // Emit the 'save' event to notify the parent component with the new task
          this.$emit('save', newTask)
        } else {
          console.error('Error saving task:', response.statusText)
        }
      } catch (error) {
        console.error('Error saving task:', error)
      }
    },
    cancelModal() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
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
