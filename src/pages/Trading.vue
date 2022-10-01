<template>
  <div class="row q-ml-xl">
    <div
      class="col-2 q-mr-lg glass-element-darker"
      style="border-radius: 0px; height: 650px"
    >
      <div class="row q-mb-sm">
        <div class="col text-center">
          Order book
          <q-separator dark class="q-mt-sm" />
        </div>
      </div>

      <div class="row q-mb-sm">
        <div class="col text-left" style="font-size: 12px">
          PRICE ({{ SYMBOLS[pair2] }})
        </div>
        <div class="col text-center" style="font-size: 12px">
          Qty ({{ SYMBOLS[pair1] }})
        </div>
        <div class="col text-right" style="font-size: 12px">
          Total ({{ SYMBOLS[pair2] }})
        </div>
      </div>

      <q-separator dark />

      <div class="row q-mt-xs" style="height: 240px; overflow: hidden">
        <div class="col">
          <transition-group name="bounce">
            <div
              v-for="order in orderBook['sell']"
              :key="order.grouped_price"
              class="row full-width q-py-xs"
              style="height: 30px"
              :style="{
                background: `linear-gradient(to left, rgba(247, 21, 21, 0.15) ${order['amount_width']}%, transparent 0)`,
              }"
            >
              <div class="col text-left price-text-negative">
                {{ order.grouped_price }}
              </div>
              <div class="col text-center">{{ order.sum_to_be_filled }}</div>
              <div class="col text-right">{{ order.total_price }}</div>
            </div>
          </transition-group>
        </div>
      </div>

      <div class="row" style="height: 35px">
        <div class="full-width full-height q-mt-xs">
          <q-separator class="q-mt-xs" />

          <div
            style="font-size: 18px; display: inline"
            :class="{
              'price-text-positive': currentPriceData.priceAction == 'positive',
              'price-text-negative': currentPriceData.priceAction == 'negative',
            }"
          >
            {{ currentPriceData.price }}
            <q-icon
              v-if="currentPriceData.priceAction == 'positive'"
              name="fas fa-arrow-up"
            />
            <q-icon v-else name="fas fa-arrow-down" />
          </div>
          <span
            class="q-ml-lg"
            style="color: #aeb0af"
            v-if="previousPriceData.price"
            >{{ previousPriceData.price }}</span
          >
          <q-separator class="q-mt-xs" dark />
        </div>
      </div>

      <div class="row" style="margin-top: 6px; height: 240px; overflow: hidden">
        <div class="col">
          <transition-group name="bounce">
            <div
              v-for="order in orderBook['buy']"
              :key="order.grouped_price"
              class="row full-width q-py-xs"
              style="height: 30px"
              :style="{
                background: `linear-gradient(to left, rgba(5, 245, 49, 0.15) ${order['amount_width']}%, transparent 0)`,
              }"
            >
              <div class="col text-left price-text-positive">
                {{ order.grouped_price }}
              </div>
              <div class="col text-center">{{ order.sum_to_be_filled }}</div>
              <div class="col text-right">{{ order.total_price }}</div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="col-6">
      <div
        class="row glass-element-darker"
        style="border-radius: 0px; height: 50px"
      >
        <div class="col-2 q-mt-sm">
          <div style="font-size: 13px">{{ pair1 }}/{{ pair2 }}</div>
        </div>

        <q-separator vertical />

        <div class="col-1 q-ml-xs text-center">
          <div class="row">
            <div
              class="q-ml-sm"
              :class="{
                'price-text-positive':
                  currentPriceData.priceAction == 'positive',
                'price-text-negative':
                  currentPriceData.priceAction == 'negative',
              }"
            >
              {{ currentPriceData.price }}
              <q-icon
                v-if="currentPriceData.priceAction == 'positive'"
                name="fas fa-arrow-up"
              />
              <q-icon v-else name="fas fa-arrow-down" />
            </div>
          </div>
          <div class="row q-ml-sm" style="font-size: 10px">
            {{ previousPriceData.price }}
          </div>
        </div>

        <q-separator vertical />

        <div class="col-1 q-ml-sm">
          <div class="row" style="font-size: 10px; color: #aeb0af">24h Max</div>
          <div class="row" style="font-size: 10px">
            {{ max24HourPrice }}
          </div>
        </div>

        <q-separator vertical />

        <div class="col-1 q-ml-sm">
          <div class="row" style="font-size: 10px; color: #aeb0af">24h Min</div>
          <div class="row" style="font-size: 10px">
            {{ min24HourPrice }}
          </div>
        </div>

        <q-separator vertical />

        <div class="col-2 q-ml-sm">
          <div class="row" style="font-size: 10px; color: #aeb0af">
            24h Vol. ({{ SYMBOLS[pair1] }})
          </div>
          <div class="row" style="font-size: 10px">
            {{ pair1Volume }}
          </div>
        </div>

        <q-separator vertical />

        <div class="col-2 q-ml-sm">
          <div class="row" style="font-size: 10px; color: #aeb0af">
            24h Vol. ({{ SYMBOLS[pair2] }})
          </div>
          <div class="row" style="font-size: 10px">
            {{ pair2Volume }}
          </div>
        </div>

        <q-separator vertical />

        <div class="col-2 q-mt-sm q-ml-sm">
          <div class="row" style="font-size: 11px">
            <div
              class="col-2 cursor-pointer"
              :class="{
                'text-blue': candleTimeFrame == '1m',
              }"
              @click="changeCandleTimeframe('1m')"
            >
              1m
            </div>

            <div
              class="col-3 cursor-pointer"
              :class="{
                'text-blue': candleTimeFrame == '15m',
              }"
              @click="changeCandleTimeframe('15m')"
            >
              15m
            </div>

            <div
              class="col-3 cursor-pointer"
              :class="{
                'text-blue': candleTimeFrame == '1h',
              }"
              @click="changeCandleTimeframe('1h')"
            >
              1h
            </div>
          </div>
        </div>
      </div>

      <div id="chart" class="row q-mt-lg" style="height: 550px">
        <!-- chart -->
      </div>

      <div class="row q-mt-sm" style="height: 350px">
        <q-card style="width: 100%">
          <q-tabs
            v-model="userActionTab"
            inline-label
            style="height: 47px; width: 100%"
            class="bg-dark text-white shadow-2"
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
            <q-tab
              name="closedTrades"
              icon="fa fa-book"
              label="Closed Trades"
            />
          </q-tabs>

          <q-separator dark />

          <q-tab-panels v-model="userActionTab" animated>
            <q-tab-panel name="spotTrading">
              <div class="row full-width q-mt-xs">
                <div class="col-6 flex flex-center">
                  <div class="justify-center centers" style="width: 90%">
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
              </div>

              <div
                class="row full-width justify-center centers"
                style="margin-top: 20px"
              >
                <div class="col-6 flex flex-center">
                  <div class="justify-center centers" style="width: 90%">
                    <div class="row">
                      <div class="col-6 text-left">Buy {{ pair1 }}</div>
                      <div class="col-6 text-right">
                        <q-icon name="fas fa-wallet" />
                        {{ activePlanet.resources[pair2.toLowerCase()] }}
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
                </div>

                <div class="col-6 flex flex-center">
                  <div class="justify-center centers" style="width: 90%">
                    <div class="row">
                      <div class="col-6 text-left">Sell {{ pair1 }}</div>
                      <div class="col-6 text-right">
                        <q-icon name="fas fa-wallet" />
                        {{ activePlanet.resources[pair1.toLowerCase()] }}
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
                      :suffix="pair1"
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
              </div>
            </q-tab-panel>

            <q-tab-panel name="openTrades">
              <!--<div class="text-h6">Open Trades</div>-->
              <div class="row full-width q-mt-xs" style="height: 270px">
                <q-scroll-area class="full-width full-height">
                  <div class="row text-center">
                    <div class="col">created</div>
                    <div class="col">type</div>
                    <div class="col">amount</div>
                    <div class="col">filled</div>
                    <div class="col">price</div>
                    <div class="col"></div>
                  </div>

                  <q-separator dark class="q-mt-sm" />

                  <div
                    v-for="myOpenOrder in myOpenOrders"
                    :key="myOpenOrder"
                    class="row text-center q-mt-sm"
                  >
                    <div class="col">{{ myOpenOrder.created_date }}</div>
                    <div
                      class="col"
                      :class="{
                        'price-text-negative': myOpenOrder.type == 'sell',
                        'price-text-positive': myOpenOrder.type == 'buy',
                      }"
                    >
                      {{ myOpenOrder.type }}
                    </div>
                    <div class="col">{{ myOpenOrder.amount }}</div>
                    <div class="col">{{ myOpenOrder.amount_filled }}</div>
                    <div class="col">{{ myOpenOrder.price }}</div>
                    <div class="col">
                      <q-btn
                        size="sm"
                        color="red"
                        label="Cancel"
                        @click="cancelOrder(myOpenOrder.id)"
                      />
                    </div>
                  </div>
                </q-scroll-area>
              </div>
            </q-tab-panel>

            <q-tab-panel name="closedTrades">
              <div class="text-h6">Closed trades</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>

    <div class="col-2 q-ml-lg">
      <div
        class="row glass-element-darker"
        style="border-radius: 0px; font-size: 90%; height: 200px"
      >
        <div class="col">
          <div class="row">
            <div class="col text-center">Markets</div>
          </div>

          <q-separator class="q-mt-sm" />

          <div class="row q-mt-sm full-width">
            <div class="col text-left">Pair</div>
            <div class="col text-right">Price</div>
          </div>

          <q-separator class="q-mt-sm" />

          <q-scroll-area class="q-mt-xs full-width full-height">
            <div
              @click="changeMarket(market.market)"
              v-for="market in markets"
              :key="market.pair"
              class="row cursor-pointer"
            >
              <div class="col text-left">{{ market.market }}</div>
              <div class="col text-right">{{ market.last_price }}</div>
            </div>
          </q-scroll-area>
        </div>
      </div>

      <div
        class="row q-mt-lg glass-element-darker"
        style="border-radius: 0px; font-size: 90%; height: 500px"
      >
        <div class="col">
          <div class="row q-mb-sm">
            <div class="col text-center">
              Market Orders (last 24H)
              <q-separator dark class="q-mt-sm" />
            </div>
          </div>
          <div class="row q-mb-sm">
            <div class="col text-left" style="font-size: 12px">
              PRICE ({{ SYMBOLS[pair2] }})
            </div>
            <div class="col text-center" style="font-size: 12px">
              Qty ({{ SYMBOLS[pair1] }})
            </div>
            <div class="col text-right" style="font-size: 12px">Time</div>
          </div>

          <q-scroll-area class="full-width full-height q-mt-sm">
            <q-separator dark class="q-mt-xs" />
            <transition-group name="bounce">
              <div
                v-for="trade in reverseOrderedTrades"
                :key="trade"
                class="row market-order-entry q-mt-xs"
                :class="{
                  'market-order-price-positive':
                    trade.priceAction === 'positive',
                  'market-order-price-negative':
                    trade.priceAction === 'negative',
                }"
              >
                <div class="col text-left">{{ trade.price }}</div>
                <div class="col text-center">{{ trade.amount }}</div>
                <div class="col text-right">{{ trade.time }}</div>
              </div>
            </transition-group>
          </q-scroll-area>
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
import { useQuasar } from "quasar";
import ApiRequest from "../service/http/ApiRequests";

