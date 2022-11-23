<template>
  <v-row class="d-flex flex-column pt-6" align="center">
    <!-- Поиск -->
    <v-row
      class="col-xs-12 col-sm-10 col-md-8 px-4 d-flex justify-space-between"
    >
      <input
        type="text"
        placeholder="Поиск"
        v-model="search"
        style="border: 1px solid gray"
        class="col-9 search-bar"
      />
      <v-btn
        @click="onSearchInput()"
        height="50px"
        class="col-2 search-bar__button"
        >поиск</v-btn
      >
    </v-row>

    <!-- Фильтры, Сортировка -->
    <v-form
      class="
        col-xs-12 col-sm-10 col-md-8
        px-4
        mt-10
        d-flex
        justify-space-between
        align-center
      "
    >
      <v-btn type="submit" @click.prevent="onFiltersSubmit" class="col-3"
        >Фильтровать</v-btn
      >
      <v-text-field
        :rules="[(v) => !!v || 'Поле нужно заполнить!']"
        class="col-3"
        v-model="filtersName"
        placeholder="Имя"
        required
      ></v-text-field>
      <v-text-field
        :rules="[(v) => !!v || 'Поле нужно заполнить!']"
        class="col-3"
        v-model="filtersEmail"
        placeholder="Электронная почта"
        required
      ></v-text-field>

      <!-- Сортировка -->
      <v-select
        @input="onSortBy($event)"
        :items="['Возраст по убыванию','Возраст по возрастанию']"
        label="Сортировка"
      >
      </v-select>
    </v-form>

    <!-- Список -->
    <v-list class="d-flex flex-column col-xs-12 col-sm-10 col-md-8 px-4">
      <FormItem v-for="(form, i) in formsList" :key="i" :formData="form" />
    </v-list>

    <!-- Пагинация -->
    <v-row
      class="
        py-12
        col-xs-12 col-sm-10 col-md-8
        d-flex
        justify-space-between
        align-center
      "
    >
      <v-btn v-if="previous" @click="onLinkQuery(previous)"
        >Предыдущая страница</v-btn
      >
      <v-btn v-if="next" @click="onLinkQuery(next)">Следующая страница</v-btn>
    </v-row>
  </v-row>
</template>

<script>
import FormItem from "../components/FormItem.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "newspage",
  components: { FormItem },
  data: () => ({
    search: "",
    next: null,
    previous: null,
    filtersName: "",
    filtersEmail: "",
  }),
  computed: {
    ...mapState("news", ["formsList"]),
  },
  mounted() {
    this.onSearchInput();
  },
  methods: {
    ...mapMutations("news", ["SET_FORMS_LIST"]),
    ...mapActions("news", ["getUserFormsSearch"]),
    onSortBy(e) {
      switch (e) {
        case "Возраст по убыванию":
          this.SET_FORMS_LIST([...this.formsList].sort((a, b) => +b.years - +a.years));
          break
        case "Возраст по возрастанию":
          this.SET_FORMS_LIST([...this.formsList].sort((a, b) => +a.years - +b.years));
          break
      }
    },
    async onSearchInput() {
      const data = await this.getUserFormsSearch(this.search);

      this.next = data.next;
      this.previous = data.previous;

      this.SET_FORMS_LIST(data.results);
    },
    async onLinkQuery(link) {
      const data = await this.$axios.$get(link);

      this.next = data.next;
      this.previous = data.previous;

      this.SET_FORMS_LIST(data.results);
    },
    async onFiltersSubmit() {
      const data = await this.$axios.$get(
        `/api/getuserformsparams?name=${this.filtersName}&email=${this.filtersEmail}`
      );

      this.next = data.next;
      this.previous = data.previous;

      this.SET_FORMS_LIST(data.results);
    },
  },
};
</script>

<style lang="scss" scoped>
.on-hover {
  cursor: pointer;
  transform: scale(1.003);
  transition: 200ms;
}

.link {
  text-decoration: none;
}
</style>