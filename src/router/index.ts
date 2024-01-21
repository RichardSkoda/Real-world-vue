import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '@/views/AboutView.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import type InjectItem from '@/types/InjectItem'

const GStore: InjectItem = inject('GStore') ?? {flashMessage: 'Something went wrong!'}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition // does not work, it go back to top of previous 'page'
    }else return {top: 0} // always scroll to top
  },
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
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError,
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
          component: EventEdit,
          meta: {requireAuth: true}
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



router.beforeEach((to, from) => {

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    //does not show the flashMessage, dont know why
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) { // <--- If this navigation came from a previous page.
      return false
    } else {  // <--- Must be navigating directly
      return { path: '/' }  // <--- Push navigation to the root route.
    }
  }
})


export default router
