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
              :src="`data_img/${data.label}.webp`"
              width="100%"
              style="height: 100%; width: 100%"
            />
          </div>
          <!-- CARD -->
          <div class="col">
            <q-card-section
              class="text-h6 text-secondary text-weight-bold text-left tag-glass-element"
            >
              {{ data.name }}
              <span v-if="!itemType" class="text-warning q-ml-md"
                >Level {{ data.level }}</span
              >
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
              class="bg-primary text-subtitle1 text-left text-secondary full-height"
            >
              <q-list dense>
                <q-item>
                  <q-item-section v-if="itemType" class="col">
                    <q-item-label>Production Duration:</q-item-label>
                    <q-item-label
                      class="text-warning text-h6 text-weight-bold"
                      >{{ timeString }}</q-item-label
                    >

                    <div v-if="newEnergyUsage > 0">
                      <q-item-label> Energy usage: </q-item-label>
                      <q-item-label
                        class="text-warning text-h6 text-weight-bold"
                      >
                        +{{ newEnergyUsage }}</q-item-label
                      >
                    </div>
                  </q-item-section>
                  <q-item-section v-else class="col">
                    <q-item-label v-if="health !== false && health < 100"
                      >Repair time:</q-item-label
                    >
                    <q-item-label v-else>Upgrade time:</q-item-label>
                    <q-item-label
                      class="text-warning text-h6 text-weight-bold"
                      >{{ timeString }}</q-item-label
                    >

                    <div v-if="newEnergyUsage > 0">
                      <q-item-label> Energy consumption: </q-item-label>
                      <q-item-label
                        class="text-warning text-h6 text-weight-bold"
                      >
                        +{{ newEnergyUsage }} / min</q-item-label
                      >
                    </div>
                  </q-item-section>

                  <div v-if="health !== false">
                    <q-circular-progress
                      v-if="health > 25"
                      show-value
                      class="text-white"
                      :value="health"
                      size="60px"
                      :thickness="0.15"
                      color="info"
                      track-color="dark"
                    >
                      <q-icon
                        name="health_and_safety"
                        size="26px"
                        color="info"
                      />
                      <q-tooltip v-model="showing">
                        {{ health }}% Health
                      </q-tooltip>
                    </q-circular-progress>

                    <q-circular-progress
                      v-else
                      show-value
                      class="text-white q-ml-md"
                      :value="health"
                      size="60px"
                      :thickness="0.15"
                      color="negative"
                      track-color="dark"
                    >
                      <q-icon
                        name="fas fa-shield-virus"
                        size="23px"
                        color="negative"
                      />
                      <q-tooltip v-model="showing"> Health </q-tooltip>
                    </q-circular-progress>
                  </div>
                  <!--<q-item-section class="col">
                    <div class="text-right">
                     <q-btn
                        push
                        color="red"
                        icon="expand_more"
                        label="Tear Down"
                        no-caps
                      />
                    </div>
                  </q-item-section>-->
                  <q-item-section v-if="itemType" class="col-xs-6 col-sm-3">
                    <q-input
                      outlined
                      square
                      autofocus
                      v-model="quantity"
                      type="number"
                      stack-label
                      color="warning"
                      label="Quantity"
                    >
                      <template v-slot:prepend>
                        <q-icon name="tag" color="warning" />
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator color="info" spaced inset />

              <q-list dense>
                <q-item>
                  <q-item-section class="col">
                    <div v-if="health !== false && health < 100">
                      <q-item-label>Cost to repair:</q-item-label>
                    </div>
                    <div v-else>
                      <q-item-label v-if="itemType"
                        >Cost to build:</q-item-label
                      >
                      <q-item-label v-else
                        >Cost to upgrade to level
                        {{ data.level + 1 }}:</q-item-label
                      >
                    </div>

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
                              src="~assets/img/resources/RES_ic_Metal.webp"
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
                              src="~assets/img/resources/RES_ic_FUEL5.webp"
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
                              src="~assets/img/resources/RES_ic_CRYSTAL.webp"
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
                  <q-item-section class="col-3">
                    <div class="text-right">
                      <q-btn
                        v-if="health !== false && health < 100"
                        dense
                        class="q-px-sm"
                        color="warning"
                        icon="construction"
                        label="Repair"
                        no-caps
                        push
                        @click="repair"
                      />
                      <q-btn
                        v-else
                        dense
                        class="q-px-sm"
                        color="warning"
                        icon="expand_less"
                        :label="actionConfirmLabel"
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
          <q-btn
            size="md"
            color="warning"
            class="text-white q-mr-md"
            glossy
            dense
            icon="info"
            @click="showInfo = true"
          />

          {{ data.description }}
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="showInfo">
      <popup :item="this.$props.data"></popup>
    </q-dialog>
  </q-card-section>
