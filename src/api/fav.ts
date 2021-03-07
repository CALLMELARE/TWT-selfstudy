import service from '@/utils/request'
import { addCollectionData, deleteCollectionData } from '@/api/interface'

// 以下接口在访问时需要在header中添加token字段，值为登录获取的token
// header中还应含有以下字段
// 	domain="xxx.xxx.xxx"
// 	ticket="......"
// 注：对于移动端，请看张浚彪发的接口文档
//        对于网页端，domain="selfstudy.twt.edu.cn"，ticket=base64(app_key + '.' + app_secret)，其中，app_key="lemon"，app_secret="7a858ff32628843043524b729cedfaa70623efc9"

// 添加收藏教室
export function addCollection(data: addCollectionData) {
  return service({
    url: 'addCollection',
    method: 'post',
    data
  })
}

// 获取收藏的教室
export function getCollections() {
  return service({
    url: 'getCollections',
    method: 'get'
  })
}

// 删除已收藏的某个教室
export function deleteCollection(data: deleteCollectionData) {
  return service({
    url: 'deleteCollection',
    method: 'post',
    data
  })
}
