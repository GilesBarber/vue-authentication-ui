<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="username"
        :counter="150"
        :rules="nameRules"
        label="Username"
        required
      ></v-text-field>
  
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>

      <v-text-field
        v-if="creatingAccount"
        v-model="first_name"
        :counter="150"
        :rules="firstnameRules"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-if="creatingAccount"
        v-model="last_name"
        :counter="150"
        :rules="lastnameRules"
        label="Last name"
        required
      ></v-text-field>

      <v-text-field
        v-if="creatingAccount"
        v-model="email"
        :counter="254"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>
  
      <v-btn
        color="error"
        class="mr-4 mb-2"
        @click="reset"
      >
        Reset Form
      </v-btn>
  
      <v-btn
        color="warning"
        class="mr-4 mb-2"
        @click="resetValidation"
      >
        Reset Validation
      </v-btn>

      <v-btn
        color="success"
        class="mr-4 mb-2"
        @click="login"
      >
        Login
      </v-btn>

      <v-btn
        color="success"
        class="mr-4 mb-2"
        @click="signUp"
      >
        Sign Up
      </v-btn>

      <v-btn
        v-if="creatingAccount"
        color="success"
        class="mb-2"
        @click="createAccount"
      >
        Create account
      </v-btn>
    </v-form>

  </template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'

export default {
  data: () => ({
    valid: true,
    username: '',

    creatingAccount: false,
    nameRules: [
      v => !!v || 'Username is required',
      v => (v && v.length <= 150 && v.length >= 1) || 'Username must be less than 150 characters',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length <= 128 && v.length >= 1) || 'Password not valid',
    ],
    first_name: '',
    firstnameRules: [
      v => !!v || 'First name is required',
      v => (v && v.length <= 128 && v.length >= 1) || 'First name must be less than 150 characters',
    ],
    last_name: '',
    lastnameRules: [
      v => !!v || 'Last name is required',
      v => (v && v.length <= 128 && v.length >= 1) || 'Last name must be less than 150 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => (v && v.length <= 254 && v.length >= 1) || 'Email not valid',
    ],

  }),

  methods: {
    ...mapMutations(['setAuthorisation']),
    ...mapActions(["getSupplier"]),
 
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    login(){
      this.creatingAccount = false
      this.validate()
      const userCreds = {
    "username": this.username,
    "password": this.password
    }      
      this.$store.dispatch('auth', userCreds)
      setTimeout(() => {
        this.viewSuppliers()
      }, 150);
    },
    signUp(){
      this.reset ()
      this.creatingAccount = true
    },

    createAccount(){
      this.validate()
      const userData = {
      "username": this.username,
      "password": this.password,
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email
    } 
    this.$store.dispatch('newUser', userData)
    },

    viewSuppliers(){
      if(this.$store.getters.auth){
          this.$router.push({
          name: "Suppliers",
      });
      this.reset()
    }
    },

    ViewCreatedQuotes(){
      this.$router.push({
          name: "Quotes",
      });
    }
  },
}
</script>

<style scoped>
  .v-form{
    width: 50%;
    display: block;
    margin: auto;
    margin-top: 2rem;
    border: 1px solid lightgray;
    border-radius: 12px;
    padding: 2rem;
  }

</style>