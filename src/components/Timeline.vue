<template>
  <section class="timeline">
    <h3 class="main-title">{{ props.mainTitle }}</h3>

    <div
      class="timeline-item"
      v-for="(item, index) in props.timelineFeed"
      :key="index"
    >
      <div
        class="timeline-background"
        :style="{ 'background-image': `url(data_img/${item['imgSrc']})` }"
      ></div>
      <div class="timeline-date absolute-center">
        <p class="heading text-center">{{ item["heading"] }}</p>
      </div>
      <div class="timeline-content">
        <ul>
          <li v-for="(line, index) in item['content']" :key="index">
            <q-icon name="fas fa-check" /> {{ line }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
/*
mainTitle: String,
timelineFeed: Array(
  Object(
    heading: String,
    imgSrc: String,
    content: String[]
  )
)
*/
const props = defineProps(["mainTitle", "timelineFeed"]);
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  background-color: #031625;

  &:hover {
    .timeline-item {
      width: 23.3333%;
    }

    .main-title {
      display: none;
    }
  }
}

.main-title {
  display: block;
  font-family: plantFont;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 2rem;
  z-index: 1;
}

.timeline-item {
  transform: translate3d(0, 0, 0);
  position: relative;
  width: 25%;
  height: 70vh;
  max-height: 600px;
  color: #fff;
  overflow: hidden;
  transition: width 0.5s ease;

  &:before,
  &:after {
    transform: translate3d(0, 0, 0);
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &:after {
    background: transparentize(#031625, 0.15);
    opacity: 1;
    transition: opacity 0.5s ease;
  }

  &:before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 75%
    );
    z-index: 1;
    opacity: 0;
    transform: translate3d(0, 0, 0) translateY(50%);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &:hover {
    width: 100% !important;

    &:after {
      opacity: 0;
    }

    &:before {
      opacity: 1;
      transform: translate3d(0, 0, 0) translateY(0);
      transition: opacity 1s ease, transform 1s ease 0.25s;
    }

    .timeline-date {
      transform: translateX(-50%) translateY(-300%);
      transition: all 0.5s ease 0.5s;
    }

    .timeline-content {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.5s ease 0.5s;
    }

    .timeline-background {
      filter: grayscale(0);
    }
  }
}

.timeline-content {
  transform: translate3d(0, 0, 0) translateY(25px);
  position: relative;
  z-index: 1;
  padding: 0 3em;
  top: 30%;
  opacity: 0;
  font-size: 1.25vmax !important;

  li {
    list-style-type: none;
  }
}

.timeline-date {
  position: relative;
  z-index: 1;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;

  p {
    text-transform: uppercase;
    font-family: plantFont;
    font-size: 1.5vmax;
    line-height: 3;
  }
}

.timeline-background {
  transform: translate3d(0, 0, 0);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
  transition: filter 0.5s ease;
  filter: grayscale(100%);
}
</style>
