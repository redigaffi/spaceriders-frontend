<template>
  <q-dialog v-model="redeemModal">
    <q-card dark class="justify-between full-width">
      <div>
        <q-card-section class="text-h6 text-weight-bold">
          <div class="row justify-between">
            <div>REDEEM CODE</div>
            <div>
              <q-btn
                flat
                round
                size="sm"
                color="white"
                icon="close"
                v-close-popup
              />
            </div>
          </div>
        </q-card-section>

        <q-separator dark />
      </div>

      <q-img src="~assets/img/redeem.webp" height="240px" />

      <q-card-section>
        <q-input
          dense
          outlined
          color="white"
          class="full-width q-ma-none q-pa-none"
          v-model="code"
          placeholder="Enter a 20-character alphanumeric code"
          :rules="[
            () =>
              validateCode() ||
              'Invalid format. Enter a 20-character alphanumeric code.',
          ]"
        />
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          label="Redeem"
          color="positive"
          icon="check"
          @click="redeemCode()"
          :disabled="!validateCode()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import { useQuasar } from "quasar";
import ApiRequests from "src/service/http/ApiRequests";

const $q = useQuasar();

const $notification =
  getCurrentInstance().appContext.config.globalProperties.$notification;

const redeemModal = ref(false);
const code = ref("");

const showRedeemModal = () => {
  redeemModal.value = true;
};

defineExpose({
  showRedeemModal,
});

const validateCode = () => {
  return /^[a-z0-9]{20}$/i.test(code.value);
};

const redeemCode = () => {
  ApiRequests.redeemCode(code.value)
    .then(() => {
      $q.notify($notification("success", "Code redeemed successfully!"));
    })
    .catch(() => {
      $q.notify(
        $notification("failed", "Oops, did you entered an invalid code?")
      );
    })
    .finally(() => {
      code.value = "";
    });
};
</script>
