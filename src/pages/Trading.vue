<template>
  <div :class="'q-pa-' + ($q.screen.lt.md ? 'sm' : 'lg')">
    <div class="row">
      <div v-if="$q.screen.lt.md" class="col-12">
        <q-toolbar class="bg-primary">
          <q-space />

          <q-item>
            <q-item-section>
              <q-item-label class="text-caption text-accent"
                >24h Max</q-item-label
              >
              <q-item-label>{{ toFixedNoRound(max24HourPrice) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator dark vertical inset />

          <q-item>
            <q-item-section>
              <q-item-label class="text-caption text-accent"
                >24h Min</q-item-label
              >
              <q-item-label>{{ toFixedNoRound(min24HourPrice) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator dark vertical inset />

          <q-item>
            <q-item-section>
              <q-item-label class="text-caption text-accent"
                >24h Vol. ({{ SYMBOLS[pair1] }})</q-item-label
              >
              <q-item-label>{{ toFixedNoRound(pair1Volume) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator dark vertical inset />

          <q-item>
            <q-item-section>
              <q-item-label class="text-caption text-accent"
                >24h Vol. ({{ SYMBOLS[pair2] }})</q-item-label
              >
              <q-item-label>{{ toFixedNoRound(pair2Volume) }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-space />
        </q-toolbar>
      </div>

      <div class="col-12">
        <q-toolbar class="bg-primary">
          <q-space />

          <q-item>
            <q-item-section>
              <q-item-label>{{ pair1 }} / {{ pair2 }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator dark vertical inset />

          <q-item>
            <q-item-section>
              <q-item-label
                :class="
                  'text-' + getPriceHighlightColor(currentPriceData.priceAction)
                "
                >{{ currentPriceData.price }}
                <q-icon
                  v-if="currentPriceData.priceAction == 'positive'"
                  name="fas fa-arrow-up" />
                <q-icon v-else name="fas fa-arrow-down"
              /></q-item-label>
              <q-item-label class="text-caption">{{
                previousPriceData.price
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator dark vertical inset />

          <template v-if="!$q.screen.lt.md">
            <q-item>
              <q-item-section>
                <q-item-label class="text-caption text-accent"
                  >24h Max</q-item-label
                >
                <q-item-label>{{
                  toFixedNoRound(max24HourPrice)
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator dark vertical inset />

            <q-item>
              <q-item-section>
                <q-item-label class="text-caption text-accent"
                  >24h Min</q-item-label
                >
                <q-item-label>{{
                  toFixedNoRound(min24HourPrice)
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator dark vertical inset />

            <q-item>
              <q-item-section>
                <q-item-label class="text-caption text-accent"
                  >24h Vol. ({{ SYMBOLS[pair1] }})</q-item-label
                >
                <q-item-label>{{ toFixedNoRound(pair1Volume) }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator dark vertical inset />

            <q-item>
              <q-item-section>
                <q-item-label class="text-caption text-accent"
                  >24h Vol. ({{ SYMBOLS[pair2] }})</q-item-label
                >
                <q-item-label>{{ toFixedNoRound(pair2Volume) }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

          <q-separator v-if="!$q.screen.lt.md" dark vertical inset />

          <q-btn-toggle
            class="q-mx-sm"
            flat
            stretch
            dense
            toggle-color="info"
            v-model="candleTimeFrame"
            :options="candleTimeToggleOptions"
            @click="changeCandleTimeframe()"
          />

          <q-space />
        </q-toolbar>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6 col-lg-3">
        <q-card flat square dark>
          <q-card-section>
            <div class="text-center">Order Book</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section class="q-py-none">
            <q-list dark dense>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-caption"
                    >PRICE ({{ SYMBOLS[pair2] }})</q-item-label
                  >
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-caption"
                    >QTY ({{ SYMBOLS[pair1] }})</q-item-label
                  >
                </q-item-section>

                <q-item-section side>
                  <q-item-label class="text-caption text-white"
                    >TOTAL ({{ SYMBOLS[pair2] }})</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-table
              hide-bottom
              dense
              dark
              flat
              square
              table-header-style="display: none"
              :pagination="{ rowsPerPage: 0 }"
              separator="none"
              :rows="orderBook['sell']"
              :columns="[
                {
                  name: 'grouped_price',
                  align: 'left',
                  field: (row) => toFixedNoRound(row.grouped_price),
                  classes: 'text-red',
                },
                {
                  name: 'sum_to_be_filled',
                  align: 'right',
                  field: (row) => toFixedNoRound(row.sum_to_be_filled),
                },
                {
                  name: 'total_price',
                  align: 'right',
                  field: (row) => toFixedNoRound(row.total_price),
                },
              ]"
              row-key="grouped_price"
            >
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  :style="{
                    background: `linear-gradient(to left, ${
                      getPaletteColor('red') + '1a'
                    } ${
                      getColorBarPercentage(
                        orderBook.maxSellValue,
                        props.cols[2].value
                      ) + '%'
                    } , ${getCssVar('dark') + 'ff'} ${
                      getColorBarPercentage(
                        orderBook.maxSellValue,
                        props.cols[2].value
                      ) + '%'
                    })`,
                  }"
                >
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section class="q-py-none">
            <q-item>
              <q-item-section>
                <q-item-label class="text-caption">STATUS</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label
                  :class="
                    'text-' +
                    getPriceHighlightColor(currentPriceData.priceAction)
                  "
                  >{{ currentPriceData.price }}
                  <q-icon
                    v-if="currentPriceData.priceAction == 'positive'"
                    name="fas fa-arrow-up" />
                  <q-icon v-else name="fas fa-arrow-down"
                /></q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label class="text-caption text-white">{{
                  previousPriceData.price
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section>
            <q-table
              hide-bottom
              dense
              dark
              flat
              square
              table-header-style="display: none"
              :pagination="{ rowsPerPage: 0 }"
              separator="none"
              :rows="orderBook['buy']"
              :columns="[
                {
                  name: 'grouped_price',
                  align: 'left',
                  field: (row) => toFixedNoRound(row.grouped_price),
                  classes: 'text-green',
                },
                {
                  name: 'sum_to_be_filled',
                  align: 'right',
                  field: (row) => toFixedNoRound(row.sum_to_be_filled),
                },
                {
                  name: 'total_price',
                  align: 'right',
                  field: (row) => toFixedNoRound(row.total_price),
                },
              ]"
              row-key="grouped_price"
            >
              <template v-slot:body="props">
                <q-tr
                  :props="props"
                  :style="{
                    background: `linear-gradient(to left, ${
                      getPaletteColor('green') + '1a'
                    } ${
                      getColorBarPercentage(
                        orderBook.maxBuyValue,
                        props.cols[2].value
                      ) + '%'
                    } , ${getCssVar('dark') + 'ff'} ${
                      getColorBarPercentage(
                        orderBook.maxBuyValue,
                        props.cols[2].value
                      ) + '%'
                    })`,
                  }"
                >
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <div
        class="col-12 col-md-12 col-lg-6"
        style="z-index: 0"
        :class="{ 'order-first': $q.screen.lt.lg }"
      >
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <div id="chart"></div>
          </div>

          <div class="col-12">
            <q-card flat square dark>
              <q-tabs
                v-model="userActionTab"
                inline-label
                dense
                align="center"
                class="bg-dark text-white"
              >
                <q-tab
                  name="spotTrading"
                  icon="fas fa-exchange-alt"
                  label="Trading"
                />
                <q-tab
                  name="openTrades"
                  icon="fa fa-book-open"
                  label="Open Trades"
                />
                <!--
                <q-tab
                  name="closedTrades"
                  icon="fa fa-book"
                  label="Closed Trades"
                />
                -->
              </q-tabs>

              <q-tab-panels v-model="userActionTab" animated>
                <q-tab-panel name="spotTrading">
                  <div class="row q-my-sm">
                    <div class="col-12">
                      <q-btn
                        size="sm"
                        :color="tradeType == 'limit' ? 'blue' : 'black'"
                        label="Limit"
                        @click="tradeType = 'limit'"
                      />
                      <q-btn
                        size="sm"
                        class="q-ml-xs"
                        :color="tradeType == 'market' ? 'blue' : 'black'"
                        label="Market"
                        @click="tradeType = 'market'"
                      />
                    </div>
                  </div>

                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-6">
                      <div class="row justify-between">
                        <div class="col-6">Buy {{ pair1 }}</div>
                        <div class="col-6 text-right">
                          <q-icon name="fas fa-wallet" />
                          {{
                            toFixedNoRound(
                              activePlanet.resources[pair2.toLowerCase()]
                            )
                          }}
                          {{ pair2 }}
                        </div>
                      </div>

                      <q-input
                        v-if="tradeType == 'limit'"
                        input-class="text-right q-mr-xs"
                        standout="bg-secondary"
                        class="q-mt-xs"
                        v-model.number="buyPrice"
                        dense
                        prefix="Price"
                        :suffix="pair2"
                      >
                        <template v-slot:append>
                          <q-btn
                            @click="getLastPrice('buy')"
                            size="xs"
                            color="black"
                            class=""
                            label="last"
                          />
                        </template>
                      </q-input>

                      <q-input
                        standout="bg-secondary"
                        v-if="tradeType == 'limit'"
                        input-class="text-right q-mr-xs"
                        class="q-mt-sm"
                        v-model.number="buyAmount"
                        dense
                        prefix="Amount"
                        :suffix="pair1"
                      />

                      <q-input
                        input-class="text-right q-mr-xs"
                        standout="bg-secondary"
                        class="q-mt-sm"
                        v-model.number="buyTotal"
                        dense
                        prefix="Total"
                        :suffix="pair2"
                      >
                        <template v-slot:append>
                          <q-btn
                            @click="maxBalance('buy')"
                            size="xs"
                            color="black"
                            class=""
                            label="max"
                          />
                        </template>
                      </q-input>

                      <q-btn
                        @click="buySpot"
                        color="green"
                        class="full-width q-mt-sm"
                        label="Buy"
                      />
                    </div>

                    <div class="col-12 col-md-6">
                      <div class="row justify-between">
                        <div class="col-6">Sell {{ pair1 }}</div>
                        <div class="col-6 text-right">
                          <q-icon name="fas fa-wallet" />
                          {{
                            toFixedNoRound(
                              activePlanet.resources[pair1.toLowerCase()]
                            )
                          }}
                          {{ pair1 }}
                        </div>
                      </div>

                      <q-input
                        v-if="tradeType == 'limit'"
                        input-class="text-right q-mr-xs"
                        standout="bg-secondary"
                        class="q-mt-xs"
                        v-model.number="sellPrice"
                        dense
                        prefix="Price"
                        :suffix="pair2"
                      >
                        <template v-slot:append>
                          <q-btn
                            @click="getLastPrice('sell')"
                            size="xs"
                            color="black"
                            class=""
                            label="last"
                          />
                        </template>
                      </q-input>

                      <q-input
                        standout="bg-secondary"
                        v-if="tradeType == 'limit'"
                        input-class="text-right q-mr-xs"
                        class="q-mt-sm"
                        v-model.number="sellAmount"
                        dense
                        prefix="Amount"
                        :suffix="pair1"
                      />

                      <q-input
                        input-class="text-right q-mr-xs"
                        standout="bg-secondary"
                        class="q-mt-sm"
                        v-model.number="sellTotal"
                        dense
                        prefix="Total"
                        :suffix="pair2"
                      >
                        <template v-slot:append>
                          <q-btn
                            @click="maxBalance('sell')"
                            size="xs"
                            color="black"
                            class=""
                            label="max"
                          />
                        </template>
                      </q-input>

                      <q-btn
                        @click="sellSpot"
                        color="red"
                        class="full-width q-mt-sm"
                        label="Sell"
                      />
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="openTrades">
                  <q-table
                    style="height: 260px"
                    dense
                    dark
                    flat
                    virtual-scroll
                    hide-bottom
                    :pagination="{ rowsPerPage: 0 }"
                    separator="none"
                    :rows="myOpenOrders"
                    :columns="[
                      {
                        name: 'type',
                        align: 'center',
                        label: 'Type',
                        field: 'type',
                        classes: (row) => {
                          return row.type === 'sell'
                            ? 'text-red'
                            : 'text-green';
                        },
                      },
                      {
                        name: 'amount',
                        align: 'right',
                        label: 'Amount',
                        field: (row) => toFixedNoRound(row.amount),
                      },
                      {
                        name: 'amount_filled',
                        align: 'right',
                        label: 'Filled',
                        field: (row) => toFixedNoRound(row.amount_filled),
                      },
                      {
                        name: 'price',
                        align: 'right',
                        label: 'Price',
                        field: (row) => toFixedNoRound(row.price),
                      },
                      {
                        name: 'created_date',
                        align: 'center',
                        label: 'Created',
                        field: 'created_date',
                      },
                      {
                        name: 'id',
                        align: 'right',
                        label: 'ID',
                        field: 'id',
                      },
                    ]"
                    :visible-columns="[
                      'created_date',
                      'type',
                      'amount',
                      'amount_filled',
                      'price',
                    ]"
                  >
                    <template v-slot:header="props">
                      <q-tr :props="props">
                        <q-th auto-width />
                        <q-th
                          v-for="col in props.cols"
                          :key="col.name"
                          :props="props"
                        >
                          {{ col.label }}
                        </q-th>
                      </q-tr>
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td auto-width>
                          <q-btn
                            size="sm"
                            color="red"
                            label="Cancel"
                            @click="cancelOrder(props.key)"
                          />
                        </q-td>
                        <q-td
                          v-for="col in props.cols"
                          :key="col.name"
                          :props="props"
                        >
                          {{ col.value }}
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-tab-panel>

                <!--
                <q-tab-panel name="closedTrades">
                  <div class="text-h6">Closed trades</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                -->
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-card flat square dark>
              <q-card-section>
                <div class="text-center">Markets</div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section class="q-pt-none">
                <q-list dark dense>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-caption">PAIR</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-caption text-white"
                        >PRICE</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item
                    v-for="(market, index) in markets"
                    :key="index"
                    clickable
                    v-ripple
                    @click="changeMarket(market.market)"
                  >
                    <q-item-section>
                      <q-item-label class="text-caption">{{
                        mapMarketPair(market.market)
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                      <q-item-label class="text-caption text-white">{{
                        toFixedNoRound(market.last_price)
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12">
            <q-card flat square dark>
              <q-card-section>
                <div class="text-center">Market Orders (Last 24h)</div>
              </q-card-section>

              <q-separator dark inset />

              <q-card-section>
                <q-table
                  style="height: 468px"
                  hide-bottom
                  dense
                  dark
                  flat
                  virtual-scroll
                  :pagination="{ rowsPerPage: 0 }"
                  separator="none"
                  :rows="reverseOrderedTrades"
                  :columns="[
                    {
                      name: 'price',
                      align: 'left',
                      label: `PRICE (${SYMBOLS[pair2]})`,
                      classes: (row) =>
                        'text-' + getPriceHighlightColor(row.priceAction),
                      field: (row) => toFixedNoRound(row.price),
                    },
                    {
                      name: 'amount',
                      align: 'right',
                      label: `AMOUNT (${SYMBOLS[pair1]})`,
                      field: (row) => toFixedNoRound(row.amount),
                    },
                    {
                      name: 'time',
                      align: 'right',
                      label: `TIME (UTC)`,
                      field: 'time',
                    },
                  ]"
                  row-key="trade"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createChart } from "lightweight-charts";
import {
  ref,
  computed,
  onMounted,
  watchEffect,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, useMeta, colors, getCssVar } from "quasar";
import ApiRequest from "../service/http/ApiRequests";

const $q = useQuasar();
const { getPaletteColor } = colors;

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const activePlanet = computed(() => {
  return $store.getters.activePlanet;
});

const SYMBOLS = {
  METAL: "mtl",
  PETROL: "ptr",
  CRYSTAL: "cry",
  BKM: "bkm",
};

const markets = ref([]);
const title = ref("Trading");
let chartContainer;
let chartElement;
let chartCanvas;
let chartObj;

// https://github.com/tradingview/lightweight-charts/issues/383
let candlestickSeries = false;
onMounted(async () => {
  const re = await ApiRequest.getAllCurrencyMarketInfo();
  markets.value = re.data;

  setTimeout(function () {
    initiateChart();
  }, 500);

  //const data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }];
  //candlestickSeries.setData(data);

  window.addEventListener("resize", () => {
    setTimeout(function () {
      redrawChart();
    }, 500);
  });
});

const $store = useStore();
const $route = useRoute();
const $router = useRouter();

const marketCode = $route.params.market;
const pairs = marketCode.split("_");

const pair1 = pairs[0];
const pair2 = pairs[1];
const userActionTab = ref("spotTrading");

const myOpenOrders = ref([]);
watchEffect(async () => {
  if (userActionTab.value == "openTrades") {
    const re = await ApiRequest.getCurrencyMarketOpenOrders({
      marketCode: marketCode,
      planetId: $store.getters.activePlanet.id,
    });

    myOpenOrders.value = re.data;
  }
});

setInterval(async () => {
  const re = await ApiRequest.getAllCurrencyMarketInfo();
  markets.value = re.data;
}, 5000);

const tradeType = ref("limit");
const buyPrice = ref(0);
const buyAmount = ref(0);
const buyTotal = ref(0);

watchEffect(() => {
  buyTotal.value = buyPrice.value * buyAmount.value;
});

const sellPrice = ref(0);
const sellAmount = ref(0);
const sellTotal = ref(0);

watchEffect(() => {
  sellTotal.value = sellPrice.value * sellAmount.value;
});

const orderBook = ref({
  maxBuyValue: 0,
  maxSellValue: 0,
  buy: [],
  sell: [],
});

const candleTimeFrame = ref("1h");
const candlePriceData = ref([]);
const trades = ref([]);
const currentCandleDateInterval = ref(false);

// Last 24 hour volume info
const max24HourPrice = ref(-1);
const min24HourPrice = ref(-1);
const pair1Volume = ref(-1);
const pair2Volume = ref(-1);

const candleTimeToggleOptions = [
  { label: "1M", value: "1m" },
  { label: "15M", value: "15m" },
  { label: "1H", value: "1h" },
  { label: "1D", value: "1d" },
];

function initiateChart() {
  chartElement = document.getElementById("chart");
  chartContainer = chartElement.parentElement;

  chartObj = createChart(chartElement, {
    width: chartContainer.offsetWidth - 8,
    height: $q.screen.lt.md ? "400" : "540",
  });

  chartObj.applyOptions({
    layout: {
      backgroundColor: getCssVar("dark"),
      textColor: "white",
    },
    grid: {
      vertLines: {
        color: "#181c23",
      },
      horzLines: {
        color: "#363C4E",
      },
    },
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
    rightPriceScale: {
      visible: false,
    },
    leftPriceScale: {
      visible: true,
    },
    watermark: {
      visible: true,
      fontSize: 48,
      horzAlign: "center",
      vertAlign: "center",
      color: "rgba(41, 51, 62, 0.5)",
      text: "SPACERIDERS",
      fontFamily: "plantFont",
    },
  });

  candlestickSeries = chartObj.addCandlestickSeries({
    upColor: getPaletteColor("green"),
    downColor: getPaletteColor("red"),
    borderVisible: false,
    wickUpColor: getPaletteColor("green"),
    wickDownColor: getPaletteColor("red"),
  });

  //chartCanvas = document.querySelector("#chart > div > table");

  chartObj.timeScale().fitContent();
  changeCandleTimeframe();
  //chartCanvas.style.width = chartContainer.offsetWidth - 8 + "px";
}

function redrawChart() {
  chartContainer.innerHTML = '<div id="chart"></div>';
  initiateChart();
}

function mapMarketPair(pair) {
  const splittedPair = pair.split("/");

  const firstPair = SYMBOLS[splittedPair[0]];
  const secondPair = SYMBOLS[splittedPair[1]];

  return `${firstPair} / ${secondPair}`;
}

function toFixedNoRound(number, precision = 2) {
  const factor = Math.pow(10, precision);
  return Math.floor(number * factor) / factor;
}

function getPriceHighlightColor(priceAction) {
  return priceAction === "positive"
    ? "green"
    : priceAction === "negative"
    ? "red"
    : "";
}

function getColorBarPercentage(maxReferenceValue, currentValue) {
  return (70 * currentValue) / maxReferenceValue;
}

function getLastPrice(action) {
  if (trades.value.length > 0) {
    const lastTrade = trades.value[trades.value.length - 1];
    if (action === "buy") buyPrice.value = lastTrade.price;
    else if (action === "sell") sellPrice.value = lastTrade.price;
  }
}

function maxBalance(action) {
  if (action === "buy") buyAmount.value = 5000;
  else if (action === "sell") sellAmount.value = 5000;
}

const reverseOrderedTrades = computed(() => {
  return trades.value.slice().reverse();
});

const currentPriceData = computed(() => {
  if (reverseOrderedTrades.value.length > 0) {
    return reverseOrderedTrades.value[0];
  }
  return {};
});

const previousPriceData = computed(() => {
  if (reverseOrderedTrades.value.length > 1) {
    return reverseOrderedTrades.value[1];
  }
  return {};
});

let ws = false;

const connect = () => {
  ws = new WebSocket(process.env.BASE_WS_PATH);

  ws.onopen = function (event) {
    console.log("Connection to websockets established!");
    // Keep connection open
    setInterval(() => {
      ws.send(
        JSON.stringify({
          use_case: "ping",
        })
      );
    }, 1500);

    // Initial data load
    ws.send(
      JSON.stringify({
        use_case: "trade_fetch_historical_data",
        data: {
          market_code: marketCode,
          candle_time_frame: candleTimeFrame.value,
        },
      })
    );

    setInterval(() => {
      ws.send(
        JSON.stringify({
          use_case: "trade_fetch_order_book_data",
          data: {
            market_code: marketCode,
            candle_time_frame: candleTimeFrame.value,
          },
        })
      );

      ws.send(
        JSON.stringify({
          use_case: "trade_fetch_current_candle",
          data: {
            market_code: marketCode,
            candle_time_frame: candleTimeFrame.value,
          },
        })
      );
    }, 500);
  };

  ws.onclose = (e) => {
    console.log("WS closed...");
    setTimeout(function () {
      if (ws.readyState == 2 || ws.readyState == 3) {
        connect();
      }
    }, 1000);
  };

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    if (data.response_type === "ping") {
      return;
    }

    if (data.response_type === "error") {
      $q.notify($notification("failed", data.data));
    } else if (data.response_type === "trade_fetch_historical_data") {
      updateLast24HourInfo(data.data.last_24_info);
      addNewTrades(data.data.last_trades);

      candlePriceData.value = data.data.price_candle_data;
      initialCandlePriceDataLoad(candlePriceData.value);

      orderBook.value["buy"] = [];
      orderBook.value["sell"] = [];
      addOrderBook("buy", data.data.open_buy_orders);
      addOrderBook("sell", data.data.open_sell_orders);
    } else if (data.response_type === "trade_fetch_order_book_data") {
      orderBook.value["buy"] = [];
      orderBook.value["sell"] = [];
      addOrderBook("buy", data.data.open_buy_orders);
      addOrderBook("sell", data.data.open_sell_orders);
    } else if (data.response_type === "trade_fetch_current_candle") {
      updateLast24HourInfo(data.data.last_24_info);
      const now = new Date();
      const currentCandleData = data.data.price_candle_data;

      const newDateInterval = Object.keys(currentCandleData)[0];
      const newCurrentCandleData = Object.values(currentCandleData)[0];

      if (!currentCandleDateInterval.value) {
        currentCandleDateInterval.value = newDateInterval;

        // Time Interval is closed
      } else if (currentCandleDateInterval.value != newDateInterval) {
        if (
          newCurrentCandleData === null &&
          Object.keys(candlePriceData.value).length > 0
        ) {
          const previousValues = Object.values(candlePriceData.value);
          const previousCandle = previousValues[previousValues.length - 1];
          const previousCandleClosePrice = previousCandle.close;

          previousCandle.id.date_formatted = newDateInterval;
          previousCandle.open = previousCandleClosePrice;
          previousCandle.high = previousCandleClosePrice;
          previousCandle.low = previousCandleClosePrice;
          previousCandle.close = previousCandleClosePrice;

          candlePriceData.value[previousCandle.id.date_formatted] =
            previousCandle;
          const parsedPreviousCandle = parseCandleData(previousCandle);
          candlestickSeries.update(parsedPreviousCandle);
        }

        currentCandleDateInterval.value = newDateInterval;
      } else if (newCurrentCandleData !== null) {
        newCurrentCandleData.id.date_formatted = newDateInterval;
        const newCandle = parseCandleData(newCurrentCandleData);

        candlePriceData.value[newDateInterval] = newCurrentCandleData;
        candlestickSeries.update(newCandle);
      }
    } else if (data.response_type === "trade") {
      addNewTrades(data.data.executed_trades);
    }
  };

  onBeforeUnmount(() => {
    console.log("Closing websocket...");
    ws.close();
  });

  /*
  window.addEventListener("unload", () => {
    //console.log("Closing websocket... 1")
    //ws.close()
  });
  */
};

connect();

function changeCandleTimeframe() {
  trades.value = [];

  // Initial data load (will reset current candles)
  ws.send(
    JSON.stringify({
      use_case: "trade_fetch_historical_data",
      data: {
        market_code: marketCode,
        candle_time_frame: candleTimeFrame.value,
      },
    })
  );
}

function updateLast24HourInfo(data) {
  if (data !== null) {
    max24HourPrice.value = data.max_24;
    min24HourPrice.value = data.min_24;
    pair1Volume.value = data.pair1_volume;
    pair2Volume.value = data.pair2_volume;
  }
}

function parseCandleData(candle) {
  const date = new Date(candle.id.date_formatted).getTime() / 1000;
  return {
    open: candle.open,
    high: candle.high,
    low: candle.low,
    close: candle.close,
    time: date,
  };
}

function initialCandlePriceDataLoad(candles) {
  let twCandles = [];
  for (const candleIdx in candles) {
    twCandles.push(parseCandleData(candles[candleIdx]));
  }

  candlestickSeries.setData(twCandles);
}

function addOrderBook(orderType, orders) {
  //const bigOrder = 50;
  let maxTotalValue = 0;

  for (const orderId in orders) {
    const order = orders[orderId];
    // this is just a treshold for the background bar.
    // so people can distinguish big orders from smaller ones easier.
    //order["amount_width"] = (order.sum_to_be_filled / bigOrder) * 100;
    orderBook.value[orderType].push(order);

    if (maxTotalValue < order.total_price) {
      maxTotalValue = order.total_price;
    }
  }

  switch (orderType) {
    case "buy":
      orderBook.value.maxBuyValue = maxTotalValue;
      break;
    case "sell":
      orderBook.value.maxSellValue = maxTotalValue;
      break;
  }
}

function addNewTrades(tradeData) {
  for (let i = 0; i < tradeData.length; i++) {
    const date = new Date(`${tradeData[i].created_time}`);
    const mins = `${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;
    const secs = `${date.getSeconds() < 10 ? "0" : ""}${date.getSeconds()}`;
    const dateStr = `${date.getHours()}:${mins}:${secs}`;
    const price = tradeData[i].price;
    const lastTrade = trades.value[trades.value.length - 1];
    let trade = {
      amount: tradeData[i].amount,
      time: dateStr,
      price: price,
      priceAction: "",
    };
    if (!lastTrade) {
      trade.priceAction = "positive";
    } else if (trade.price == lastTrade.price) {
      trade.priceAction = lastTrade.priceAction;
    } else if (trade.price >= lastTrade.price) {
      trade.priceAction = "positive";
    } else if (trade.price <= lastTrade.price) {
      trade.priceAction = "negative";
    }

    trades.value.push(trade);
  }
}

function buySpot() {
  const req = {
    use_case: "trade",
    data: {
      trade_type: tradeType.value,
      market_code: marketCode,
      user_id: $store.getters.address,
      planet_id: $store.getters.activePlanet.id,
      order_type: "buy",
      pair1: pair1,
      pair2: pair2,
      price: buyPrice.value,
      amount: buyAmount.value,
      total: buyTotal.value,
    },
  };

  ws.send(JSON.stringify(req));

  buyPrice.value = 0;
  buyAmount.value = 0;
  buyTotal.value = 0;
}

function sellSpot() {
  const req = {
    use_case: "trade",
    data: {
      trade_type: tradeType.value,
      market_code: marketCode,
      user_id: $store.getters.address,
      planet_id: $store.getters.activePlanet.id,
      order_type: "sell",
      pair1: pair1,
      pair2: pair2,
      price: sellPrice.value,
      amount: sellAmount.value,
      total: sellTotal.value,
    },
  };

  ws.send(JSON.stringify(req));

  sellPrice.value = 0;
  sellAmount.value = 0;
  sellTotal.value = 0;
}

const cancelOrder = async (orderId) => {
  await ApiRequest.cancelOrder({
    orderId: orderId,
  });

  const re = await ApiRequest.getCurrencyMarketOpenOrders({
    marketCode: marketCode,
    planetId: $store.getters.activePlanet.id,
  });

  myOpenOrders.value = re.data;
};

const changeMarket = async (marketCode) => {
  const pairs = marketCode.split("/");
  const code = `${pairs[0]}_${pairs[1]}`;
  await $router.push({
    name: "trading",
    params: { market: code },
    force: true,
  });
  $router.go(0);
};

useMeta(() => {
  title.value = "";

  if (currentPriceData.value.price !== undefined) {
    title.value += `${currentPriceData.value.price} (${SYMBOLS[
      pair2
    ].toUpperCase()}) | `;
  }

  title.value += `${SYMBOLS[pair1]}${SYMBOLS[pair2]} | `.toUpperCase();
  title.value += "SpaceRiders - Trading";

  return { title: title.value };
});
</script>

<style lang="scss">
.order_book {
  width: 100%;
}

.market-order-entry {
  padding: 5px;
}

.price-text-positive {
  color: rgba(5, 245, 49, 1);
}

.price-text-negative {
  color: rgba(247, 21, 21, 1);
}

.market-order-price-positive {
  background-color: rgba(5, 245, 49, 0.4);
  border-radius: 5px;
}

.market-order-price-negative {
  background-color: rgba(247, 21, 21, 0.4);
  border-radius: 5px;
}

.bounce-enter-active {
  animation: bounce-in 0.7s;
}

.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.15);
  }

  100% {
    transform: scale(1);
  }
}
</style>
