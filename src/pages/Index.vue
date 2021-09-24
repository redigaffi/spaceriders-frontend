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
          <transition name="slide-up" mode="slide-up" appear>
            <component
              :is="currentTabComponent"
              :data="ressourceInfo"
              @cancelled="cancelled"
            ></component>
          </transition>
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
    const ressourceInfo = ref("ressourceInfo");

    function slideDiv(data) {
      currentTab.value = "ResourceSlider";
      console.log(data)
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
<style lang="scss">
.tag-glass-element {
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.tag-glass-element:before {
  content: "";
  position: absolute;
  background: rgba($dark, 0.7);
  z-index: -1;
  // border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.glass-element {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.glass-element:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba($dark, 0.7);
  filter: blur(10px);
  margin: -20px;
}

.image {
  position: relative;
}

.image img {
  width: 100%;
  vertical-align: top;
}

.image:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.image:hover:after {
  content: attr(data-content);
  color: #fff;
  padding: 20px;
  opacity: 1;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
