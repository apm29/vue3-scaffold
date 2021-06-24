<template>
  <router-view v-slot="{ Component }">
    <v-slide-x-transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </v-slide-x-transition>
  </router-view>
</template>
