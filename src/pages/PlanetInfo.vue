<template>
  <div>
    <!-- CONTENT PANEL -->
    <div>
      <q-card class="glass-element text-white">
        <glass-element-heading
          class="text-h6 text-center text-weight-bold text-secondary"
        >
          OVERVIEW
        </glass-element-heading>

        <q-card-section class="row q-col-gutter-sm text-center">
          <div class="col-12 q-pa-sm">
            <q-card flat class="bg-transparent text-dark">
              <img
                src="~assets/img/planet-info-header.jpg"
                width="100%"
                style="height: 300px; width: 100%"
              />
              <q-card-section
                class="text-secondary absolute-top tag-glass-element"
              >
                {{ this.$store.getters.activePlanet.name }}
              </q-card-section>
              <q-card-section
                class="text-secondary absolute-bottom-right tag-glass-element"
              >
                <q-list dense class="text-left">
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Diameter :</q-item-section
                    >
                    <q-item-section avatar>
                      {{ diameter }} KM ({{ slotsAvailable }})
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Temperature :</q-item-section
                    >
                    <q-item-section avatar> {{ temperature }} </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Position :
                    </q-item-section>
                    <q-item-section avatar> [{{ position }}] </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Metal Reserve :
                    </q-item-section>
                    <q-item-section avatar> {{ metalReserve }} </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Crystal Reserve :
                    </q-item-section>
                    <q-item-section avatar>
                      {{ crystalReserve }}
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Petrol Reserve :
                    </q-item-section>
                    <q-item-section avatar>
                      {{ petrolReserve }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import GlassElementHeading from "components/GlassElementHeading";
import tc from "thousands-counter";

const $store = useStore();

const temperature = computed(() => {
  const minTemperature = $store.getters.activePlanet.min_temperature;
  const maxTemperature = $store.getters.activePlanet.max_temperature;

  let str = "";

  str += `${minTemperature}°C to `;

  if (maxTemperature > 0) {
    str += `+`;
  }

  str += `${maxTemperature}°C`;

  return str;
});

const position = computed(() => {
  const position = $store.getters.activePlanet.position;
  const solarSystem = $store.getters.activePlanet.solar_system;
  const galaxy = $store.getters.activePlanet.galaxy;

  return `${position}:${solarSystem}:${galaxy}`;
});

const diameter = computed(() => {
  return tc($store.getters.activePlanet.diameter, { digits: 2 });
});

const metalReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.metal, { digits: 2 });
});

const crystalReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.crystal, { digits: 2 });
});

const petrolReserve = computed(() => {
  return tc($store.getters.activePlanet.max_resources.petrol, { digits: 2 });
});

const slotsAvailable = computed(() => {
  return `${$store.getters.activePlanet.slots_used}/${$store.getters.activePlanet.slots}`
});

</script>
