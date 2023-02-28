<template>
  <div @click="openPopup = true">
    <slot></slot>
  </div>
  <q-dialog v-model="openPopup">
    <q-card dark class="full-width">
      <q-card-section class="row justify-between items-center">
        <q-item>
          <q-item-section>
            <q-item-label>SWAP</q-item-label>
            <q-item-label overline>$BKM = {{ price }} USD</q-item-label>
          </q-item-section>
        </q-item>

        <q-btn
          flat
          round
          size="sm"
          color="white"
          icon="close"
          @click="openPopup = false"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="row">
        <div class="col-12 row items-center justify-between q-col-gutter-sm">
          <div
            class="col-12 col-md row items-center"
            :class="$q.screen.lt.md ? 'justify-stretch' : 'justify-start'"
          >
            <div class="q-mx-sm">
              <q-avatar color="accent">
                <q-img
                  :src="buyMetadata[pathNames[0]].image"
                  height="48px"
                  width="48px"
                />
              </q-avatar>
            </div>

            <div>
              <div>Swap from:</div>
              <div>{{ pathNames[0] }}</div>
            </div>
          </div>

          <div class="col-12 col-md">
            <q-input
              dense
              outlined
              color="white"
              class="full-width q-ma-none q-pa-none"
              :model-value="buyFromAmount"
              :placeholder="pathNames[0]"
              type="number"
              min="0"
              :rules="[(val) => val > 0 || 'Value must be greater than zero.']"
              @change="(value) => buyFromChange(value)"
            >
              <div class="q-mt-sm">
                <q-btn
                  color="info"
                  size="sm"
                  label="Max"
                  no-caps
                  @click="maxBalance"
                />
              </div>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="row justify-center items-center">
        <q-btn
          round
          color="primary"
          icon="swap_vert"
          @click="swapComponents"
          fit
        />
      </q-card-section>

      <q-card-section class="row">
        <div class="col-12 row items-center justify-between q-col-gutter-sm">
          <div
            class="col-12 col-md row items-center"
            :class="$q.screen.lt.md ? 'justify-stretch' : 'justify-start'"
          >
            <div class="q-mx-sm">
              <q-avatar color="accent">
                <q-img
                  :src="buyMetadata[pathNames[1]].image"
                  height="48px"
                  width="48px"
                />
              </q-avatar>
            </div>

            <div>
              <div>Swap to:</div>
              <div>{{ pathNames[1] }}</div>
            </div>
          </div>

          <div class="col-12 col-md">
            <q-input
              dense
              outlined
              color="white"
              class="full-width q-ma-none q-pa-none"
              v-model="buyToAmount"
              :placeholder="pathNames[1]"
              type="number"
              min="0"
              :rules="[(val) => val > 0 || 'Value must be greater than zero.']"
              readonly
            >
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <ContractAddressButton class="full-width q-mb-sm" />

        <q-expansion-item
          class="shadow-1 overflow-hidden"
          style="border-radius: 5px"
          icon="generating_tokens"
          label="Get free tokens for Testnet"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-list class="text-subtitle2 q-mb-sm">
            <q-item
              @click="openURL('https://testnet.binance.org/faucet-smart')"
              target="_blank"
              clickable
              v-ripple
            >
              <q-item-section>
                <q-item-label>Get BNB in Testnet</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  <q-icon name="fas fa-link" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              @click="
                openURL(
                  'https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'
                )
              "
              target="_blank"
              clickable
              v-ripple
            >
              <q-item-section>
                <q-item-label>Get BUSD in Testnet</q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-item-label>
                  <q-icon name="fas fa-link" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-card-section>

      <q-card-actions align="center" class="q-gutter-x-sm">
        <IncreaseAllowance
          :address="ContractAddress.getRouterAddress()"
          :amount="buyFromAmount"
          :tokenAddress="
            pathNames[0] == 'busd'
              ? ContractAddress.getBusdAddress()
              : ContractAddress.getSpaceRidersAddress()
          "
          @approveDisabled="transactionApproved"
        />

        <q-btn
          :disable="!canSwap || buyFromAmount <= 0 || buyToAmount <= 0"
          label="Swap"
          icon="currency_exchange"
          style="
            border: 2px solid #2253f4;
            border-radius: 5px;
            font-size: 14px;
            box-shadow: 0 0 20px rgb(34 83 244 / 76%);
            color: #fff;
          "
          v-on:click.prevent="buySpr"
        >
        </q-btn>
      </q-card-actions>

      <q-inner-loading :showing="visible">
        <q-spinner size="70px" color="warning" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../service/http/ApiRequests";
