<template>
    <v-card>
      <nav>
          <v-btn @click="reload" class="mx-4 white--text" elevation="2" x-large rounded color="deep-purple darken-1">
          Home
        </v-btn>
        <router-link to="/Quotes" tag="v-btn">
          <v-btn class="mx-4 white--text" elevation="2" x-large rounded color="deep-purple darken-1">
          Created Quotes
        </v-btn>
        </router-link>
    </nav>
    <v-card-title>
      Suppliers
      </v-card-title>
      <v-card-text>
        <ul>
            <li v-for="(item, i) in $store.state.rawSuppliers" :key="i">
             Name: {{item.name}} 
             <v-dialog
                width="auto"
             > 
                <template v-slot:activator="{ on, attrs }"> 
                <v-btn 
                x-small 
                color="teal"
                v-bind="attrs"
                v-on="on"
                >
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                <span
                class="tooltip"
                v-bind="attrs"
                v-on="on"
                >&plus;</span>
              </template>
              <span>Expand</span>
                </v-tooltip>
                </v-btn>
                  </template>  
                  <v-card>
                    <v-card-title>Supplier Details</v-card-title>
                  <v-card-text>
                  Description: {{item.description}}
                  <br>
                  Supplier ID: {{ item.id }}
                  </v-card-text>
                </v-card>
             </v-dialog>
            </li> 
        </ul>
    </v-card-text>
  </v-card>
  </template>

  <script>

export default {
  methods: {
    reload () {
      this.$router.push({
      name: "home",
      });
      location.reload()
    }
  },

  mounted(){
      this.$store.dispatch('getSupplier')
    },
  }
  </script>

  <style scoped>

  </style>