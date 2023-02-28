<template>
  <q-btn
    color="primary"
    icon="fas fa-copy"
    label="Get contract address"
    @click="copyToClipBoard"
  />
</template>

<script setup>
import { getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import ContractAddress from "../service/contract/ContractAddress";

const $q = useQuasar();
const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

async function copyToClipBoard() {
  const address = ContractAddress.getSpaceRidersAddress();

  try {
    await navigator.clipboard.writeText(address);
    $q.notify($notification("success", "Copied to clipboard"));
  } catch (err) {
    $q.notify($notification("failed", "Oops, unable to copy"));
  }
}
</script>
