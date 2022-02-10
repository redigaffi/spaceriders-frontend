<template>
  <div v-if="!approveDisabled">
    <q-btn
      label="Approve"
      color="yellow"
      @click="approve"
      no-caps
      class="q-px-lg q-mr-sm"
    />
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

  let receipt = { status: 0 };

  try {
    const tx = await SpaceRiders.increaseAllowance(
      address.value,
      amount.value.toString()
    );
    receipt = await tx.wait();
  } catch (e) {
    console.log("error");
    console.log(e);
    closeNotification();
  }

  approveDisabled.value = true;
  closeNotification();
}
</script>
