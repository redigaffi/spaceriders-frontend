<template>
  <div id="landing">
    <header class="header" ref="headRef">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="header__inner">
          <img src="~assets/landing/img/menu.svg" alt="Меню" class="menu" />

          <a href="#" class="logo" v-on:click.prevent="scrollPageTo('landing')">
            SPACERIDERS
          </a>

          <div class="header__nav">
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('landing')"
              >HOME</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('game')"
              >GAME MECHANICS</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('road')"
              >ROADMAP</a
            >

            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('faq')"
              >FAQs</a
            >

            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('team')"
              >TEAM</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('social')"
              >SOCIAL MEDIA</a
            >
            <a
              style="cursor: pointer"
              class="header__nav--link go"
              @click="openDisclaimer = true"
              >DISCLAIMER</a
            >

            <button
              class="button q-pa-md q-mr-xs"
              style="
                border: 3px solid #2253f4;
                border-radius: 5px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;
              "
              @click="openWhitepaper = true"
            >
              DARKPAPER
            </button>
          </div>
        </div>
      </div>
    </header>

    <section class="main">
      <Particles
        id="particles-js"
        :options="{
          fpsLimit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: false,
                mode: 'repulse',
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
                value_area: 2500,
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
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
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

      <div id="overlay" :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="main__inner">
          <h2 class="footer__title wow animate__animated animate__fadeIn">
            <span class="blue">SPACE</span>RIDERS
          </h2>

          <p class="main__subtitle wow animate__animated animate__fadeIn">
            SpaceRiders is a combat and planetary management simulator set in
            space that integrates blockchain technology.
          </p>
          <div class="fit row wrap justify-start items-start content-start">
            <!--<div class="q-mr-md">
              <Swap>
                <button class="button main__button3 popup__open">
                  Buy $BKM
                </button>
              </Swap>
            </div>-->
            <div>
              <button
                class="button main__button3 popup__open"
                @click.prevent="redirectTestnet"
              >
                Play the MVP!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div id="game"></div>
    <section class="custom-game">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">GAME MECHANICS</div>
          <div class="game__content">
            <div class="game__item">
              <p class="game__item--title">Play to Own</p>
              <p class="game__item--text custom-font">
                SpaceRiders defines itself as a Play to Own. This game model
                integrates blockchain technology, through which NFTs are
                implemented. Thanks to both integrations, you as a player have
                total ownership of all your in-game assets as well as complete
                freedom to do with them anything that you want.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Mines & Warehouses</p>
              <p class="game__item--text custom-font">
                The extraction of resources (Metal, Crystal, Petrol) is the key
                to the game and this is possible thanks to the mines. Once the
                mines extract resources they are stored in their relevant
                warehouse depending on the resource. The higher the level of
                your mines, the higher the production, but also the higher the
                energy consumption.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Player Driven Economy</p>
              <p class="game__item--text custom-font">
                Users have total control over the game economy through offer and
                demand. Thanks to the Intergalactic Stock Market we give
                absolute power to the gamers which decide the value and price of
                each resource. This trading platform allows users to trade any
                resource in parity with $BKM or other resources.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Player vs Environment (PVE)</p>

              <p class="game__item--text custom-font">
                Space is a dangerous and outlaw territory, throughout its vast
                galaxies and solar systems you’ll have to fight for survival and
                growth of your planet. Asteroids can damage your planet's
                buildings and Space Pirates might steal your resources if you’re
                not prepared. To prevent this from happening, build up your
                Laser Launchers and Missile Launchers!
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Free to Play</p>

              <p class="game__item--text custom-font">
                SpaceRiders has a Free to Play version, where entry is not
                limited to those who pay. This version is an exact copy of the
                Full Version, but is found on the Binance Smart Chain Testnet.
                This Free to Play version will be opened in special events
                during a few weeks so that everyone can access SpaceRiders for
                free.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Installations</p>
              <p class="game__item--text custom-font">
                Installations play a key role in any planets’ growth and
                expansion throughout the solar system. Hangar permits the
                construction of defensive structures and, in the near future,
                spaceships to conquer the universe. The Investigation Laboratory
                opens the door to innovation and progress by researching
                necessary technologies for your benefit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ROADMAP V2 -->

    <div id="road"></div>
    <section class="roadmap">
      <timeline mainTitle="ROADMAP" :timelineFeed="timelineFeed"></timeline>
    </section>

    <!-- FAQ -->
    <div id="faq"></div>
    <section class="game">
      <div :class="$q.screen.lt.md ? '' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">FAQ</div>

          <div class="q-mt-lg">
            <div
              class="q-pb-xl"
              :class="$q.screen.lt.md ? 'q-px-xs' : 'container'"
            >
              <q-list bordered style="border-color: #2f2f91">
                <div v-for="(item, index) in faq_section" :key="index">
                  <q-expansion-item
                    group="somegroup"
                    :label="item.label"
                    header-class="text-white bg-transparent"
                    active-class="bg-transparent text-white"
                  >
                    <q-card>
                      <q-card-section class="text-h5">
                        <p
                          v-for="description in item.description"
                          :key="description"
                        >
                          {{ description }}
                        </p>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-separator />
                </div>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <div id="team"></div>
    <section class="game">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">TEAM</div>

          <div class="q-pt-xl row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card
                flat
                class="bg-transparent text-center"
                style="height: 100%"
              >
                <div class="text-center">
                  <img
                    src="~assets/landing/img/ast/jordi_ast.webp"
                    style="width: 100px"
                  />
                </div>

                <q-card-section>
                  <div class="text-h5">Jordi</div>
                  <div class="text-h6">CEO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-h5">
                  <div>Principle Software Engineer</div>
                  <div>Blockchain Enthusiast</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-linkedin-in"
                    type="a"
                    target="_blank"
                    href="https://www.linkedin.com/in/jordi-walter-hoock-castro-10105696/"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                    type="a"
                    target="_blank"
                    href="https://t.me/SpaceRidersENChat"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-discord"
                    type="a"
                    target="_blank"
                    href="https://discord.gg/h733Kh6XTn"
                  />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card
                flat
                class="bg-transparent text-center"
                style="height: 100%"
              >
                <div class="text-center">
                  <img
                    src="~assets/landing/img/ast/iniaki_ast.webp"
                    style="width: 100px"
                  />
                </div>

                <q-card-section>
                  <div class="text-h5">Iñaki</div>
                  <div class="text-h6">CFO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-h5">
                  <div>Financial Operations Lead</div>
                  <div>Content Creator</div>
                  <div>Blockchain & Crypto Enthusiast</div>
                  <div>System & Graphics Analyst</div>
                  <div>NFT Games Player</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-linkedin-in"
                    type="a"
                    target="_blank"
                    href="https://www.linkedin.com/in/inaki-marzo-d%C3%ADaz/"
                  />
                  <!-- <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                    type="a" target="_blank" href="https://t.me/SpaceRidersENChat"
                  /> -->
                  <!-- <q-btn flat round color="white" icon="fab fa-discord" type="a" target="_blank" href="https://discord.gg/h733Kh6XTn" /> -->
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-youtube"
                    type="a"
                    target="_blank"
                    href="https://www.youtube.com/channel/UCqX0UclPprNbbm8dA3x21JA"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    type="a"
                    target="_blank"
                    href="https://linktr.ee/MundoLast"
                  >
                    <img
                      src="~assets/landing/img/linktreee.svg"
                      alt="Телеграм"
                      style="height: 30px"
                    />
                  </q-btn>
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-twitch"
                    type="a"
                    target="_blank"
                    href="https://www.twitch.tv/cryptolast"
                  />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card
                flat
                class="bg-transparent text-center"
                style="height: 100%"
              >
                <div class="text-center">
                  <img
                    src="~assets/landing/img/ast/max_ast.webp"
                    style="width: 100px"
                  />
                </div>

                <q-card-section>
                  <div class="text-h5">Max</div>
                  <div class="text-h6">CPO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-h5">
                  <div>Product Lead</div>
                  <div>Business Analysis</div>
                  <div>Marketing Operations</div>
                  <div>Social Media Lead</div>
                  <div>Blockchain & Crypto Enthusiast</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-linkedin-in"
                    type="a"
                    target="_blank"
                    href="https://www.linkedin.com/in/max-pamies-i-del-campo-b2591921a"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                    type="a"
                    target="_blank"
                    href="https://t.me/atopikoin"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-discord"
                    type="a"
                    target="_blank"
                    href="#AtopiKoin2676"
                  />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-3">
              <q-card
                flat
                class="bg-transparent text-center"
                style="height: 100%"
              >
                <div class="text-center">
                  <img
                    src="~assets/landing/img/ast/jose_ast.webp"
                    style="width: 100px"
                  />
                </div>

                <q-card-section>
                  <div class="text-h5">José</div>
                  <div class="text-h6">CTO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-h5">
                  <div>Fullstack Engineer</div>
                  <div>C# / Unity Developer</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-linkedin-in"
                    type="a"
                    target="_blank"
                    href="https://www.linkedin.com/in/joseruizdev/"
                  />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                    type="a"
                    target="_blank"
                    href="https://t.me/thewisdomwarrior"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TROUBLESHOOTING
    <div id="game"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">TROUBLESHOOTING</div>

          <div
            class="game__content q-pa-lg"
            style="
              border: 2px solid #2253f4;
              box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
              height: 100%;
            "
          >
            <p class="text-h5">
              In this section you will find the most common and/or current issues people are having when trying to do an action. In this page we will trouble shoot all user-issues and provide a tested solution for our users.
            </p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- TOKENOMICS -->

    <!--<section class="game">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">Tokenomics</div>
          <div class="token__inner q-mt-xl text-center">
            <div
              class="token__img--inner wow animate__animated animate__fadeIn"
            >

              <PieChart />
            </div>

            <div
              class="token__text--inner wow animate__animated animate__fadeIn"
            >
              <div
                class="token__wrapper"
                style="
                  border: 2px solid #2253f4;
                  box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
                  height: 100%;
                "
              >
                <p class="token__wrapper--title">Total supply 100M</p>

                <div class="token__colors text-h6 row">
                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Liquidity 15%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Reward Pool 50%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Future IG 10%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Team 2.5%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Partnerships 7.5%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Seed Funding 3%
                  </div>

                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    Private Sale 5%
                  </div>
                  <div class="token__color">
                    <div class="token__color--wrapper"></div>

                    IDO 7%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-pt-md">
            <h2 class="text-h4">Token Allocation</h2>
            <p class="text-h5 text-justify q-pt-md">
              We use a dual token system with $BKM which is split into Gaming
              Tokens and Trading Tokens to ensure the sustainability &
              scalability of the SpaceRiders ecosystem. We have implemented
              economic incentives to encourage users to participate in the Space
              ecosystem, thereby creating a self-sufficient internal and
              external economy with healthy demands and supplies.
            </p>
            <h2 class="text-h4 q-pt-lg">Buying And Selling Tax:</h2>
            <div class="text-h5 q-pt-md">
              <p>2% Liquidity Pool</p>
              <p>2% Reward Pool</p>
              <p>1% Burn</p>
            </div>
          </div>
        </div>
      </div>
    </section>-->

    <!-- SOCIAL -->
    <div id="social"></div>
    <section class="social">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="social__inner">
          <h2 class="title social__title wow animate__animated animate__fadeIn">
            SOCIAL MEDIA
          </h2>

          <div class="social__content wow animate__animated animate__fadeIn">
            <a
              href="https://medium.com/@spaceriders.io"
              target="_blank"
              class="social__link"
            >
              <img
                src="~assets/landing/img/m-white.svg"
                alt="М"
                class="social__link--icon"
              />
            </a>

            <a
              href="https://twitter.com/spaceriders_io"
              target="_blank"
              class="social__link"
            >
              <img
                src="~assets/landing/img/twitter-white.svg"
                alt="Твитер"
                class="social__link--icon"
              />
            </a>

            <a
              href="https://t.me/SpaceRidersENChat"
              target="_blank"
              class="social__link"
            >
              <img
                src="~assets/landing/img/telegram-white.svg"
                alt="Телеграм"
                class="social__link--icon"
              />
            </a>

            <a
              href="https://discord.gg/h733Kh6XTn"
              target="_blank"
              class="social__link"
            >
              <img
                src="~assets/landing/img/discord.svg"
                alt="Телеграм"
                class="social__link--icon"
              />
            </a>

            <a
              href="https://www.instagram.com/spaceriders.io/"
              target="_blank"
              class="social__link"
            >
              <q-icon
                name="fab fa-instagram"
                :size="$q.screen.lt.md ? '40px' : '80px'"
                color="white"
              />
            </a>

            <a
              href="https://www.youtube.com/channel/UCWJTk_2vaE7FahONZpGp-0A"
              class="social__link"
              target="_blank"
            >
              <q-icon
                name="fab fa-youtube"
                :size="$q.screen.lt.md ? '40px' : '80px'"
                color="white"
              />
            </a>

            <a
              v-if="$q.screen.gt.sm"
              href="https://linktr.ee/SpaceRiders.io"
              target="_blank"
              class="social__link"
            >
              <img
                src="~assets/landing/img/linktreee.svg"
                alt="Телеграм"
                class="social__link--icon"
              />
            </a>
          </div>
          <div v-if="!$q.screen.gt.sm" class="text-center">
            <q-btn
              type="a"
              style="border-radius: 10px"
              href="https://linktr.ee/SpaceRiders.io"
              target="_blank"
              dense
              class="bg-warning text-white q-mr-sm"
            >
              <img
                src="~assets/landing/img/linktreee.svg"
                alt="Телеграм"
                style="height: 50px"
              />
            </q-btn>
            <!-- <a
              href="https://linktr.ee/SpaceRiders.io"
              target="_blank"
              style="display: flex; background: #2253f4; border-radius: 10px"
            >
              <div class="text-center"></div>
            </a> -->
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
          <h2 class="footer__title"><span class="blue">SPACE</span>RIDERS</h2>

          <div class="footer__nav">
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >HOME</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('game')"
              class="footer__nav--link go"
              >GAME MECHANICS</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('road')"
              class="footer__nav--link go"
              >ROADMAP</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >WHITEPAPER</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >TEAM</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('social')"
              class="footer__nav--link go"
              >SOCIAL MEDIA</a
            >
            <a
              style="cursor: pointer"
              class="header__nav--link go"
              @click="openDisclaimer = true"
              >DISCLAIMER</a
            >
          </div>

          <p class="footer__copy">Copyright &copy; SpaceRiders 2022</p>
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
        <a
          href="#"
          class="header__nav--link go"
          v-on:click.prevent="scrollPageTo('landing')"
          >HOME</a
        >
        <a
          href="#"
          class="header__nav--link go q-pt-sm"
          v-on:click.prevent="scrollPageTo('game')"
          >GAME MECHANICS</a
        >
        <a
          href="#"
          class="header__nav--link go q-pt-sm"
          v-on:click.prevent="scrollPageTo('road')"
          >ROADMAP</a
        >

        <a
          href="#"
          class="header__nav--link go q-pt-sm"
          v-on:click.prevent="scrollPageTo('faq')"
          >FAQs</a
        >

        <a
          href="#"
          class="header__nav--link go q-pt-sm"
          v-on:click.prevent="scrollPageTo('team')"
          >TEAM</a
        >
        <a
          href="#"
          class="header__nav--link go q-pt-sm"
          v-on:click.prevent="scrollPageTo('social')"
          >SOCIAL MEDIA</a
        >
        <a
          style="cursor: pointer"
          class="header__nav--link go"
          @click="openDisclaimer = true"
          >DISCLAIMER</a
        >

        <div class="q-pt-md">
          <button
            class="button q-pa-md q-mr-xs"
            style="
              border: 3px solid #2253f4;
              border-radius: 5px;
              box-shadow: 0 0 20px rgb(34 83 244 / 76%);
              color: #fff;
            "
            @click="openWhitepaper = true"
          >
            WHITEPAPER
          </button>
        </div>
      </div>
    </div>

    <q-dialog v-model="openWhitepaper">
      <q-card style="border-radius: 30px; max-width: 80vw">
        <q-card-section class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 text-center">
            <a
              href="https://spaceriders-spaceriders.gitbook.io/spaceriders-darkpaper-1/"
              target="_blank"
            >
              <img
                src="~assets/landing/img/usa.png"
                style="cursor: pointer; width: 100%"
                :style="
                  $q.screen.lt.md ? { height: '150px' } : { height: '200px' }
                "
              />
            </a>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 text-center">
            <a
              href="https://spaceriders-spaceriders.gitbook.io/spaceriders-darkpaper/"
              target="_blank"
            >
              <img
                src="~assets/landing/img/spain.png"
                style="cursor: pointer; width: 100%"
                :style="
                  $q.screen.lt.md ? { height: '150px' } : { height: '200px' }
                "
              />
            </a>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog id="disclaimer-modal" v-model="openDisclaimer">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-icon name="error" size="lg" />
          <q-space />
          <div class="text-h3">Disclaimer</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section
          style="max-height: 50vh; overflow-y: scroll"
          class="scroll"
        >
          <p>
            The information provided on this website does not constitute
            investment advice, financial advice, trading advice, or any other
            sort of advice and you should not treat any of the website's content
            as such. SpaceRiders team does not recommend and is not responsible
            for any cryptocurrency that is bought, sold, or held by you. Do
            conduct your own due diligence and consult your financial advisor
            before making any investment decisions.
          </p>
          <br />
          <p>
            SpaceRiders team expressly disclaims any and all responsibility for
            any direct or consequential loss or damage of any kind whatsoever
            arising directly or indirectly from:
          </p>
          <ol>
            <li>Reliance on any information produced by SpaceRiders.</li>
            <li>Any error, omission or inaccuracy in any such information.</li>
            <li>Any action resulting therefrom.</li>
            <li>
              Usage or acquisition of products, available through the website.
            </li>
          </ol>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Ok, I understand" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import Timeline from "src/components/Timeline.vue";
