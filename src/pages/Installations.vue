<template>
  <q-page>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white q-pa-md">
        <q-card-section class="row fit justify-between items-center">
          <div></div>
          <div
            class="
              text-h6 text-center text-weight-bold text-secondary
              absolute-center
            "
          >
            INSTALLATIONS
          </div>
        </q-card-section>
        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider :name="`Installations - ${this.$store.getters.activePlanet.name}`" key="defaultSlider"></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="1000">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <InfoSlider
                key="resourceSlider"
                :data="ressourceInfo"
                type="installation"
                @cancelled="cancelled"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <ItemList
      listName="Installations"
      :data="this.$store.getters.installationData"
      @change="slideDiv"
    />
    
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";

export default defineComponent({
  name: "Installations",
  components: {
    InfoSlider,
    DefaultSlider,
    ItemList,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const ressourceInfo = ref(false);

    function slideDiv(data) {
      currentTab.value = "ResourceSlider";
      ressourceInfo.value = data;
    }

    const currentTabComponent = computed(() => {
      return currentTab.value;
    });

    function cancelled() {
      currentTab.value = "DefaultSlider";
    }

    return {
      slideDiv: slideDiv,
      cancelled: cancelled,
      currentTabComponent: currentTabComponent,
      ressourceInfo: ressourceInfo,
    };
  },
});
</script>
