<template>
  <teleport to="body">
    <v-overlay
      absolute
      :modelValue="dialogStore.show"
      @update:modelValue="onClick()"
    >
      <v-dialog-bottom-transition>
        <v-card color="white" class="dialog-wrapper" v-if="dialogStore.show">
          <v-card-title> </v-card-title>
          <v-card-text class="tw-px-12 tw-py-4">
            <v-icon v-if="dialogStore.type === 'confirm'">
              mdi-information-outline
            </v-icon>
            {{ dialogStore.message }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              v-if="dialogStore.type === 'confirm'"
              small
              text
              @click="dialogStore.cancel()"
            >
              取消
            </v-btn>
            <v-btn small color="primary" @click="dialogStore.confirm()">
              确认
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog-bottom-transition>
    </v-overlay>
  </teleport>
</template>

<script>
import { dialogStore } from "./dialog";
export default {
  name: "Dialogs",
  data: () => ({
    dialogStore,
  }),
  methods: {
    onClick(value) {
      if (dialogStore.type === "alert" && !value) {
        dialogStore.cancel();
      }
    },
  },
};
</script>

<style scoped>
.dialog-wrapper {
  min-width: 12rem;
}
</style>
