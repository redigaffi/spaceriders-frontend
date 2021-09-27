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
            RESOURCES
          </div>
        </q-card-section>
        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'HomeSlider'">
              <HomeSlider key="homeSlider"></HomeSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="200">
            <div v-show="currentTabComponent != 'HomeSlider'">
              <ResourceSlider
                key="resourceSlider"
                :data="ressourceInfo"
                @cancelled="cancelled"
              ></ResourceSlider>
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <resource-buildings @change="slideDiv"></resource-buildings>
    <building-queue></building-queue>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import ResourceSlider from "src/components/lvl_up/ResourceSlider.vue";
import HomeSlider from "components/HomeSlider.vue";
import ResourceBuildings from "src/components/lvl_up/ResourceBuildings.vue";
import BuildingQueue from "src/components/BuildingQueue.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    ResourceSlider,
    HomeSlider,
    ResourceBuildings,
    BuildingQueue,
  },
  setup() {
    const currentTab = ref("HomeSlider");
    const ressourceInfo = ref(false);

    function slideDiv(data) {
      currentTab.value = "ResourceSlider";
      ressourceInfo.value = data;
    }

    const currentTabComponent = computed(() => {
      return currentTab.value;
    });

    function cancelled() {
      currentTab.value = "HomeSlider";
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
