<template>
  <q-card-section class="row q-col-gutter-sm text-center">
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
              Rocket Launcher
              <span class="text-warning q-ml-md">Level 0</span>
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
                    <q-item-label>Production Duration:</q-item-label>
                    <q-item-label class="text-warning text-h6 text-weight-bold"
                      >20m</q-item-label
                    >
                  </q-item-section>
                  <q-item-section class="col-xs-6 col-sm-3">
                    <q-input
                      outlined
                      square
                      v-model="text"
                      type="number"
                      stack-label
                      color="secondary"
                      label="Number"
                    />
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator color="info" spaced inset />

              <q-list dense>
                <q-item>
                  <q-item-section class="col">
                    <q-item-label>Cost to upgrade to level 2:</q-item-label>

                    <q-item-label caption>
                      <q-card
                        flat
                        class="bg-transparent row q-col-gutter-sm q-py-md"
                      >
                        <div class="text-center text-subtitle2">
                          <div>
                            <img
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
                              srcset=""
                            />
                            <div class="text-secondary">200 Metal</div>
                            <q-tooltip class="bg-dark"> 200 Metal </q-tooltip>
                          </div>
                        </div>

                        <div class="text-center text-subtitle2">
                          <div>
                            <img
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
                              srcset=""
                            />
                            <div class="text-secondary">200 Petrol</div>
                            <q-tooltip class="bg-dark"> 200 Petrol </q-tooltip>
                          </div>
                        </div>

                        <div class="text-center text-subtitle2">
                          <div>
                            <img
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 70px; width: 70px"
                              srcset=""
                            />
                            <div class="text-secondary">200 Crystal</div>
                            <q-tooltip class="bg-dark"> 200 Crystal </q-tooltip>
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
                        label="Build"
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
          distinctio porro amet, incidunt eveniet voluptatem expedita molestias
          ab consequuntur reiciendis quasi qui voluptates sapiente ex architecto
          libero delectus cumque fuga?
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, ref, computed, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../service/http/ApiRequests";
import { BUILDING_UPGRADED } from "../constants/Events";
import Types from "../constants/Types";

export default defineComponent({
  name: "InfoSlider",
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    return {
      text: ref(""),
    };
  },
});
</script>
