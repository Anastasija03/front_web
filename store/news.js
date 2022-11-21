import Vuex from 'vuex';

export const state = () => ({
  formsList: [],
})

export const getters = {}

export const mutations = {
  SET_FORMS_LIST(state, payload) {
    state.formsList = payload
  }
}

export const actions = {
  async init({commit}) {
    const data = await this.$axios.$get('api/getuserforms/')
    commit('SET_FORMS_LIST', data.results)
  },
  getUserForms() {
    return this.$axios.$get('/api/getuserforms/')
  },
  getUserFormsSearch(_, search) {
    return this.$axios.$get(`/api/getuserforms/?search=${search}`)
  },
  createForm(_, body) {
    return this.$axios.$post('/api/createform/', body)
  },
}
