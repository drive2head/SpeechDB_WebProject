<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: #264653" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Меню"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          SpeechDB
        </q-toolbar-title>

<!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Меню
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Войти',
    caption: 'Страница авторизация',
    icon: 'login',
    link: '/signin'
  },
  {
    title: 'Главная',
    caption: 'Главная страница',
    icon: 'star',
    link: '/'
  },
  {
    title: 'Дабавить разметку',
    caption: 'Страница добавления разметки',
    icon: 'add',
    link: '/markup'
  },
  {
    title: 'Посмотреть разметки',
    caption: 'Страница просмотра разметок',
    icon: 'list',
    link: '/markup'
  },
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);

    return {leftDrawerOpen, essentialLinks}
  }
});
</script>