const $q = useQuasar();

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

// https://github.com/tradingview/lightweight-charts/issues/383
let candlestickSeries = false;
onMounted(async () => {
  const re = await ApiRequest.getAllCurrencyMarketInfo();
  markets.value = re.data;

  const chart = createChart(document.getElementById("chart"), {
    height: "540",
  });

  chart.applyOptions({
    layout: {
      backgroundColor: "#181c23",
      textColor: "#D9D9D9",
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
  });

  candlestickSeries = chart.addCandlestickSeries({
    upColor: "#26a69a",
    downColor: "#ef5350",
    borderVisible: false,
    wickUpColor: "#26a69a",
    wickDownColor: "#ef5350",
  });

  //const data = [{ open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },  { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 }, { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 }, { open: 9.51, high: 10.46, low: 9.10, close: 10.17, time: 1642773476 }, { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 }, { open: 10.47, high: 11.39, low: 10.40, close: 10.81, time: 1642946276 }, { open: 10.81, high: 11.60, low: 10.30, close: 10.75, time: 1643032676 }, { open: 10.75, high: 11.60, low: 10.49, close: 10.93, time: 1643119076 }, { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 }];
  //candlestickSeries.setData(data);

  chart.timeScale().fitContent();
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

  window.addEventListener("unload", () => {
    //console.log("Closing websocket... 1")
    //ws.close()
  });
};

connect();

function changeCandleTimeframe(time) {
  trades.value = [];
  candleTimeFrame.value = time;

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
  const bigOrder = 50;

  for (const orderId in orders) {
    const order = orders[orderId];
    // this is just a treshold for the background bar.
    // so people can distinguish big orders from smaller ones easier.
    order["amount_width"] = (order.sum_to_be_filled / bigOrder) * 100;
    orderBook.value[orderType].push(order);
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
