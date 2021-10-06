<template>
  <q-card-section
    v-if="data !== undefined"
    class="row q-col-gutter-sm text-center"
  >
    <div class="col-12 q-pa-sm">
      <q-card flat class="bg-transparent text-dark">
        <div class="row text-center">
          <!-- IMAGE -->
          <div class="col-4 gt-sm">
            <img
              src="~assets/img/body-backgrounds-2.jpg"
              width="100%"
              style="height: 100%; width: 100%"
            />
          </div>
          <!-- CARD -->
          <div class="col">
            <q-card-section
              class="
                text-h5 text-secondary text-weight-bold text-left
                tag-glass-element
              "
            >
              {{ data.name }}
              <span class="text-warning q-ml-md">Level {{ data.level }}</span>
              <div class="absolute-right q-ma-md">
                <q-btn
                  dense
                  color="primary"
                  icon="close"
                  @click="$emit('cancelled')"
                />
              </div>
            </q-card-section>
            <q-card-section
              class="
                bg-primary
                text-subtitle1 text-left text-secondary
                full-height
              "
            >
              <q-list dense>
                <q-item>
                  <q-item-section class="col">
                    <q-item-label>Upgrade time:</q-item-label>
                    <q-item-label
                      class="text-warning text-h6 text-weight-bold"
                      >{{ timeString }}</q-item-label
                    >

                    <div v-if="newEnergyUsage > 0">
                      <q-item-label> Energy needed: </q-item-label>
                      <q-item-label
                        class="text-warning text-h6 text-weight-bold"
                      >
                        +{{ newEnergyUsage }}</q-item-label
                      >
                    </div>
                  </q-item-section>
                  <q-item-section class="col">
                    <div class="text-right">
                      <!-- <q-btn
                        push
                        color="red"
                        icon="expand_more"
                        label="Tear Down"
                        no-caps
                      /> -->
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator color="info" spaced inset />

              <q-list dense>
                <q-item>
                  <q-item-section class="col">
                    <q-item-label
                      >Cost to upgrade to level
                      {{ data.level + 1 }}:</q-item-label
                    >

                    <q-item-label caption>
                      <q-card
                        flat
                        class="bg-transparent row q-col-gutter-sm q-py-md"
                      >
                        <div
                          v-if="metalCost > 0"
                          class="text-center text-subtitle2"
                        >
                          <div>
                            <img
                              src="~assets/img/resources/RES_ic_Metal.png"
                              alt=""
                              srcset=""
                              class="resource-icon-small"
                            />
                            <div class="text-secondary">
                              {{ metalCost }} Metal
                            </div>
                            <q-tooltip class="bg-secondary">
                              {{ metalCost }} Metal
                            </q-tooltip>
                          </div>
                        </div>

                        <div
                          v-if="petrolCost > 0"
                          class="text-center text-subtitle2"
                        >
                          <div>
                            <img
                              src="~assets/img/resources/RES_ic_FUEL5.png"
                              alt=""
                              srcset=""
                              class="resource-icon-small"
                            />
                            <div class="text-secondary">
                              {{ petrolCost }} Petrol
                            </div>
                            <q-tooltip class="bg-secondary">
                              {{ petrolCost }} Petrol
                            </q-tooltip>
                          </div>
                        </div>

                        <div
                          v-if="crystalCost > 0"
                          class="text-center text-subtitle2"
                        >
                          <div>
                            <img
                              src="~assets/img/resources/RES_ic_CRYSTAL.png"
                              alt=""
                              class="resource-icon-small"
                              srcset=""
                            />
                            <div class="text-secondary">
                              {{ crystalCost }} Crystal
                            </div>
                            <q-tooltip class="bg-secondary">
                              {{ crystalCost }} Crystal
                            </q-tooltip>
                          </div>
                        </div>
                      </q-card>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="col">
                    <div class="text-right">
                      <q-btn
                        color="warning"
                        icon="expand_less"
                        label="Upgrade"
                        no-caps
                        push
                        @click="upgrade"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>

              <div v-if="requirements.length > 0" class="q-px-md">
                <q-list
                  bordered
                  class="bg-dark text-white"
                  :class="{ 'bg-red-5': allRequirementsMeet == false }"
                >
                  <!-- <q-list bordered class="bg-red-5 text-white"> -->
                  <q-expansion-item dense expand-separator label="Requirements">
                    <q-separator dark />
                    <q-markup-table flat dense dark>
                      <tbody>
                        <tr v-for="(row, index) in requirements" :key="index">
                          <td
                            v-if="row.meet"
                            class="text-left"
                            style="width: 14px"
                          >
                            <q-icon
                              size="20px"
                              color="warning"
                              name="check_circle_outline"
                            />
                          </td>
                          <td v-else class="text-left" style="width: 14px">
                            <q-icon
                              size="20px"
                              color="red-5"
                              name="highlight_off"
                            />
                          </td>
                          <td class="text-left">{{ row.requirement }}</td>
                          <td class="text-left">{{ row.level }}</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </q-expansion-item>
                </q-list>
              </div>
            </q-card-section>
          </div>
        </div>

        <q-card-section
          class="text-secondary text-subtitle1 text-left bg-dark q-py-lg"
        >
          {{ data.description }}
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../../service/http/ApiRequests";
import { BUILDING_UPGRADED } from "../../constants/Events";
import Types from "../../constants/Types";

