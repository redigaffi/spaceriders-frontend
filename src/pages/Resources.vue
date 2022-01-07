<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          RESOURCES
        </glass-element-heading>
        <div>
          <q-slide-transition>
            <div v-show="currentTabComponent == 'DefaultSlider'">
              <DefaultSlider
                keyName="resources"
                :name="`Resources - ${this.$store.getters.activePlanet.name}`"
                key="defaultSlider"
              ></DefaultSlider>
            </div>
          </q-slide-transition>
          <q-slide-transition :duration="duration">
            <div v-show="currentTabComponent != 'DefaultSlider'">
              <InfoSlider
                key="resourceSlider"
                :data="ressourceInfo"
                type="resource"
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

    <q-dialog v-model="planetClaimedFlag" persistent>
      <q-card style="width: 410px; max-width: 80vw; border-radius: 20px">
        <q-card-section class="q-pa-xs text-center">
          <q-avatar>
            <img src="~assets/img/fireworks.svg" style="height: 35px" />
          </q-avatar>
          <span class="q-ml-sm text-overline" style="font-size: 14px"
            >CONGRATULATIONS</span
          >
        </q-card-section>
        <q-card-section class="q-pa-none row items-center">
          <div class="col">
            <q-img src="~assets/img/1-epic.png">
              <div class="absolute-full text-subtitle2 flex flex-center">
                <q-card-section>
                  <div class="text-center q-pb-md">
                    New Planet has been claimed
                  </div>
                  <div style="width: 400px">
                    <div class="text-secondary tag-glass-element">
                      <q-list dense class="text-left">
                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Diameter :</q-item-section
                          >
                          <q-item-section avatar>
                            {{ diameter }} KM ({{ slotsAvailable }})
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Temperature :</q-item-section
                          >
                          <q-item-section avatar>
                            {{ temperature }}
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Position :
                          </q-item-section>
                          <q-item-section avatar>
                            [{{ position }}]
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Metal Reserve :
                          </q-item-section>
                          <q-item-section avatar>
                            {{ metalReserve }}
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Crystal Reserve :
                          </q-item-section>
                          <q-item-section avatar>
                            {{ crystalReserve }}
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section
                            class="text-subtitle2 text-weight-bold"
                            >Petrol Reserve :
                          </q-item-section>
                          <q-item-section avatar>
                            {{ petrolReserve }}
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                  <div class="text-center q-mr-sm q-pt-md">
                    <q-btn flat label="Close" color="secondary" v-close-popup />
                  </div>
                </q-card-section>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from "vue";
import InfoSlider from "src/components/lvl_up/InfoSlider.vue";
import DefaultSlider from "src/components/lvl_up/Defaultslider.vue";
import ItemList from "src/components/lvl_up/ItemList.vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "Resources",
  components: {
    InfoSlider,
    DefaultSlider,
    ItemList,
    GlassElementHeading,
  },
  setup() {
    const currentTab = ref("DefaultSlider");
    const ressourceInfo = ref();

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

    const planetClaimedFlag = ref(true);

    return {
      planetClaimedFlag,
      duration: 1000,
      slideDiv: slideDiv,
      cancelled: cancelled,
      currentTabComponent: currentTabComponent,
      ressourceInfo: ressourceInfo,
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
