/*
 * @Author: shunjinchan
 * @Date: 2017-01-04 18:01:20
* @Last modified by:   shunjinchan
* @Last modified time: 2017-01-13T14:03:25+08:00
 */

'use strict'

import RequestView from '../components/container/RequestView.vue'
import MockView from '../components/container/MockView.vue'
import MapDetail from '../components/container/MapDetail.vue'

const routes = [
  {
    path: '/',
    component: RequestView,
    name: 'request-view'
  },
  {
    path: '/mock',
    component: MockView,
    name: 'mock-view',
    children: [
      {
        // 当 /mock/map/:id 匹配成功，
        // MapDetail 会被渲染在 User 的 <router-view> 中
        path: 'map/:uuid',
        component: MapDetail,
        name: 'map'
      }
    ]
  }
]

export default routes
