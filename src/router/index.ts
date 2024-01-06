import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventDetailView from '@/views/EventDetail.vue'

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
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/event/:id',
      name: 'event-details',
      props: true,
      component: EventDetailView
    }
  ]
})

export default router
