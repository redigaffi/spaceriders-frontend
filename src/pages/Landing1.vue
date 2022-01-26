<template>
  <div id="landing">
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <img src="~assets/landing/img/menu.svg" alt="Меню" class="menu" />

          <a href="#" class="logo" v-on:click.prevent="scrollPageTo('landing')">
            Spaceriders
          </a>

          <div class="header__nav">
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('landing')"
              >Home</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('overview')"
              >Overview</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('game')"
              >Game mechanics</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('road')"
              >Roadmap</a
            >

            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('team')"
              >Team</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('social')"
              >Social media</a
            >

            <q-btn
              outline
              color="blue"
              class="q-pa-md"
              label="Whitepaper"
              no-caps
            />
            <!-- 
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('whitepaper')"
              >Whitepaper</a
            > -->
          </div>

          <!-- <div class="header__social--inner">
            <a href="#" class="header__social--link">
              <img
                src="~assets/landing/img/m.svg"
                alt="М"
                class="header__social--icon"
              />
            </a>
            <a href="#" class="header__social--link">
              <img
                src="~assets/landing/img/twitter.svg"
                alt="Твитер"
                class="header__social--icon"
              />
            </a>
            <a href="#" class="header__social--link">
              <img
                src="~assets/landing/img/telegram.svg"
                alt="Телеграм"
                class="header__social--icon"
              />
            </a>
            <a href="#" class="header__social--link">
              <q-icon
                name="fab fa-discord"
                style="color: #c2c2c2"
                size="25px"
              />
            </a>
          </div> -->
        </div>
      </div>
    </header>

    <section class="main" id="particles-js">
      <Particles
        class="absolute-top"
        id="tsparticles"
        :options="{
          fpsLimit: 90,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 100,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 200,
                size: 10,
                duration: 0.4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
              remove: {
                particles_nb: 2,
              },
            },
            mouse: {},
          },
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 2000,
              },
            },
            color: {
              value: '#CCCCCC',
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#ff0000',
              },
              polygon: {
                nb_sides: 5,
              },
              image: {
                src: '',
                width: 100,
                height: 100,
              },
            },
            opacity: {
              value: 1,
              random: false,
              anim: {
                enable: false,
                speed: 2,
                opacity_min: 0,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: false,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 100,
              color: '#fff',
              opacity: 1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 3000,
                rotateY: 3000,
              },
            },
            array: [],
          },
          detectRetina: true,
        }"
      />
      <div class="main__timer" style="display: none">
        <q-card class="bg-transparent">
          <div class="row q-col-gutter-lg text-center">
            <!-- <div class="col">
              <div class="text-h2 text-weight-bolder">{{ d }}</div>
              <div class="text-h4 q-pt-md text-weight-bolder">Days</div>
            </div> -->
            <div class="col">
              <div class="text-h2 text-weight-bolder">{{ h }}</div>
              <div class="text-h4 q-pt-md text-weight-bolder">Hours</div>
            </div>
            <div class="col">
              <div class="text-h2 text-weight-bolder">{{ m }}</div>
              <div class="text-h4 q-pt-md text-weight-bolder">Minutes</div>
            </div>
            <div class="col">
              <div class="text-h2 text-weight-bolder">{{ s }}</div>
              <div class="text-h4 q-pt-md text-weight-bolder">Seconds</div>
            </div>
          </div>
        </q-card>
      </div>

      <div class="container">
        <div class="main__inner">
          <h2 class="footer__title wow animate__animated animate__fadeIn">
            <span class="blue">Space</span>riders
          </h2>

          <p class="main__subtitle wow animate__animated animate__fadeIn">
            is a strategy-game set in space...
          </p>

          <button
            class="button main__button3 popup__open"
            @click="openPopup = true"
          >
            Buy $SPR
          </button>

          <div class="main__coming--soon wow animate__animated animate__fadeIn">
            <p class="main__coming--text">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>

    <div id="overview"></div>
    <section class="custom-game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">Overview</div>
          <div class="q-gutter-xl q-pt-xl" style="color: #cbcbcb">
            <div>
              <p class="text-h4 text-justify">
                Explore a limitless galaxy where the narrative is directed
                entirely by you, the players. In Spaceriders, you are a leader
                of your empire, The Destiny of your planets relies upon you! By
                building and customizing your planets, you will be securing
                territory, crossing the deep corners of space to turn the tide
                of the war.
              </p>
            </div>
            <div>
              <p class="text-h4 text-justify">
                SpaceRiders ($SPR) is a play-to-earn real-time strategy NFT game
                settled in space. $SPR enables players to purchase and acquire
                virtual items within the Spaceriders game.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GAME MECHANICS -->
    <div id="game"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">Game mechanics</div>

          <div class="game__content">
            <div class="game__item">
              <p class="game__item--title blue">Advanced Innovative System</p>
              <p class="game__item--text">
                At Space Riders, we strive towards innovation and being
                futureproof. A range of new contemporary systems have systems
                have been born in the development of this project which will
                benefit both the health and longevity of the game, Long term and
                short term.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Fixed Entry Price</p>
              <p class="game__item--text">
                To enter Space Riders, you will need to mint a planet first. Our
                innovative systems ensures that users will always pay the same
                price in $ USD when minting a planet, regardless of the token
                price. This ensures fairness to our users.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Fixed Rewards Price</p>
              <p class="game__item--text">
                Once users decide to take rewards by changing resources to the
                native $SPR Token, they will get the rewards in the resources
                current value in $ USD regardless of what the value of $SPR is.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">50/50 Mark Token System</p>
              <p class="game__item--text">
                We have pioneered a new system which has been implemented in
                Space Riders. This system is a prevention measure which be used
                to prevent Pump & Dump traders from exploiting this project.
                Instead, this measure will encourage traders to play the game as
                this is primary way in which they will get incentivised.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">
                Smart and Controlled Distribution (50/50 System)
              </p>

              <p class="game__item--text">
                Each time a user invests, they will be distributed tokens in the
                following way:
              </p>
              <ul class="game__item--text">
                <li>⦁ 50% Tradeable Tokens (TT)</li>
                <li>⦁ 50% Gaming Token (GT)</li>
              </ul>
              <p class="game__item--text">
                This Method will prevent the token being exploited and has been
                pioneered to achieve long term and short-term token health to
                encourage users to play and enjoy the game. A more detailed
                analysis can be found within the Game Manual
              </p>
            </div>

            <div class="game__item" style="border: none"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ROADMAPS -->
    <div id="road"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="row fit wrap">
            <div class="col-xs-12 col-sm-12 col-md-6">
              <img
                src="~assets/img/GameRoadmap.png"
                alt=""
                style="width: 100%"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <img
                src="~assets/img/GeneralRoadmap.png"
                alt=""
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL -->
    <div id="social"></div>
    <section class="social">
      <div class="container">
        <div class="social__inner">
          <h2 class="title social__title wow animate__animated animate__fadeIn">
            Social media
          </h2>

          <div class="social__content wow animate__animated animate__fadeIn">
            <a href="#" class="social__link">
              <img
                src="~assets/landing/img/m-white.svg"
                alt="М"
                class="social__link--icon"
              />
            </a>

            <a href="#" class="social__link">
              <img
                src="~assets/landing/img/twitter-white.svg"
                alt="Твитер"
                class="social__link--icon"
              />
            </a>

            <a href="#" class="social__link">
              <img
                src="~assets/landing/img/telegram-white.svg"
                alt="Телеграм"
                class="social__link--icon"
              />
            </a>

            <a href="#" class="social__link">
              <img
                src="~assets/landing/img/discord.svg"
                alt="Телеграм"
                class="social__link--icon"
              />
            </a>

            <a href="#" class="social__link">
              <img
                src="~assets/img/gitbooks.svg"
                alt="Телеграм"
                style="height: 70px"
                class="social__link--icon"
              />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div
        class="up__arrow wow animate__animated animate__fadeIn"
        @click.prevent="scrollPageTo('landing')"
      >
        <img
          src="~assets/landing/img/arrow.svg"
          alt="Стрелка"
          class="up__img"
        />
      </div>

      <div class="container wow animate__animated animate__fadeIn">
        <div class="footer__inner">
          <h2 class="footer__title"><span class="blue">Space</span>riders</h2>

          <div class="footer__nav">
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >Home</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('overview')"
              class="footer__nav--link go"
              >Overview</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('game')"
              class="footer__nav--link go"
              >Game mechanics</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('road')"
              class="footer__nav--link go"
              >Roadmap</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >Whitepaper</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >Team</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('social')"
              class="footer__nav--link go"
              >Social media</a
            >
          </div>

          <p class="footer__copy">Copyright &copy; Spaceriders 2021</p>
        </div>
      </div>
    </footer>

    <div class="modal">
      <svg
        class="cross"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512.001 512.001"
        style="enable-background: new 0 0 512.001 512.001"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
					L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
					c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
					l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
					L284.286,256.002z"
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>

      <div class="modal__nav">
        <a href="#" data-point="ico" class="modal__nav--link go">Ico sell</a>
        <a href="#" data-point="game" class="modal__nav--link go"
          >Game mechanics</a
        >
        <a href="#" data-point="road" class="modal__nav--link go">Roadmap</a>
        <a href="#" data-point="social" class="modal__nav--link go"
          >Social Media</a
        >
      </div>

      <button class="button header__button modal__button">White peper</button>
    </div>

    <q-dialog v-model="openPopup" persistent>
      <q-card style="width: 600px; max-width: 80vw; background: #0e101c">
        <q-card-section class="row justify-between">
          <div class="text-h4" style="letter-spacing: 3px">Swap</div>
          <div>
            <q-btn
              dense
              color="primary"
              round
              icon="close"
              @click="openPopup = false"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-1 flex flex-center">
              <q-icon name="print" size="30px" />
            </div>
            <div class="col-3 text-overline" style="font-size: 12px">
              <div>Swap From:</div>
              <div>
                <q-select v-model="model" :options="options" dense />
              </div>
            </div>
            <div class="col flex flex-center">
              <q-input
                dense
                outlined
                color="white"
                v-model="text"
                placeholder="0.0"
                type="number"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-sm">
            <div class="col-1 flex flex-center">
              <q-icon name="print" size="30px" />
            </div>
            <div class="col-3 text-overline" style="font-size: 12px">
              <div>Swap To:</div>
              <div class="text-h4 text-weight-bold">$SPR</div>
            </div>
            <div class="col flex flex-center">
              <q-input
                dense
                outlined
                color="white"
                v-model="text"
                placeholder="0.0"
                type="number"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            class="full-width"
            style="background: #18121e"
            label="Connect to a wallet"
            no-caps
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
// import '../assets/landing/js/particles.js';
// import '../assets/landing/js/app.js';
// import '../assets/landing/js/jquery.countdown.js';
import "../assets/landing/js/wow.min.js";
import "../assets/landing/js/main.js";

