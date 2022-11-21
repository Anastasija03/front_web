<template>
  <v-row class="d-flex flex-column pt-6" align="center">
    <input
      type="text"
      placeholder="поиск"
      v-model="search"
      style="border: 1px solid gray"
      class="col-xs-12 col-sm-10 col-md-8 px-4"
    />
    <v-btn @click="onSearchInput()">поиск</v-btn>
    <v-list class="d-flex flex-column col-xs-12 col-sm-10 col-md-8 px-4">
      <FormItem v-for="(form, i) in formsList" :key="i" :formData="form" />
    </v-list>
    <v-btn v-if="next" @click="onLinkQuery(next)">next</v-btn>
    <v-btn v-if="previous" @click="onLinkQuery(previous)">previous</v-btn>
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
  }),
  computed: {
    ...mapState("news", ["formsList"]),
  },
  mounted() {
    this.onSearchInput()
  },
  methods: {
    ...mapMutations("news", ["SET_FORMS_LIST"]),
    ...mapActions("news", ["getUserFormsSearch"]),
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
  },
};
</script>

<style lang="scss">
.on-hover {
  cursor: pointer;
  transform: scale(1.003);
  transition: 200ms;
}

.link {
  text-decoration: none;
}
</style>