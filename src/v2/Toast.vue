<template>
  <transition name="slide-fade">
    <div
      v-if="show"
      class="toast fixed top-10 right-10 bg-red-500 text-white px-6 py-3 rounded-md flex items-center"
    >
      <span>{{ message }}</span>
      <button
        class="ml-4 bg-transparent text-white cursor-pointer"
        @click="closeToast"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    closeToast() {
      this.$emit('close')
    }
  },
  mounted() {
    if (this.show) {
      setTimeout(() => {
        this.closeToast()
      }, 3000)
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.closeToast()
        }, 3000) 
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-fade-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
