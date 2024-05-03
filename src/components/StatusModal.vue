<template>
  <div class="modal-wrapper" v-if="showModal">
    <div class="modal">
      <div class="modal-content">
        <h2 class="modal-title">Success!</h2>
        <p v-if="statusCode === 201">The task has been successfully added.</p>
        <p v-else>Something went wrong. Status code: {{ statusCode }}</p>
        <div class="modal-buttons">
          <button class="itbkk-button button-close" @click="closeModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    statusCode: {
      type: Number,
      default: 0
    },
    closeModal: {
      type: Function,
      required: true
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
  width: 400px;
}

.modal-content {
  padding: 30px;
}

.modal-title {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  color: #22a052;
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

.button-close {
  background-color: #68d391;
  color: #fff;
}

.button-close:hover {
  opacity: 0.8;
}
</style>
