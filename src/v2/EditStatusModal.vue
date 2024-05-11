<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white rounded-lg p-6 max-w-md w-full relative z-10">
      <h2 class="text-lg font-semibold mb-4">Edit Status</h2>
      <div v-if="editedStatus">
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label for="statusName" class="block font-semibold mb-1 text-left"
              >Name:</label
            >
            <input
              v-model="editedStatus.statusName"
              type="text"
              id="statusName"
              name="statusName"
              class="w-full border rounded-md p-2 font-medium"
            />
          </div>
          <div class="mb-4">
            <label
              for="statusDescription"
              class="block font-semibold mb-1 text-left"
              >Description:</label
            >
            <textarea
              v-model="editedStatus.statusDescription"
              id="statusDescription"
              name="statusDescription"
              rows="4"
              class="w-full border rounded-md p-2 font-medium"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              @click="emit('closeModal')"
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              :disabled="saveDisabled"
              type="submit"
              class="px-4 py-2 rounded-md"
              :class="{
                'bg-gray-400 text-gray-600 cursor-not-allowed': isSaveDisabled,
                'bg-blue-500 text-white hover:bg-blue-600': !isSaveDisabled
              }"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import fetchUtils from '../lib/fetchUtils'

const props = defineProps({
  isOpen: Boolean,
  statusData: Object
})

const emit = defineEmits(['closeModal'])

const editedStatus = ref({ statusName: '', statusDescription: '' })
const initialStatus = ref({ statusName: '', statusDescription: '' })

watch(
  () => props.statusData,
  (newValue) => {
    if (newValue) {
      editedStatus.value = { ...newValue }
      initialStatus.value = { ...newValue }
    } else {
      editedStatus.value = { statusName: '', statusDescription: '' }
      initialStatus.value = { statusName: '', statusDescription: '' }
    }
  }
)

const isSaveDisabled = computed(() => {
  // Check if the edited status is different from the initial status
  return (
    JSON.stringify(editedStatus.value) === JSON.stringify(initialStatus.value)
  )
})

function saveChanges() {
  console.log('Save changes function called')
  console.log('Event:', event)
  console.log('Edited status:', editedStatus.value)
  fetchUtils
    .putData('statuses', editedStatus.value)
    .then((response) => {
      console.log('Status updated successfully:', response)
      emit('closeModal')
    })
    .catch((error) => {
      console.error('Error updating status:', error)
    })
}
</script>

<style scoped>
.modal-container {
  max-width: 80%;
}
</style>
