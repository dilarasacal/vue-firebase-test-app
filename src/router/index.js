import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Create from '@/components/Create'
import Setting from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Setting
    },
  ]
})