import { defineComponent, ref } from "vue";
import { onMounted } from "vue";
//   new WOW().init();
export default defineComponent({
  name: "PageLanding",
  // mounted() {
  //   window.addEventListener("scroll", this.updateScroll);
  // },
  setup() {
    const scrollPageTo = (navEl) => {
      let element = document.querySelector(`#${navEl}`);
      element.scrollIntoView({ behavior: "smooth" });
    };
    const d = ref(0);
    const h = ref(0);
    const m = ref(0);
    const s = ref(0);

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy,
      dayMonth = "11/22/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        (d.value = Math.floor(distance / day)),
          (h.value = Math.floor(distance / (1000 * 60 * 60))),
          (m.value = Math.floor((distance % hour) / minute));
        s.value = Math.floor((distance % minute) / second);

        //do something later when date is reached
        //seconds
      }, 0);

    const scrollPosition = ref();
    const updateScroll = () => {
      scrollPosition.value = window.scrollY;
    };
    return {
      d,
      h,
      m,
      s,
      // scrollPosition,
      // updateScroll,
      scrollPageTo,
      openPopup: ref(false),
      options: [
        'GLMR', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      model: ref("GLMR"),
      
    };
  },
});
</script>
<style scoped>
@import "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Orbitron:wght@400;500;600;700;900&display=swap";
@import "~assets/landing/css/style.css";
@import "~assets/landing/css/animate.min.css";
</style>
