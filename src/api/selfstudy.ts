import service from '@/utils/request'
import { getClassData, getDayData } from '@/api/interface'
import siteConfig from '@/siteConfig'

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

// 获取某教室一周内占用情况
export function getClassInWeek(data: getClassData) {
  return service({
    url: `getWeekData/${data.term}/${data.week}/${data.classroom_id}`,
    method: 'get'
  })
}

// 获取当前学期第一周第一天是几月几号
export function getFirstDayOfTerm() {
  return service({
    baseURL: siteConfig.extraBaseUrl,
    url: '/api/semester',
    method: 'get'
  })
}
