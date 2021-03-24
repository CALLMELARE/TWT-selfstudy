import { createStore } from 'vuex'

interface State {
  semesterName: string
  semesterStart: number
}

const store = createStore({
  state() {
    return {
      semesterName: '',
      semesterStart: 0
    }
  },
  mutations: {
    setSemName(state: State, name: string) {
      state.semesterName = name
    },
    setSemStart(state: State, start: number) {
      state.semesterStart = start
    }
  }
})

export default store
