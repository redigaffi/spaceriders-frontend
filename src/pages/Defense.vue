<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          DEFENSE
        </glass-element-heading>

        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider
                :name="`Research - ${this.$store.getters.activePlanet.name}`"
                key="defaultSlider"
              ></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition duration="1000">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <DefenseSlider key="defenseSlider" @cancelled="cancelled" />
            </div>
          </q-slide-transition>
        </div>
      </q-card>
    </div>

    <div class="q-pt-sm">
      <q-card class="glass-element text-white q-pa-md">
        <q-card-section class="row fit justify-between items-center">
          <div
            class="
              text-h6 text-center text-weight-bold text-secondary
              absolute-center
            "
          >
            LIST OF ITEMS
          </div>
        </q-card-section>
        <div>
          <q-card-section class="row q-col-gutter-sm justify-start">
            <div
              class="col-xs-6 col-sm-4 col-md-2 q-pa-sm text-center"
              v-for="(value, key) in 8"
              :key="key"
            >
              <q-card
                flat
                class="bg-transparent text-dark cursor-pointer"
                @click="slideDiv"
              >
                <q-btn
                  dense
                  size="md"
                  class="absolute-top"
                  color="warning"
                  icon="expand_less"
                  style="z-index: 1"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    class="bg-primary text-subtitle2"
                  >
                    Upgrade PROD to level 2
                  </q-tooltip>
                </q-btn>
                <q-card-section class="q-pa-none">
                  <q-card flat class="bg-transparent text-dark cursor-pointer">
                    <img src="~assets/img/planet1.jpg" style="height: 110px" />

                    <q-card-section
                      class="
                        q-pa-xs
                        text-warning
                        absolute-bottom
                        tag-glass-element
                      "
                    >
                      2
                    </q-card-section>
                    <!-- <q-card-section class="bg-dark">
                    <q-btn color="warning" class="q-px-lg" label="Claim" />
                  </q-card-section> -->
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                      class="bg-primary text-subtitle2"
                    >
                      PROD
                    </q-tooltip>
                  </q-card>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import DefenseSlider from "src/components/DefenseSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "Research",
  components: {
    DefenseSlider,
    DefaultSlider,
    GlassElementHeading,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const researchInfo = ref();

    function slideDiv() {
      currentTab.value = "DefenseSlider";
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
