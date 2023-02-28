<template>
  <section class="game">
    <div :class="$q.screen.lt.md ? 'q-px-md' : 'container'">
      <div class="game__inner wow animate__animated animate__fadeIn">
        <div class="text-2 title game__title">{{ title }}</div>

        <div class="q-pt-xl row q-col-gutter-sm justify-center">
          <div
            v-for="(member, index) in members"
            :key="index"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card
              flat
              class="bg-transparent text-center zoom-item"
              style="height: 100%"
            >
              <div class="text-center">
                <q-avatar size="120px">
                  <img
                    :src="member.img"
                    style="border: 3px solid rgb(34, 83, 244)"
                  />
                </q-avatar>
              </div>

              <q-card-section>
                <div class="text-h5">{{ member.name }}</div>
                <div class="text-h6">{{ member.title }}</div>
              </q-card-section>

              <hr class="bg-white" style="width: 100px; height: 3px" />
              <q-card-section v-if="member.roles" class="text-h5">
                <div v-for="(role, index) in member.roles" :key="index">
                  {{ role }}
                </div>
              </q-card-section>
              <q-card-section
                v-if="member.socialMedia"
                class="text-subtitle2 q-gutter-md"
              >
                <template
                  v-for="(social, index) in member.socialMedia"
                  :key="index"
                >
                  <q-btn
                    v-if="social.isNotFontIcon"
                    flat
                    round
                    color="white"
                    type="a"
                    target="_blank"
                    :href="social.link"
                  >
                    <img
                      :src="social.icon"
                      :style="{ height: social.height + 'px' }"
                    />
                  </q-btn>

                  <q-btn
                    v-else
                    flat
                    round
                    color="white"
                    :icon="social.icon"
                    type="a"
                    target="_blank"
                    :href="social.link"
                  />
                </template>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: String,
  members: Array,
});
</script>

<style scoped></style>
