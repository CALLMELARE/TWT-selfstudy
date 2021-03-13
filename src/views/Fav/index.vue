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
      <div v-if="!state.favList" class="overall-container" style="padding-top:200px;">
        这里还是空空如也呢
      </div>
      <div v-else class="overall-container">
        <div
          class="fav-item"
          v-bind:key="i"
          v-for="(item, i) in state.favs"
          @click="jumpTo(`/classroom`, item.build_id, item.id, item.build, item.name)"
        >
          <div class="top">
            <span class="top-left">
              <div class="title">
                {{ item.build }}
              </div>
              <span class="subtitle"> {{ item.area }} {{ item.name }} </span>
            </span>
            <span class="top-right">{{ campusName(parseInt(item.campus)) }}</span>
          </div>
          <div class="status">
            <span
              class="dot"
              :class="{ active: _item === '1' ? true : false }"
              v-bind:key="j"
              v-for="(_item, j) in item.status"
            >
              &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCollections } from '@/api/fav'
import { defineComponent, reactive } from 'vue'
import { Notify } from 'vant'
import { sessionStorage } from '@/utils/storage'
import router from '@/router'
import { getCertainDayData } from '@/api/selfstudy'

export default defineComponent({
  name: 'Home',
  props: {},
  setup() {
    const state = reactive({
      favList: [],
      favs: []
    })

    function campusName(c: number) {
      switch (c) {
        case 1:
          return '卫津路'

        case 2:
          return '北洋园'
      }
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

    function handleFavClass(fav: any) {
      const building = sessionStorage.get('building')
      // console.log(building)
      if (!building) {
        const sName = sessionStorage.get('semesterName')
        const sInfo = sessionStorage.get('semesterStart')
        const date = sessionStorage.get('date')
        const now = date.getTime()
        const diff = (now / 1000 - parseFloat(sInfo)) / (60 * 60 * 24)
        const data = {
          term: sName,
          week: `${Math.floor(diff / 7) + 1}`,
          day: `${Math.floor(diff % 7) + 1}`
        }
        setTimeout(() => {
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
        }, 1000)
      }
      const favs = []
      console.log(fav)
      for (let i = 0; i < building.length; i++) {
        for (let j = 0; j < building[i].areas.length; j++) {
          for (let k = 0; k < building[i].areas[j].classrooms.length; k++) {
            if (fav.includes(building[i].areas[j].classrooms[k].classroom_id)) {
              favs.push({
                // @ts-ignore
                id: building[i].areas[j].classrooms[k].classroom_id,
                // @ts-ignore
                name: building[i].areas[j].classrooms[k].classroom,
                // @ts-ignore
                status: building[i].areas[j].classrooms[k].status,
                // @ts-ignore
                area:
                  building[i].areas[j].area_id === '-1' ? '' : building[i].areas[j].area_id + '区',
                // @ts-ignore
                build: building[i].building,
                // @ts-ignore
                build_id: building[i].building_id,
                // @ts-ignore
                campus: building[i].campus_id
              })
            }
          }
        }
      }
      console.log(favs)
      // @ts-ignore
      state.favs = favs
    }
    return { state, handleFavClass, campusName, jumpTo }
  },
  created() {
    getCollections()
      .then((val) => {
        // Notify({
        //   type: 'success',
        //   message: '拉取成功'
        // })
        this.state.favList = val.data.classroom_id
        this.handleFavClass(this.state.favList)
        console.log(this.state.favList)
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
    .overall-container {
      min-height: 400px;
      font-size: 14px;
      text-align: center;
      font-weight: normal;
      color: #808080;
      border-top: 1px solid #d6d6d6;
      .fav-item {
        cursor: pointer;
        padding: 10px 0;
        border-bottom: 1px solid #d6d6d6;
        .top {
          display: flex;
          justify-content: space-between;
          .top-left {
            display: flex;
            .title {
              font-weight: bold;
              font-size: 16px;
              line-height: 20px;
              padding: 5px;
              background: #808080;
              color: #fff;
              border-radius: 5px;
            }
            .subtitle {
              font-weight: 600;
              font-size: 18px;
              line-height: 20px;
              padding: 5px;
              color: #808080;
              letter-spacing: 1px;
            }
          }
          .top-right {
            font-size: 14px;
            line-height: 20px;
            font-weight: bold;
            padding: 5px;
          }
        }
        .status {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          .dot {
            height: 12px;
            width: 12px;
            border-radius: 3px;
            background: #d6d6d6;
          }
          .active {
            background: #808080;
          }
        }
      }
      .fav-item:hover {
        border-bottom: 1px solid #808080;
      }
    }
  }
}
</style>
