<template>
  <q-card dark class="q-my-md">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>Research</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img src="data_img/resources.webp" style="height: 300px; width: 100%" />

    <q-card-section class="q-pa-none">
      <q-slide-transition>
        <div v-show="currentTabComponent == 'DefaultSlider'"></div>
      </q-slide-transition>
      <q-slide-transition :duration="duration">
        <div v-show="currentTabComponent != 'DefaultSlider'">
          <InfoSlider
            key="researchSlider"
            :data="researchInfo"
            type="installation"
            @cancelled="cancelled"
          />
        </div>
      </q-slide-transition>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <ItemList
        listName="Research Buildings"
        :data="this.$store.getters.researchData"
        @change="slideDiv"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import GlassElementHeading from "components/GlassElementHeading";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Research",
  components: {
    InfoSlider,
    ItemList,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const researchInfo = ref();

    // const $q = useQuasar();

    // $q.loading.show({
    //   delay: 400, // ms
    // });

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
      duration: 500,
      slideDiv: slideDiv,
      cancelled: cancelled,
      currentTabComponent: currentTabComponent,
      researchInfo: researchInfo,
    };
  },
});
</script>
