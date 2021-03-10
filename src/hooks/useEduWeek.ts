import { getFirstDayOfTerm } from '@/api/selfstudy'
import { Notify } from 'vant'
import { sessionStorage } from '@/utils/storage'

export const getSemesterInfo = () => {
  getFirstDayOfTerm()
    .then((val) => {
      const { result } = val
      // console.log(result)
      sessionStorage.set('semesterStart', result.semesterStartTimestamp)
      sessionStorage.set('semesterName',result.semesterName)
    })
    .catch((val) => {
      Notify({
        type: 'danger',
        message: '拉取学期信息失败'
      })
    })
}
