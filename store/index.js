export const state = () => ({
  isAuthed: false,
  token: '',
  projects: []
})

export const mutations = {
  addUserToken(state, data){
    this.$api.setToken(data, 'Bearer')
    state.token = data
    state.isAuthed = true
  },
  clearStore(state){
    this.$api.setToken('');
    state.token = ''
    state.isAuthed = false
  },
  setProjects(state, data){
    state.projects = data
  },
  updateProject(state, data){
    state.projects = state.projects.map(item => {
      return {
        ...item,
        name: item.id === data.id ? data.name : item.name
      }
    })
  }
}

export const actions = {
  init({commit}){
    if(+localStorage.ban > +new Date && localStorage.token){
      commit('addUserToken', localStorage.token)
      localStorage.setItem('ban', +new Date + (3600 * 1000 * 24 * 30))
    } else{
      commit('clearStore')
      localStorage.clear()
    }
  },
  async logIn({commit}, data) {
    try{
      const result = await this.$api.post('auth/login', data).then((response) => {
        commit('addUserToken', response.data.token)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('ban', +new Date + (3600 * 1000 * 24 * 30))
        return response
      });
      return result
    } catch(e) {
      console.log(e)
    }
  },
  async logOut({commit}){
    try{
      const result = await this.$api.post('auth/logout').then(response => {
        commit('clearStore')
        localStorage.clear()
      })
    } catch(e){
      console.log(e)
    }
  },
  async handleGetProjects({commit}) {
    try{
      const { data } = await this.$api.get('projects-manage/index?filters[is_active]=1&sort=dta_create') 
      commit('setProjects', data.projects)
      } catch(e) {
      console.log(e)
    }
  },
  async handleUpdateProject({commit}, project) {
    try{
      const { data } = await this.$api.post(`projects-manage/update?id=${project.id}`, project)
      commit('updateProject', data.project)
    }catch(e){
      console.log(e)
    }
  }
}
export const getters = {
  isAuthed: (state) => {
    return state.isAuthed
  },
  projects: (state) => {
    return state.projects
  }
}
