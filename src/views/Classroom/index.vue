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
      <div class="description">
        <div class="name">
          <div class="title">
            {{ state.building }}
          </div>
          <span class="subtitle">
            {{ state.classroom }}
          </span>
        </div>
        <div class="fav">
          收藏
        </div>
      </div>
      <div class="table">
        <div class="head"></div>
        <div class="head">09/99</div>
        <div class="head">09/99</div>
        <div class="head active">09/99</div>
        <div class="head">09/99</div>
        <div class="head">09/99</div>
        <div class="head">09/99</div>
        <div class="head">09/99</div>
        <div class="side">1</div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="side active">2</div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box active"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="side">3</div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
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
    const state = reactive({
      building: getQueryParamByKey('building'),
      buildingId: getQueryParamByKey('build'),
      classroom: getQueryParamByKey('classroom'),
      classroomId: getQueryParamByKey('id')
    })
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
    .description {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 0 10px;
      .name {
        display: flex;
        .title {
          font-weight: bold;
          font-size: 18px;
          line-height: 24px;
          padding: 5px;
          background: #808080;
          color: #fff;
          border-radius: 5px;
        }
        .subtitle {
          font-weight: 600;
          font-size: 24px;
          line-height: 24px;
          padding: 5px;
          color: #808080;
          letter-spacing: 1px;
        }
      }
      .fav {
        cursor: pointer;
        font-size: 16px;
        line-height: 34px;
        font-weight: bold;
        color: #808080;
      }
    }
    .table {
      display: grid;
      grid-template-columns: 9% 13% 13% 13% 13% 13% 13% 13%;
      font-size: 12px;
      padding: 10px;

      .head {
        background: #d6d6d6;
        color: #929292;
        border-radius: 3px;
        text-align: center;
        margin: 1px;
        padding: 3px 0;
      }
      .side {
        background: #d6d6d6;
        color: #929292;
        border-radius: 3px;
        text-align: center;
        margin: 1px;
        padding: 20px 0;
      }
      .box {
        background: #d6d6d6;
        border-radius: 3px;
        text-align: center;
        margin: 1px;
        padding: 20px 0;
      }
      .active {
        background: #808080;
        color: #ffffff;
      }
    }
  }
}
</style>
