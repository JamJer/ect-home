<template>
  <div class="container jumbotron">
  	<h4>Trader App Product activation</h4>
  	<div class="card text-white bg-dark mb-3" style="max-width: 100%;">
  		<div class="card-body">
    		<h5 class="card-title text-warning">Product Key Active</h5>
    		<h6 class="card-subtitle mb-2 text-success">Please enter your product key to active trader application.</h6>
    		<form class="form-inline">
			  <div class="form-group mx-sm-3 mb-2">
			    <input type="text" class="form-control" id="prodcut-key" placeholder="Press Product Key here" v-model="credentials.key_id">
			  </div>
			  <button @click.stop.prevent="submit" class="btn btn-warning mb-2">Active Product</button>
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
			</form>
        </div>
  	</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'key',
  data () {
    return {
      credentials: {
        key_id: '',
        privilege_mode: 'None'
      },
      loggingIn: false,
      error: ''
    }
  },
  computed:{
    postData: function(){
      return {'key_id': this.credentials.key_id, 'privilege_mode': this.credentials.privilege_mode};
    },
    ...mapActions({
      KeyActivate: 'KeyActivate',
    })
  },
  methods:{
    submit() {
      var vm = this;
      this.$store.dispatch('KeyActivate', this.postData).then(response => {
        setTimeout(function(){
          console.log(response.data.msg)
          if(response.data.msg == 'new'){
            alert("Your trader APP has been activated!");
          }else if(response.data.msg == 'update'){
            alert("UPDATE");
          }else{
            alert("UNKONW");
          }
        }, 500);
      }, error => {
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>