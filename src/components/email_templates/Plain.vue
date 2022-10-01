<template>
  {{ body }}
</template>
<script setup>
import { defineProps, reactive, toRefs } from "vue";

const props = defineProps({
  body: Object,
});

const { body } = toRefs(props);
</script>
