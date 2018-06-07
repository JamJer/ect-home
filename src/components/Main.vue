<template>
  <div class="container jumbotron">
    <h1 align="center">{{ pagetitle }}</h1>
    <img src="../assets/bitcoinlogo.png">
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      pagetitle: 'Welcome to ECT Tarder'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
    max-width: 100%;
    max-height: auto;
}
</style>
