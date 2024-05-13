<template>
  <div class="modal-mask" v-if="isOpen">
    <div class="modal-container">
      <h2 class="text-lg font-semibold mb-4">Delete Status</h2>
      <p class="text-left mb-4">Are you sure you want to delete the status?</p>
      <div class="flex justify-end">
        <button
          type="button"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
          @click="deleteStatus"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
  <Toast
    :show="showToast"
    :statusCode="statusCode"
    @close="showToast = false"
  />
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import fetchUtils from '../lib/fetchUtils'
import Toast from './Toast.vue'

const props = defineProps({
  isOpen: Boolean,
  statusIdToDelete: Number
})

const emit = defineEmits(['closeModal', 'statusDeleted'])

const showToast = ref(false)

const statusCode = ref(0)

const closeModal = () => {
  emit('closeModal')
}

const deleteStatus = async () => {
  try {
    if (typeof props.statusIdToDelete === 'undefined') {
      throw new Error('Status ID to delete is not defined')
    }

    if (props.statusIdToDelete === 1) {
      throw new Error('The "No Status" status cannot be deleted')
    }

    const response = await fetchUtils.deleteData(
      `statuses/${props.statusIdToDelete}`
    )
    statusCode.value = response.statusCode // Assign value to outer ref variable
    if (response.success) {
      console.log('Status deleted successfully!', statusCode.value)
      emit('statusDeleted')
      showToast.value = true
      closeModal()
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.error('Error deleting status:', error.message)
    console.log(statusCode.value)
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 300px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
