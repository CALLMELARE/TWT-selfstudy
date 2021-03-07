<!-- Home -->
<template>
  <div class="home-container">
    <div class="warpper">
      <div class="header">
        <div class="header-left" @click="switchCampus">
          {{ campusName(state.currrentCampus) }}校区
          <van-icon name="exchange" size="14" />
        </div>
        <div class="header-right" @click="showCalendar = true">
          {{ currentDate }}
        </div>
      </div>
      <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
        <div class="buildings" v-if="state.currrentCampus == 1">
          <div
            @click="jumpTo(`/building?id=${item.building_id}`)"
            class="building-item"
            v-bind:key="i"
            v-for="(item, i) in state.WJL"
          >
            {{ item.building }}
          </div>
        </div>
        <div class="buildings" v-if="state.currrentCampus == 2">
          <div
            @click="jumpTo(`/building?id=${item.building_id}`)"
            class="building-item"
            v-bind:key="i"
            v-for="(item, i) in state.BYY"
          >
            {{ item.building }}
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <van-calendar color="#00a0e9" v-model:show="showCalendar" @confirm="onConfirm" />
  </div>
</template>
<script lang="ts">
import { getBuildingList } from '@/api/selfstudy'
import router from '@/router'
import { Notify } from 'vant'
import { defineComponent, reactive, ref } from 'vue'

const building1: Array<any> = []
const building2: Array<any> = []
export default defineComponent({
  name: 'Home',
  props: {},
  setup() {
    const state = reactive({
      currrentCampus: 1,
      BYY: building1,
      WJL: building2,
      loading: false
    })
    const currentDate = ref('今天')
    const showCalendar = ref(false)
    const formatDate = (date: { getMonth: any; getDate: any; getYear?: any }) =>
      `${date.getYear() + 1900}年${date.getMonth() + 1}月${date.getDate()}日`
    const onConfirm = (value: { getMonth: any; getDate: any; getYear?: any }) => {
      showCalendar.value = false
      currentDate.value = formatDate(value)
    }

    function checkCampus(data: any[]) {
      state.BYY = []
      state.WJL = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].campus_id === '1') {
          state.WJL.push(data[i])
        } else {
          state.BYY.push(data[i])
        }
      }
      // 自小到大排序
      state.WJL.sort(function(a, b) {
        return parseInt(a.building) - parseInt(b.building)
      })
      state.BYY.sort(function(a, b) {
        return parseInt(a.building) - parseInt(b.building)
      })
    }

    function campusName(c: number) {
      switch (c) {
        case 1:
          return '卫津路'

        case 2:
          return '北洋园'
      }
    }

    function jumpTo(path: string) {
      router.push({ path: path })
    }

    function switchCampus() {
      let c = state.currrentCampus
      if (c === 1) {
        state.currrentCampus = 2
      } else if (c === 2) {
        state.currrentCampus = 1
      }
    }
    const onRefresh = () => {
      setTimeout(() => {
        getBuildingList()
          .then((val) => {
            const { data } = val
            Notify({
              type: 'success',
              message: val.message
            })
            sessionStorage.setItem('building', JSON.stringify(data))
            checkCampus(data)
          })
          .catch((val) => {
            Notify({
              type: 'danger',
              message: val.message
            })
          })
        state.loading = false
      }, 1000)
    }

    return {
      state,
      currentDate,
      campusName,
      switchCampus,
      showCalendar,
      onConfirm,
      onRefresh,
      checkCampus,
      jumpTo
    }
  },
  created() {
    getBuildingList()
      .then((val) => {
        const { data } = val
        Notify({
          type: 'success',
          message: val.message
        })
        sessionStorage.setItem('building', JSON.stringify(data))
        console.log(data)
        this.checkCampus(data)
      })
      .catch((val) => {
        Notify({
          type: 'danger',
          message: val.message
        })
      })
  }
})
</script>
<style lang="scss" scoped>
.home-container {
  .warpper {
    height: calc(100vh - 79px);
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
    .buildings {
      padding-top: 10px;
      font-size: 16px;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      .building-item {
        cursor: pointer;
        margin: 5px;
        height: 50px;
        line-height: 50px;
        color: #999999;
        font-weight: bold;
        border-radius: 5px;
        background: #eeeeee;
        text-align: center;
      }
      .building-item:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
