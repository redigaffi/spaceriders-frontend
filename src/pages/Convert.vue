<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          CONVERT
        </glass-element-heading>

        <!-- CLAIMABLE -->
        <div>
          <q-table
            grid
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            hide-header
            v-model:pagination="pagination"
            :rows-per-page-options="rowsPerPageOptions"
          >
            <template v-slot:top-right>
              <q-btn
                color="primary"
                no-caps
                label="Convert Resources"
                class="q-mr-sm"
                @click="convertResourcesDialog = true"
              />
              <q-btn
                color="primary"
                no-caps
                label="Convert Tokens"
                @click="convertTokensDialog = true"
              />
            </template>

            <template v-slot:item="props">
              <div
                class="q-pa-xs col-12"
                v-if="props.row.convertToToken == true"
              >
                <q-card class="row">
                  <q-card-section class="col">
                    <strong>{{
                      "#" + props.row.id + " " + props.row.name
                    }}</strong>
                    <br />
                    <q-card
                      flat
                      class="bg-transparent row q-col-gutter-sm q-py-md"
                    >
                      <div class="text-center text-subtitle2">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_Metal.png"
                            alt=""
                            srcset=""
                            class="resource-icon-small"
                          />
                          <div class="text-secondary">
                            {{ props.row.metal }} Metal
                          </div>
                        </div>
                      </div>

                      <div class="text-center text-subtitle2">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_FUEL5.png"
                            alt=""
                            srcset=""
                            class="resource-icon-small"
                          />
                          <div class="text-secondary">
                            {{ props.row.petrol }} Petrol
                          </div>
                        </div>
                      </div>

                      <div class="text-center text-subtitle2">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_CRYSTAL.png"
                            alt=""
                            class="resource-icon-small"
                            srcset=""
                          />
                          <div class="text-secondary">
                            {{ props.row.crystal }} Crystal
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-center">
                        <q-icon name="trending_flat" size="40px" />
                      </div>
                      <div class="text-center text-subtitle2 text-weight-bold">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_CRYSTAL.png"
                            alt=""
                            class="resource-icon-small"
                            srcset=""
                          />
                          <div class="text-secondary">
                            {{ props.row.token }} Tokens
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card-section>
                  <q-card-section
                    class="col-2 flex flex-center text-weight-bold"
                    style="letter-spacing: 3px"
                  >
                    10/13/21
                  </q-card-section>
                  <q-card-section
                    class="col-2 flex flex-center"
                    v-if="props.row.claim == false"
                  >
                    <q-btn
                      color="warning"
                      glossy
                      label="Claim"
                      no-caps
                      v-if="props.row.readyToClaim == true"
                    />
                    <div
                      v-if="props.row.readyToClaim == false"
                      class="text-caption"
                    >
                      Ready to Claim in
                      <span class="text-weight-bold">2h</span>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="q-pa-xs col-12"
                v-if="props.row.convertToToken == false"
              >
                <q-card class="row">
                  <q-card-section class="col">
                    <strong>{{
                      "#" + props.row.id + " " + props.row.name
                    }}</strong>
                    <br />
                    <q-card
                      flat
                      class="bg-transparent row q-col-gutter-sm q-py-md"
                    >
                      <div class="text-center text-subtitle2">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_Metal.png"
                            alt=""
                            srcset=""
                            class="resource-icon-small"
                          />
                          <div class="text-secondary">
                            {{ props.row.token }} Token
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-center">
                        <q-icon name="trending_flat" size="40px" />
                      </div>

                      <div class="text-center text-subtitle2 text-weight-bold">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_FUEL5.png"
                            alt=""
                            srcset=""
                            class="resource-icon-small"
                          />
                          <div class="text-secondary">
                            {{ props.row.petrol }} Metal
                          </div>
                        </div>
                      </div>

                      <div class="text-center text-subtitle2 text-weight-bold">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_CRYSTAL.png"
                            alt=""
                            class="resource-icon-small"
                            srcset=""
                          />
                          <div class="text-secondary">
                            {{ props.row.crystal }} Petrol
                          </div>
                        </div>
                      </div>

                      <div class="text-center text-subtitle2 text-weight-bold">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_CRYSTAL.png"
                            alt=""
                            class="resource-icon-small"
                            srcset=""
                          />
                          <div class="text-secondary">
                            {{ props.row.token }} Crystal
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card-section>
                  <q-card-section
                    class="col-2 flex flex-center text-weight-bold"
                    style="letter-spacing: 3px"
                  >
                    10/13/21
                  </q-card-section>
                  <q-card-section
                    class="col-2 flex flex-center"
                    v-if="props.row.claim == false"
                  >
                    <q-btn
                      color="warning"
                      glossy
                      label="Claim"
                      no-caps
                      v-if="props.row.readyToClaim == true"
                    />
                    <div
                      v-if="props.row.readyToClaim == false"
                      class="text-caption"
                    >
                      Ready to Claim in
                      <span class="text-weight-bold">2h</span>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </template>

            <template v-slot:no-data="{}">
              <div class="full-width row flex-center text-accent q-gutter-sm">
                <q-card flat class="bg-transparent text-center">
                  <img
                    src="~assets/img/searching.svg"
                    alt=""
                    srcset=""
                    style="height: 230px"
                  />
                  <q-card-section>
                    <q-icon size="2em" name="sentiment_dissatisfied" />
                    <span> No Claimable Resources</span>
                  </q-card-section>
                  <q-card-section>
                    <q-btn
                      color="primary"
                      no-caps
                      label="Convert Resources"
                      class="q-mr-sm"
                      @click="convertResourcesDialog = true"
                    />
                    <q-btn
                      color="primary"
                      no-caps
                      label="Convert Tokens"
                      @click="convertTokensDialog = true"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="convertResourcesDialog" persistent>
      <q-card
        class="bg-dark text-white"
        style="width: 600px; max-width: 70vw; border-radius: 20px"
      >
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-body2">
            Convert Resources to Tokens
          </q-toolbar-title>
          <q-btn round flat icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-card flat>
            <q-card-section>
              <q-card
                flat
                class="
                  bg-transparent
                  row
                  text-negative
                  q-col-gutter-sm
                  justify-between
                  q-py-md
                "
              >
                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_Metal.png"
                      alt=""
                      srcset=""
                      class="resource-icon-small"
                    />
                    <div>0 Metal</div>
                  </div>
                </div>

                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_FUEL5.png"
                      alt=""
                      srcset=""
                      class="resource-icon-small"
                    />
                    <div>50 Petrol</div>
                  </div>
                </div>

                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_CRYSTAL.png"
                      alt=""
                      class="resource-icon-small"
                      srcset=""
                    />
                    <div>0 Crystal</div>
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <q-card-section class="text-center">
              <q-badge color="green" class="text-subtitle2 q-px-lg">
                Tokens
                <span class="q-pl-md text-weight-bold">+ {{ tokens }}</span>
              </q-badge>

              <q-slider v-model="tokens" :min="0" color="green" />
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Convert"
            color="warning"
            no-caps
            class="q-px-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="convertTokensDialog" persistent>
      <q-card
        class="bg-dark text-white"
        style="width: 600px; max-width: 70vw; border-radius: 20px"
      >
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="text-body2">
            Convert Tokens to Resources
          </q-toolbar-title>
          <q-btn round flat icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section>
          <q-card flat>
            <q-card-section>
              <q-card
                flat
                class="
                  bg-transparent
                  row
                  text-green
                  q-col-gutter-sm
                  justify-between
                  q-py-md
                "
              >
                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_Metal.png"
                      alt=""
                      srcset=""
                      class="resource-icon-small"
                    />
                    <div>0 Metal</div>
                  </div>
                </div>

                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_FUEL5.png"
                      alt=""
                      srcset=""
                      class="resource-icon-small"
                    />
                    <div>0 Petrol</div>
                  </div>
                </div>

                <div class="text-center text-subtitle2">
                  <div>
                    <img
                      src="~assets/img/resources/RES_ic_CRYSTAL.png"
                      alt=""
                      class="resource-icon-small"
                      srcset=""
                    />
                    <div>0 Crystal</div>
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <q-card-section class="text-center">
              <q-badge color="negative" class="text-subtitle2 q-px-lg">
                Tokens
                <span class="q-pl-md text-weight-bold">- {{ tokens }}</span>
              </q-badge>

              <q-slider v-model="tokens" :min="0" color="negative" />
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Convert"
            color="warning"
            no-caps
            class="q-px-lg"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import GlassElementHeading from "components/GlassElementHeading";

