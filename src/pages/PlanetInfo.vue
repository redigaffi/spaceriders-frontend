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
                src="~assets/img/body-backgrounds-7.jpg"
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
                    <q-item-section avatar> {{ this.$store.getters.activePlanet.diameter}} km ({{ this.$store.getters.activePlanet.slots_used}}/{{ this.$store.getters.activePlanet.slots}}) </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Temperature :</q-item-section>
                    <q-item-section avatar> {{ temperature }} </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Position : </q-item-section>
                    <q-item-section avatar> [{{position}}] </q-item-section>
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

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "PlanetInfo",
  components: {
    GlassElementHeading,
  },
  setup() {
    const $store = useStore();
    
    const temperature = computed(() => {
      const minTemperature = $store.getters.activePlanet.min_temperature;
      const maxTemperature = $store.getters.activePlanet.max_temperature;

      let str = "";
      if (minTemperature < 0) {
        str += `-`;
      }

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
    
    return {
      temperature: temperature,
      position: position,
    };
  },
});
</script>