</template>

<script>
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../../service/http/ApiRequests";
import { BUILDING_UPGRADED } from "../../constants/Events";
import Types from "../../constants/Types";
import popup from "src/components/lvl_up/Popup.vue";
import { useQuasar } from "quasar";
import { exception } from "vue-gtag";

export default defineComponent({
  name: "InfoSlider",
  components: {
    popup,
  },
  props: {
    data: {
      type: Object,
      default: undefined,
    },
    itemType: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const quantity = ref(1);

    const $store = useStore();
    const $q = useQuasar();

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
        case Types.DEFENSE_TYPE:
          data = $store.getters.defenseData;
          break;
      }

      return data;
    };

    let requirements = computed(() => {
      if (!props.data) return [];

      let rows = [];

      let requirementData = [];
      if (props.itemType) {
        requirementData = props.data.data.requirements;
      } else {
        requirementData =
          props.data.upgrades[props.data.level + 1].requirements;
      }

      for (let requirementIdx in requirementData) {
        const requirement = requirementData[requirementIdx];

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

    const newEnergyUsage = computed(() => {
      if (!props.data) return 0;

      if (props.itemType) {
        return props.data.data.energy_usage * quantity.value;
      }

      const nextEnergyUsage =
        props.data.upgrades[props.data.level + 1].energy_usage;

      let currentEnergyUsage = 0;
      if (props.data.level > 0) {
        currentEnergyUsage = props.data.upgrades[props.data.level].energy_usage;
      }

      return (nextEnergyUsage - currentEnergyUsage).toFixed(3);
    });

    const canUpgrade = (props, activePlanet) => {
      let data = dataSource(props.data.type);

      if (props.itemType) {
        const dataItem = data[props.data.label].data;
        const metalCost = dataItem.cost_metal * quantity.value;
        const crystalCost = dataItem.cost_crystal * quantity.value;
        const petrolCost = dataItem.cost_petrol * quantity.value;

        return (
          activePlanet.resources.metal >= metalCost &&
          activePlanet.resources.petrol >= petrolCost &&
          activePlanet.resources.crystal >= crystalCost
        );
      }

      const level = data[props.data.label]["upgrades"][props.data.level + 1];

      return (
        activePlanet.resources.metal >= level.cost_metal &&
        activePlanet.resources.petrol >= level.cost_petrol &&
        activePlanet.resources.crystal >= level.cost_crystal
      );
    };

    const canRepair = (props, activePlanet) => {
      let data = dataSource(props.data.type);
      const level = data[props.data.label]["upgrades"][props.data.level];

      return (
        activePlanet.resources.metal >= level.cost_metal &&
        activePlanet.resources.petrol >= level.cost_petrol &&
        activePlanet.resources.crystal >= level.cost_crystal
      );
    };

    const upgrade = async (label) => {
      if (!props.data) return;

      const activePlanet = $store.getters.activePlanet;

      if (!canUpgrade(props, activePlanet)) {
        $q.notify(
          $notification("failed", `Can't upgrade, not enough resources...`)
        );
        return;
      }

      const activePlanetId = activePlanet.id;

      let storeUpdateMethod = "";
      switch (props.data.type) {
        case Types.RESOURCE_TYPE:
          storeUpdateMethod = "upgradeResourceData";
          break;
        case Types.INSTALLATION_TYPE:
          storeUpdateMethod = "upgradeInstallationData";
          break;

        case Types.RESEARCH_TYPE:
          storeUpdateMethod = "upgradeResearchData";
          break;

        case Types.DEFENSE_TYPE:
          storeUpdateMethod = "buildDefenseData";
          break;
      }

      let data = {
        type: props.data.type,
        label: props.data.label,
        planetGuid: activePlanetId,
      };

      if (props.itemType) {
        data.quantity = quantity.value;
      }

      try {
        const re = await ApiRequests.build(data);
        let saveStore = {
          label: props.data.label,
          upgradeFinish: re.data.finish,
        };

        if (props.itemType) {
          saveStore.quantity = re.data.quantity;
        }

        $store.commit(storeUpdateMethod, saveStore);

        $store.commit("restPlanetResources", {
          metal: re.data.metal_paid,
          crystal: re.data.crystal_paid,
          petrol: re.data.petrol_paid,
        });

        $eventBus.emit(BUILDING_UPGRADED);

        let notificationMessage = `${props.data.name} upgraded and added to the queue.`;
        if (props.itemType) {
          notificationMessage = `Addedd ${quantity.value} ${props.data.name} to the queue.`;
        }

        $q.notify($notification("success", notificationMessage));
      } catch (e) {
        $q.notify($notification("failed", e));
      }
    };

    const health = computed(() => {
      if (props.data.health === undefined) return false;

      const fullHealth = dataSource(props.data.type)[props.data.label][
        "upgrades"
      ][props.data.level].health;
      const healthPercentage = ((props.data.health / fullHealth) * 100).toFixed(
        2
      );

      return healthPercentage;
    });

    const timeString = computed(() => {
      if (!props.data) return "0m";

      let timeNeeded = 0;
      if (props.itemType) {
        timeNeeded = props.data.data.time * quantity.value;
      } else {
        timeNeeded = props.data.upgrades[props.data.level + 1].time;
      }

      if (health.value !== false && health.value < 100) {
        timeNeeded = props.data.upgrades[props.data.level].time;
      }

      const now = new Date();
      const finish = new Date(now.getTime() + timeNeeded * 1000);

      let diffSeconds = (finish.getTime() - now.getTime()) / 1000;
      if (health.value !== false && health.value < 100) {
        diffSeconds = diffSeconds - diffSeconds * (health.value / 100);
      }

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

    const metalCost = computed(() => {
      if (!props.data) return 0;

      if (props.itemType) {
        return props.data.data.cost_metal * quantity.value;
      }

      let metalCost = props.data.upgrades[props.data.level + 1].cost_metal;
      if (health.value === false) {
        return metalCost;
      }
      if (health.value < 100) {
        metalCost = props.data.upgrades[props.data.level].cost_metal;
        const h = 100 - health.value;
        return ((metalCost * h) / 100).toFixed(1);
      }

      return metalCost;
    });

    const petrolCost = computed(() => {
      if (!props.data) return 0;

      if (props.itemType) {
        return props.data.data.cost_petrol * quantity.value;
      }

      let petrolCost = props.data.upgrades[props.data.level + 1].cost_petrol;
      if (health.value === false) {
        return petrolCost;
      }

      if (health.value < 100) {
        petrolCost = props.data.upgrades[props.data.level].cost_petrol;
        const h = 100 - health.value;
        return ((petrolCost * h) / 100).toFixed(1);
      }

      return petrolCost;
    });

    const crystalCost = computed(() => {
      if (!props.data) return 0;

      if (props.itemType) {
        return props.data.data.cost_crystal * quantity.value;
      }

      let crystalCost = props.data.upgrades[props.data.level + 1].cost_crystal;

      if (health.value === false) {
        return crystalCost;
      }

      if (health.value < 100) {
        crystalCost = props.data.upgrades[props.data.level].cost_crystal;
        const h = 100 - health.value;
        return ((crystalCost * h) / 100).toFixed(1);
      }

      return crystalCost;
    });

    const repair = async (label) => {
      // This can only be called by resource items ATM.
      const activePlanet = $store.getters.activePlanet;

      if (!canRepair(props, activePlanet)) {
        $q.notify($notification(`Can't repair, not enough resources...`, ex));
        return;
      }

      const data = {
        label: props.data.label,
        planetGuid: activePlanet.id,
      };

      try {
        const re = await ApiRequests.repairResource(data);

        const cost_metal = re.data.metal_paid;
        const cost_crystal = re.data.crystal_paid;
        const cost_petrol = re.data.petrol_paid;

        $store.commit("restPlanetResources", {
          metal: cost_metal,
          crystal: cost_crystal,
          petrol: cost_petrol,
        });

        const saveStore = {
          label: re.data.label,
          finish: re.data.finish,
        };

        $store.commit("repairResourceData", saveStore);
        $q.notify($notification("success", "Repairing in progress..."));
      } catch (e) {
        $q.notify($notification("failed", e));
      }
    };

    const actionConfirmLabel = computed(() => {
      if (props.itemType) {
        return "Build";
      } else {
        if (props.data.type === Types.RESEARCH_TYPE) return "Research";
        if (props.data.level > 0) return "Upgrade";
      }

      return "Build";
    });

    return {
      actionConfirmLabel: actionConfirmLabel,
      allRequirementsMeet: allRequirementsMeet,
      requirements: requirements,
      timeString: timeString,
      newEnergyUsage: newEnergyUsage,
      metalCost: metalCost,
      petrolCost: petrolCost,
      crystalCost: crystalCost,
      upgrade: upgrade,
      repair,
      quantity: quantity,
      health,
      showInfo: ref(false),
    };
  },
});
</script>
