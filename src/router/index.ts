import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventLayout from '@/views//event/Leyout.vue'
import EventDetails from '@/views//event/Details.vue'
import EventRegister from '@/views//event/Register.vue'
import EventEdit from '@/views//event/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: route => ({page: parseInt(route.query.page as string) || 1})
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
      alias: '/about'
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit
        }
      ]
    },
    // REDIRECT WITH WILD CARD
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },

    // REDIRECT WITH CHIDREN
    // {
    //   path: '/event/:id',
    //   redirect: () => {
    //     return {name: 'event-details'}
    //   },
    //   children: [
    //     {path: 'register', redirect: () => ({name: 'event-register'})},
    //     {path: 'edit', redirect: () => ({name: 'event-edit'})}
    //   ]
    // }
  ]
})

export default router
