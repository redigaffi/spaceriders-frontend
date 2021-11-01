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
            :rows="dataRows"
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
                v-if="props.row.conversionType == 'RT'"
              >
                <q-card class="row">
                  <q-card-section class="col">
                    <strong>{{ "# " + props.row.name }}</strong>
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
                            {{ props.row.token }}
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card-section>
                  <!-- <q-card-section
                    class="col-2 flex flex-center text-weight-bold"
                    style="letter-spacing: 3px"
                  >
                    DATE 10/13/21 
                  </q-card-section> -->
                  <q-card-section class="col-2 flex flex-center">
                    <q-btn
                      color="warning"
                      glossy
                      label="Claim"
                      no-caps
                      @click="claim(props.row)"
                      v-if="props.row.readyToClaim"
                    />
                    <div v-if="!props.row.readyToClaim" class="text-caption">
                      Claimable in:
                      <span class="text-weight-bold">{{
                        props.row.timeLeft
                      }}</span>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="q-pa-xs col-12"
                v-if="props.row.conversionType == 'RR'"
              >
                <q-card class="row">
                  <q-card-section class="col">
                    {{ "# " + props.row.name }}
                    <!-- <strong>{{
                      "#" + props.row.id + " " + props.row.name
                    }}</strong> -->
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
                            {{ props.row.token }}
                          </div>
                        </div>
                      </div>
                      <div class="flex flex-center">
                        <q-icon name="trending_flat" size="40px" />
                      </div>

                      <div class="text-center text-subtitle2 text-weight-bold">
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

                      <div class="text-center text-subtitle2 text-weight-bold">
                        <div>
                          <img
                            src="~assets/img/resources/RES_ic_FUEL5.png"
                            alt=""
                            class="resource-icon-small"
                            srcset=""
                          />
                          <div class="text-secondary">
                            {{ props.row.petrol }} Petrol
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
                            {{ props.row.crystal }} Crystal
                          </div>
                        </div>
                      </div>
                    </q-card>
                  </q-card-section>
                  <!-- <q-card-section
                    class="col-2 flex flex-center text-weight-bold"
                    style="letter-spacing: 3px"
                  >
                    10/13/21
                  </q-card-section> -->
                  <q-card-section class="col-2 flex flex-center">
                    <q-btn
                      color="warning"
                      glossy
                      label="Claim"
                      no-caps
                      @click="claim(props.row)"
                      v-if="props.row.readyToClaim"
                    />
                    <div v-if="!props.row.readyToClaim" class="text-caption">
                      Claimable in
                      <span class="text-weight-bold">{{
                        props.row.timeLeft
                      }}</span>
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
                    <div>-{{ 300 * tokens }} Metal</div>
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
                    <div>-{{ 300 * tokens }} Petrol</div>
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
                    <div>-{{ 300 * tokens }} Crystal</div>
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <q-card-section class="text-center">
              <q-badge color="green" class="text-subtitle2 q-px-lg">
                Tokens
                <span class="q-pl-md text-weight-bold">+ {{ tokens }}</span>
              </q-badge>

              <q-slider v-model="tokens" :min="0" :max="10" color="green" />
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Convert"
            color="warning"
            no-caps
            class="q-px-lg"
            @click="convert('RT')"
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
                    <div>+{{ 300 * tokens }} Metal</div>
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
                    <div>+{{ 300 * tokens }} Petrol</div>
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
                    <div>+{{ 300 * tokens }} Crystal</div>
                  </div>
                </div>
              </q-card>
            </q-card-section>

            <q-card-section class="text-center">
              <q-badge color="negative" class="text-subtitle2 q-px-lg">
                Tokens
                <span class="q-pl-md text-weight-bold">- {{ tokens }}</span>
              </q-badge>

              <q-slider v-model="tokens" :min="1" :max="10" color="negative" />
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-btn
            label="Convert"
            color="warning"
            no-caps
            class="q-px-lg"
            @click="convert('RR')"
            v-close-popup
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import GlassElementHeading from "components/GlassElementHeading";
import ApiRequests from "../service/http/ApiRequests";
import ConversionTypes from "../constants/ConversionTypes";
import { useStore } from "vuex";
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";

import TokenManagementContract, {
  Attributes,
  SignatureData,
} from "../service/contract/TokenManagementContract";

