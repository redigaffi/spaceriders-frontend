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
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider key="defaultSlider"></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="200">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <InfoSlider
                key="resourceSlider"
                :data="ressourceInfo"
                @cancelled="cancelled"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <ItemList
      listName="Resource Buildings"
      :data="this.$store.getters.resourceData"
      @change="slideDiv"
    />
    <building-queue></building-queue>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import BuildingQueue from "src/components/BuildingQueue.vue";

export default defineComponent({
  name: "Resources",
  components: {
    InfoSlider,
    DefaultSlider,
    ItemList,
    BuildingQueue,
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
