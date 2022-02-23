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
              <div class="text-h4 text-weight-bold">{{pathNames[0]}}</div>
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
                <q-btn color="positive" size="sm" label="Max" no-caps @click="maxBalance"/>
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
            <div class="text-h4 text-weight-bold">{{pathNames[1]}}</div>
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
              @change="buyToChange"
            />
          </div>
        </div>

      </q-card-section>

      <q-card-section style="color: #fff">
        <div
          class="q-my-md"
          style="
            border-top: 2px solid #2253f4;
            border-radius: 5px;
            box-shadow: 0 0 20px #2253f4;
          "
        ></div>
        <div>Purchasing Power: {{ purchasingPower }} $SPR</div>
        <div
          class="q-my-md"
          style="
            border-top: 2px solid #2253f4;
            border-radius: 5px;
            box-shadow: 0 0 20px #2253f4;
          "
        ></div>
        <div>$SPR = {{ price }}$</div>
        <div
          class="q-my-md"
          style="
            border-top: 2px solid #2253f4;
            border-radius: 5px;
            box-shadow: 0 0 20px #2253f4;
          "
        ></div>
        <div>BNB = {{ bnbUsdPrice }}$</div>
      </q-card-section>

      <q-card-actions class="row q-col-gutter-md">
        <div v-if="pathNames[0] === 'spr'" class="col">
          <IncreaseAllowance
              :address="ContractAddress.getRouterAddress()"
              :amount="buyFromAmount"
          />
        </div>
        <div class="col">
          <button
            class="button q-py-sm full-width"
            style="
              border: 2px solid #2253f4;
              border-radius: 5px;
              font-size: 14px;
              box-shadow: 0 0 20px rgb(34 83 244 / 76%);
              color: #fff;
            "
            v-on:click.prevent="buySpr"
          >
            Swap
          </button>
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
import Contract from "../service/contract/Contract";
import { SWAP_COMPLETED } from "../constants/Events";
import { ethers } from "ethers";
import IncreaseAllowance from "./IncreaseAllowance";
import ContractAddress from "../service/contract/ContractAddress";


const pathNames = ref(["bnb", "spr"]);
const buyMetadata = ref({
  bnb: {
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png"
  },
  spr: {
    image: "logo.png"
  }
});

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus =
  getCurrentInstance().appContext.config.globalProperties.$eventBus;

const visible = ref(true);
const openPopup = ref(false);

const $store = useStore();
const myAddr = $store.getters.address;

const purchasingPower = ref(0);
const price = ref(0.0);
const bnbUsdPrice = ref(0.0);

const reloadPriceData = async () => {
    visible.value = true;
    purchasingPower.value = await SpaceRiders.purchasingPower(myAddr);
    price.value = parseFloat((await ApiRequests.tokenPrice())).toFixed(6);
    bnbUsdPrice.value = parseFloat((await ApiRequests.bnbPrice())).toFixed(2);
    visible.value = false;
};

$eventBus.on(SWAP_COMPLETED, reloadPriceData);

watch(async () => {
  if (openPopup.value) {
    reloadPriceData();
  }
});

const buyFromAmount = ref(0);
const buyToAmount = ref(0);

const buyFromChange = () => {
  if (pathNames.value[0] === "bnb") {
    buyToAmount.value = ((buyFromAmount.value * bnbUsdPrice.value) / price.value).toFixed(2)
  } else {
    buyToAmount.value = ((buyFromAmount.value * price.value)/bnbUsdPrice.value).toFixed(2)
  }
};

const buyToChange = () => {
  if (pathNames.value[0] === "bnb") { 
    buyFromAmount.value = (buyToAmount.value*(1/bnbUsdPrice.value*price.value)).toFixed(2);
  } else {
    buyFromAmount.value =( buyToAmount.value*bnbUsdPrice.value / price.value).toFixed(2)
  }
};

const maxBalance = async () => {
  if (pathNames.value[0] === "bnb") {
    const contract = new Contract();
    let provider = contract.getProvider()
    
    const balance = await provider.getBalance($store.getters.address);
    buyFromAmount.value = parseFloat(ethers.utils.formatEther(balance)).toFixed(2);
    buyFromChange();
  } else if (pathNames.value[0] === "spr") {
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
}

const buySpr = async () => {
  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  let receipt = { status: 0 };
  try {
    let tx = false;
    if (pathNames.value[0] === "bnb") {
      tx = await RouterContract.buySpr(
        myAddr,
        buyFromAmount.value.toString()
      );
      
      receipt = await tx.wait();
    } else if (pathNames.value[0] === "spr") {
      tx = await RouterContract.sellSpr(
        myAddr,
        buyFromAmount.value.toString()
      );
      
      receipt = await tx.wait();
    }
  } catch (e) {
    console.log("error");
    console.log(e);
    closeNotification();
  }

  if (receipt.status === 1) {
    closeNotification();
    $notification("success", "Swap succeeded!", 6000);
    $eventBus.emit(SWAP_COMPLETED);
  } else {
    closeNotification();
    $notification("failed", "Failed swapping...", 6000);
  }

  closeNotification();
};
</script>
