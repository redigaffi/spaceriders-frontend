<template>
    <q-btn
        label="Approve"
        color="yellow"
        @click="approve"
        no-caps
        class="q-px-lg q-mr-sm"
    />
</template>
<script setup>
import SpaceRiders from "../service/contract/SpaceRiders";
import { useStore } from "vuex";
import { toRefs, getCurrentInstance } from "vue";

const $store = useStore();
const $notification = getCurrentInstance().appContext.config.globalProperties.$notification;

const props = defineProps({
    address: String,
    amount: Number
})

const { address, amount } = toRefs(props);

async function approve() {
    const userBalance = await SpaceRiders.balanceOf($store.getters.address);

    if (amount.value > userBalance) {
        $notification("failed", "Not enough $SPR tokens", 6000);
        return;
    }

    const closeNotification = $notification(
        "progress",
        "Waiting for transaction to complete...",
        0
    );

    let receipt = { status: 0 };

    try {
        const tx = await SpaceRiders.increaseAllowance(address.value, amount.value.toString());
        receipt = await tx.wait();

    } catch (e) {
        console.log("error");
        console.log(e);
        closeNotification();
    }

    if (receipt.status === 1) {
        $notification("success", "Increased allowance successfuly!", 6000);

    } else {
        $notification("failed", "Failed increasing allowance...", 6000);
        closeNotification();
    }

    closeNotification();
}
</script>