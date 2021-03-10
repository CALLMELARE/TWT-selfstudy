<!-- Fav -->
<template>
  <div class="home-container">
    <div class="warpper">
      <div class="header">
        <div class="header-left">
          我的收藏
        </div>
        <div class="header-right"></div>
      </div>
      <div v-if="!state.favList.length" class="overall-container" style="padding-top:200px;">
        这里还是空空如也呢
      </div>
      <div v-else class="overall-container">
        
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCollections } from '@/api/fav'
import { defineComponent, reactive } from 'vue'
import { Notify } from 'vant'

export default defineComponent({
  name: 'Home',
  props: {},
  setup() {
    const state = reactive({
      favList: []
    })
    return { state }
  },
  created() {
    getCollections()
      .then((val) => {
        Notify({
          type: 'success',
          message: '获取成功'
        })
        console.log(val)
      })
      .catch((val) => {
        Notify({
          type: 'danger',
          message: val.data.message
        })
      })
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
    .overall-container {
      height: 100%;
      min-height: 400px;
      font-size: 14px;
      text-align: center;
      font-weight: normal;
      color: #808080;
    }
  }
}
</style>
