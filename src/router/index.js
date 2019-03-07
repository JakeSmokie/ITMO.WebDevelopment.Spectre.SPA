import Vue from 'vue'
import Router from 'vue-router'
import KeykeepersHomePage from "@/components/keykeepers/KeykeepersHomePage";
import KeykeepersPlanetsList from "@/components/keykeepers/KeykeepersPlanetsList";
import EntryPage from "@/components/EntryPage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EntryPage',
      component: EntryPage
    },
    {
      children: [
        {
          path: 'planets',
          name: 'KeykeepersPlanetsList',
          component: KeykeepersPlanetsList
        }
      ],

      path: '/keykeepers*',
      name: 'KeykeepersHomePage',
      component: KeykeepersHomePage,
    }
  ]
})
