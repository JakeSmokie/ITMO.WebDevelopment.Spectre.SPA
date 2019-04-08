<template>
  <div class="container main homePageMain pt-5">
    <p style="font-size: 50px;">
      🔑
    </p>

    <b-align-right>
      <b-button
        class="mt-4"
        size="sm"
        variant="outline-danger"
        :href="`http://jakesmokie.ru:8080/am/XUI/?goto=${currentUrl}#passwordReset/`"
      >
        Забыл пароль
      </b-button>
    </b-align-right>

    <div class="mb-4">
      <b-form @submit="onSubmit">
        <text-input
          name="username"
          :validator="x => isFieldCorrect(x, 1)"
          :text.sync="login"
          no-action
          class="mt-2"
          placeholder="Логин"
          @submit="authenticate"
        />

        <text-input
          :validator="x => isFieldCorrect(x, 8)"
          :text.sync="pass"
          no-action
          class="mt-2"
          placeholder="Пароль"
          type="password"
          @submit="authenticate"
        />
      </b-form>
    </div>

    <b-button-group>
      <b-button
        size="sm"
        variant="outline-success"
        @click="authenticate()"
      >
        Войти
      </b-button>
      <b-button
        size="sm"
        variant="outline-primary"
        :href="`http://jakesmokie.ru:8080/am/XUI/?goto=${currentUrl}#register/`"
      >
        Зарегистрироваться
      </b-button>
    </b-button-group>

    <b-alert v-model="showAlert" variant="danger" class="mt-4">
      Неверная пара логин/пароль
    </b-alert>
  </div>
</template>

<script>
  import TextInput from "./misc/input/TextInput";
  import BButtonGroup from "bootstrap-vue/src/components/button-group/button-group";
  import BAlignRight from "./misc/alignment/BAlignRight";
  import {AuthServiceFactory} from "../services/auth/AuthService";
  import BForm from "bootstrap-vue/src/components/form/form";

  export default {
    name: 'EntryPage',
    components: {BForm, BAlignRight, BButtonGroup, TextInput},

    data() {
      return {
        login: undefined,
        pass: "",
        currentUrl: window.location.href,
        showAlert: false,
      }
    },

    methods: {
      async authenticate() {
        if (!this.isFieldCorrect(this.login, 1)) {
          return;
        }

        if (!this.isFieldCorrect(this.pass, 8)) {
          return;
        }

        const auth = AuthServiceFactory.getInstance();
        const result = await auth.login(this.login, this.pass);

        if (result === false) {
          this.showAlert = true;
          return;
        }

        this.$router.push({
          name: await auth.isKeykeeper() ? 'KeykeepersManual' : 'TouristsEntryPage'
        });
      },

      isFieldCorrect(s, minLength) {
        if (s === undefined) {
          return false;
        }

        return s.trim().length >= minLength;
      },

      onSubmit(e) {
        e.preventDefault();
        this.authenticate();
      },
    }
  }
</script>

<style scoped>
  .homePageMain {
    max-width: 300px;
    text-align: center;
  }
</style>
