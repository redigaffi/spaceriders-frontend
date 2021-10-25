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

    <q-dialog v-model="showInfo">
      <q-card style="width: 1150px; max-width: 80vw; border-radius: 20px">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary q-pt-sm"
        >
          TECHNOLOGY - SOLAR PLANT
          <div class="absolute-right q-mr-sm">
            <q-btn round color="primary" icon="close" v-close-popup />
          </div>
        </glass-element-heading>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-3">
            <img
              src="~assets/img/data_img/Factory_Energy.png"
              alt=""
              style="width: 100%; height: 270px"
            />
          </div>
          <div class="col">
            <q-card-section class="q-pt-none q-pl-none">
              <div class="text-caption">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque
                voluptas nam facilis temporibus optio repellat quia doloribus,
                quidem praesentium aspernatur suscipit. Tempora cumque alias
                fuga similique, est esse voluptas repudiandae.
              </div>
              <div class="q-pt-md">
                <!-- <q-table
                  dense
                  :rows="rows"
                  :columns="columns"
                  row-key="name"
                  rows-per-page-label=" "
                  hide-bottom
                  :rows-per-page-options="[0]"
                /> -->

                <q-list dense class="text-center bg-warning">
                  <q-item>
                    <q-item-section class="col-1">Level</q-item-section>
                    <q-item-section>Energy Balance</q-item-section>
                    <q-item-section>Difference</q-item-section>
                    <q-item-section>Difference / Level</q-item-section>
                    <q-item-section>Protected</q-item-section>
                  </q-item>
                </q-list>

                <q-table
                  grid
                  :rows="rows"
                  :columns="columns"
                  row-key="name"
                  rows-per-page-label=" "
                  hide-bottom
                  :rows-per-page-options="[0]"
                >
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-12">
                      <!-- <q-card>
                        <q-card-section class="text-center">
                          Calories for
                          <br />
                          <strong>{{ props.row.name }}</strong>
                        </q-card-section>
                        <q-separator />
                        <q-card-section
                          class="flex flex-center"
                          :style="{ fontSize: props.row.calories + 'px' }"
                        >
                          <div>{{ props.row.calories }} g</div>
                        </q-card-section>
                      </q-card> -->
                      <q-list dense class="text-center">
                        <q-item
                          clickable
                          v-ripple
                          :class="{ 'text-green': props.row.currentLevel }"
                        >
                          <q-item-section class="col-1">{{
                            props.row.level
                          }}</q-item-section>
                          <q-item-section>{{
                            props.row.energy
                          }}</q-item-section>
                          <q-item-section>{{
                            props.row.difference
                          }}</q-item-section>
                          <q-item-section>{{
                            props.row.difference_level
                          }}</q-item-section>
                          <q-item-section>{{
                            props.row.protected
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </template>
                </q-table>
              </div>
            </q-card-section>
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

const columns = [
  {
    name: "",
    required: true,
    label: "Level",
    align: "left",
    field: "level",
  },
  {
    name: "energy",
    align: "center",
    label: "Energy Balance",
    field: "energy",
  },
  {
    name: "difference",
    label: "Difference",
    align: "center",
    field: "difference",
  },
  {
    name: "difference_level",
    label: "Difference/level",
    field: (row) => row.name,
    align: "center",
    field: "difference_level",
  },
  {
    name: "protected",
    label: "Protected",
    align: "center",
    field: "protected",
  },
];

const rows = [
  {
    level: 1,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
    currentLevel: true,
  },
  {
    level: 2,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 3,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 4,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 5,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 6,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 7,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 8,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 9,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
  {
    level: 10,
    energy: 22,
    difference: 22,
    difference_level: 22,
    protected: 0,
  },
];
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

    return {
      duration: 1000,
      slideDiv: slideDiv,
      cancelled: cancelled,
      currentTabComponent: currentTabComponent,
      ressourceInfo: ressourceInfo,

      showInfo: ref(true),
      columns,
      rows,
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