const deserts = [];

const rows = [
  /*{
    id: "1",
    name: "Convert Resources to Tokens",
    metal: "100",
    crystal: "100",
    petrol: "100",
    token: "300",
    convertToToken: true,
    readyToClaim: false,
    claim: false,
  },
  {
    id: "2",
    name: "Convert Tokens to Resources",
    metal: "100",
    crystal: "100",
    petrol: "100",
    token: "300",
    convertToToken: false,
    readyToClaim: true,
    claim: false,
  },*/
];

export default defineComponent({
  name: "Research",
  components: {
    GlassElementHeading,
  },
  setup() {
    const $q = useQuasar();

    function getItemsPerPage() {
      if ($q.screen.lt.sm) {
        return 5;
      }
      if ($q.screen.lt.md) {
        return 5;
      }
      return 5;
    }

    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage(),
    });

    watch(
      () => $q.screen.name,
      () => {
        pagination.value.rowsPerPage = getItemsPerPage();
      }
    );

    const convertResourcesDialog = ref(false);
    const convertTokensDialog = ref(false);
    return {
      rows,
      convertResourcesDialog,
      convertTokensDialog,

      filter,
      pagination,

      columns: [
        { name: "name", label: "Name", field: "name" },
        { name: "calories", label: "Calories (g)", field: "calories" },
      ],
      rowsPerPageOptions: computed(() => {
        return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
      }),

      tab: ref("claimable"),
      tokens: ref(2),
    };
  },
});
</script>
