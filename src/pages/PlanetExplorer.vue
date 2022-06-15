<template>
<div style="margin-top: -30px; width: 400px; height: 50px;">
  <q-input
    outlined
    dense
    autofocus
    stack-label
    type="number"
    color="warning"
    width="50px"
    label="Galaxy"
    style="float: left; width: 120px;"
  />

  <q-input
    outlined
    dense
    autofocus
    stack-label
    type="number"
    color="warning"
    width="50px"
    label="Solar System"
    style="float: left; margin-left: 20px; width: 160px;"
  />
</div>
  <div>
    <q-page-sticky position="right" :offset="[18, 0]">
      <q-btn round color="accent" icon="arrow_upward" class="rotate-90" />
    </q-page-sticky>

    <q-drawer v-model="openPlanetInfo" :width="400" :breakpoint="500" overlay side="right" class="bg-dark-3">
      <q-card>
        <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/5-epic.png"
          style="height: 400px; width: 100%; z-index: 2" />

        <q-btn flat round size="sm" color="red" icon="close" @click="openPlanetInfo = false">
          <q-tooltip>
            Close planet information
          </q-tooltip>
        </q-btn>
        <q-btn flat round size="sm" color="red" icon="email">
          <q-tooltip>
            Send text to planet
          </q-tooltip>
        </q-btn>


        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Name</q-item-label>
            <q-item-label caption style="color: white;">
              ASDASD
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Position</q-item-label>
            <q-item-label caption style="color: white;">
              [0,0,0]
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Rarity</q-item-label>
            <q-item-label caption style="color: white;">
              Epic
            </q-item-label>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm q-mt-sm">
          <div class="text-h9">
            <q-item-label>Level</q-item-label>
            <q-item-label caption style="color: white;">
              10
            </q-item-label>
          </div>
        </q-card-section>

        <!--<q-card-section class="q-px-none">
          <q-list>
            <q-scroll-area style="height: 70vh">
              <q-item clickable v-ripple class="q-mb-xs" >
                <q-item-section>
                  <q-item-label>ASD</q-item-label>
                  <q-item-label caption lines="2">
                      SUB
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-btn round flat size="sm" color="red" icon="delete">
                    <q-tooltip> Delete Message </q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />
            </q-scroll-area>
          </q-list>
        </q-card-section> -->
      </q-card>
    </q-drawer>
  </div>

  <div v-for="a in 7" :key="a" class="row">
    <div v-for="b in 12" :key="b" class="col-1 box" :class="{
      'no_planet': (a + b) % 2 == false,
      'has_planet': (a + b) % 2 == true,
    }">

      <div v-if="(a + b) % 2 == false">
        (0, 0, 0)
        <q-tooltip anchor="center right" self="center left">
          Free spot
        </q-tooltip>
      </div>

      <div @click="openPlanetInfoCall" v-else>
        <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/5.png" />
        <q-tooltip anchor="center right" self="center left">
          Position: (0, 0, 1)
        </q-tooltip>
      </div>

    </div>

  </div>
  <!--
  <div class="row">
    <div class="col-1 box no_planet">
      (0, 0, 0)

      <q-tooltip anchor="center right" self="center left">
        Free spot
      </q-tooltip>
    </div>

    <div class="col-1 box has_planet" @click="openPlanetInfoCall">
      <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/5.png" />
      <q-tooltip anchor="center right" self="center left">
        Position: (0, 0, 1)
      </q-tooltip>

    </div>
    <div class="col-1 box">

        <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/3.png" />
      <q-tooltip anchor="center right" self="center left">
        Position: (0, 0, 2)
      </q-tooltip>
    </div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box">

        <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/8.png" />
      <q-tooltip anchor="center right" self="center left">
        Position: (0, 0, 1)
      </q-tooltip>
    </div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>

  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box">
  <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/2.png" />
      <q-tooltip anchor="center right" self="center left">
        Position: (0, 0, 1)
      </q-tooltip>

    </div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>

  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>
  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box">
        <img src="https://spaceriders-planets.s3.us-east-2.amazonaws.com/5.png" />
      <q-tooltip anchor="center right" self="center left">
        Position: (0, 0, 1)
      </q-tooltip>
    </div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>
  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>
  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>
  <div class="row">
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
    <div class="col-1 box"></div>
  </div>

-->

</template>

<script setup>
import { ref } from "vue";

const openPlanetInfo = ref(false)

function openPlanetInfoCall() {
  openPlanetInfo.value = true;
}
</script>

<style lang="scss">
.box {
  float: left;
  height: 100px !important;
  line-height: 100px;
  box-shadow: 0 0 4px #303030;
  text-align: center;

}

.has_planet {
  transition: 0.5s;
}

.has_planet:hover {
  transform: scale(1.4);
  box-shadow: 0 0 5px #5c5c5c;
}

.box img {
  width: 100px;
  height: 100px;
}
</style>
