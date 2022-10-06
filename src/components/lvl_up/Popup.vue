<template>
  <q-card style="width: 1150px; max-width: 80vw; border-radius: 20px">
    <glass-element-heading
      class="text-h6 text-center text-weight-bold text-secondary q-pt-sm"
    >
      {{ item.name }}
      <div class="absolute-right q-mr-sm">
        <q-btn size="sm" round color="primary" icon="close" v-close-popup />
      </div>
    </glass-element-heading>

    <q-card-section class="row q-col-gutter-md">
      <div class="col-3">
        <img
          :src="`data_img/${item.label}.webp`"
          alt=""
          style="width: 100%; height: 270px"
        />
      </div>
      <div class="col">
        <q-card-section class="q-pt-none q-pl-none">
          <div class="text-caption">
            {{ item.description }}
          </div>
          <div class="q-pt-md">
            <q-list dense class="text-center bg-warning">
              <q-item>
                <q-item-section
                  :class="column.class"
                  v-for="column in columns"
                  :key="column"
                  >{{ column.label }}</q-item-section
                >
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
                  <q-list dense bordered class="text-center">
                    <q-item
                      clickable
                      v-ripple
                      :class="{ 'text-green': props.row.currentLevel }"
                    >
                      <q-item-section class="col-1">{{
                        props.row.level
                      }}</q-item-section>
                      <q-item-section>{{
                        props.row.cost_metal
                      }}</q-item-section>
                      <q-item-section>{{
                        props.row.cost_crystal
                      }}</q-item-section>
                      <q-item-section>{{
                        props.row.cost_petrol
                      }}</q-item-section>

                      <q-item-section v-if="props.row.production >= 0">{{
                        props.row.production
                      }}</q-item-section>

                      <q-item-section v-if="props.row.energy_usage >= 0">{{
                        props.row.energy_usage
                      }}</q-item-section>

                      <q-item-section v-if="props.row.capacity >= 0">{{
                        props.row.capacity
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
</template>

<script setup>
import { defineProps, reactive, toRefs } from "vue";
import GlassElementHeading from "components/GlassElementHeading";
import Types, { ResourceType } from "../../constants/Types";

const props = defineProps({
  item: Object,
});

const { item } = toRefs(props);

let columns = [
  {
    name: "",
    required: true,
    label: "Level",
    align: "left",
    field: "level",
    class: "col-1",
  },
  {
    name: "metal",
    align: "center",
    label: "Metal Cost",
    field: "metal",
  },
  {
    name: "crystal",
    label: "Crystal Cost",
    align: "center",
    field: "crystal",
  },
  {
    name: "petrol",
    label: "Petrol Cost",
    //field: (row) => row.name,
    align: "center",
    field: "petrol",
  },
];

let datafields = ["cost_metal", "cost_crystal", "cost_petrol"];

switch (item.value.type) {
  case Types.RESOURCE_TYPE:
    if (
      [
        ResourceType.CRYSTAL_MINE,
        ResourceType.METAL_MINE,
        ResourceType.PETROL_MINE,
      ].includes(item.value.label)
    ) {
      columns.push({
        name: "production",
        label: "Production / Min",
        align: "center",
        field: "production",
      });
      datafields.push("production");
      columns.push({
        name: "energy",
        label: "Required energy",
        align: "center",
        field: "energy",
      });
      datafields.push("energy_usage");
    } else if (
      [
        ResourceType.CRYSTAL_WAREHOUSE,
        ResourceType.METAL_WAREHOUSE,
        ResourceType.PETROL_WAREHOUSE,
      ].includes(item.value.label)
    ) {
      columns.push({
        name: "capacity",
        label: "Capacity",
        align: "center",
        field: "capacity",
      });

      datafields.push("capacity");

      /*
      columns.push({
        name: "energy",
        label: "Required energy",
        align: "center",
        field: "energy",
      });
      datafields.push("energy_usage");
      */
    } else if ([ResourceType.SOLAR_PLANT].includes(item.value.label)) {
      columns.push({
        name: "production",
        label: "Production",
        align: "center",
        field: "production",
      });
      datafields.push("production");

      columns.push({
        name: "energy",
        label: "Required energy",
        align: "center",
        field: "energy",
      });
      datafields.push("energy_usage");
    }
    break;
}

let rows = [];

for (let upgradeIdx in item.value.upgrades) {
  const upgrade = item.value.upgrades[upgradeIdx];

  let row = {
    level: upgrade.level,
  };

  datafields.forEach((d) => {
    row[d] = upgrade[d];
  });

  row.currentLevel = upgrade.level === item.value.level;

  rows.push(row);
}
console.log(rows);
</script>
