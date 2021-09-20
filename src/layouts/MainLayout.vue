<template>
  <q-layout view="hHh lpR fFf">

    <headerbar />

    <q-page-container  id="main">
      <router-view />
    </q-page-container>

  </q-layout>
</template>
<script>



import { defineComponent, ref } from 'vue'
import Headerbar from '../components/HeaderBar.vue';

//https://quasar.dev/layout/routing-with-layouts-and-pages
export default defineComponent({
  name: 'MainLayout',

  components: {
    Headerbar
  },
  

  setup () {
  
    
  }
})
</script>

<style>


#main{
  border: 1px solid black;
  background: url('../assets/img/bg1.jpeg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  
}
</style>