<template>
  <q-page padding >
    
    <div  class="row col-12 justify-center">
      <div id="m" class="col-7 bg-grey-10 q-py-md q-pa-sm text-center q-mt-xl" style="height: 650px" >
        <!-- <BuyPlanet />
        <ClaimPlanet planetGuid="0b085360-40b6-4eed-85b3-6d8e4030ca33"/> -->
        <BuyPlanet />
        
        <ClaimPlanetList />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import BuyPlanet from '../components/BuyPlanet.vue';
import ClaimPlanetList from '../components/ClaimPlanetList.vue';


export default defineComponent({
  name: "PagePlanet",
  components: {
    ClaimPlanetList,
    BuyPlanet 
  },
  created() {
    
  },
  methods: {
    
  }
});
</script>

<style>


</style>