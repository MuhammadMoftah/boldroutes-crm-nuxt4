<template>
  <dialog class="modal modal-open">
    <div class="modal-box overflow-y-auto" :class="modalClasses">
      <h3 class="text-lg font-bold text-slate-900">
        <slot name="modal-title"></slot>
      </h3>
      <p class="py-4">
        <slot name="modal-body"></slot>
      </p>

      <slot name="modal-footer">
        <footer class="modal-action gap-2">
          <button class="btn btn-theme h-9" @click="$emit('submitted')">Submit</button>
          <button @click="$modal.value = ''" class="btn btn-ghost h-9 font-medium text-slate-700">
            Close
          </button>
        </footer>
      </slot>
    </div>

    <aside method="dialog" class="modal-backdrop" @click="$closeModal()">
      <button>close</button>
    </aside>
  </dialog>
</template>
<script setup lang="ts">
defineProps(['modalClasses'])
</script>
