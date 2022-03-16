<template>
  <div>
    <q-list dense class="text-subtitle2">
      <q-item
        style="
          border: 3px solid red;
          border-radius: 5px;
          box-shadow: 0 0 20px red;
          color: #fff;
          font-size: 12px;
          padding: 7px 15px;
        "
      >
        <q-item-section class="">
          <q-item-label style="word-break: break-all" class="text-body1"
            >Bad news Rider... An asteroid just arrived, take a look at the
            damages caused</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>

    <q-list dense class="text-subtitle2 q-mt-lg">
      <q-item>
        <q-item-section class="text-white">
          <q-table
            title="Damage report"
            :rows="damageRows"
            :columns="damageColumns"
            no-data-label="No damages this time!"
            hide-pagination
            row-key="name"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-expansion-item
      class="shadow-1 overflow-hidden q-mt-xl"
      style="border-radius: 15px"
      icon="explore"
      label="Additional details"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <q-card>
        <q-card-section>
          <q-list dense class="text-subtitle2 q-mb-md">
            <q-item>
              <q-item-section class="">
                <q-item-label class="text-h6">Asteroid stats</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Diameter </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.asteroid.size }}km
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Distance </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.asteroid.distance }}m
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Speed </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.asteroid.speed }}m/s
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Attack Points </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.asteroid.attack_points }}
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <br />
          <q-list dense class="text-subtitle2">
            <q-item>
              <q-item-section class="">
                <q-item-label class="text-h5">Defense overview</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Attack power </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.attack_points }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Total shots </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.total_shots }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Hit Shots </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.hit_shots }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Missed Shots </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.missed_shots }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Accuracy </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.accuracy }}%
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Fail Rate </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.fail_rate }}%
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Total Damage done </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.defense.general.total_damage }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white q-mt-md">
                <q-table
                  title="Breakdown"
                  :rows="defenseRows"
                  :columns="defenseColumns"
                  no-data-label="No defense built... Should serve as lesson."
                  hide-pagination
                  row-key="name"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator />
          <br />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script setup>
import { defineProps, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import Types from "../../constants/Types";

const $store = useStore();

const props = defineProps({
  body: Object,
});

const { body } = toRefs(props);

const defenseColumns = [
  { name: "name", align: "center", label: "Name", field: "name" },
  { name: "quantity", align: "center", label: "Quantity", field: "quantity" },
  {
    name: "attackPoints",
    align: "center",
    label: "Attack Points",
    field: "attackPoints",
  },
];

let defenseRows = [];
for (const key in body.value.defense.items) {
  const item = body.value.defense.items[key];
  const info = $store.getters.defenseData[key];

  if (item.quantity > 0) {
    defenseRows.push({
      name: info.name,
      quantity: item.quantity,
      attackPoints: item.attack_points,
    });
  }
}

const damageColumns = [
  { name: "name", align: "center", label: "Name", field: "name" },
  {
    name: "damageTaken",
    align: "center",
    label: "Damge/Qty Destroyed",
    field: "damageTaken",
  },
  //{ name: 'attackPoints', align: 'center', label: 'Attack Points', field: 'attackPoints'},
];

function getSource(type) {
  switch (type) {
    case Types.DEFENSE_TYPE:
      return $store.getters.defenseData;
    case Types.RESOURCE_TYPE:
      return $store.getters.resourceData;
  }
}

let damageRows = [];

for (const key in body.value.result) {
  const item = body.value.result[key];
  const info = getSource(item.type)[key];

  if (item.damage_taken > 0) {
    damageRows.push({
      name: info.name,
      damageTaken: `${item.damage_taken} (-${item.damage_taken_percentage}%)`,
    });
  }
}
</script>
