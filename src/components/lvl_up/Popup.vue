<template>
  <q-card flat class="column fit justify-between" style="max-width: 80vw">
    <q-card-section class="row justify-between">
      <div class="text-h6">{{ item.name }}</div>
      <q-btn flat round size="sm" color="white" icon="close" v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-item
        class="items-center justify-center text-center"
        style="
          border: 1px solid #242930;
          border-radius: 5px;
          box-shadow: 0 0 5px #606060;
          color: #fff;
          font-size: 12px;
        "
      >
        {{ item.description }}
      </q-item>
    </q-card-section>

    <q-scroll-area class="col full-height">
      <q-card-section class="q-pa-none">
        <q-table
          flat
          dense
          square
          hide-bottom
          :rows-per-page-options="[0]"
          :rows="rows"
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr
              :props="props"
              :class="{ 'text-green': props.row.currentLevel }"
            >
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-scroll-area>
  </q-card>
</template>

<script setup>
import { defineProps, reactive, toRefs } from "vue";
import GlassElementHeading from "components/GlassElementHeading";
import Types, { ResourceType } from "../../constants/Types";
import { Background } from "tsparticles/Options/Classes/Background/Background";

const props = defineProps({
  item: Object,
});

const { item } = toRefs(props);

let columns = [
  {
    name: "level",
    label: "Level",
    align: "center",
    field: "level",
  },
  {
    name: "metal",
    align: "right",
    label: "Metal Cost",
    field: "cost_metal",
  },
  {
    name: "crystal",
    label: "Crystal Cost",
    align: "right",
    field: "cost_crystal",
  },
  {
    name: "petrol",
    label: "Petrol Cost",
    align: "right",
    field: "cost_petrol",
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
        align: "right",
        field: "production",
      });
      datafields.push("production");
      columns.push({
        name: "energy",
        label: "Energy / min cost",
        align: "right",
        field: "energy_usage",
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
        align: "right",
        field: "capacity",
      });

      datafields.push("capacity");

      /*
      columns.push({
        name: "energy",
        label: "Energy / min cost",
        align: "center",
        field: "energy",
      });
      datafields.push("energy_usage");
      */
    } else if ([ResourceType.SOLAR_PLANT].includes(item.value.label)) {
      columns.push({
        name: "production",
        label: "Production",
        align: "right",
        field: "production",
      });
      datafields.push("production");

      columns.push({
        name: "energy",
        label: "Energy / min cost",
        align: "right",
        field: "energy_usage",
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
</script>
