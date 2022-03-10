<template>
  <div id="landing">
    <header class="header">
      <div class="container">
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
              v-on:click.prevent="scrollPageTo('overview')"
              >OVERVIEW</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('game')"
              >GAME MECHANINCS</a
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
              v-on:click.prevent="scrollPageTo('team')"
              >TEAM</a
            >
            <a
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('social')"
              >SOCIAL MEDIA</a
            >

            <!-- <q-btn
              outline
              color="blue"
              class="q-pa-md"
              label="Whitepaper"
            /> -->

            <button
              class="button q-pa-md q-mr-xs"
              style="
                border: 3px solid #2253f4;
                border-radius: 5px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;
              "
              v-on:click.prevent="scrollPageTo('landing')"
            >
              WHITEPAPER
            </button>

            <button
              class="button q-pa-md"
              style="
                border: 3px solid #2253f4;
                border-radius: 5px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;
              "
              v-on:click.prevent="scrollPageTo('landing')"
            >
              Game manual
            </button>
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
            <span class="blue">SPACE</span>RIDERS
          </h2>

          <p class="main__subtitle wow animate__animated animate__fadeIn">
            is a strategy-game set in space...
          </p>
          <div class="fit row wrap justify-start items-start content-start">
            <div class="q-mr-md">
              <Swap>
                <button class="button main__button3 popup__open">
                  Buy $SPR
                </button>
              </Swap>
            </div>
            <div>
              <button
                class="button main__button3 popup__open"
                @click.prevent="$router.push('/research')"
              >
                Enter Space Riders
              </button>
            </div>
          </div>

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
          <div class="text-2 title game__title">OVERVIEW</div>
          <div class="q-gutter-xl q-pt-xl custom-font" style="color: #cbcbcb">
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
          <div class="text-2 title game__title">GAME MECHANICS</div>

          <div class="game__content">
            <div class="game__item">
              <p class="game__item--title">Advanced Innovative System</p>
              <p class="game__item--text custom-font">
                At Space Riders, we strive towards innovation and being
                futureproof. A range of new contemporary systems have systems
                have been born in the development of this project which will
                benefit both the health and longevity of the game, Long term and
                short term.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Fixed Entry Price</p>
              <p class="game__item--text custom-font">
                To enter Space Riders, you will need to mint a planet first. Our
                innovative systems ensures that users will always pay the same
                price in $ USD when minting a planet, regardless of the token
                price. This ensures fairness to our users.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">Fixed Rewards Price</p>
              <p class="game__item--text custom-font">
                Once users decide to take rewards by changing resources to the
                native $SPR Token, they will get the rewards in the resources
                current value in $ USD regardless of what the value of $SPR is.
              </p>
            </div>

            <div class="game__item">
              <p class="game__item--title">50/50 Mark Token System</p>
              <p class="game__item--text custom-font">
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

              <p class="game__item--text custom-font">
                Each time a user invests, they will be distributed tokens in the
                following way:
              </p>
              <ul class="game__item--text custom-font">
                <li>⦁ 50% Tradeable Tokens (TT)</li>
                <li>⦁ 50% Gaming Token (GT)</li>
              </ul>
              <p class="game__item--text custom-font">
                This Method will prevent the token being exploited and has been
                pioneered to achieve long term and short-term token health to
                encourage users to play and enjoy the game. A more detailed
                analysis can be found within the Game Manual
              </p>
            </div>
            <div class="game__item">
              <p class="game__item--title">In-Game Features</p>

              <p class="game__item--text custom-font">
                You will have all the tools needed to succeed within the game at
                your disposal. This includes defensive weaponry, laser
                technology and In-game Research Facilities which includes an
                investigation laboratory.
              </p>
            </div>
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
                src="~assets/img/GameRoadmap.jpeg"
                alt=""
                style="width: 100%"
              />
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <img
                src="~assets/img/GeneralRoadmap.jpeg"
                alt=""
                style="width: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <div id="game"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">FAQ</div>

          <div class="game__content">
            <div class="q-pb-xl container">
              <q-list bordered style="border-color: #2f2f91">
                <q-expansion-item
                  group="somegroup"
                  label="What is Spaceriders?"
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      SpaceRiders ($SPR) is a play-to-earn real-time strategy
                      NFT game settled in space. $SPR enables players to
                      purchase and acquire virtual items within the Spaceriders
                      game.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="Where do I buy $SPR token? "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      For convenience of our users , We have pioneered our very
                      own exchange tool which can be easily accessible on the
                      landing page of our website and also on the game itself.
                      Our exchange tool is directly linked to pancake swap thus
                      saving you time and effort. If you prefer , you can also
                      purchase $SPR Token on pancake swap itself.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="What do I need to play Spaceriders?"
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        You need a compatible wallet such as Metamask and enough
                        $SPR previously purchased in order to mint a planet and
                        fill your energy
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="When will users be able to play Spaceriders?  "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        The MVP (Minimum Viable Product ) is completed and is
                        currently undergoing rigorous testing by the development
                        team prior to rolling it out, to ensure that your first
                        experience within the game is exceptional. As stated in
                        our roadmap, we anticipate launch of this version in Q2
                        2022
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="Will Spaceriders be free to play? "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        To enter Space Riders, you will need to mint a planet
                        first. Our innovative systems ensures that users will
                        always pay the same price in $ USD when minting a
                        planet, regardless of our token price. This ensures
                        fairness to our users.
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="How does Spaceriders utilise blockchain?  "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        $SPR or $SpaceRiders is the in-game currency of
                        SpaceRiders game, it is used for any purchase and for
                        rewards.
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="How do I expect to make passive income? "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        Passive income will generate from your earnings when
                        converting resources to $SPR . This will come from the
                        mines you're upgrading. To maximise your ROI you'll need
                        to focus and follow your own strategy.
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item
                  group="somegroup"
                  label="Will there be an ALPHA version? "
                  header-class="text-white bg-transparent text-h6"
                  active-class="bg-transparent text-white"
                >
                  <q-card>
                    <q-card-section class="text-subtitle1">
                      <div>
                        Yes the ALPHA version will be released via a testnet.
                        This is so our community will be able to have an
                        opportunity to get use to the game to understand the
                        strategical approach.
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAINTENANCE -->
    <div id="game"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">MAINTENANCE</div>

          <div
            class="game__content q-pa-lg"
            style="
              border: 2px solid #2253f4;
              box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
              height: 100%;
            "
          >
            This page will be used to give users information regarding software
            updates which may have an impact on the performance of the game.
          </div>
        </div>
      </div>
    </section>

    <!-- TEAM -->
    <div id="game"></div>
    <section class="game">
      <div class="container">
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
                  <img src="~assets/img/JORDI.png" style="width: 100px" />
                </div>

                <q-card-section>
                  <div class="text-h5">Jordi</div>
                  <div class="text-h6">CEO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-subtitle2">
                  <div>Principle Software Engineer</div>
                  <div>Blockchain Enthusiast</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn flat round color="white" icon="fab fa-linkedin-in" />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                  />
                  <q-btn flat round color="white" icon="fab fa-discord" />
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
                  <img src="~assets/img/INIAKI.png" style="width: 100px" />
                </div>

                <q-card-section>
                  <div class="text-h5">Iñaki</div>
                  <div class="text-h6">CFO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-subtitle2">
                  <div>Financial Operations Lead</div>
                  <div>Content Creator</div>
                  <div>Blockchain Enthusiast</div>
                  <div>NFT Games Player</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn flat round color="white" icon="fab fa-linkedin-in" />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                  />
                  <q-btn flat round color="white" icon="fab fa-discord" />
                  <q-btn flat round color="white" icon="fab fa-youtube" />
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
                  <img src="~assets/img/MAX.png" style="width: 100px" />
                </div>

                <q-card-section>
                  <div class="text-h5">Max</div>
                  <div class="text-h6">CPO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-subtitle2">
                  <div>Product Lead</div>
                  <div>Business Analysis</div>
                  <div>Marketing Operations</div>
                  <div>Social Media Lead</div>
                  <div>Crypto Specialist</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn flat round color="white" icon="fab fa-linkedin-in" />
                  <q-btn
                    flat
                    round
                    color="white"
                    icon="fab fa-telegram-plane"
                  />
                  <q-btn flat round color="white" icon="fab fa-discord" />
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
                  <img src="~assets/img/avatar-icon.png" style="width: 100px" />
                </div>

                <q-card-section>
                  <div class="text-h5">Mack</div>
                  <div class="text-h6">CTO</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-subtitle2">
                  <div>Front end Support</div>
                  <div>Strategy Analyst</div>
                  <div>Systems Analyst</div>
                  <div>Data Analysis</div>
                  <div>Blockchain Enthusiast</div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <q-btn flat round color="white" icon="fab fa-linkedin-in" />
                  <q-btn flat color="white" icon="fab fa-telegram-plane" />
                  <q-btn flat color="white" icon="fab fa-discord" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAINTENANCE -->
    <div id="game"></div>
    <section class="game">
      <div class="container">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">DISCLAIMER</div>

          <div
            class="game__content q-pa-lg"
            style="
              border: 2px solid #2253f4;
              box-shadow: 0 0 20px rgba(34, 83, 244, 0.76);
              height: 100%;
            "
          >
            <p class="text-h5">
              The information provided on this website does not constitute
              investment advice, financial advice, trading advice, or any other
              sort of advice and you should not treat any of the website's
              content as such. Spaceriders team does not recommend and is not
              responsible for any cryptocurrency that is bought, sold, or held
              by you. do conduct your own due diligence and consult your
              financial advisor before making any investment decisions.
            </p>
            <p class="q-pt-md text-h5">
              Spaceriders team expressly disclaims any and all responsibility
              for any direct or consequential loss or damage of any kind
              whatsoever arising directly or indirectly from
            </p>
            <p class="q-pt-md text-h5">
              <ul>
                <li>(i) reliance on any information produced by Spaceriders</li>
                <li>(ii) any error, omission or inaccuracy in any such information</li>
                <li>(iii) any action resulting therefrom, </li>
                <li>
                  (iv) usage or acquisition of products, available through the website.
                </li>
              </ul>
            </p>
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
            SOCIAL MEDIA
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
              v-on:click.prevent="scrollPageTo('overview')"
              class="footer__nav--link go"
              >OVERVIEW</a
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
  </div>
</template>

<script>
// import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
// import '../assets/landing/js/particles.js';
// import '../assets/landing/js/app.js';
// import '../assets/landing/js/jquery.countdown.js';
import "../assets/landing/js/wow.min.js";
import "../assets/landing/js/main.js";
import RouterContract from "../service/contract/RouterContract";
import SpaceRiders from "../service/contract/SpaceRiders";
import { useStore } from "vuex";
import ApiRequests from "../service/http/ApiRequests";
import { defineComponent, ref } from "vue";
import { watch } from "vue";
import Swap from "components/Swap.vue";

//   new WOW().init();
export default defineComponent({
  name: "PageLanding",
  // mounted() {
  //   window.addEventListener("scroll", this.updateScroll);
  // },
  components: {
    Swap,
  },
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
      options: ["GLMR", "Facebook", "Twitter", "Apple", "Oracle"],
      model: ref("GLMR"),
    };
  },
});
</script>
<style scoped>
/* @import "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Orbitron:wght@400;500;600;700;900&display=swap"; */
@import "~assets/landing/css/style.css";
@import "~assets/landing/css/animate.min.css";
</style>
