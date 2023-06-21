<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
          { title: 'Suppliers', icon: 'mdi-view-dashboard', to: '/Suppliers' },
          { title: 'Quotes', icon: 'mdi-view-dashboard', to: '/Quotes' },
        ],
  }),
};
</script>

<style>
  nav{
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

ul{
  padding-left: 0;
  list-style: none;
  width: 500px;
  margin: auto;

}

li{
  padding: 0.5rem 1rem;
}

li:nth-of-type(even){
 background-color: lightgrey;
}

li .v-btn{
  float: right;
  font-size: large!important;
}
  .v-card__title{
    font-size: x-large!important;
    margin-left: 3rem;
    padding-top: 0;
  }
  .v-card__text {
    width: 100%;
    min-height: 700px;
  }

  .v-dialog {
    max-height: 300px!important;
    overflow: hidden!important;
  }
  .v-dialog .v-card__title{
  margin-left: 0!important;
  justify-content: center;
  }

.tooltip{
  padding: 0 10px;
}

</style>
