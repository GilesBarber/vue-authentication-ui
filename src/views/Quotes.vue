<template>
        <v-card>
        <nav>
        <v-btn @click="reload" class="mx-4 white--text" elevation="2" x-large rounded color="deep-purple darken-1">
          Home
        </v-btn>
        <router-link to="/Suppliers" tag="v-btn">
          <v-btn class="mx-4 white--text" elevation="2" x-large rounded color="deep-purple darken-1">
            Suppliers
        </v-btn>
        </router-link>
    </nav>
    <v-card-title>
      Quotes
      </v-card-title>
      <v-card-text>
        <ul>
            <li v-for="(item, i) in $store.state.rawQuotes" :key="i">
                Title: {{ item.title }}
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
                    <v-card-title>Quote Details</v-card-title>
                  <v-card-text>
                    ID: {{ item.id }} <br>
                Amount: £{{item.amount}} <br>
                Created: {{ getDate(item.created)}} <br>
                Supplier ID: {{ item.supplier_id }} <br>
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

    methods:{
        getDate(date){
            let msec = Date.parse(date)
            const d = new Date(msec)
            return d
        },
        reload () {
            this.$router.push({
            name: "home",
            });
            location.reload()
        }
    },

    mounted(){
      this.$store.dispatch('getQuotes')
    },
  }
</script>

<style scoped>

</style>