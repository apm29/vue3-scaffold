<template>
  <router-view v-slot="{ Component }" class="tw-h-full">
    <v-slide-x-transition>
      <keep-alive>
        <component :is="Component" class="tw-h-full" />
      </keep-alive>
    </v-slide-x-transition>
  </router-view>
</template>
