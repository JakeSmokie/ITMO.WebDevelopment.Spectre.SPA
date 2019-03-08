import Vue from 'vue'
import Router from 'vue-router'
import KeykeepersHomePage from "@/components/keykeepers/KeykeepersHomePage";
import KeykeepersPlanetsList from "@/components/keykeepers/planets/KeykeepersPlanetsList";
import EntryPage from "@/components/EntryPage";
import HelloWorld from "@/components/HelloWorld";

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
          path: '/keykeepers/planets',
          name: 'KeykeepersPlanetsList',
          component: KeykeepersPlanetsList
        },
        {
          path: '/keykeepers/*',
          name: 'HelloWorld',
          component: HelloWorld
        },
      ],

      path: '/keykeepers/*',
      name: 'KeykeepersHomePage',
      component: KeykeepersHomePage,
    }
  ]
})
