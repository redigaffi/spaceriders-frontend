<template>
  <section v-if="planetsArray.length > 0" class="game game-mechanics">
    <div :class="$q.screen.lt.md ? '' : 'container'">
      <div class="game__inner wow animate__animated animate__fadeIn">
        <div class="text-2 title game__title">GAME MECHANICS</div>
        <div class="q-mt-lg">
          <div class="parade">
            <q-card class="custom-card">
              <q-card-section>
                <div class="text-h4 text-center bold">
                  {{ getActivePlanet().title }}
                </div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section class="q-pt-none text-justify card-content">
                {{ getActivePlanet().description }}
              </q-card-section>
            </q-card>

            <section class="planet-container">
              <img
                id="planet"
                :src="`landing/planets/${getActivePlanet().img}`"
              />
            </section>
            <div
              v-if="planetsArray.length > 1"
              class="slider-controller full-width"
            >
              <div class="row items-center">
                <div
                  class="col text-right text-shadow"
                  :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"
                >
                  {{ planetsArray[getPrevPlanetIndex()].title }}
                </div>
                <div class="col-xs col-md-3 text-center">
                  <q-btn
                    @click="goToPrevPlanet()"
                    color="info"
                    icon="arrow_back"
                    :size="$q.screen.lt.md ? 'md' : 'lg'"
                    round
                  />
                  <q-btn
                    @click="goToNextPlanet()"
                    color="info"
                    icon="arrow_forward"
                    :size="$q.screen.lt.md ? 'md' : 'lg'"
                    round
                  />
                </div>
                <div
                  class="col text-left text-shadow"
                  :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"
                >
                  {{ planetsArray[getNextPlanetIndex()].title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const planetsArray = [
  {
    title: "Play to Own",
    description:
      "SpaceRiders defines itself as a Play to Own. Thanks to blockchain and \
      NFTs integration, you as a player have total ownership of all your \
      in-game assets as well as complete freedom to do with them anything \
      that you want. Through the Ownership Payment, we certify assets-ownership. ",
    img: "planet_3.webp",
  },
  {
    title: "Mines and Warehouses",
    description:
      "The extraction of resources (Metal, Crystal, Petrol) is the \
      key to the game and this is possible thanks to the mines. Once the mines \
      extract resources they are stored in their relevant warehouse depending on \
      the resource. The higher the level of your mines, the higher the \
      production, but also the higher the energy consumption.",
    img: "planet_2.webp",
  },
  {
    title: "Player Driven Economy",
    description:
      "Users have total control over the game economy through offer and demand. \
      Thanks to the Intergalactic Stock Market we give absolute power to the \
      gamers which decide the value and price of each resource. This trading \
      platform allows users to trade any resource in parity with $BKM or other \
      resources.",
    img: "planet_1.webp",
  },
  {
    title: "Player vs Environment (PVE)",
    description:
      "Space is a dangerous and outlaw territory, throughout its vast galaxies \
      and solar systems you’ll have to fight for survival and growth of your \
      planet. Asteroids can damage your planet's buildings and Space Pirates \
      might steal your resources if you’re not prepared. To prevent this from \
      happening, build up your Laser Launchers and Missile Launchers!",
    img: "planet_4.webp",
  },
  {
    title: "Free to Play",
    description:
      "At SpaceRiders we believe that everyone has the right and obligation \
      to enjoy their intergalactic adventure. Committed to our mission \
      to bring entertainment to all screens and pockets, \
      we have designed our game based on the Freemium model. \
      Playing SpaceRiders is Free for everyone.",
    img: "planet_5.webp",
  },
  {
    title: "Installations",
    description:
      "Installations play a key role in any planets’ growth and expansion \
      throughout the solar system. Hangar permits the construction of defensive \
      structures and, in the near future, spaceships to conquer the universe. \
      The Investigation Laboratory opens the door to innovation and progress by \
      researching necessary technologies for your benefit.",
    img: "planet_6.webp",
  },
];
const activePlanet = ref(0);
function getActivePlanet() {
  return planetsArray[activePlanet.value];
}
function getNextPlanetIndex() {
  if (activePlanet.value + 1 < planetsArray.length) {
    return activePlanet.value + 1;
  } else {
    return 0;
  }
}
function getPrevPlanetIndex() {
  if (activePlanet.value - 1 >= 0) {
    return activePlanet.value - 1;
  } else {
    return planetsArray.length - 1;
  }
}
function glow(target_id) {
  const element = document.getElementById(target_id);
  element.classList.add("glow");
  setTimeout(() => {
    element.classList.remove("glow");
  }, 500);
}
function goToNextPlanet() {
  activePlanet.value = getNextPlanetIndex();
  glow("planet");
}
function goToPrevPlanet() {
  activePlanet.value = getPrevPlanetIndex();
  glow("planet");
}
</script>

<style lang="scss" scoped>
.game-mechanics {
  background-image: url("~assets/landing/img/space_background_1.webp");
  background-repeat: no-repeat;
  background-size: auto;
  padding-bottom: 0 !important;
  border-bottom: 1px solid $info;

  .custom-card {
    display: block;
    position: absolute;
    width: 95%;
    left: 50%;
    transform: translate(-50%, -80%);
    background: black;
    z-index: 1;

    @media only screen and (min-width: 900px) {
      width: 50%;
    }

    .card-content {
      z-index: 2;
    }

    &:after {
      content: "";
      width: 40px;
      height: 40px;
      background: black;
      position: absolute;
      //-moz-transform: rotate(45deg) translateX(-50%);
      //-webkit-transform: rotate(45deg) translateX(-50%);
      transform: translate(-50%, -35%) rotate(45deg);
      bottom: -35px;
      left: 50%;
      border-left: none;
      border-top: none;
      border-right: 1px solid $info;
      border-bottom: 1px solid $info;
    }
  }
  .planet-container {
    width: 100%;
    margin-top: 10em;
    overflow: hidden;

    @media only screen and (max-width: 375px) {
      margin-top: 18em;
      height: 12em;
    }
    @media only screen and (min-width: 376px) {
      margin-top: 16em;
      height: 10em;
    }
    @media only screen and (min-width: 440px) {
      margin-top: 14em;
      height: 10em;
    }
    @media only screen and (min-width: 510px) {
      margin-top: 12em;
      height: 12em;
    }
    @media only screen and (min-width: 730px) {
      height: 16em;
    }
    @media only screen and (min-width: 900px) {
      height: 18em;
    }
    @media only screen and (min-width: 1024px) {
      height: 20em;
    }
  }

  #planet {
    filter: brightness(100%);
    transition: filter 0.5s;
    animation: rotation 360s infinite linear;
    width: 100%;

    &.glow {
      filter: brightness(160%);
    }
  }

  .slider-controller {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -150%);
  }
}

.text-shadow {
  text-shadow: 2px 2px black;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
