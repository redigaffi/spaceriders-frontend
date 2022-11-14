<template>
  <q-card dark class="q-my-md">
    <q-item>
      <q-item-section class="text-center text-h6">
        <q-item-label>Resources</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-img src="data_img/resources.webp" style="height: 350px; width: 100%">
      <ResourcesDisplay class="absolute-bottom" />
    </q-img>

    <q-card-section class="q-pa-none">
      <q-slide-transition>
        <div v-show="currentTabComponent == 'DefaultSlider'"></div>
      </q-slide-transition>
      <q-slide-transition :duration="duration">
        <div v-show="currentTabComponent != 'DefaultSlider'">
          <InfoSlider
            key="resourceSlider"
            :data="resourceInfo"
            type="resource"
            @cancelled="cancelled"
          />
        </div>
      </q-slide-transition>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <ItemList
        listName="Resource Buildings"
        :data="this.$store.getters.resourceData"
        @change="slideDiv"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import ResourcesDisplay from "src/components/ResourcesDisplay.vue";

export default defineComponent({
  name: "Resources",
  components: {
    InfoSlider,
    ItemList,
    ResourcesDisplay,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const resourceInfo = ref();

    function slideDiv(data) {
      currentTab.value = "ResourceSlider";
      resourceInfo.value = data;
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
      resourceInfo: resourceInfo,
    };
  },
});
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