//import PieChart from "../components/pieChart";

export default defineComponent({
  name: "PageLanding",
  //components: { PieChart },
  setup() {
    // const $q = useQuasar();
    // $q.loading.show();
    const headRef = ref(null); // obtain the reference
    onMounted(() => {
      window.addEventListener("scroll", () => {
        var curr = window.pageYOffset;
        if (curr >= 100) {
          headRef.value.classList.add("header-bg");
        } else {
          headRef.value.classList.remove("header-bg");
        }
      });
    });
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
    const openWhitepaper = ref(false);
    const openDisclaimer = ref(false);
    const faq_section = ref([
      {
        label: "What is SpaceRiders?",
        description: [
          "SpaceRiders is a combat and planetary management simulator set in space that integrates blockchain technology.",
        ],
      },
      {
        label: "Where can I buy $BKM token?",
        description: [
          "For the convenience of our users, we have pioneered our very own exchange tool which can be easily accessible on the landing page of our website and also on the game itself.",
          "Our exchange tool is directly linked to PancakeSwap thus saving you time and effort.",
          "If you prefer, you can also purchase $BKM Token on PancakeSwap itself.",
        ],
      },
      {
        label: "What do I need to play SpaceRiders?",
        description: [
          "You need a compatible wallet such as MetaMask and enough $BKM previously purchased in order to mint a planet and fill your energy.",
        ],
      },
      {
        label: "When will I be able to play SpaceRiders?",
        description: [
          "The MVP (Minimum Viable Product) is completed and is currently undergoing rigorous testing by the development team prior to rolling it out, to ensure that your first experience within the game is exceptional.",
          "As stated in our roadmap, we anticipate launch of this version in Q4 2022.",
        ],
      },
      {
        label: "Will SpaceRiders be a Free to Play?",
        description: [
          "SpaceRiders is a Play to Own - Player Driven Economy - Free to Play.",
          "Mainnet version isn’t Free to Play, but during special events a replica of the main version will open to the public into Testnet as a Free to Play, ensuring accessibility to all users.",
        ],
      },
      {
        label: "How does SpaceRiders use the blockchain?",
        description: [
          "SpaceRiders is a Play to Own and as such we integrate blockchain as an ownership validation and as a source of existence for our real economy.",
        ],
      },
      {
        label: "Can I earn money while playing SpaceRiders?",
        description: [
          "SpaceRiders isn’t a Play to Earn hence why our main focus isn’t users making money, despite that, you can trade Resources in exchange of $BKM in the Intergalactic Stock Market (ISM) and withdraw the generated $BKM to your wallet.",
        ],
      },
    ]);
    const timelineFeed = [
      {
        heading: "Q2 2022",
        imgSrc: "research.webp",
        content: [
          "Launch of the Alpha Version of the first concept on Testnet.",
          "Appearance in the main social networks.",
          "Rethinking of the P2E model.",
          "Migration from API V1 to API V2.",
        ],
      },
      {
        heading: "Q3 2022",
        imgSrc: "missileLauncher.webp",
        content: [
          "Redesign of SpaceRiders to Play To Own, Player Driven Economy & Free To Play models.",
          "Definition of objectives and priorities under the new model.",
          "Remodeling of documentation and web page.",
          "Development and testing of the Intergalactic Stock Market (ISM).",
        ],
      },
      {
        heading: "Q4 2022",
        imgSrc: "resources.webp",
        content: [
          "Development and implementation of the IG-Economy V1.",
          "Official Launch of MVP in the Testnet.",
          "Start of marketing campaign in collaboration with content creators.",
          "Product validation, bug fixes and implementation of improvements.",
          "Announcement of strategic partnerships.",
        ],
      },
      {
        heading: "Q1 2023",
        imgSrc: "hangar.webp",
        content: [
          "Launch of the PVE version on the Binance Smart Chain Mainnet.",
          "Launch of the token on the Binance Smart Chain.",
          "Expansion of the SpaceRiders brand.",
          "Strategic blockchain and gaming partners.",
          "Development and testing of Refined Resources.",
          "First exclusive NFTs.",
        ],
      },
      {
        heading: "Q2 2023",
        imgSrc: "installations.webp",
        content: [
          "First face-to-face events focused on the expansion of the project.",
          "Development and testing of the first PVP features.",
          "Development and testing of the Items Marketplace.",
        ],
      },
    ];
    function redirectTestnet() {
      window.location.href = "http://testnet.spaceriders.io/nouser";
      return;
    }
    return {
      redirectTestnet: redirectTestnet,
      d,
      h,
      m,
      s,
      // scrollPosition,
      // updateScroll,
      scrollPageTo,
      options: ["GLMR", "Facebook", "Twitter", "Apple", "Oracle"],
      model: ref("GLMR"),
      openWhitepaper,
      openDisclaimer,
      slide: ref(1),
      faq_section,
      headRef,
      timelineFeed,
    };
  },
  components: { Timeline },
});
</script>
<style scoped>
/* @import "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Orbitron:wght@400;500;600;700;900&display=swap"; */
@import "~assets/landing/css/style.css";
@import "~assets/landing/css/animate.min.css";

#disclaimer-modal ol li {
  list-style-type: upper-roman;
}

.roadmap {
  padding: 0rem 0rem;
  background-size: cover;
  border-bottom: 1px solid #2253f4;
}

#overlay {
  position: relative;
}

#particles-js {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
