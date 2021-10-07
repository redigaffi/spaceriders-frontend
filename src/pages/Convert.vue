<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          Convert
        </glass-element-heading>
        <q-tabs v-model="tab">
          <q-tab name="mails" label="Claimable" />
          <q-tab name="alarms" label="Tokens" />
          <q-tab name="movies" label="Resources" />
        </q-tabs>
        <div class="q-pa-md">
          <q-table
            title="Requests"
            grid
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
          >
            <!-- :rows-per-page-options="[5]" -->
            <template v-slot:top-right>
              <div class="q-gutter-sm">
                <q-btn
                  color="primary"
                  label="Convert Tokens"
                  no-caps
                  unelevated
                />
                <q-btn
                  color="primary"
                  label="Convert Resources"
                  no-caps
                  unelevated
                />
              </div>
            </template>

            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12">
                <q-card>
                  <q-card-section class="justify-between" :horizontal="$q.screen.gt.sm">
                    <q-card-section class="text-weight-bold">
                      <strong>{{ props.row.name }}</strong>
                      <br />
                      <div>
                        <q-card
                          flat
                          class="
                            bg-transparent
                            row
                            q-col-gutter-sm q-py-md
                            text-center text-subtitle2
                          "
                        >
                          <div>
                            <div>
                              <img
                                src="~assets/img/resources/RES_ic_Metal.png"
                                alt=""
                                srcset=""
                                class="resource-icon-small"
                              />
                              <div class="text-secondary">200 Metal</div>
                            </div>
                          </div>

                          <div>
                            <div>
                              <img
                                src="~assets/img/resources/RES_ic_FUEL2.png"
                                alt=""
                                srcset=""
                                class="resource-icon-small"
                              />
                              <div class="text-secondary">200 Petrol</div>
                            </div>
                          </div>

                          <div>
                            <div>
                              <img
                                src="~assets/img/resources/RES_ic_CRYSTAL.png"
                                alt=""
                                class="resource-icon-small"
                                srcset=""
                              />
                              <div class="text-secondary">200 Crystal</div>
                            </div>
                          </div>

                          <div class="flex flex-center">
                            <div>
                              <q-icon size="md" name="graphic_eq" />
                            </div>
                          </div>
                          <div>
                            <div>
                              <img
                                src="~assets/img/resources/RES_ic_CRYSTAL.png"
                                alt=""
                                class="resource-icon-small"
                                srcset=""
                              />
                              <div class="text-secondary">100 Tokens</div>
                            </div>
                          </div>
                        </q-card>
                      </div>
                    </q-card-section>
                    <q-card-section
                      class="flex flex-center"
                      style="letter-spacing: 3px"
                    >
                      <strong>10/08/2021</strong>
                      <br />
                    </q-card-section>
                    <q-card-section class="flex flex-center">
                      <q-btn color="primary" label="Claim" glossy />
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import GlassElementHeading from "components/GlassElementHeading";

const columns = [
  {
    name: "desc",
    required: true,
    label: "ID",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Remarks",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "", field: "fat", sortable: true },
];

const rows = [
  {
    name: "Convert Resources to Tokens",
    calories: 159,
    fat: 6.0,
  },
  {
    name: "Convert Tokens to Resources",
    calories: 237,
    fat: 9.0,
  },
];
export default defineComponent({
  name: "Research",
  components: {
    GlassElementHeading,
  },
  setup() {
    return {
      filter: ref(""),
      columns,
      rows,
    };
  },
});
</script>
