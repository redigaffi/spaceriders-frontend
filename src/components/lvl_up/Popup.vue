<template>
  <q-card style="width: 1150px; max-width: 80vw; border-radius: 20px">
    <glass-element-heading
      class="text-h6 text-center text-weight-bold text-secondary q-pt-sm"
    >
      TECHNOLOGY - SOLAR PLANT
      <div class="absolute-right q-mr-sm">
        <q-btn size="sm" round color="primary" icon="close" v-close-popup />
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
            quidem praesentium aspernatur suscipit. Tempora cumque alias fuga
            similique, est esse voluptas repudiandae.
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
                <div class="col-12">
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
                  <q-list dense bordered class="text-center">
                    <q-item
                      clickable
                      v-ripple
                      :class="{ 'text-green': props.row.currentLevel }"
                    >
                      <q-item-section class="col-1">{{
                        props.row.level
                      }}</q-item-section>
                      <q-item-section>{{ props.row.energy }}</q-item-section>
                      <q-item-section>{{
                        props.row.difference
                      }}</q-item-section>
                      <q-item-section>{{
                        props.row.difference_level
                      }}</q-item-section>
                      <q-item-section>{{ props.row.protected }}</q-item-section>
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
</template>

<script>
import { defineComponent } from "vue";
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
  name: "Popup",
  components: {
    GlassElementHeading,
  },
  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>
