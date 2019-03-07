<template>
  <div>
    <b-list-group>
      <b-list-group-item v-b-popover.hover="'Здесь живут люди'" title="Описание планеты:"
                         v-b-toggle.collapse1>Земля
      </b-list-group-item>
      <b-collapse visible id="collapse1" class="mt-2">
        <b-card>
          <b-input-group prepend="Название" class="mt-1">
            <b-form-input value="Земля"/>
            <b-input-group-append>
              <b-button variant="outline-success">Изменить</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-input-group prepend="Описание" class="mt-1">
            <b-form-input value="Здесь живут люди"/>
            <b-input-group-append>
              <b-button variant="outline-success">Изменить</b-button>
            </b-input-group-append>
          </b-input-group>

          <div class="mt-3">
            <b-row align-h="between">
              <b-col>Люди</b-col>
              <b-col>
                <b-button-group size="lg">
                  <b-button variant="outline-secondary"></b-button>
                  <b-button variant="outline-danger"></b-button>
                  <b-button variant="outline-warning"></b-button>
                  <b-button variant="success"></b-button>
                </b-button-group>
              </b-col>
            </b-row>

            <b-row align-h="between">
              <b-col>Чужие</b-col>
              <b-col>
                <b-button-group size="lg">
                  <b-button variant="outline-secondary"></b-button>
                  <b-button variant="danger"></b-button>
                  <b-button variant="outline-warning"></b-button>
                  <b-button variant="outline-success"></b-button>
                </b-button-group>
              </b-col>
            </b-row>

            <b-row align-h="between">
              <b-col>Диодао</b-col>
              <b-col>
                <b-button-group size="lg">
                  <b-button variant="outline-secondary"></b-button>
                  <b-button variant="outline-danger"></b-button>
                  <b-button variant="warning"></b-button>
                  <b-button variant="outline-success"></b-button>
                </b-button-group>
              </b-col>
            </b-row>

            <b-row align-h="between">
              <b-col>Аранки</b-col>
              <b-col>
                <b-button-group size="lg">
                  <b-button variant="secondary"></b-button>
                  <b-button variant="outline-danger"></b-button>
                  <b-button variant="outline-warning"></b-button>
                  <b-button variant="outline-success"></b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </div>
        </b-card>

      </b-collapse>
    </b-list-group>
  </div>
</template>

<script>
  export default {
    name: 'KeykeepersPlanetsList'
  }
</script>

<style scoped>

</style>
