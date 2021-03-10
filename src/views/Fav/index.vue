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
      <div v-else class="overall-container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCollections } from '@/api/fav'
import { defineComponent, reactive } from 'vue'
import { Notify } from 'vant'
import { sessionStorage } from '@/utils/storage'

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

    function handleFavClass(fav: any) {
      const building = sessionStorage.get('building')
      // console.log(building)
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
                area: building[i].areas[j].area_id === '-1' ? '' : item.area_id + '区',
                // @ts-ignore
                build: building[i].building,
                // @ts-ignore
                campus: building[i].campus_id
              })
            }
          }
        }
      }
      console.log(favs)
    }
    return { state, handleFavClass, campusName }
  },
  created() {
    getCollections()
      .then((val) => {
        Notify({
          type: 'success',
          message: '获取成功'
        })
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
    }
  }
}
</style>
