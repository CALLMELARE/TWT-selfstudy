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
      <div class="table"></div>
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
    })
    function goBack() {
      const id = getQueryParamByKey('build')
      router.push({ path: '/building', query: { id: id } })
    }
    return { state, goBack }
  },
  created() {
    const current = sessionStorage.get('date') || new Date()
    const sName = sessionStorage.get('semesterName')
    const sInfo = sessionStorage.get('semesterStart')
    const diff = (current.getTime() / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
    const data = {
      term: sName,
      week: `${Math.floor(diff / 7) + 1}`,
      classroom_id: this.state.classroomId
    }

    function transMatrix(matrix: Array<DayTableObj>) {
      let m = []
      for (let i = 0; i < matrix.length; i++) {
        m.push(matrix[i].status)
      }
      console.log(m)

    }

    getClassInWeek(data)
      .then((val) => {
        const { data } = val
        Notify({
          type: 'success',
          message: val.message
        })
        this.state.classTabel = data
        console.log(this.state.classTabel)
        transMatrix(this.state.classTabel)
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
