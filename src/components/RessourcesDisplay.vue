<template>
  <div class="q-pt-lg">
    <!-- RESOURCES TAB -->
    <q-card
      flat
      class="
        bg-transparent
        text-secondary text-center
        row
        q-col-gutter-md
        justify-center
      "
    >
      <q-btn stack flat rounded class="q-ma-sm btn-glass-element">
        <img
          src="~assets/img/silver.jpg"
          style="width: 100%; height: 66px"
          alt=""
          srcset=""
        />
        <p>800,00</p>

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
      <q-btn stack flat rounded class="q-ma-sm btn-glass-element">
        <img
          src="~assets/img/gold.jpg"
          style="width: 100px; height: 66px"
          alt=""
          srcset=""
        />
        <p>800,00</p>
      </q-btn>
      <q-btn stack flat rounded class="q-ma-sm btn-glass-element">
        <img
          src="~assets/img/metal.jpg"
          style="width: 100px; height: 66px"
          alt=""
          srcset=""
        />
        <p>800,00</p>
      </q-btn>
      <q-btn stack flat rounded class="q-ma-sm btn-glass-element">
        <img
          src="~assets/img/silver.jpg"
          style="width: 100px; height: 66px"
          alt=""
          srcset=""
        />
        <p>800,00</p>
      </q-btn>
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
    this.activePlanet = this.$store.getters.activePlanet;

    this.$eventBus.on(ACTIVE_PLANET_CHANGED, (p) => {
      this.activePlanet = p;
    });

    //TODO: Insted of API calls, get production/hour and make sum on frontend.
    setInterval(async () => {
      if (!this.activePlanet) return;
      const planetData = await ApiRequests.getActivePlanet(
        this.activePlanet.id
      );
      this.activePlanet = planetData.data;
    }, 30000);
  },
};
</script>
