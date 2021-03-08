import { getFirstDayOfTerm } from '@/api/selfstudy'
import { Notify } from 'vant'
import { sessionStorage } from '@/utils/storage'

export const getSemesterInfo = () => {
  getFirstDayOfTerm()
    .then((val) => {
      const { result } = val
      console.log(result)
      sessionStorage.set('semesterStart', result.semesterStartAt)
    })
    .catch((val) => {
      Notify({
        type: 'danger',
        message: '获取学期信息失败'
      })
    })
}