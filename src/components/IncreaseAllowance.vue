<template>
  <div
    v-if="!approveDisabled"
    :class="{
      'approve-btn flex items-center q-mb-md justify-center q-py-md':
        customWidth,
    }"
  >
    <q-btn
      class="button full-width"
      icon="check"
      label="Approve"
      :class="{ 'q-px-md bg-warning': customWidth }"
      style="
        border: 2px solid #21ba45;
        border-radius: 5px;
        font-size: 14px;
        box-shadow: 0 0 20px #21ba45;
        color: #fff;
      "
      @click="approve"
    >
    </q-btn>
  </div>
</template>
<script setup>
import ERC20 from "../service/contract/ERC20";
import { useStore } from "vuex";
import { toRefs, getCurrentInstance, ref, onMounted, watch } from "vue";
import { ethers } from "ethers";
import { useQuasar } from "quasar";

const $store = useStore();
const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;
const $q = useQuasar();

const props = defineProps({
  tokenAddress: String,
  address: String,
  amount: Number,
  customWidth: Boolean,
});

const { tokenAddress, address, amount } = toRefs(props);

const useCheckAllowance = async (owner, spender, amount, tokenAddr) => {
  const amountInWei = ethers.utils.parseEther(amount).toString();

  let token = new ERC20(tokenAddr);
  let allowance = await token.allowance(owner, spender);
  return amountInWei <= allowance;
};

const approveDisabled = ref(false);
watch(async () => {
  if (!amount.value) return;
  approveDisabled.value = await useCheckAllowance(
    $store.getters.address,
    address.value,
    amount.value.toString(),
    tokenAddress.value
  );
});

async function approve() {
  const notif = $q.notify(
    $notification("progress", "Waiting for transaction to complete...")
  );

  let receipt = { status: 0 };

  try {
    let token = new ERC20(tokenAddress.value);
    const tx = await token.increaseAllowance(address.value);
    receipt = await tx.wait();
  } catch (e) {
    console.log("error");
    console.log(e);
    closeNotification();
  }

  if (receipt.status === 1) {
    notif($notification("success", "Increased allowance successfuly!"));
  } else {
    notif($notification("failed", "Failed increasing allowance..."));
  }

  approveDisabled.value = true;
}
</script>
<style>
.approve-btn button {
  border: 2px solid transparent !important;
  border-radius: 5px;
  box-shadow: none !important;
  max-width: 130px;
  height: 40px;
}
</style>
