import Vue from 'vue'
import Router from 'vue-router'
import KeykeepersHomePage from "@/components/keykeepers/KeykeepersHomePage";
import KeykeepersManual from "@/components/keykeepers/KeykeepersManual";
import KeykeepersPlanetsList from "@/components/keykeepers/planets/KeykeepersPlanetsList";
import KeykeepersRacesList from "@/components/keykeepers/races/KeykeepersRacesList";
import TouristsEntryPage from "@/components/tourists/TouristsEntryPage";
import TouristsRegisterPage from "@/components/tourists/TouristsRegisterPage";
import TouristsHomePage from "@/components/tourists/TouristsHomePage";
import PageNotFound from "@/components/PageNotFound";
import EntryPage from "@/components/EntryPage";
import HelloWorld from "@/components/HelloWorld";
import {AuthServiceFactory} from "@/services/auth/AuthService";
import {KTouristsServiceFactory} from "@/services/tourists/KTouristsService";

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
          path: 'races',
          name: 'KeykeepersRacesList',
          component: KeykeepersRacesList
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

      beforeEnter: async (to, from, next) => {
        const auth = AuthServiceFactory.getInstance();

        if (!(await auth.isAuthorized()) || await auth.isKeykeeper()) {
          next('/');
          return;
        }

        next();
      },

      children: [
        {
          path: 'register',
          component: TouristsRegisterPage,
          name: 'TouristsRegisterPage',

          beforeEnter: async (to, from, next) => {
            if (await KTouristsServiceFactory.getInstance().isRegistered()) {
              next({name: 'TouristsHomePage'});
              return;
            }

            next();
          },
        },
        {
          path: '',
          component: TouristsHomePage,
          name: 'TouristsHomePage',

          beforeEnter: async (to, from, next) => {
            if (!(await KTouristsServiceFactory.getInstance().isRegistered())) {
              next({name: 'TouristsRegisterPage'});
              return;
            }

            next();
          },

          children: [
            {
              path: 'planets',
              component: KeykeepersPlanetsList,
              props: {
                readOnly: true
              }
            }
          ],
        },
      ],
    },

    {path: "*", component: PageNotFound}
  ]
})
