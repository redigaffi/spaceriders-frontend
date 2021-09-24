<template>
  <q-page class="container">
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
          <q-slide-transition>
            <div v-show="currentTabComponent != 'HomeSlider'">
              <ResourceSlider
                key="resourceSlider"
                @cancelled="cancelled"
              ></ResourceSlider>
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <resource-buildings @change="slideDiv"></resource-buildings>
    <queue-buildings></queue-buildings>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import ResourceSlider from "components/ResourceSlider.vue";
import HomeSlider from "components/HomeSlider.vue";
import ResourceBuildings from "components/ResourceBuildings.vue";
import QueueBuildings from "src/components/QueueBuildings.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    ResourceSlider,
    HomeSlider,
    ResourceBuildings,
    QueueBuildings,
  },
  setup() {
    const currentTab = ref("HomeSlider");
    function slideDiv() {
      currentTab.value = "ResourceSlider";
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
    };
  },
});
</script>
