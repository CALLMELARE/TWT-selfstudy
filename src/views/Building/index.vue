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
      <div class="building-name">{{ state.currentBuilding.building }}</div>
      <div v-if="state.currentBuilding" class="building">
        <div class="areas" v-bind:key="i" v-for="(item, i) in state.currentBuilding.areas">
          <div class="area-name">
            {{ item.area_id === '-1' ? '' : item.area_id + '区' }}
          </div>
          <div class="area-content">
            <div
              class="classroom"
              v-bind:key="_i"
              v-for="(_item, _i) in item.classrooms.sort(function(a, b) {
                return parseInt(a.classroom) - parseInt(b.classroom)
              })"
              @click="
                jumpTo(
                  `/classroom`,
                  state.currentBuilding.building_id,
                  _item.classroom_id,
                  state.currentBuilding.building,
                  _item.classroom
                )
              "
            >
              <div class="name">
                {{ _item.classroom }}
              </div>
              <div v-if="_item.status.substr(state.classNow - 1, 1) === '1'" class="status-busy">
                占用
              </div>
              <div
                v-else-if="_item.status.substr(state.classNow - 1, 1) === '0'"
                class="status-free"
              >
                空闲
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">已经到底了</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import router from '@/router'
import { eachClass } from '@/hooks/useClassTime'
import { getQueryParamByKey } from '@/utils/index'
import { sessionStorage } from '@/utils/storage'

interface BuildingObj {
  building_id: string
  areas: [
    {
      area_id?: string
      classrooms?: Array<{ classroom_id: string; classroom: string; capacity: number }>
    }
  ]
  building: string
  campus_id: string
}

export default defineComponent({
  name: 'building',
  props: {},
  setup() {
    const ss = sessionStorage.get('building')
    const bList: Array<BuildingObj> = []
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    console.log(hour + '/' + minute)
    const state = reactive({
      loading: false,
      building: ss,
      currentBuilding: bList,
      classNow: eachClass(hour, minute)
    })
    function goBack() {
      router.push('/home')
    }

    function jumpTo(
      p: string,
      buildingId: string,
      id: string,
      building: string,
      classroom: string
    ) {
      router.push({
        path: p,
        query: { build: buildingId, id: id, building: building, classroom: classroom }
      })
    }
    function getNowStatus() {
      // 根据时间获取当前是第几节课
      const now = new Date()
      const hour = now.getHours()
      const minute = now.getMinutes()
      state.classNow = eachClass(hour, minute)
      console.log(hour + '/' + minute)
      console.log(state.classNow)
    }
    function checkStatus(status: string, cc: number) {
      // 根据某状态串判断第cc节课是否占用
      // exp: status: '000000000000'
      if (cc >= 1 && cc <= 12) {
        const e = status.substring(cc - 1, 1)
        if (e === '1') {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }

    return {
      goBack,
      state,
      ss,
      getNowStatus,
      checkStatus,
      jumpTo
    }
  },
  created() {
    const data = this.ss
    const id = getQueryParamByKey('id')
    for (let i = 0; i < data.length; i++) {
      if (data[i].building_id === id) {
        console.log(data[i])
        this.state.currentBuilding = data[i]
      }
    }
    // // @ts-ignore
    // for (let j = 0; j < this.state.currentBuilding.areas.length; j++) {
    //   // @ts-ignore
    //   this.state.currentBuilding.areas[j].sort(function(a: { building: string }, b: { building: string }) {
    //     return parseInt(a.building) - parseInt(b.building)
    //   })
    // }
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
    .building-name {
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      padding: 5px;
      color: #808080;
      letter-spacing: 1px;
    }
    .areas {
      .area-name {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        padding: 5px;
        color: #808080;
      }
      .area-content {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        .classroom {
          margin: 5px;
          cursor: pointer;
          background: #eeeeee;
          border-radius: 5px;
          height: 60px;
          display: flex;
          flex-direction: column;
          .name {
            font-weight: bold;
            font-size: 18px;
            line-height: 42px;
            text-align: center;
            color: #999999;
          }
          .status-free {
            background: #07c160;
            line-height: 18px;
            font-size: 14px;
            text-align: center;
            width: 100%;
            color: #fff;
            border-radius: 0 0 5px 5px;
          }
          .status-busy {
            background: #ee0a24;
            line-height: 18px;
            font-size: 14px;
            text-align: center;
            width: 100%;
            color: #fff;
            border-radius: 0 0 5px 5px;
          }
        }
        .classroom:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    .bottom {
      text-align: center;
      font-size: 14px;
      padding: 8px 0;
      color: #999999;
    }
  }
}
</style>