import RouterContract from "../service/contract/RouterContract";
import SpaceRiders from "../service/contract/SpaceRiders";
import ERC20 from "../service/contract/ERC20";
import { SWAP_COMPLETED } from "../constants/Events";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import ContractAddressButton from "../components/ContractAddressButton.vue";
import { useQuasar, openURL } from "quasar";
const $q = useQuasar();

const pathNames = ref(["busd", "bkm"]);
const buyMetadata = ref({
  busd: {
    image: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg?v=022",
  },
  bkm: {
    image: "bkm.webp",
  },
});

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const visible = ref(true);
const openPopup = ref(false);

const $store = useStore();

const price = ref(0.0);
const canSwap = ref(false);

const reloadPriceData = async () => {
  visible.value = true;
  price.value = parseFloat(await ApiRequests.tokenPrice()).toFixed(6);
  visible.value = false;
};

$eventBus.on(SWAP_COMPLETED, reloadPriceData);

const transactionApproved = () => {
  canSwap.value = true;
};

watch(async () => {
  if (openPopup.value) {
    reloadPriceData();
  }
});

const buyFromAmount = ref("1");
const buyToAmount = ref("1");

const buyFromChange = async (value) => {
  if (value > 0.0) {
    buyFromAmount.value = value;

    let amount = await RouterContract.getAmountsOut(
      buyFromAmount.value,
      pathNames.value
    );
    buyToAmount.value = amount;
  }
};

const maxBalance = async () => {
  if (pathNames.value[0] === "busd") {
    const busdContract = new ERC20(ContractAddress.getBusdAddress());
    buyFromAmount.value = await busdContract.balanceOf($store.getters.address);
    buyFromChange(buyFromAmount.value);
  } else if (pathNames.value[0] === "bkm") {
    buyFromAmount.value = await SpaceRiders.balanceOf($store.getters.address);
    buyFromChange(buyFromAmount.value);
  }
};

const swapComponents = () => {
  buyFromAmount.value = buyToAmount.value;
  buyFromChange(buyFromAmount.value);

  const path0 = pathNames.value[0];
  const path1 = pathNames.value[1];

  pathNames.value[0] = path1;
  pathNames.value[1] = path0;
};

const buySpr = async () => {
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  let receipt = { status: 0 };
  try {
    let tx = false;
    if (pathNames.value[0] === "busd") {
      tx = await RouterContract.buySpr(
        $store.getters.address,
        buyFromAmount.value.toString()
      );

      receipt = await tx.wait();
    } else if (pathNames.value[0] === "bkm") {
      tx = await RouterContract.sellSpr(
        $store.getters.address,
        buyFromAmount.value.toString()
      );

      receipt = await tx.wait();
    }
  } catch (e) {
    console.log("error");
    console.log(e);
    notif($notification("failed", "Swap failed..."));
  }

  if (receipt.status === 1) {
    notif($notification("success", "Swap succeeded!"));
    $eventBus.emit(SWAP_COMPLETED);
  } else {
    notif($notification("failed", "Swap failed..."));
  }
};

async function addToken() {
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: ContractAddress.getSpaceRidersAddress(), // The address that the token is at.
          symbol: "BKM", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          //image: tokenImage, // A string url of the token logo
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  buyFromChange(buyFromAmount.value);
});
</script>
