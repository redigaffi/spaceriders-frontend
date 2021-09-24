<template>
  <div class="q-pt-lg container">
    <!-- RESOURCES TAB -->
    <q-card
      flat
      class="
        bg-transparent
        text-secondary text-center
        row
        justify-center
      "
    >
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width:140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.metal }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available : </q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  426,256
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  865,000
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-positive">
                  +50.567
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Den Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-red">
                  84.8482
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width:140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.crystal }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available : </q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  426,256
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  865,000
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-positive">
                  +50.567
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Den Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-red">
                  84.8482
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width:140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.petrol }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available : </q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  426,256
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  865,000
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-positive">
                  +50.567
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Den Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-red">
                  84.8482
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>
      <div class="col-xs-6 col-sm-3 q-pa-sm" style="width:140px">
        <q-btn stack flat rounded class="btn-glass-element">
          <img
            src="~assets/img/silver.jpg"
            style="width: 100px; height: 66px"
            alt=""
            srcset=""
          />
          <p>{{ this.$store.getters.activePlanet.ressources.energy }}</p>

          <!-- TOOLTIP : APPLIED TO ONLY ONE -->
          <q-tooltip
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list dense class="text-subtitle2">
              <q-item>
                <q-item-section class="text-warning">
                  <q-item-label class="text-subtitle1">Metal</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Available : </q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  426,256
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Storage Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right">
                  865,000
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Current Production</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-positive">
                  +50.567
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section class="text-white">
                  <q-item-section caption>Den Capacity</q-item-section>
                </q-item-section>
                <q-item-section class="col-3 text-right text-red">
                  84.8482
                </q-item-section>
              </q-item>
            </q-list>
          </q-tooltip>
        </q-btn>
      </div>

    </q-card>
  </div>
</template>

<script>
import ApiRequests from "src/service/http/ApiRequests";
import { ACTIVE_PLANET_CHANGED } from "../constants/Events";

export default {
  name: "RessourcesDisplay",
  data() {
    return {
      activePlanet: false,
    };
  },
  created() {
    setInterval(async () => {
      if (this.$store.getters.activePlanet === false) return;
      let rD = this.$store.getters.resourceData;
      for (let resourceTypeIndex in RESOURCE_TYPES) {
        const resourceType = RESOURCE_TYPES[resourceTypeIndex];

        switch (resourceType) {
          case METAL_MINE:
            this.updateResources(rD, METAL, METAL_MINE, METAL_WAREHOUSE);
            break;
          case PETROL_MINE:
            this.updateResources(rD, PETROL, PETROL_MINE, PETROL_WAREHOUSE);
            break;
          case CRYSTAL_MINE:
            this.updateResources(rD, CRYSTAL, CRYSTAL_MINE, CRYSTAL_WAREHOUSE);
            break;
        }
      }
    }, 60000);
  },
};
</script>
<style>
  .resource-div {
    width: 120px;
  }
</style>