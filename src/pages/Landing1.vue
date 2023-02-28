<template>
  <div id="landing">
    <q-header
      class="header"
      :class="{
        'header-bg': !headerTransparency,
      }"
    >
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="header__inner">
          <q-btn
            v-if="$q.screen.lt.md"
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
          />

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
              v-if="mediumFeed.length > 0"
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('blog')"
              >BLOG</a
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
              v-on:click.prevent="scrollPageTo('token')"
              >TOKEN</a
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
              >FAQ</a
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
              @click.prevent="openDisclaimer = true"
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
              @click="openDarkpaper = true"
            >
              DARKPAPER
            </button>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer
      id="side-menu"
      v-model="drawer"
      :width="$q.screen.lt.sm ? $q.screen.width : 400"
      :breakpoint="500"
      bordered
      overlay
      elevated
      behavior="desktop"
      class="primary"
    >
      <q-scroll-area
        class="fit"
        :visible="true"
        :vertical-thumb-style="{
          width: '25px',
          background: '#2253f4',
          opacity: '1',
        }"
      >
        <q-list dark separator>
          <!--
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        -->
          <q-item class="menu-item" clickable v-ripple @click="drawer = false">
            <q-item-section avatar>
              <q-icon name="close" />
            </q-item-section>
            <q-item-section>Close</q-item-section>
          </q-item>
          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('landing')"
          >
            <q-item-section avatar>
              <q-icon name="public" />
            </q-item-section>
            <q-item-section>Home</q-item-section>
          </q-item>

          <q-item
            v-if="mediumFeed.length > 0"
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('blog')"
          >
            <q-item-section avatar>
              <q-icon name="rss_feed" />
            </q-item-section>
            <q-item-section>Blog</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('game')"
          >
            <q-item-section avatar>
              <q-icon name="sports_esports" />
            </q-item-section>
            <q-item-section>Game Mechanics</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('token')"
          >
            <q-item-section avatar>
              <q-icon name="token" />
            </q-item-section>
            <q-item-section>Token</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('road')"
          >
            <q-item-section avatar>
              <q-icon name="satellite_alt" />
            </q-item-section>
            <q-item-section>Roadmap</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('faq')"
          >
            <q-item-section avatar>
              <q-icon name="psychology_alt" />
            </q-item-section>
            <q-item-section>FAQ</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('team')"
          >
            <q-item-section avatar>
              <q-icon name="diversity_3" />
            </q-item-section>
            <q-item-section>Team</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="scrollPageTo('social')"
          >
            <q-item-section avatar>
              <q-icon name="share" />
            </q-item-section>
            <q-item-section>Social Media</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="
              drawer = false;
              openDisclaimer = true;
            "
          >
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>Disclaimer</q-item-section>
          </q-item>

          <q-item
            class="menu-item"
            clickable
            v-ripple
            @click="
              drawer = false;
              openDarkpaper = true;
            "
          >
            <q-item-section avatar>
              <q-icon name="pages" />
            </q-item-section>
            <q-item-section>Darkpaper</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <section class="main">
      <Particles
        id="particles-js"
        class="particles-header"
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
      <!--
      <div class="main__timer" style="display: none">
        <q-card class="bg-transparent">
          <div class="row q-col-gutter-lg text-center">
            <div class="col">
              <div class="text-h2 text-weight-bolder">{{ d }}</div>
              <div class="text-h4 q-pt-md text-weight-bolder">Days</div>
            </div>
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
      -->

      <div id="overlay" :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="main__inner">
          <h2 class="footer__title wow animate__animated animate__fadeIn">
            <span class="blue">SPACE</span>RIDERS
          </h2>

          <p class="main__subtitle wow animate__animated animate__fadeIn">
            SpaceRiders is a combat and planetary management simulator set in
            space that integrates blockchain technology.
          </p>
          <div
            class="fit row wrap justify-start items-start content-start q-gutter-sm"
          >
            <!--<div class="q-mr-md">
              <Swap>
                <button class="button main__button3 popup__open">
                  Buy $BKM
                </button>
              </Swap>
            </div>-->
            <div v-if="$store.getters.isReleaseTime">
              <q-btn
                class="button main__button3 popup__open"
                @click.prevent="redirectTestnet"
                icon="fas fa-rocket"
                label="Play now"
              />
            </div>
            <div v-else>
              <q-btn
                icon="fas fa-clock"
                class="button main__button3 popup__open"
                size="lg"
                :label="`${h}h ${m}m ${s}s`"
              >
              </q-btn>
            </div>
            <div>
              <q-btn
                class="button main__button3"
                color="info"
                href="https://t.me/SpaceRidersENChat"
                target="_blank"
                icon="fas fa-user-astronaut"
                label="Join the community"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="!$q.screen.lt.md" id="social-bar" class="z-top">
      <div class="column">
        <div class="col">
          <a href="https://discord.gg/h733Kh6XTn" target="_blank">
            <q-avatar
              icon="fab fa-discord"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Discord
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="https://www.instagram.com/spaceriders.io/" target="_blank">
            <q-avatar
              icon="fab fa-instagram"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Instagram
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="https://medium.com/@spaceriders.io" target="_blank">
            <q-avatar
              icon="fab fa-medium-m"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Medium
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="https://t.me/SpaceRidersENChat" target="_blank">
            <q-avatar
              icon="fab fa-telegram-plane"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Telegram
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="https://twitter.com/spaceriders_io" target="_blank">
            <q-avatar
              icon="fab fa-twitter"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Twitter
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a
            href="https://www.youtube.com/channel/UCWJTk_2vaE7FahONZpGp-0A"
            target="_blank"
          >
            <q-avatar
              icon="fab fa-youtube"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                YouTube
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="mailto:contact@spaceriders.io" target="_blank">
            <q-avatar
              icon="fas fa-envelope"
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Email
              </q-tooltip>
            </q-avatar>
          </a>
        </div>

        <div class="col">
          <a href="https://linktr.ee/SpaceRiders.io" target="_blank">
            <q-avatar
              color="info"
              text-color="white"
              size="64px"
              class="to-left-item social-item"
              square
            >
              <q-img
                src="~assets/landing/img/linktreee.svg"
                style="width: 38px"
              />
              <q-tooltip
                class="bg-info"
                anchor="center left"
                self="center right"
                :offset="[15, 10]"
              >
                Linktree
              </q-tooltip>
            </q-avatar>
          </a>
        </div>
      </div>
    </div>

    <!-- BLOG -->
    <template v-if="mediumFeed.length > 0">
      <div id="blog"></div>
      <section class="game">
        <div :class="$q.screen.lt.md ? '' : 'container'">
          <div class="game__inner wow animate__animated animate__fadeIn">
            <div class="text-2 title game__title">LATEST ARTICLES</div>
            <div
              class="q-px-md q-mt-lg row justify-center items-stretch q-col-gutter-xl"
            >
              <div
                v-for="(article, index) in mediumFeed"
                :key="index"
                class="col-xs-12 col-sm-12 col-md-4"
              >
                <q-card class="custom-card full-height column justify-between">
                  <div>
                    <q-img
                      :src="`${
                        article.img
                          ? article.img
                          : 'landing/article_default_thumbnail.jpg'
                      }`"
                      height="200px"
                    />

                    <q-card-section>
                      <div class="text-subtitle3 text-grey">
                        <q-icon name="calendar_month" /> {{ article.pubDate }}
                      </div>
                      <div class="text-h3">
                        {{ article.title }}
                      </div>
                    </q-card-section>

                    <q-card-section v-if="article.subtitle">
                      <div class="text-h4">{{ article.subtitle }}</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none text-justify">
                      {{ truncate(article.content, 240) }}
                    </q-card-section>
                  </div>

                  <div>
                    <q-separator dark inset />

                    <q-card-actions vertical align="center">
                      <q-btn
                        type="a"
                        :href="article.guid"
                        target="_blank"
                        icon="bookmark"
                        color="info"
                      >
                        Read article
                      </q-btn>
                    </q-card-actions>
                  </div>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- GAME MECHANICS -->

    <div id="game"></div>
    <GameMechanics></GameMechanics>

    <!-- TOKEN -->

    <div id="token"></div>
    <section id="token-section" class="custom-game">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">TOKEN INFORMATION</div>
          <div class="content">
            <div class="q-mt-lg row flex-center">
              <div class="col-xs-12 col-md-6 text-center">
                <q-img
                  src="~assets/img/bkm.webp"
                  alt="$BKM logo"
                  fit="contain"
                />
              </div>

              <div class="col-xs-12 col-sm-6">
                <p>
                  <q-chip color="secondary" size="md" outline dense>
                    $BKM
                  </q-chip>
                  is a cryptocurrency (which means you can use it both in and
                  out of the game), the utility token of SpaceRiders and its
                  present and future ecosystem. Therefore it has the following
                  key points:
                </p>
                <br />
                <div class="q-gutter-sm">
                  <q-chip size="lg">
                    <q-avatar
                      icon="account_balance_wallet"
                      color="info"
                      text-color="white"
                    />
                    Ownership Payment
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar
                      icon="currency_exchange"
                      color="info"
                      text-color="white"
                    />
                    Trading Pair
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar
                      icon="shopping_cart_checkout"
                      color="info"
                      text-color="white"
                    />
                    In-game Purchases
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar
                      icon="settings_suggest"
                      color="info"
                      text-color="white"
                    />
                    Ecosystem Usage
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar
                      icon="storefront"
                      color="info"
                      text-color="white"
                    />
                    1000M Total Supply
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar
                      icon="extension"
                      color="info"
                      text-color="white"
                    />
                    Gamified Token
                  </q-chip>

                  <q-chip size="lg">
                    <q-avatar icon="savings" color="info" text-color="white" />
                    No Buy / Sell Tax
                  </q-chip>
                </div>
                <br />
                <div class="q-gutter-sm">
                  <q-chip size="lg">
                    <q-avatar
                      icon="switch_access_shortcut_add"
                      color="info"
                      text-color="white"
                    />
                    And much more...
                  </q-chip>
                </div>

                <br />
                <p>
                  Thanks to the number of uses of the token and its future
                  additions incorporated into our ecosystem we foresee its
                  adoption growing over time as our project does.
                </p>
              </div>
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

          <div class="q-mt-xl">
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

          <div class="q-pt-xl row q-col-gutter-sm justify-center">
            <div
              v-for="(member, index) in teamMembers"
              :key="index"
              class="col-12 col-sm-6 col-md-4"
            >
              <q-card
                flat
                class="bg-transparent text-center zoom-item"
                style="height: 100%"
              >
                <div class="text-center">
                  <q-avatar size="120px">
                    <img
                      :src="member.img"
                      style="border: 3px solid rgb(34, 83, 244)"
                    />
                  </q-avatar>
                </div>

                <q-card-section>
                  <div class="text-h5">{{ member.name }}</div>
                  <div class="text-h6">{{ member.title }}</div>
                </q-card-section>

                <hr class="bg-white" style="width: 100px; height: 3px" />
                <q-card-section class="text-h5">
                  <div v-for="(role, index) in member.roles" :key="index">
                    {{ role }}
                  </div>
                </q-card-section>
                <q-card-section class="text-subtitle2 q-gutter-md">
                  <template
                    v-for="(social, index) in member.socialMedia"
                    :key="index"
                  >
                    <q-btn
                      v-if="social.isNotFontIcon"
                      flat
                      round
                      color="white"
                      type="a"
                      target="_blank"
                      :href="social.link"
                    >
                      <img
                        :src="social.icon"
                        alt="Телеграм"
                        :style="{ height: social.height + 'px' }"
                      />
                    </q-btn>

                    <q-btn
                      v-else
                      flat
                      round
                      color="white"
                      :icon="social.icon"
                      type="a"
                      target="_blank"
                      :href="social.link"
                    />
                  </template>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PARTNERS -->

    <div id="partners"></div>
    <section class="custom-game">
      <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
        <div class="game__inner wow animate__animated animate__fadeIn">
          <div class="text-2 title game__title">PARTNERS</div>
          <div class="q-pt-xl row flex-center items-center q-col-gutter-xl">
            <div v-for="partner, index in partners" :key="index" class="zoom-item col-xs-12 col-sm-6 col-md-3">
              <a :href="partner.link" target="_blank">
                <q-img
                  :src="partner.image"
                  :alt="partner.alt"
                >
                </q-img>
              </a>
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
    <template v-if="$q.screen.lt.md">
      <div id="social"></div>
      <section class="social">
        <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
          <div class="social__inner wow animate__animated animate__fadeIn">
            <div class="text-2 title game__title">SOCIAL MEDIA</div>

            <div
              class="q-mt-lg row justify-around items-center q-col-gutter-xl"
            >
              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="https://discord.gg/h733Kh6XTn" target="_blank">
                  <q-avatar
                    icon="fab fa-discord"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Discord </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a
                  href="https://www.instagram.com/spaceriders.io/"
                  target="_blank"
                >
                  <q-avatar
                    icon="fab fa-instagram"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Instagram </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="https://medium.com/@spaceriders.io" target="_blank">
                  <q-avatar
                    icon="fab fa-medium-m"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Medium </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="https://t.me/SpaceRidersENChat" target="_blank">
                  <q-avatar
                    icon="fab fa-telegram-plane"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Telegram </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="https://twitter.com/spaceriders_io" target="_blank">
                  <q-avatar
                    icon="fab fa-twitter"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Twitter </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a
                  href="https://www.youtube.com/channel/UCWJTk_2vaE7FahONZpGp-0A"
                  target="_blank"
                >
                  <q-avatar
                    icon="fab fa-youtube"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> YouTube </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="mailto:contact@spaceriders.io" target="_blank">
                  <q-avatar
                    icon="fas fa-envelope"
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-tooltip class="bg-info"> Email </q-tooltip>
                  </q-avatar>
                </a>
              </div>

              <div class="q-mb-lg col-xs-6 col-sm-3 text-center">
                <a href="https://linktr.ee/SpaceRiders.io" target="_blank">
                  <q-avatar
                    color="info"
                    text-color="white"
                    size="96px"
                    class="zoom-item"
                  >
                    <q-img
                      src="~assets/landing/img/linktreee.svg"
                      style="width: 64px"
                    />
                    <q-tooltip class="bg-info"> Linktree </q-tooltip>
                  </q-avatar>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- FOOTER -->
    <footer class="footer">
      <div
        class="zoom-item up__arrow wow animate__animated animate__fadeIn"
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
              v-if="mediumFeed.length > 0"
              href="#"
              class="header__nav--link go"
              v-on:click.prevent="scrollPageTo('blog')"
              >BLOG</a
            >

            <a
              href="#"
              v-on:click.prevent="scrollPageTo('game')"
              class="footer__nav--link go"
              >GAME MECHANICS</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('token')"
              class="footer__nav--link go"
              >TOKEN</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('road')"
              class="footer__nav--link go"
              >ROADMAP</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('faq')"
              class="footer__nav--link go"
              >FAQ</a
            >
            <a
              href="#"
              v-on:click.prevent="scrollPageTo('landing')"
              class="footer__nav--link go"
              >TEAM</a
            >
            <a
              href="#"
              class="header__nav--link go"
              @click.prevent="openDisclaimer = true"
              >DISCLAIMER</a
            >
            <a
              href="#"
              class="footer__nav--link go"
              @click.prevent="openDarkpaper = true"
              >DARKPAPER</a
            >
          </div>

          <p class="footer__copy">Copyright &copy; SpaceRiders 2022</p>
        </div>
      </div>
    </footer>

    <q-dialog v-model="openDarkpaper">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <q-icon name="pages" size="lg" />
          <q-space />
          <div class="text-h3">Darkpaper</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 text-center">
            <a
              href="https://spaceriders-spaceriders.gitbook.io/spaceriders-darkpaper-1/"
              target="_blank"
            >
              <q-avatar class="q-m-md" size="120px">
                <img
                  src="~assets/landing/img/usa.webp"
                  style="cursor: pointer"
                />
              </q-avatar>
            </a>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 text-center">
            <a
              href="https://spaceriders-spaceriders.gitbook.io/spaceriders-darkpaper/"
              target="_blank"
            >
              <q-avatar size="120px">
                <img
                  src="~assets/landing/img/spain.webp"
                  style="cursor: pointer"
                />
              </q-avatar>
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

        <q-card-actions align="center">
          <q-btn label="Ok, I understand" color="info" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { onMounted } from "@vue/runtime-core";
import Timeline from "src/components/Timeline.vue";
import GameMechanics from "src/components/GameMechanics.vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import ApiRequest from "../service/http/ApiRequests";
import _ from "lodash";
import { releaseDate } from "../constants/Shared";

//import PieChart from "../components/pieChart";

export default defineComponent({
  name: "PageLanding",
  //components: { PieChart },
  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const mediumFeed = ref(new Array());
    // $q.loading.show();
    const headerTransparency = ref(true); // obtain the reference
    onMounted(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset >= 100) {
          headerTransparency.value = false;
        } else {
          headerTransparency.value = true;
        }
      });
      document
        .querySelector("body")
        .addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("resize", () => {
        setBodyOffset();
      });
      setBodyOffset();
      getMediumFeed(3);
      setInterval(() => {
        countDown();
      }, 1000);
    });
    const preventScroll = (e) => {
      if (drawer.value === true) {
        e.preventDefault();
      }

      return false;
    };
    const setBodyOffset = () => {
      const bodyElement = document.querySelector("body");
      if ($q.screen.lt.md) {
        bodyElement.classList.add("md-offset");
        bodyElement.classList.remove("lg-offset");
      } else {
        bodyElement.classList.add("lg-offset");
        bodyElement.classList.remove("md-offset");
        drawer.value = false;
      }
    };
    const scrollPageTo = (navEl) => {
      drawer.value = false;
      let element = document.querySelector(`#${navEl}`);
      element.scrollIntoView({ behavior: "smooth" });
    };
    const getMediumFeed = async (posts_to_retrieve) => {
      const response = await ApiRequest.getMediumFeed();

      if (response.status != 200) return;

      mediumFeed.value = response.data.slice(0, posts_to_retrieve);
    };
    const truncate = (str, len) => {
      return _.truncate(str, { length: len, separator: " " });
    };

    const d = ref(0);
    const h = ref(0);
    const m = ref(0);
    const s = ref(0);

    const countDown = () => {
      const dayInMiliseconds = 86400000;
      const hourInMiliseconds = 3600000;

      let timeLeft = releaseDate - $store.getters.dateNow;

      if (timeLeft - dayInMiliseconds > 0) {
        const days = Math.trunc(timeLeft / dayInMiliseconds);
        d.value = days.toString().padStart(2, "0");
        timeLeft -= dayInMiliseconds * d.value;
      }

      if (timeLeft - hourInMiliseconds > 0) {
        const hours = Math.trunc(timeLeft / hourInMiliseconds);
        h.value = hours.toString().padStart(2, "0");
        timeLeft -= hourInMiliseconds * h.value;
      }

      if (timeLeft - 60000 > 0) {
        const minutes = Math.trunc(timeLeft / 60000);
        m.value = minutes.toString().padStart(2, "0");
        timeLeft -= 60000 * m.value;
      }

      const seconds = Math.trunc(timeLeft / 1000);
      s.value = seconds.toString().padStart(2, "0");
    };
    const scrollPosition = ref();
    const updateScroll = () => {
      scrollPosition.value = window.scrollY;
    };
    const openDarkpaper = ref(false);
    const openDisclaimer = ref(false);
    const drawer = ref(false);
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
          "You just need a compatible Web3 wallet, nothing else.",
          "For the convenience of our users, we encourage the usage of Face Wallet, with which you’ll be able to login through your main socials accounts.",
        ],
      },
      {
        label: "When will I be able to play SpaceRiders?",
        description: [
          "The MVP (Minimum Viable Product) is completed and accessible in the Binance Smart Chain Testnet.",
          "It is currently undergoing validation progress which allows the SpaceRiders’ team to improve the overall experience.",
        ],
      },
      {
        label: "Will SpaceRiders be a Free to Play?",
        description: [
          "SpaceRiders is a Play to Own - Player Driven Economy - Freemium.",
          "Mainnet version will be a Freemium, as it is already the MVP version on BSC Testnet. This means that the game is open to everyone without requiring any initial purchase. Possibility of in-game purchases exist, but don’t affect the basic gameplay experience.",
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

    const teamMembers = [
      {
        name: "Jordi",
        title: "Founder",
        roles: ["Principal Software Engineer"],
        img: "landing/ast/jordi.webp",
        socialMedia: [
          {
            icon: "fab fa-linkedin-in",
            link: "https://www.linkedin.com/in/jordi-walter-hoock-castro-10105696/",
          },
          {
            icon: "fab fa-telegram-plane",
            link: "https://t.me/SpaceRidersENChat",
          },
          {
            icon: "fab fa-discord",
            link: "https://discord.gg/h733Kh6XTn",
          },
        ],
      },

      {
        name: "Max",
        title: "Co-Founder",
        roles: [
          "Product Lead",
          "Business Analysis",
          "Marketing Operations",
          "Social Media Lead",
        ],
        img: "landing/ast/max.webp",
        socialMedia: [
          {
            icon: "fab fa-linkedin-in",
            link: "https://www.linkedin.com/in/max-pamies-i-del-campo-b2591921a",
          },
          {
            icon: "fab fa-telegram-plane",
            link: "https://t.me/atopikoin",
          },
          {
            icon: "fab fa-discord",
            link: "https://discordapp.com/users/838028729884213248",
          },
        ],
      },
    ];

    const partners = [
      {
        link: 'https://facewallet.xyz/',
        image: `${require('../assets/landing/img/partners/face_wallet.webp')}`,
        alt: 'Face Wallet'
      },
      {
        link: 'https://haechi.io/?lang=en',
        image: `${require('../assets/landing/img/partners/haechi.webp')}`,
        alt: 'Haechi Labs'
      },
      {
        link: 'https://www.dapp-playstore.com/',
        image: `${require('../assets/landing/img/partners/DPS_logo.webp')}`,
        alt: 'Dapp Play Store'
      },
    ]

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
          "Expansion of the SpaceRiders brand.",
          "Strategic blockchain and gaming partners.",
          "Development and testing of PVP initial concept.",
        ],
      },
      {
        heading: "Q2 2023",
        imgSrc: "installations.webp",
        content: [
          "First face-to-face events focused on the expansion of the project.",
          "Binance Smart Chain Mainnet Launch.",
          "Development and testing of the Items Marketplace.",
        ],
      },
    ];
    function redirectTestnet() {
      const environment = process.env.ENV;

      let url = "http://";

      if (environment === "mainnet") {
        url += "spaceriders.io";
      } else if (environment === "testnet") {
        url += "testnet.spaceriders.io";
      } else {
        url = "";
      }

      window.location.href = `${url}/nouser`;
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
      openDarkpaper,
      openDisclaimer,
      drawer,
      slide: ref(1),
      faq_section,
      headerTransparency,
      timelineFeed,
      teamMembers,
      partners,
      mediumFeed,
      truncate,
    };
  },
  components: { Timeline, GameMechanics },
});
</script>
<style lang="scss" scoped>
/* @import "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Orbitron:wght@400;500;600;700;900&display=swap"; */
@import "~assets/landing/css/style.css";
@import "~assets/landing/css/animate.min.css";

#side-menu .menu-item {
  min-height: 54px;
}

#disclaimer-modal ol li {
  list-style-type: upper-roman;
}

#token-section ul li {
  list-style-type: default;
}

.roadmap {
  padding: 0rem 0rem;
  background-size: cover;
  border-bottom: 1px solid #2253f4;
}

#overlay {
  position: relative;
}

#social-bar {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .column {
    .col:first-of-type .social-item {
      border-top-left-radius: 12px;
    }

    .col:last-of-type .social-item {
      border-bottom-left-radius: 12px;
    }
  }
}

.zoom-item {
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
}

.to-left-item {
  transition: transform 0.2s;

  &:hover {
    transform: translateX(-10px);
  }
}

.particles-header {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
