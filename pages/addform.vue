<template>
  <v-form class="col-xs-12 col-sm-10 col-md-8 px-4">
    <h1>Добавление анкетируемого пользователя</h1>
    <v-text-field
      :rules="[(v) => !!v || 'Поле нужно заполнить!']"
      v-model="email"
      placeholder="Электронная почта"
      required
      type="email"
    ></v-text-field>
    <v-text-field
      :rules="[(v) => !!v || 'Поле нужно заполнить!']"
      v-model="name"
      placeholder="Имя"
      required
    ></v-text-field>
    <v-text-field
      :rules="[(v) => !!v || 'Поле нужно заполнить!']"
      v-model="surname"
      placeholder="Фамилия"
      required
    ></v-text-field>
    <v-text-field
      :rules="[(v) => !!v || 'Поле нужно заполнить!']"
      v-model="years"
      placeholder="Возраст"
      required
      type="number"
    ></v-text-field>
    <v-text-field
      :rules="[(v) => !!v || 'Поле нужно заполнить!']"
      v-model="country"
      placeholder="Страна"
      required
    ></v-text-field>
    <v-btn type="submit" @click.prevent="onFormSubmit">Отправить</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    name: "",
    surname: "",
    years: "",
    email: "",
    country: "",
  }),
  methods: {
    ...mapActions("news", ["createForm", 'init']),
    async onFormSubmit() {
      if (
        !this.name ||
        !this.surname ||
        !this.years ||
        !this.email ||
        !this.country
      )
        return;

      try {
        await this.createForm({
          name: this.name,
          surname: this.surname,
          years: this.years,
          email: this.email,
          country: this.country,
        });
      } finally {
        this.name = "";
        this.surname = "";
        this.years = "";
        this.email = "";
        this.country = "";

        this.init()
      }
    },
  },
};
</script>

<style>
</style>