export default defineComponent({
  name: "InfoSlider",
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const $store = useStore();

    const dataSource = (type) => {
      let data = {};

      switch (type) {
        case Types.RESOURCE_TYPE:
          data = $store.getters.resourceData;
          break;
        case Types.INSTALLATION_TYPE:
          data = $store.getters.installationData;
          break;
        case Types.RESEARCH_TYPE:
          data = $store.getters.researchData;
          break;
      }

      return data;
    };

    let requirements = computed(() => {
      if (!props.data) return [];

      let rows = [];
      for (let requirementIdx in props.data.upgrades[props.data.level + 1]
        .requirements) {
        const requirement =
          props.data.upgrades[props.data.level + 1].requirements[
            requirementIdx
          ];
        const type = requirement["type"];
        const asset = requirement["asset"];
        const requiredLevel = requirement["level"];

        const dataType = Types.MAPPING[type];
        if (dataType.RESOURCE_TYPES.includes(asset)) {
          const info = dataSource(dataType.TYPE);
          const infoLevel = info[asset];
          rows.push({
            requirement: infoLevel.name,
            level: `Level ${requiredLevel}`,
            meet: infoLevel.level >= requiredLevel,
          });
        }
      }

      return rows;
    });

    const allRequirementsMeet = computed(() => {
      let flag = true;
      requirements.value.forEach((element) => {
        if (element.meet == false) {
          flag = false;
        }
      });
      return flag;
    });

    const $notification =
      getCurrentInstance().appContext.config.globalProperties.$notification;

    const $eventBus =
      getCurrentInstance().appContext.config.globalProperties.$eventBus;

    const metalCost = computed(() => {
      if (!props.data) return 0;
      return props.data.upgrades[props.data.level + 1].cost_metal;
    });

    const petrolCost = computed(() => {
      if (!props.data) return 0;
      return props.data.upgrades[props.data.level + 1].cost_petrol;
    });

    const crystalCost = computed(() => {
      if (!props.data) return 0;
      return props.data.upgrades[props.data.level + 1].cost_crystal;
    });

    const timeString = computed(() => {
      if (!props.data) return "0m";

      let timeNeeded = props.data.upgrades[props.data.level + 1].upgrade_time;

      const now = new Date();
      const finish = new Date(now.getTime() + timeNeeded * 1000);

      const diffSeconds = (finish.getTime() - now.getTime()) / 1000;
      const s = Math.round(diffSeconds % 60);
      const minutes = Math.round((diffSeconds - s) / 60);

      const m = minutes % 60;
      const h = Math.round(minutes - m) / 60;

      let str = "";
      if (h > 0) str += `${h}h`;
      if (m > 0) str += ` ${m}m`;
      if (s > 0) str += ` ${s}s`;

      return str;
    });

    const newEnergyUsage = computed(() => {
      if (!props.data) return 0;
      const nextEnergyUsage =
        props.data.upgrades[props.data.level + 1].energy_usage;

      let currentEnergyUsage = 0;
      if (props.data.level > 0) {
        currentEnergyUsage = props.data.upgrades[props.data.level].energy_usage;
      }

      return nextEnergyUsage - currentEnergyUsage;
    });

    const alreadyUpgrading = (type) => {
      let data = dataSource(type);

      let anyUpgrade = false;
      for (let key in data) {
        const ressource = data[key];
        if (ressource.upgrading) {
          anyUpgrade = true;
          break;
        }
      }

      return anyUpgrade;
    };

    const canUpgrade = (props, activePlanet) => {
      let data = dataSource(props.data.type);

      const level = data[props.data.label]["upgrades"][props.data.level + 1];

      return (
        activePlanet.ressources.metal >= level.cost_metal &&
        activePlanet.ressources.petrol >= level.cost_petrol &&
        activePlanet.ressources.crystal >= level.cost_crystal
      );
    };

    const upgrade = async (label) => {
      if (!props.data) return;

      const anyUpgrade = alreadyUpgrading(props.data.type);

      if (anyUpgrade) {
        $notification(
          "failed",
          `A building is already being upgraded, wait until it finishes...`
        );
        return;
      }

      const activePlanet = $store.getters.activePlanet;

      if (!canUpgrade(props, activePlanet)) {
        $notification("failed", `Can't upgrade, not enough resources...`);
        return;
      }

      const activePlanetId = activePlanet.id;
      const level = dataSource(props.data.type)[props.data.label]["upgrades"][
        props.data.level + 1
      ];

      let storeUpdateMethod = "";
      let apiCall = "";
      switch (props.data.type) {
        case Types.RESOURCE_TYPE:
          storeUpdateMethod = "upgradeRessourceData";
          apiCall = ApiRequests.upgradeRessource;
          break;
        case Types.INSTALLATION_TYPE:
          storeUpdateMethod = "upgradeInstallationData";
          apiCall = ApiRequests.upgradeInstallation;
          break;

        case Types.RESEARCH_TYPE:
          storeUpdateMethod = "upgradeResearchData";
          apiCall = ApiRequests.upgradeResearch;
          break;
      }

      const re = await apiCall(props.data.label, activePlanetId);

      if (re.success) {
        $store.commit(storeUpdateMethod, {
          label: props.data.label,
          upgradeFinish: re.data.upgrade_finish,
        });

        $store.commit("restPlanetResources", {
          metal: level.cost_metal,
          crystal: level.cost_crystal,
          petrol: level.cost_petrol,
        });

        $eventBus.emit(BUILDING_UPGRADED);

        $notification(
          "success",
          `${props.data.name} upgraded and added to the building queue.`
        );
      } else {
        $notification("failed", re.error);
      }
    };

    return {
      allRequirementsMeet: allRequirementsMeet,
      requirements: requirements,
      timeString: timeString,
      newEnergyUsage: newEnergyUsage,
      metalCost: metalCost,
      petrolCost: petrolCost,
      crystalCost: crystalCost,
      upgrade: upgrade,
    };
  },
});
</script>
