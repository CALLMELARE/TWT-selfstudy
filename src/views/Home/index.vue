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
      <div class="buildings" v-if="state.currrentCampus == 1">
        <div
          @click="jumpTo(`/building`, item.building_id)"
          class="building-item"
          v-bind:key="i"
          v-for="(item, i) in state.WJL"
        >
          {{ item.building }}
        </div>
      </div>
      <div class="buildings" v-if="state.currrentCampus == 2">
        <div
          @click="jumpTo(`/building`, item.building_id)"
          class="building-item"
          v-bind:key="i"
          v-for="(item, i) in state.BYY"
        >
          {{ item.building }}
        </div>
      </div>
    </div>
    <van-calendar color="#00a0e9" v-model:show="showCalendar" @confirm="onConfirm" />
  </div>
</template>
<script lang="ts">
import { getCertainDayData, getFirstDayOfTerm } from '@/api/selfstudy'
import router from '@/router'
import { Notify } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { sessionStorage } from '@/utils/storage'

const building1: Array<any> = []
const building2: Array<any> = []
export default defineComponent({
  name: 'Home',
  props: {},
  setup() {
    function getCurrentCampus() {
      let ss = sessionStorage.get('campus')
      if (ss) {
        return ss
      } else {
        return 1
      }
    }
    const state = reactive({
      currrentCampus: getCurrentCampus(),
      BYY: building1,
      WJL: building2,
      firstLoad: false
    })
    const formatDate = (date: { getMonth: any; getDate: any; getYear?: any; getTime?: any }) =>
      `${date.getYear() + 1900}年${date.getMonth() + 1}月${date.getDate()}日`
    const currentDate = ref(
      sessionStorage.get('date') ? formatDate(new Date(sessionStorage.get('date'))) : '今天'
    )
    const showCalendar = ref(false)

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
      state.WJL.sort(function (a, b) {
        return parseInt(a.building) - parseInt(b.building)
      })
      state.BYY.sort(function (a, b) {
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

    function jumpTo(p: string, id: string) {
      router.push({ path: p, query: { id: id } })
    }

    function switchCampus() {
      const c = state.currrentCampus
      if (c === 1) {
        sessionStorage.set('campus', 2)
        state.currrentCampus = 2
      } else if (c === 2) {
        sessionStorage.set('campus', 1)
        state.currrentCampus = 1
      }
    }
    const onRefresh = (date: { getMonth: any; getDate: any; getYear?: any; getTime?: any }) => {
      const sName = sessionStorage.get('semesterName')
      const sInfo = sessionStorage.get('semesterStart')
      const now = date.getTime()
      const diff = (now / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
      const data = {
        term: sName,
        week: `${Math.floor(diff / 7) + 1}`,
        day: `${Math.floor(diff % 7) + 1}`
      }
      // setTimeout(() => {
      if (data.term && data.week && data.day) {
        getCertainDayData(data)
          .then((val) => {
            const { data } = val
            // Notify({
            //   type: 'success',
            //   message: val.message
            // })
            sessionStorage.set('building', data)
          })
          .catch((val) => {
            Notify({
              type: 'danger',
              message: val.message
            })
          })
      } else {
        Notify({
          type: 'danger',
          message: '不是有效的日期'
        })
      }
      // }, 1000)
    }
    const onConfirm = (value: { getMonth: any; getDate: any; getYear?: any; getTime?: any }) => {
      showCalendar.value = false
      currentDate.value = formatDate(value)
      onRefresh(value)
      sessionStorage.set('date', value)
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
    if (!this.state.firstLoad) {
      getFirstDayOfTerm()
        .then((val) => {
          const { result } = val
          // console.log(result)
          sessionStorage.set('semesterStart', result.semesterStartTimestamp)
          sessionStorage.set('semesterName', result.semesterName)
          const sName = result.semesterName
          const sInfo = result.semesterStartTimestamp
          const now = new Date().getTime()
          const diff = (now / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
          if (!sessionStorage.get('date')) {
            sessionStorage.set('date', new Date())
          }
          const data = {
            term: sName,
            week: `${Math.floor(diff / 7) + 1}`,
            day: `${Math.floor(diff % 7) + 1}`
          }
          if (data.term && data.week && data.day) {
            getCertainDayData(data)
              .then((val) => {
                const { data } = val
                // Notify({
                //   type: 'success',
                //   message: val.message
                // })
                sessionStorage.set('building', data)
                this.state.firstLoad = true
                // console.log(data)
                this.checkCampus(data)
              })
              .catch((val) => {
                Notify({
                  type: 'danger',
                  message: val.message
                })
              })
          } else {
            Notify({
              type: 'danger',
              message: '不是有效的日期'
            })
          }
        })
        .catch((val) => {
          Notify({
            type: 'danger',
            message: '拉取学期信息失败'
          })
        })
      // 废弃代码
      // const sName = sessionStorage.get('semesterName')
      // const sInfo = sessionStorage.get('semesterStart')
      // const now = new Date().getTime()
      // const diff = (now / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
      // if (!sessionStorage.get('date')) {
      //   sessionStorage.set('date', new Date())
      // }
      // const data = {
      //   term: sName,
      //   week: `${Math.floor(diff / 7) + 1}`,
      //   day: `${Math.floor(diff % 7) + 1}`
      // }
      // getCertainDayData(data)
      //   .then((val) => {
      //     const { data } = val
      //     // Notify({
      //     //   type: 'success',
      //     //   message: val.message
      //     // })
      //     sessionStorage.set('building', data)
      //     this.state.firstLoad = true
      //     // console.log(data)
      //     this.checkCampus(data)
      //   })
      //   .catch((val) => {
      //     Notify({
      //       type: 'danger',
      //       message: val.message
      //     })
      //   })
    }
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
    .buildings {
      padding-top: 10px;
      font-size: 16px;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      .building-item {
        cursor: pointer;
        margin: 5px;
        height: 70px;
        line-height: 70px;
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
