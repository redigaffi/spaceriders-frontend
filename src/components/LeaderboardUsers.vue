<template>
  <q-table
    grid
    :rows="props.rows"
    :columns="props.columns"
    row-key="name"
    v-model:pagination="pagination"
    :rows-per-page-options="[15, 30, 60, 90, 0]"
    hide-header
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-12 col-sm-6 col-md-4">
        <q-card
          flat
          bordered
          :style="
            props.row.index + 1 <= 10
              ? `border: 1px solid ${getPaletteColor('amber')}`
              : ''
          "
        >
          <q-card-section class="q-pa-none" horizontal>
            <q-avatar color="secondary" size="64px" square>
              <q-img v-html="jdenticon.toSvg(props.row.wallet, 64)" />
            </q-avatar>

            <q-separator vertical />

            <q-card-section class="q-pa-none full-width">
              <q-item-list dense>
                <q-item dense>
                  <q-item-section>
                    <q-item-label>
                      <q-icon
                        v-if="props.row.index + 1 <= 3"
                        name="fas fa-crown"
                        color="amber"
                      />
                      {{ props.row.username || shortAddress(props.row.wallet) }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-item-label> #{{ props.row.index + 1 }} </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item dense>
                  <q-item-section>
                    <q-item-label> Level: </q-item-label>
                  </q-item-section>

                  <q-item-section avatar>
                    <q-item-label>
                      {{ props.row.level }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-item-list>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-none">
            <q-item-list dense>
              <q-item dense>
                <q-item-section>
                  <q-item-label> Title: </q-item-label>
                </q-item-section>

                <q-item-section avatar>
                  <q-item-label>
                    {{ accountTitle(props.row.level) }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense>
                <q-item-section>
                  <q-item-label> Faction: </q-item-label>
                </q-item-section>

                <q-item-section avatar>
                  <q-item-label> Free Worlds </q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense>
                <q-item-section>
                  <q-item-label> Dominion: </q-item-label>
                </q-item-section>

                <q-item-section avatar>
                  <q-item-label> {{ props.row.dominion }}% </q-item-label>
                </q-item-section>
              </q-item>
            </q-item-list>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { ref, defineProps, onUpdated } from "vue";
import { colors } from "quasar";
import jdenticon from "jdenticon/standalone";

const { getPaletteColor } = colors;

const props = defineProps({
  rows: { type: Array, required: true },
  columns: { type: Array, required: true },
  rowsPerPage: {
    type: Number,
    required: false,
    default: 15,
  },
});

const pagination = ref({
  page: 1,
  rowsPerPage: props.rowsPerPage,
});

const shortAddress = (address) => {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4
  )}`;
};

onUpdated(() => {
  props.rows.forEach((row, index) => {
    row.index = index;
  });
});

const accountTitle = (level) => {
  if (level <= 1) return "Human";
  else if (level <= 5) return "Amateur Astronaut";
  else if (level <= 10) return "Rookie Astronaut";
  else if (level <= 15) return "Professional Astronaut";
  else if (level <= 20) return "Planet Manager";
  else if (level <= 25) return "Planet Lord";
  else if (level <= 30) return "Space Explorer";
  else if (level <= 35) return "Space Traveller";
  else if (level <= 40) return "Space Conqueror";
  else if (level <= 45) return "Space Lord";
  else return "Space Rider";
};
</script>
