<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          DEFENSES
        </glass-element-heading>

        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider
                keyName="defense"
                :name="`Research - ${this.$store.getters.activePlanet.name}`"
                key="defaultSlider"
              ></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="1000">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <InfoSlider
                itemType
                :data="researchInfo"
                type="installation"
                key="defenseSlider"
                @cancelled="cancelled"
              />
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>
    <ItemList
      itemType
      listName="Defenses"
      :data="this.$store.getters.defenseData"
      @change="slideDiv"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import GlassElementHeading from "components/GlassElementHeading";
import ItemList from "src/components/lvl_up/ItemList.vue";

export default defineComponent({
  name: "Research",
  components: {
    InfoSlider,
    DefaultSlider,
    GlassElementHeading,
    ItemList,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const researchInfo = ref();

    function slideDiv(data) {
      currentTab.value = "DefenseSlider";
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