export default defineComponent({
  name: "Convert",
  components: {
    GlassElementHeading,
  },

  setup() {
    const $store = useStore();
    const $eventBus =
      getCurrentInstance().appContext.config.globalProperties.$eventBus;

    function calculateClaimTime(conversion) {
      const now = new Date();
      const claim = new Date(conversion.claimable * 1000);

      const diffSeconds = (claim.getTime() - now.getTime()) / 1000;
      const s = Math.round(diffSeconds % 60);
      const minutes = Math.round((diffSeconds - s) / 60);

      const m = minutes % 60;
      const h = Math.round(minutes - m) / 60;

      let str = "";

      if (h > 0) str += `${h}h`;
      if (m > 0) str += ` ${m}m`;
      //if (s >= 0) str += ` ${s}s`;

      return str;
    }

    function claimable(conversion) {
      const now = new Date();
      const claim = new Date(conversion.claimable * 1000);
      const diffSeconds = (claim.getTime() - now.getTime()) / 1000;
      return diffSeconds <= 0;
    }

    let dataRows = computed(() => {
      let tmp = [];
      for (const key in $store.getters.conversionRequests) {
        const conversionRequest = $store.getters.conversionRequests[key];
        let name = "";

        if (
          conversionRequest.conversion_type === ConversionTypes.RECEIVE_TOKENS
        ) {
          name = "Convert Resources to Tokens";
        } else {
          name = "Convert Tokens to Resources";
        }

        tmp.push({
          id: conversionRequest.id,
          name: name,
          metal: conversionRequest.metal,
          crystal: conversionRequest.crystal,
          petrol: conversionRequest.petrol,
          token: conversionRequest.token,
          conversionType: conversionRequest.conversion_type,
          timeLeft: calculateClaimTime(conversionRequest),
          readyToClaim: claimable(conversionRequest),
        });
      }

      return tmp;
    });

    const $notification =
      getCurrentInstance().appContext.config.globalProperties.$notification;

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
    let tokens = ref(1);

    async function convert(type) {
      let request = {
        type: type,
        planetGuid: $store.getters.activePlanet.id,
      };

      switch (type) {
        case ConversionTypes.RECEIVE_TOKENS:
          const resourceCost = 300 * tokens.value;
          //TODO: Remove comment
          if ($store.getters.activePlanet.ressources.metal < resourceCost || 
            $store.getters.activePlanet.ressources.petrol < resourceCost   || 
            $store.getters.activePlanet.ressources.crystal < resourceCost) {
              $notification("failed", "Not enough resources to perform this exchange.")
              return;
          }

          request.metal = resourceCost;
          request.crystal = resourceCost;
          request.petrol = resourceCost;
          break;

        case ConversionTypes.RECEIVE_RESOURCES:
          request.tokenAmount = tokens.value;
          break;
      }

      const re = await ApiRequests.conversionRequest(request);
      if (re.success) {
        if (type === ConversionTypes.RECEIVE_TOKENS) {
          const cost = 300 * tokens.value;
          $store.commit("restPlanetResources", {
            metal: cost,
            petrol: cost,
            crystal: cost,
          });
        }

        $store.commit("addConversionRequest", { conversionRequest: re.data });
        $notification("success", "Conversion added, you have to wait 24h");
      } else {
        $notification("failed", re.error);
      }
    }

    async function claim(conversionRequest) {
      const closeLoadingNotification = $notification(
        "progress",
        "Waiting for transaction to complete...",
        0
      );

      const claimReq = await ApiRequests.claimConversionRequest({
        conversionId: conversionRequest.id,
      });

      if (!claimReq.success) {
        closeLoadingNotification();
        $notification("failed", claimReq.error);
        return;
      }

      const data = claimReq.data;
      if (data.action === "CALL_SMART_CONTRACT") {

        const sD = new SignatureData(data.v, data.r, data.s);
        let params = new Attributes(
          data.id,
          data.tokens.toString(),
          data.valid,
          data.forAddress
        );
        let receipt = { status: 0 };

        try {
          let tx;

          if (data.type === ConversionTypes.RECEIVE_TOKENS) {

            tx = await TokenManagementContract.convertFromPrimaryResources(
              sD,
              params
            );
          } else if (data.type === ConversionTypes.RECEIVE_RESOURCES) {
            tx = await TokenManagementContract.convertFromToken(sD, params);
          }
          console.log(tx)
          receipt = await tx.wait();
          console.log(receipt)

        } catch (e) {
          console.log("error");
          console.log(e);
        }

        if (receipt.status !== 1) {
          console.log("receipt");
          console.log(receipt);
          closeLoadingNotification();
          $notification(
            "failed",
            "Something failed calling the smart contract"
          );
          return;
        }
      }

      const confirmReq = await ApiRequests.confirmConversionRequest({
        conversionId: conversionRequest.id,
      });
      if (!confirmReq.success) {
        closeLoadingNotification();
        $notification("failed", confirmReq.error);
        return;
      }

      $store.commit("removeConversionRequest", {
        conversionRequest: conversionRequest,
      });

      if (data.type === ConversionTypes.RECEIVE_RESOURCES) {
        $store.commit("addPlanetResources", {
          metal: conversionRequest.metal,
          petrol: conversionRequest.petrol,
          crystal: conversionRequest.crystal,
        });
      }

      closeLoadingNotification();
      $notification("success", "Successfully claimed!");
    }

    return {
      claim: claim,
      convert: convert,
      dataRows: dataRows,
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
      tokens: tokens,
    };
  },
});
</script>
