<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          RESEARCH
        </glass-element-heading>

        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider
                keyName="research"
                :name="`Research - ${this.$store.getters.activePlanet.name}`"
                key="defaultSlider"
              ></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="1000">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <InfoSlider
                key="researchSlider"
                :data="researchInfo"
                type="installation"
                @cancelled="cancelled"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <ItemList
      listName="Research"
      :data="this.$store.getters.researchData"
      @change="slideDiv"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "Research",
  components: {
    InfoSlider,
    DefaultSlider,
    ItemList,
    GlassElementHeading,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const researchInfo = ref();

    function slideDiv(data) {
      currentTab.value = "ResearchSlider";
      researchInfo.value = data;
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
      researchInfo: researchInfo,
    };
  },
});
</script>
