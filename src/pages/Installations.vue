<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          INSTALLATIONS
        </glass-element-heading>

        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider
                :name="`Installations - ${this.$store.getters.activePlanet.name}`"
                key="defaultSlider"
              ></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition :duration="duration">
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
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "Installations",
  components: {
    InfoSlider,
    DefaultSlider,
    ItemList,
    GlassElementHeading,
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
      duration: 1000,
      slideDiv: slideDiv,
      cancelled: cancelled,
      currentTabComponent: currentTabComponent,
      ressourceInfo: ressourceInfo,
    };
  },
});
</script>
