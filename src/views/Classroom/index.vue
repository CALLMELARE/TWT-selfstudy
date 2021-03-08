<template>
  <div class="home-container">
    <div class="warpper">
      <div class="header">
        <div class="header-left" @click="goBack">
          <van-icon name="arrow-left" />
        </div>
        <div class="header-right">
          <!-- <van-icon name="replay" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import router from '@/router'
import { getQueryParamByKey } from '@/utils/index'
import { sessionStorage } from '@/utils/storage'
export default defineComponent({
  name: 'classroom',
  props: {},
  setup() {
    const ss = sessionStorage.get('building')
    const state = reactive({})
    function goBack() {
      const id = getQueryParamByKey('build')
      router.push({ path: '/building', query: { id: id } })
    }
    return { state, goBack }
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  .warpper {
    min-height: calc(100vh - 79px);
    padding: 12px;
    background: #fff;
    .header {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      .header-left {
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
        cursor: pointer;
      }
      .header-right {
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
