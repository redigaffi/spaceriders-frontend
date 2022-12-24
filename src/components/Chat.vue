<template>
  <q-card-actions align="center" class="q-py-none q-px-md">
    <q-btn icon="fas fa-plus" color="info" label="Add" class="col" />
    <q-btn icon="fas fa-times" color="negative" label="Leave" class="col" />
  </q-card-actions>

  <q-tabs
    v-model="chatTab"
    class="full-width"
    inline-label
    outside-arrows
    mobile-arrows
    dense
  >
    <q-tab name="1.0" label="Events" />
    <q-tab name="1.1" label="General" />
    <q-tab name="1.2" label="News" />
  </q-tabs>

  <q-scroll-area class="col full-height">
    <q-card-section
      class="column q-px-none q-py-xs full-height justify-between q-gutter-y-xs"
    >
      <q-card bordered flat dark class="bg-info q-mx-md">
        <q-card-section class="q-pa-xs">
          <q-item dense>
            <q-item-section avatar>
              <q-item-label>
                <q-avatar color="secondary" size="32px">
                  <q-img v-html="jdenticon.toSvg($store.getters.address, 32)" />
                </q-avatar>
              </q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                shortAddress($store.getters.address)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-py-xs text-body2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi
          diam, finibus at pretium at, placerat a lorem. Nulla elementum purus
          sit amet nulla egestas, quis faucibus sapien sagittis. Vivamus
          imperdiet pellentesque bibendum. In ut posuere nisl. Praesent sed eros
          id odio et.
        </q-card-section>
      </q-card>

      <q-card bordered flat dark class="bg-primary q-mx-md">
        <q-card-section class="q-pa-xs">
          <q-item dense>
            <q-item-section>
              <q-item-label class="text-right">
                {{ shortAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F") }}
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-item-label>
                <q-avatar color="secondary" size="32px">
                  <q-img
                    v-html="
                      jdenticon.toSvg(
                        '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
                        32
                      )
                    "
                  />
                </q-avatar>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-py-xs text-body2">
          Suspendisse magna augue, convallis et ipsum feugiat, egestas egestas
          turpis. Praesent sed pulvinar nibh, et vestibulum diam. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Aliquam eleifend pulvinar nibh et pretium. Quisque
          odio eros.
        </q-card-section>
      </q-card>

      <q-card
        v-if="!isConnectionUp"
        bordered
        flat
        dark
        class="bg-negative q-mx-md"
      >
        <q-card-section class="q-pa-xs">
          <q-item dense>
            <q-item-section>
              <q-item-label class="text-center">
                <q-icon name="fas fa-exclamation-triangle" /> Connection lost
                <q-icon name="fas fa-exclamation-triangle" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn
            outline
            icon="fas fa-plug"
            color="white"
            label="Reconnect"
            @click="connect"
          />
        </q-card-actions>
      </q-card>
    </q-card-section>
  </q-scroll-area>

  <q-card-section v-if="isMessageInputAvailable" class="q-px-md">
    <q-input
      bottom-slots
      v-model="message"
      placeholder="Your message..."
      counter
      color="info"
      maxlength="280"
      :dense="dense"
      :readonly="!isConnectionUp"
    >
      <template v-slot:before>
        <q-avatar color="secondary" size="32px">
          <q-img v-html="jdenticon.toSvg($store.getters.address, 32)" />
        </q-avatar>
      </template>

      <template v-slot:append>
        <q-icon
          v-if="message"
          name="close"
          @click="message = ''"
          class="cursor-pointer"
        />
      </template>

      <template v-slot:hint> Length </template>

      <template v-slot:after>
        <q-btn
          round
          dense
          flat
          icon="send"
          :disabled="!message.trim() || !isConnectionUp"
        />
      </template>
    </q-input>
  </q-card-section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import jdenticon from "jdenticon/standalone";
import sanitizeHtml from "sanitize-html";

const $store = useStore();
const chatTab = ref("1.1");
const message = ref("");
const currentHistory = ref([]);
const chatsHistory = ref({});
const isConnectionUp = ref(false);
const reservedFrequencies = ["1.0", "1.1", "1.2"];

let ws = false;

ws = new WebSocket(process.env.BASE_WS_PATH);

const connect = () => {
  ws.onopen = function (event) {
    console.log("Connection to websockets established!");
    // Keep connection open
    setInterval(() => {
      ws.send(
        JSON.stringify({
          use_case: "ping",
        })
      );
    }, 1000);

    reservedFrequencies.forEach((freq) => {
      ws.send(
        JSON.stringify({
          use_case: "receive_full_chat",
          data: {
            frequency: freq,
          },
        })
      );
    });

    isConnectionUp.value = true;
  };
};

ws.onmessage = function (event) {
  const data = JSON.parse(event.data);

  switch (data.response_type) {
    case "ping":
      break;
    case "error":
      ws.close();
      break;
    default:
      console.log(data);
      break;
  }
};

ws.onerror = function (error) {
  console.log(error);
};

ws.onclose = (e) => {
  console.log("WS closed...");
  isConnectionUp.value = false;
};

onMounted(() => {
  connect();
});

onBeforeUnmount(() => {
  console.log("Closing websocket...");
  ws.close();
});

const shortAddress = (address) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 6
  )}`;
};

const isMessageInputAvailable = computed(() => {
  return chatTab.value !== "1.0" && chatTab.value !== "1.2";
});

const sanitize = (string) => {
  return sanitizeHtml(string, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
};
</script>
