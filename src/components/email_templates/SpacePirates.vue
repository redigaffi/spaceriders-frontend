<template>
  <div>
    <q-list dense class="text-subtitle2">
      <q-item style="
          border: 1px solid #242930;
          border-radius: 5px;
          box-shadow: 0 0 5px #606060;
          color: #fff;
          font-size: 12px;
          padding: 7px 15px;
        ">
        <q-item-section class="">
          <q-item-label class="text-body1">
          Bad news Rider... Pirates decided to stop by your planet and steal
          resources.
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list dense class="text-subtitle2 q-mt-lg">
      <q-item>
        <q-item-section class="">
          <q-item-label class="text-h6">Resources stolen</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-white">
          <q-item-section caption>Total Stolen </q-item-section>
        </q-item-section>

        <q-item-section class="col-4 text-right">
          {{ body.result.loss.total }}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="text-white">
          <q-item-section caption>Metal Stolen </q-item-section>
        </q-item-section>

        <q-item-section class="col-4 text-right">
          {{ body.result.loss.metal }}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="text-white">
          <q-item-section caption>Crystal Stolen </q-item-section>
        </q-item-section>

        <q-item-section class="col-4 text-right">
          {{ body.result.loss.crystal }}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="text-white">
          <q-item-section caption>Petrol Stolen</q-item-section>
        </q-item-section>

        <q-item-section class="col-4 text-right">
          {{ body.result.loss.petrol }}
        </q-item-section>
      </q-item>
    </q-list>

    <q-expansion-item class="shadow-1 overflow-hidden q-mt-xl" style="border-radius: 15px" icon="explore"
      label="Additional details" header-class="bg-primary text-white" expand-icon-class="text-white">
      <q-card>
        <q-card-section>
          <q-list dense class="text-subtitle2 q-mb-md">
            <q-item>
              <q-item-section class="">
                <q-item-label class="text-h6">Pirate Stats</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Pirate Amount </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.general.amount_space_ships }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Distance </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.general.distance }}m
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Speed </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.general.speed }}m/s
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section class="text-white">
                <q-item-section caption>Total SpacePirates Health </q-item-section>
              </q-item-section>

              <q-item-section class="col-4 text-right">
                {{ body.general.total_health }}
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


        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>
<script setup>
import { defineProps, reactive, toRefs } from "vue";
import { useStore } from "vuex";

const $store = useStore();

const props = defineProps({
  body: Object,
});

const { body } = toRefs(props);
console.log(body.value);


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

</script>