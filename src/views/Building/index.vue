<template>
  <div class="home-container">
    <div class="warpper">
      <div class="header">
        <div class="header-left" @click="goBack">
          <van-icon name="arrow-left" />
        </div>
        <div class="header-right"></div>
      </div>
      <div class="building-name">{{ state.currentBuilding.building }}</div>
      <div v-if="state.currentBuilding" class="building">
        <div class="areas" v-bind:key="i" v-for="(item, i) in state.currentBuilding.areas">
          <div class="area-name">
            {{ item.area_id === '-1' ? '' : item.area_id + '区' }}
          </div>
          <div class="area-content">
            <div class="classroom" v-bind:key="_i" v-for="(_item, _i) in item.classrooms">
              <div class="name">
                {{ _item.classroom }}
              </div>
              <!-- <div class="capacity">
                {{ _item.capacity }}
              </div> -->
              <div class="status-free">
                空闲
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import router from '@/router'
import { getBuildingList } from '@/api/selfstudy'
import { Notify } from 'vant'
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
    const state = reactive({
      loading: false,
      building: ss,
      currentBuilding: bList
    })
    function goBack() {
      router.push('/home')
    }

    return {
      goBack,
      state,
      ss
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
      }
    }
  }
}
</style>
