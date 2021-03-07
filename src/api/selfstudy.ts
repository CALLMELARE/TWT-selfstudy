import service from '@/utils/request'
import { getDayData } from '@/api/interface'

// 获取所有教学楼
export function getBuildingList() {
  return service({
    url: 'getBuildingList',
    method: 'get'
  })
}

// 获取当日可上自习的教室，该教室的一周内信息都会返回
export function getCertainDayData(data: getDayData) {
  return service({
    url: `getDayData/${data.term}/${data.week}/${data.day}`,
    method: 'get'
  })
}
