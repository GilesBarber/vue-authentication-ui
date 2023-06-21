import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const usersUrl = "https://february-21.herokuapp.com/api/v1/users/"
const supplierURL = "https://february-21.herokuapp.com/api/v1/suppliers/"
const authToken = "https://february-21.herokuapp.com/api-token-auth/"
const quotesURL = "https://february-21.herokuapp.com/api/v1/quotes/"


export default new Vuex.Store({
  state: {
    rawSuppliers: [],
    rawQuotes: [],
    token: '',
    authorised: false
  },

  getters:{
    auth (state) {
      return state.authorised
    }
  },

  mutations: {
    updateSuppliers(state, payload){
      state.rawSuppliers = payload
    },
    updateQuotes(state, payload){
      state.rawQuotes = payload
    },
    setToken(state, value){
      state.token = value
    },
    setAuthorisation(state, value){
      state.authorised = value
    }
  },

  actions: {

    setAuthorised(value){
      this.commit('setAuthorisation', value)
    },

    async getSupplier(context){
      try{
        let response = await fetch(supplierURL, {
          method:  'get',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${this.state.token}`
          }
        })
        const data = await response.json()
        const supplierList = data.results
       context.commit('updateSuppliers', supplierList)
        return data
      } catch(err) {
        alert(err)
        console.log(err)
        return err
      }
    },

    async getQuotes(context){
      try{
        let response = await fetch(quotesURL, {
          method:  'get',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${this.state.token}`
          }
        })
        const data = await response.json()
        const quotesList = data.results
        context.commit('updateQuotes', quotesList)
        return data
      } catch(err) {
        console.log(err);
        return err
      }
    },

    async newUser(context, userData){
      try{
        let response = await fetch(usersUrl, {
          method:  'post',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Token d0932c14d763289c638c53e879749299a670fdc7'
          },
          body: JSON.stringify(userData)           
        })
        const data = await response.json()
        const userdeets = `
         User token: ${data.auth_token}
         User ID: ${data.id}
        `
        if(data.auth_token){alert(userdeets)}
        return data
      } catch(err) {
        console.log(err);
        return err
      }
      },

    async auth(context, userCreds){
      try{
        let response = await fetch(authToken, {
          method:  'post',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCreds) 
    })
    const data = await response.json()
    console.log(data.token);
    if(data.token){
    this.commit('setToken', data.token)
    this.commit('setAuthorisation', true)
    }

    if(userCreds && data.token && this.state.authorised){
      context.dispatch('getSupplier')
    }
    return data
  } catch(err) {
    console.log(err);
    alert(err)
    return err
  }
      },
   
    async setCurrentUser(state){
      const User = await fetch(authToken, { 
        method: 'post', 
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${this.state.token}`
        },
        body: JSON.stringify(userCreds) 
      })
      const u = await User.json()
      state.commit('setCurrentUser', u.user)
    },
  },
})
