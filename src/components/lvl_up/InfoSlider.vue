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
                      >Required to improve to level
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
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
                              srcset=""
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
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
                              srcset=""
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
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
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

export default defineComponent({
  name: "ResourceSlider",
  props: {
    data: {
      type: Object,
      default: undefined,
    },
    type: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const $notification =
      getCurrentInstance().appContext.config.globalProperties.$notification;

    const $store = useStore();

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

    const dataSource = (type) => {
      let data = {};
      if (type === "resource") {
        data = $store.getters.resourceData;
      } else if (type === "installation") {
        data = $store.getters.installationData;
      }

      return data;
    }
    
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
      let data = dataSource(props.type);

      const level = data[props.data.label]["upgrades"][props.data.level + 1];
      
      return (
        activePlanet.ressources.metal >= level.cost_metal &&
        activePlanet.ressources.petrol >= level.cost_petrol &&
        activePlanet.ressources.crystal >= level.cost_crystal
      );
    };

    const upgrade = async (label) => {
      if (!props.data) return;

      const anyUpgrade = alreadyUpgrading(props.type);

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
      const level = dataSource(props.type)[props.data.label]["upgrades"][props.data.level + 1];

      let storeUpdateMethod = "";
      let apiCall = "";
      switch (props.type) {
        case "resource":
            storeUpdateMethod = "upgradeRessourceData";
            apiCall = ApiRequests.upgradeRessource;
          break;
        case "installation":
            storeUpdateMethod = "upgradeInstallationData";
            apiCall = ApiRequests.upgradeInstallation;
          break;
      }

      const re = await apiCall(
        props.data.label,
        activePlanetId
      );

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

        $notification(
          "success",
          `${props.data.name} upgraded and added to the building queue.`
        );
      } else {
        $notification("failed", re.error);
      }
    };

    return {
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
