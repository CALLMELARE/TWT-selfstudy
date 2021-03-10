<template>
  <div class="home-container">
    <div class="warpper">
      <div class="header">
        <div class="header-left" @click="goBack">
          <van-icon name="arrow-left" />
        </div>
        <div class="header-right"></div>
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
      <div class="tip-bar">
        状态：
        <div class="tip">
          <span class="tip-box">空闲</span> <span class="tip-box active">占用</span>
        </div>
      </div>

      <div class="table-container">
        <div class="table">
          <div class="head">{{ state.month }}月</div>
          <div class="head" v-bind:key="item.week" v-for="item in state.dateList">
            <div v-if="item.day === state.day" class="active">
              {{ item.day }}
            </div>
            <div v-else>
              {{ item.day }}
            </div>
          </div>
        </div>
        <div class="table" v-bind:key="item" v-for="(item, i) in state.matrix">
          <div class="side">{{ i + 1 }}</div>
          <div class="box" v-bind:key="_item" v-for="_item in item">
            <div v-if="_item == '1'" class="active">&nbsp;</div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AreaHTMLAttributes, defineComponent, reactive } from 'vue'
import router from '@/router'
import { getQueryParamByKey } from '@/utils/index'
import { sessionStorage } from '@/utils/storage'
import { getClassInWeek } from '@/api/selfstudy'
import { Notify } from 'vant'

interface DayTableObj {
  day?: number
  status?: string
}

export default defineComponent({
  name: 'classroom',
  props: {},
  setup() {
    const tableList: Array<DayTableObj> = []
    const state = reactive({
      building: getQueryParamByKey('building'),
      buildingId: getQueryParamByKey('build'),
      classroom: getQueryParamByKey('classroom'),
      classroomId: getQueryParamByKey('id'),
      classTabel: tableList,
      matrix: <any>[],
      dateList: <any>[],
      month: '',
      day: ''
    })

    function makeDate(data: any) {
      var date = data
      var month = date.getMonth()
      var week = date.getDay()
      var month = month + 1
      var day = date.getDate()
      // week：周几，day：几号
      var weekArr = [
        { week: '', day: '' },
        { week: '', day: '' },
        { week: '', day: '' },
        { week: '', day: '' },
        { week: '', day: '' },
        { week: '', day: '' },
        { week: '', day: '' }
      ]
      var leftNum = week - 1
      // 本周内今天的后几天的数量
      var rightNum = 7 - week
      // 本周内今天的前几天
      for (var i = 0; i < leftNum; i++) {
        weekArr[i].week = (week - (week - i) + 1).toString()
        if (i == 0) {
          weekArr[i].day = (day - week + 1).toString()
        } else {
          weekArr[i].day = (day - (week - i) + 1).toString()
        }
      }
      // 本周内今天的后几天
      for (var i = 0; i < rightNum; i++) {
        weekArr[i + week].week = (week + i + 1).toString()
        weekArr[i + week].day = (day + i + 1).toString()
      }
      // 今天
      weekArr[week - 1].week = week.toString()
      weekArr[week - 1].day = day.toString()
      console.log(weekArr)
      state.dateList = weekArr
    }
    function goBack() {
      const id = getQueryParamByKey('build')
      router.push({ path: '/building', query: { id: id } })
    }
    return { state, goBack, makeDate }
  },
  created() {
    const current = new Date(sessionStorage.get('date')) || new Date()
    const sName = sessionStorage.get('semesterName')
    const sInfo = sessionStorage.get('semesterStart')
    const diff = (current.getTime() / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
    const data = {
      term: sName,
      week: `${Math.floor(diff / 7) + 1}`,
      classroom_id: this.state.classroomId
    }
    this.state.month = (current.getMonth() + 1).toString()
    this.state.day = current.getDate().toString()
    console.log(this.state.day)
    function transMatrix(matrix: Array<DayTableObj>) {
      let m: Array<string | undefined> = [],
        r: Array<string | undefined> = []
      for (let i = 0; i < matrix.length; i++) {
        m.push(matrix[i].status)
      }
      // console.log(m)
      // @ts-ignore
      for (let i = 0; i < m[0].length; i++) {
        // @ts-ignore
        r[i] = []
      }
      for (let i = 0; i < m.length; i++) {
        // @ts-ignore
        for (let j = 0; j < m[i].length; j++) {
          // @ts-ignore
          r[j][i] = m[i][j]
        }
      }
      // console.log(r)
      return r
    }

    getClassInWeek(data)
      .then((val) => {
        const { data } = val
        Notify({
          type: 'success',
          message: val.message
        })
        this.state.classTabel = data
        // console.log(this.state.classTabel)
        this.state.matrix = transMatrix(this.state.classTabel)
        this.makeDate(current)
        console.log(this.state.matrix)
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
        color: #808080;
      }
    }
    .tip-bar {
      padding: 10px 10px 0 10px;
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      .tip {
        .tip-box {
          font-size: 12px;
          width: 20px;
          height: 10px;
          padding: 3px;
          border-radius: 3px;
          background: #d6d6d6;
        }
        .active {
          background: #808080;
          color: #ffffff;
        }
      }
    }
    .table-container {
      padding: 10px;
      .table {
        display: grid;
        grid-template-columns: 9% 13% 13% 13% 13% 13% 13% 13%;
        font-size: 12px;

        .head {
          background: #d6d6d6;
          color: #929292;
          border-radius: 3px;
          text-align: center;
          margin: 1px;
          line-height: 18px;
        }
        .side {
          background: #d6d6d6;
          color: #929292;
          border-radius: 3px;
          text-align: center;
          margin: 1px;
          padding: 12px 0;
        }
        .box {
          background: #d6d6d6;
          border-radius: 3px;
          text-align: center;
          margin: 1px;
          line-height: 40px;
        }
        .active {
          background: #808080;
          color: #ffffff;
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
