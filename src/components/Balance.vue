<template>
    <q-btn v-if="showTokenAmount" @click="toggleValue" class="glossy" color="white" text-color="black" >
        <img src="logo.png" style=" width: 22px; height: 22px" />
        <div class="q-ml-sm">
            {{ tokenBalance }}
        </div>
    </q-btn>
    <q-btn v-else @click="toggleValue" class="glossy" color="white" text-color="black" >
        <q-icon size="1.5em" name="fas fa-dollar-sign" />
        <div class="q-ml-xs">
            {{ totalUsd }}
        </div>
    </q-btn>
</template>
<script setup>
import SpaceRiders from "../service/contract/SpaceRiders";
import { useStore } from "vuex";
import { ref, onBeforeMount,computed } from "vue";
import tc from "thousands-counter";
import ApiRequest from "../service/http/ApiRequests";

const $store = useStore();
const showTokenAmount = ref(true)
const tokenAmount = ref(0);
const dollarValue = ref(0);

const tokenBalance = computed(() => {
    return tc(tokenAmount.value, { digits: 2 });
})

const totalUsd = computed(() => {
    return tc(dollarValue.value, { digits: 2 });
})

onBeforeMount(async () => {
    try { 
        tokenAmount.value = await SpaceRiders.totalBalanceOf($store.getters.address);
    }catch (e) {
        console.log(e);
    }
});

async function toggleValue() {
    if (showTokenAmount.value) {
        showTokenAmount.value = false;
        tokenAmount.value = await SpaceRiders.totalBalanceOf($store.getters.address);
        const price = await ApiRequest.tokenPrice();
        dollarValue.value = tokenAmount.value*price;
    } else {
        showTokenAmount.value = true;
        tokenAmount.value = await SpaceRiders.totalBalanceOf($store.getters.address);
    }
}
</script>