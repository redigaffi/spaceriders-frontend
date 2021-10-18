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

        <div></div>

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
                PLANET NAME
              </q-card-section>
              <q-card-section
                class="text-secondary absolute-bottom-right tag-glass-element"
              >
                <q-list dense class="text-left">
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold"
                      >Diameter :</q-item-section
                    >
                    <q-item-section avatar> 12.800km (0/163) </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Temperature :</q-item-section>
                    <q-item-section avatar> 45°C to 85°C </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Position : </q-item-section>
                    <q-item-section avatar> [2:327:6] </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Points : </q-item-section>
                    <q-item-section avatar>
                      0 (Place 822 of 2.491)
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="text-subtitle2 text-weight-bold">Honour points : </q-item-section>
                    <q-item-section avatar> 0 </q-item-section>
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
import { defineComponent } from "vue";
import GlassElementHeading from "components/GlassElementHeading";

export default defineComponent({
  name: "PlanetInfo",
  components: {
    GlassElementHeading,
  },
  setup() {
    return {};
  },
});
</script>
