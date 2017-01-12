/*
 * @Author: shunjinchan
 * @Date: 2017-01-04 18:01:20
 * @Last Modified by: shunjinchan
 * @Last Modified time: 2017-01-06 15:14:25
 */

'use strict'

/**
 * @Author: shunjinchan
 * @Date:   2016-07-28T14:27:49+08:00
 * @Last modified by:   shunjinchan
 * @Last modified time: 2016-08-11T18:41:58+08:00
 */

import RequestView from '../components/container/RequestView.vue'
import MockView from '../components/container/MockView.vue'

const routes = [
  {
    path: '/',
    component: RequestView,
    name: 'request-view'
  },
  {
    path: '/mock',
    component: MockView,
    name: 'mock-view'
  }
]

export default routes
