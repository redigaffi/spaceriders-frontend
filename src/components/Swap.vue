<template>
  <div @click="openPopup = true">
    <slot></slot>
  </div>
  <q-dialog v-model="openPopup">
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
            <img :src="buyMetadata[pathNames[0]].image" style="height: 40px" />
          </div>
          <div class="col-3 text-overline" style="font-size: 12px">
            <div>Swap From:</div>
            <div>
              <div class="text-h4 text-weight-bold">{{ pathNames[0] }}</div>
            </div>
          </div>
          <div class="col flex flex-center">
            <q-input
              dense
              outlined
              color="white"
              class="full-width"
              v-model="buyFromAmount"
              placeholder="0.0"
              type="number"
              @change="buyFromChange"
            >
              <div class="q-mt-sm">
                <q-btn
                  color="positive"
                  size="sm"
                  label="Max"
                  no-caps
                  @click="maxBalance"
                />
              </div>
            </q-input>
          </div>
        </div>

        <div class="text-center q-py-sm">
          <q-btn
            round
            color="primary"
            icon="swap_vert"
            @click="swapComponents"
          />
        </div>

        <div class="row q-col-gutter-sm">
          <div class="col-1 flex flex-center">
            <img :src="buyMetadata[pathNames[1]].image" style="height: 40px" />
          </div>

          <div class="col-3 text-overline" style="font-size: 12px">
            <div>Swap To:</div>
            <div class="text-h4 text-weight-bold">{{ pathNames[1] }}</div>
          </div>
          <div class="col flex flex-center">
            <q-input
              dense
              outlined
              class="full-width"
              color="white"
              v-model="buyToAmount"
              placeholder="0.0"
              type="number"
              readonly
            />
          </div>
        </div>
      </q-card-section>

      <q-card-section style="color: #fff">
        <div>$BKM = {{ price }}$</div>
        <div>
          <br />
          [TESTNET]
          <br />
          <a href="https://testnet.binance.org/faucet-smart" target="_blank"
            >Get BNB in testnet</a
          >
          <br />
          <a
            href="https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"
            target="_blank"
            >Get BUSD in testnet</a
          >
        </div>
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md">
        <div class="col">
          <IncreaseAllowance
            :address="ContractAddress.getRouterAddress()"
            :amount="buyFromAmount"
            :tokenAddress="
              pathNames[0] == 'busd'
                ? ContractAddress.getBusdAddress()
                : ContractAddress.getSpaceRidersAddress()
            "
          />
        </div>
        <div class="col">
          <q-btn
            class="full-width"
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
        </div>
      </q-card-actions>

      <q-inner-loading :showing="visible">
        <q-spinner size="70px" color="warning" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../service/http/ApiRequests";
import RouterContract from "../service/contract/RouterContract";
import SpaceRiders from "../service/contract/SpaceRiders";
import ERC20 from "../service/contract/ERC20";
import { SWAP_COMPLETED } from "../constants/Events";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";
import { useQuasar } from "quasar";
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

const reloadPriceData = async () => {
  visible.value = true;
  price.value = parseFloat(await ApiRequests.tokenPrice()).toFixed(6);
  visible.value = false;
};

$eventBus.on(SWAP_COMPLETED, reloadPriceData);

watch(async () => {
  if (openPopup.value) {
    reloadPriceData();
  }
});

const buyFromAmount = ref(1);
const buyToAmount = ref(1);

const buyFromChange = async () => {
  let amount = await RouterContract.getAmountsOut(
    buyFromAmount.value,
    pathNames.value
  );
  buyToAmount.value = amount;
};

const maxBalance = async () => {
  if (pathNames.value[0] === "busd") {
    const busdContract = new ERC20(ContractAddress.getBusdAddress());
    buyFromAmount.value = await busdContract.balanceOf($store.getters.address);
    buyFromChange();
  } else if (pathNames.value[0] === "bkm") {
    buyFromAmount.value = await SpaceRiders.balanceOf($store.getters.address);
    buyFromChange();
  }
};

const swapComponents = () => {
  buyFromAmount.value = 0;
  buyToAmount.value = 0;

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
</script>
