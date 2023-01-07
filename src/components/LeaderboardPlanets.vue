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
            <div>
              <q-img :src="props.row.image_url_bg" width="96px" height="96px" />
            </div>

            <q-separator vertical />

            <q-card-section class="q-pa-none full-width">
              <q-item-list dense>
                <q-item dense>
                  <q-item-section class="col">
                    <q-item-label class="ellipsis">
                      <q-icon
                        v-if="props.row.index + 1 <= 3"
                        name="fas fa-crown"
                        color="amber"
                      />
                      {{ props.row.planet_name }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="col-2" avatar>
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

                <q-separator />

                <q-item dense>
                  <q-item-section>
                    <q-linear-progress
                      rounded
                      stripe
                      size="24px"
                      :value="
                        (100 * props.row.experience) /
                        props.row.experience_needed /
                        100
                      "
                      color="info"
                    >
                      <span class="absolute-center text-white text-caption"
                        >{{ props.row.experience }}/{{
                          props.row.experience_needed
                        }}
                        XP</span
                      >
                    </q-linear-progress>
                  </q-item-section>
                </q-item>
              </q-item-list>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { ref, defineProps, onUpdated } from "vue";
import { colors } from "quasar";

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

onUpdated(() => {
  props.rows.forEach((row, index) => {
    row.index = index;
  });
});
</script>
