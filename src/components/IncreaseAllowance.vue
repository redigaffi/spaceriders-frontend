<template>
  <div v-if="!approveDisabled">
    <button
      class="button q-py-sm full-width"
      style="
        border: 2px solid #21ba45;
        border-radius: 5px;
        font-size: 14px;
        box-shadow: 0 0 20px #21ba45;
        color: #fff;
      "
      @click="approve"
    >
      Approve
    </button>
  </div>
</template>
<script setup>
import SpaceRiders from "../service/contract/SpaceRiders";
import { useCheckAllowance } from "../service/util/useCheckAllowance";
import { useStore } from "vuex";
import { toRefs, getCurrentInstance, ref, onMounted, watch } from "vue";

const $store = useStore();
const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const props = defineProps({
  address: String,
  amount: Number,
});

const { address, amount } = toRefs(props);
const approveDisabled = ref(false);
watch(async () => {
  if (!amount.value) return;
  let allow = await useCheckAllowance(
    $store.getters.address,
    address.value,
    amount.value.toString()
  );
  approveDisabled.value = allow;
});

async function approve() {
  const userBalance = await SpaceRiders.balanceOf($store.getters.address);

  const closeNotification = $notification(
    "progress",
    "Waiting for transaction to complete...",
    0
  );

  let receipt = { status: 0 };

  try {
    const tx = await SpaceRiders.increaseAllowance(address.value);
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

  approveDisabled.value = true;
  closeNotification();
}
</script>
