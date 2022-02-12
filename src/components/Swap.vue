<template>
    <div @click="openPopup = true">
        <slot ></slot>
    </div>
    <q-dialog v-model="openPopup" persistent>
        <q-card style="width: 600px; max-width: 80vw; background: #0e101c">
            <q-card-section class="row justify-between">
                <div class="text-h4" style="letter-spacing: 3px">Swap</div>
                <div>
                    <q-btn dense color="primary" round icon="close" @click="openPopup = false" />
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
                            class="full-width"
                            v-model="bnbBuyAmount"
                            placeholder="0.0"
                            type="number"
                        />
                    </div>
                </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                <div class="row q-col-gutter-sm">
                    <div class="col-1 flex flex-center">
                        <img
                            src="~assets/img/logo.png"
                            style="height: 50px"
                        />
                    </div>
                    <div class="col-3 text-overline" style="font-size: 12px">
                        <div>Swap To:</div>
                        <div class="text-h4 text-weight-bold">$SPR</div>
                    </div>
                    <div class="col flex flex-center">
                        <q-input
                            dense
                            outlined
                            class="full-width"
                            color="white"
                            v-model="sprAmount"
                            placeholder="0.0"
                            readonly
                            type="number"
                        />
                    </div>
                </div>
            </q-card-section>

            <q-card-actions>
                Purchasing power: {{ purchasingPower }} $SPR <br/>
                $SPR = {{price}}$<br/>
                1BNB = {{bnbUsdPrice}}$<br/>
                <a :href="pancakePurchaseUrl" target="_blank">Buy on PCS</a>
                <button
                    class="button bg-dark q-py-sm full-width"
                    style="
                border: 2px solid #2253f4;
                border-radius: 5px;
                font-size: 14px;
                box-shadow: 0 0 20px rgb(34 83 244 / 76%);
                color: #fff;"
                v-on:click.prevent="buySpr"
                >Swap</button>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import ApiRequests from "../service/http/ApiRequests";
import RouterContract from "../service/contract/RouterContract";
import SpaceRiders from "../service/contract/SpaceRiders";
import { SWAP_COMPLETED } from "../constants/Events";
import ContractAddress from "../service/contract/ContractAddress";

const $notification =
    getCurrentInstance().appContext.config.globalProperties.$notification;

const $eventBus = getCurrentInstance().appContext.config.globalProperties.$eventBus;

const options = ["BNB"];
const model = ref("BNB");
const openPopup = ref(false);

const $store = useStore();
const myAddr = $store.getters.address;

const purchasingPower = ref(0);
const price = ref(0.0);
const bnbUsdPrice = ref(0.0);

const pancakePurchaseUrl = ref(`${process.env.PANCAKE_URL}#/swap?outputCurrency=${ContractAddress.getSpaceRidersAddress()}`);
watch(async () => {
    if (openPopup.value) {
        purchasingPower.value = await SpaceRiders.purchasingPower(myAddr);
        price.value = (await ApiRequests.tokenPrice()).toFixed(2);
        bnbUsdPrice.value = (await ApiRequests.bnbPrice()).toFixed(2);
    }
});

const bnbBuyAmount = ref(0.2);
const sprAmount = ref(0);

watch(async () => {
    const bnbAmount = bnbBuyAmount.value;
    sprAmount.value = (bnbAmount*bnbUsdPrice.value/price.value).toFixed(2);
});

const buySpr = async () => {
    const closeNotification = $notification(
        "progress",
        "Waiting for transaction to complete...",
        0
    );
    
    let receipt = { status: 0 };
    try {
        const tx = await RouterContract.buySpr(myAddr, bnbBuyAmount.value.toString());
        receipt = await tx.wait();
    } catch (e) {
        console.log("error");
        console.log(e);
        closeNotification();
    }
    
    if (receipt.status === 1) {
        $notification("success", "Swap succeeded!", 6000);
        $eventBus.emit(SWAP_COMPLETED);
    } else {
        $notification("failed", "Failed swapping...", 6000);
        closeNotification();
    }

    closeNotification();
};
</script>