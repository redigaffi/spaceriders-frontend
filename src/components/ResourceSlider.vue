<template>
  <q-card-section class="row q-col-gutter-sm text-center">
    <div class="col-12 q-pa-sm">
      <q-card flat class="bg-transparent text-dark">
        <div class="row text-center">
          <!-- IMAGE -->
          <div class="col-4">
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
              Metal Mine
              <span class="text-warning q-ml-md">Level 2</span>
              <div class="absolute-right q-ma-md">
                <q-btn dense color="primary" icon="close" @click="$emit('cancelled')" />
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
                  <q-item-section>Production duration:</q-item-section>
                  <q-item-section class="text-warning text-h6 text-weight-bold"
                    >9s (-0%)</q-item-section
                  >
                  <q-item-section>
                    <div class="text-right">
                      <q-btn
                        push
                        color="red"
                        icon="expand_more"
                        label="Tear Down"
                        no-caps
                      />
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Energy needed:</q-item-section>
                  <q-item-section class="text-warning text-h6 text-weight-bold"
                    >13</q-item-section
                  >
                  <q-item-section> </q-item-section>
                </q-item>
              </q-list>

              <q-separator color="info" spaced inset />

              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label>Required to improve to level 3:</q-item-label>
                    <q-item-label caption>
                      <q-card
                        flat
                        class="bg-transparent row q-col-gutter-sm q-py-md"
                      >
                        <div
                          v-for="n in 2"
                          :key="n"
                          class="text-center text-subtitle2"
                        >
                          <div>
                            <img
                              src="~assets/img/gold.jpg"
                              alt=""
                              style="height: 80px; width: 80px"
                              srcset=""
                            />
                            <div class="text-secondary">90</div>
                            <q-tooltip class="bg-secondary">
                              90 Gold
                            </q-tooltip>
                          </div>
                        </div>
                      </q-card>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="col-3">
                    <div class="text-right">
                      <q-btn
                        color="warning"
                        icon="expand_less"
                        label="Improve"
                        no-caps
                        push
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
          Used in the extraction of metal ore, metal mines are of primary
          importance to all emerging and established empires.
        </q-card-section>
      </q-card>
    </div>
  </q-card-section>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PageIndex",
  setup() {
    return {
    };
  },
});
</script>
<style lang="scss">
.tag-glass-element {
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.tag-glass-element:before {
  content: "";
  position: absolute;
  background: rgba($dark, 0.7);
  z-index: -1;
  // border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.glass-element {
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  position: relative;
  z-index: 1;
  background: inherit;
  overflow: hidden;
}

.glass-element:before {
  content: "";
  position: absolute;
  background: inherit;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0 2000px rgba($dark, 0.7);
  filter: blur(10px);
  margin: -20px;
}

.image {
  position: relative;
}

.image img {
  width: 100%;
  vertical-align: top;
}

.image:after {
  content: "\A";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

.image:hover:after {
  content: attr(data-content);
  color: #fff;
  padding: 20px;
  opacity: 1;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
