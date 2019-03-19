import Vue from 'vue'
import Router from 'vue-router'
import KeykeepersHomePage from "@/components/keykeepers/KeykeepersHomePage";
import KeykeepersManual from "@/components/keykeepers/KeykeepersManual";
import KeykeepersPlanetsList from "@/components/keykeepers/planets/KeykeepersPlanetsList";
import TouristsEntryPage from "@/components/tourists/TouristsEntryPage"
import EntryPage from "@/components/EntryPage";
import HelloWorld from "@/components/HelloWorld";
import {AuthServiceFactory} from "@/services/auth/AuthService";

Vue.use(Router);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'EntryPage',
      component: EntryPage,

      beforeEnter: async (to, from, next) => {
        const auth = AuthServiceFactory.getInstance();

        if (!(await auth.isAuthorized())) {
          location.replace(`http://jakesmokie.ru:8080/am/XUI/?goto=${window.location.href}#login/`);
          return;
        }

        if (await auth.isKeykeeper()) {
          next({name: 'KeykeepersManual'});
          return;
        }

        next('/tourists');
      },
    },
    {
      path: '/keykeepers',
      component: KeykeepersHomePage,

      beforeEnter: async (to, from, next) => {
        const auth = AuthServiceFactory.getInstance();

        if (!(await auth.isKeykeeper())) {
          next({name: 'EntryPage'});
          return;
        }

        next();
      },

      children: [
        {
          path: 'planets',
          name: 'KeykeepersPlanetsList',
          component: KeykeepersPlanetsList
        },

        {
          path: '',
          component: KeykeepersManual,
          name: 'KeykeepersManual'
        },

        {
          path: '*',
          component: HelloWorld
        },
      ],
    },
    {
      path: '/tourists',
      component: TouristsEntryPage,
      name: 'TouristsEntryPage',

      beforeEnter: async (to, from, next) => {
        const auth = AuthServiceFactory.getInstance();

        if (!(await auth.isAuthorized()) || await auth.isKeykeeper()) {
          next('/');
          return;
        }

        next();
      },
    }
  ]
})
