<template>
  <q-separator />

  <q-img
    src="~assets/img/pirate_invasion.webp"
    style="height: 200px; width: 100%"
  />

  <q-card-section class="q-pb-sm">
    <q-item
      style="
        border: 1px solid #242930;
        border-radius: 5px;
        box-shadow: 0 0 5px #606060;
        color: #fff;
        font-size: 12px;
      "
    >
      Bad news Rider... Pirates decided to stop by your planet and steal
      resources.
    </q-item>
  </q-card-section>

  <q-list dense class="text-subtitle2 q-mb-sm">
    <q-item>
      <q-item-section>
        <q-item-label class="text-h6">Resources stolen</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable>
      <q-item-section>
        <q-item-section>Total Stolen</q-item-section>
      </q-item-section>

      <q-item-section class="text-white" side>
        {{ roundToTwo(body.result.loss.total) }}
      </q-item-section>
    </q-item>

    <q-item clickable>
      <q-item-section>
        <q-item-section>Metal Stolen</q-item-section>
      </q-item-section>

      <q-item-section class="text-white" side>
        {{ roundToTwo(body.result.loss.metal) }}
      </q-item-section>
    </q-item>

    <q-item clickable>
      <q-item-section>
        <q-item-section>Crystal Stolen </q-item-section>
      </q-item-section>

      <q-item-section class="text-white" side>
        {{ roundToTwo(body.result.loss.crystal) }}
      </q-item-section>
    </q-item>

    <q-item clickable>
      <q-item-section>
        <q-item-section>Petrol Stolen </q-item-section>
      </q-item-section>

      <q-item-section class="text-white" side>
        {{ roundToTwo(body.result.loss.petrol) }}
      </q-item-section>
    </q-item>
  </q-list>

  <q-card-section class="q-pt-sm">
    <q-expansion-item
      class="shadow-1 overflow-hidden"
      style="border-radius: 5px"
      icon="explore"
      label="Additional details"
      header-class="bg-primary text-white"
      expand-icon-class="text-white"
    >
      <q-list dense class="text-subtitle2 q-mb-sm">
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">Pirate Stats</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-section>Pirate Amount</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.general.amount_space_ships }}
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-section>Distance </q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.general.distance }} m
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-section>Speed </q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.general.speed }} m/s
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>
            <q-item-section>Total Space Pirates Health </q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.general.total_health }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />

      <q-list dense class="text-subtitle2 q-my-sm">
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">Defense overview</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Attack power</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.attack_points }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Total shots</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.total_shots }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Hit Shots </q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.hit_shots }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Missed Shots</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.missed_shots }}
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Accuracy</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.accuracy }}%
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Fail Rate</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.fail_rate }}%
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-section>Total Damage done</q-item-section>
          </q-item-section>

          <q-item-section class="text-white" side>
            {{ body.defense.general.total_damage }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />

      <q-table
        class="q-pa-none q-mt-sm"
        dense
        flat
        square
        title="Breakdown"
        :rows="defenseRows"
        :columns="defenseColumns"
        no-data-label="No defense built... Should serve as lesson."
        hide-pagination
        row-key="name"
      />
    </q-expansion-item>
  </q-card-section>
</template>

<script setup>
import { defineProps, reactive, toRefs } from "vue";
import { useStore } from "vuex";
const $store = useStore();
const props = defineProps({ body: Object });
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
const roundToTwo = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
</script>
