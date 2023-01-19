<template>
  <q-card v-if="data !== undefined" bordered class="q-ma-md bg-primary">
    <q-card-section horizontal>
      <q-img
        v-if="$q.screen.gt.sm"
        class="col-4"
        :src="`data_img/${data.label}.webp`"
      >
      </q-img>

      <q-separator vertical />

      <q-card-section class="col q-pa-none full-height column bg-dark">
        <div class="col row justify-between items-center q-px-md q-py-xs">
          <q-item class="col-10 q-pa-none">
            <q-item-section avatar v-if="data.level > 0 && health !== false">
              <div>
                <q-circular-progress
                  v-if="health > 25"
                  show-value
                  class="text-white"
                  :value="health"
                  size="48px"
                  :thickness="0.15"
                  color="info"
                  track-color="dark"
                >
                  <q-icon name="health_and_safety" size="26px" color="info" />
                </q-circular-progress>

                <q-circular-progress
                  v-else
                  show-value
                  class="text-white"
                  :value="health"
                  size="48px"
                  :thickness="0.15"
                  color="negative"
                  track-color="negative"
                >
                  <q-icon
                    name="fas fa-shield-virus"
                    size="23px"
                    color="negative"
                  />
                </q-circular-progress>
                <q-tooltip> {{ health }}% HP </q-tooltip>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label v-if="!itemType" class="text-info text-weight-bold"
                >Level {{ data.level }}</q-item-label
              >
              <q-item-label class="text-h6 text-weight-bold">{{
                data.name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <div>
            <q-btn
              dense
              color="primary"
              icon="close"
              @click="$emit('cancelled')"
            />
          </div>
        </div>

        <div v-if="!isMaxLevelReached" class="col bg-primary">
          <q-separator />

          <q-list>
            <!-- DEPRECATED (???) -->
            <!--
              <q-item v-if="itemType">
                <q-item-section class="col">
                  <q-item-label>Production Duration:</q-item-label>
                  <q-item-label class="text-warning text-h6 text-weight-bold">{{
                    timeString
                  }}</q-item-label>


                  <div v-if="newEnergyUsage > 0">
                    <q-item-label> Energy usage: </q-item-label>
                    <q-item-label class="text-warning text-h6 text-weight-bold">
                      +{{ newEnergyUsage }}</q-item-label
                    >
                  </div>
                </q-item-section>
              </q-item>
              -->
            <q-item>
              <q-item-section
                class="items-center justify-center text-center"
                style="
                  border: 1px solid #2253f4;
                  border-radius: 5px;
                  box-shadow: 0 0 5px #2253f4;
                  color: #fff;
                "
              >
                {{ data.description }}
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label v-if="health !== false && health < 100"
                  >Repair time:</q-item-label
                >
                <q-item-label v-else>Upgrade time:</q-item-label>

                <q-item-label class="text-warning text-h6 text-weight-bold">{{
                  timeString
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="newEnergyUsage > 0">
              <q-item-section>
                <q-item-label> Energy consumption: </q-item-label>
                <q-item-label class="text-warning text-h6 text-weight-bold">
                  +{{ newEnergyUsage }} / min</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator spaced inset />

          <q-list dense>
            <q-item>
              <q-item-section class="col">
                <div v-if="health !== false && health < 100">
                  <q-item-label>Cost to repair:</q-item-label>
                </div>
                <div v-else>
                  <q-item-label v-if="itemType">Cost to build:</q-item-label>
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
                        <div class="text-secondary">{{ metalCost }} Metal</div>
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
                      </div>
                    </div>
                  </q-card>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div v-if="requirements.length > 0" class="q-pa-md">
            <q-list
              bordered
              class="bg-dark text-white"
              :class="{ 'bg-red-5': allRequirementsMeet == false }"
            >
              <!-- <q-list bordered class="bg-red-5 text-white"> -->
              <q-expansion-item dense expand-separator label="Requirements">
                <q-list dense class="bg-dark">
                  <q-item
                    dense
                    v-for="(row, index) in requirements"
                    :key="index"
                  >
                    <q-item-section>
                      <q-item-label
                        :style="{
                          color: row.meet
                            ? getCssVar('info')
                            : getPaletteColor('red-5'),
                        }"
                      >
                        <q-icon
                          v-if="$q.screen.gt.xs"
                          size="20px"
                          :color="row.meet ? 'info' : 'red-5'"
                          :name="
                            row.meet ? 'check_circle_outline' : 'highlight_off'
                          "
                        />

                        {{ row.requirement }}
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side>{{ row.level }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </q-list>
          </div>

          <q-separator />

          <q-card-section class="row justify-center q-gutter-sm">
            <div v-if="itemType" class="row col-12 col-md-5">
              <q-btn
                class="col-2"
                color="info"
                icon="fas fa-minus"
                style="
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                "
                @click="decreaseDefenseQuantity"
              />

              <q-input
                class="col"
                input-class="text-center"
                outlined
                square
                autofocus
                type="text"
                :model-value="quantity"
                color="warning"
                dense
                :readonly="true"
              >
                <template v-slot:prepend>
                  <span class="text-caption">Qty</span>
                </template>
              </q-input>

              <q-btn
                class="col-2"
                color="info"
                icon="fas fa-plus"
                style="border-top-left-radius: 0; border-bottom-left-radius: 0"
                @click="increaseDefenseQuantity"
              />
            </div>

            <q-btn
              v-if="data.type !== 'defense'"
              class="col-12 col-md-5"
              icon="fas fa-info-circle"
              color="positive"
              label="Stats"
              outline
              @click="showInfo = true"
            ></q-btn>

            <q-btn
              v-if="health !== false && health < 100"
              class="col-12 col-md-5"
              icon="construction"
              color="info"
              label="Repair"
              @click="repair"
            ></q-btn>

            <q-btn
              v-else
              class="col-12 col-md-5"
              :icon="
                actionConfirmLabel == 'Research' ? 'fas fa-flask' : 'fas fa-cog'
              "
              color="info"
              :label="actionConfirmLabel"
              @click="upgrade"
            ></q-btn>
          </q-card-section>
        </div>

        <div v-else class="column bg-primary">
          <q-separator />

          <q-card-section class="text-center q-gutter-md">
            <div>
              <q-avatar
                size="100px"
                font-size="52px"
                color="info"
                text-color="white"
                icon="fas fa-exclamation-triangle"
              />
            </div>
            <div
              class="items-center text-center q-pa-sm"
              style="
                border-radius: 5px;

                color: #fff;
                font-size: 12px;
              "
              :style="`border: 1px solid ${getPaletteColor(
                'info'
              )}; box-shadow: 0 0 5px ${getPaletteColor('info')};`"
            >
              <div class="text-h5 text-info">Max level reached!</div>
              <div class="text-h6">
                There will be more upgrades available soon...
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card-section>
    </q-card-section>

    <q-dialog v-model="showInfo">
      <popup :item="this.$props.data"></popup>
    </q-dialog>
  </q-card>
</template>

<script>
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../../service/http/ApiRequests";
import { BUILDING_UPGRADED } from "../../constants/Events";
import Types from "../../constants/Types";
import popup from "src/components/lvl_up/Popup.vue";
import { useQuasar, colors, getCssVar } from "quasar";

import { useGtag } from "vue-gtag-next";
const { event } = useGtag();

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

    const { getPaletteColor } = colors;

    const resourcesBuildingSound = new Audio(
      require("../../assets/sound/building_resource_start.aac")
    );
    const installationBuildingSound = new Audio(
      require("../../assets/sound/building_installation_start.aac")
    );
    const defenseBuildingSound = new Audio(
      require("../../assets/sound/building_military_start.aac")
    );

    const playSound = (buildingType) => {
      if ($store.getters.audibleNotifications) {
        switch (buildingType) {
          case "resources":
            resourcesBuildingSound.play();
            break;

          case "installations":
            installationBuildingSound.play();
            break;
          case "research":
            installationBuildingSound.play();
            break;
          case "defense":
            defenseBuildingSound.play();
            break;
        }
      }
    };

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

    const increaseDefenseQuantity = () => {
      quantity.value++;
    };

    const decreaseDefenseQuantity = () => {
      if (quantity.value > 1) quantity.value--;
    };

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

      return (nextEnergyUsage - currentEnergyUsage).toFixed(2);
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
        activePlanet.resources.metal >=
          level.cost_metal - (level.cost_metal * health.value) / 100 &&
        activePlanet.resources.petrol >=
          level.cost_petrol - (level.cost_petrol * health.value) / 100 &&
        activePlanet.resources.crystal >=
          level.cost_crystal - (level.cost_crystal * health.value) / 100
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
        $store.commit("appendBuildingQueue", re.data.queue_item_info);

        $store.commit("restPlanetResources", {
          metal: re.data.metal_paid,
          crystal: re.data.crystal_paid,
          petrol: re.data.petrol_paid,
        });

        $eventBus.emit(BUILDING_UPGRADED);
        event(BUILDING_UPGRADED, {
          event_category: "building",
          event_label: "building upgraded",
        });

        let notificationMessage = `${props.data.name} upgraded and added to the queue.`;
        if (props.itemType) {
          notificationMessage = `Addedd ${quantity.value} ${props.data.name} to the queue.`;
        }

        $q.notify($notification("success", notificationMessage));
        playSound(data.type);
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
      if (!props.data) return "0 (m)";

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
      if (h > 0) str += `${h} (h)`;
      if (m > 0) str += ` ${m} (m)`;
      if (s > 0) str += ` ${s} (s)`;

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
        $q.notify(
          $notification("failed", "Can't repair, not enough resources...")
        );
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
        $store.commit("appendBuildingQueue", re.data.queue_item_info);

        $q.notify($notification("success", "Repairing in progress..."));
        playSound(re.data.type);
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

    const isMaxLevelReached = computed(() => {
      if (props.data && props.data.type !== Types.DEFENSE_TYPE) {
        const levels = [];

        Object.keys(props.data.upgrades).filter((key) => {
          return levels.push(Number(key));
        });

        return props.data.level >= Math.max(...levels);
      }

      return false;
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
      increaseDefenseQuantity,
      decreaseDefenseQuantity,
      health,
      getPaletteColor,
      getCssVar,
      showInfo: ref(false),
      isMaxLevelReached,
    };
  },
});
</script>
