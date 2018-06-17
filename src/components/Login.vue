<template>
  <div class="container jumbotron">
    <form data-toggle="validator" role="form">
      <spinner v-show="loggingIn" message="Logging in..."></spinner>
      <div class="panel-heading">
        <div class="panel-title text-center">
            <h1 class="title"><i class="fa fa-bitcoin"></i>&nbsp;ECT Trader Login</h1>
            <hr />
        </div>
      </div>
      <br>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <h5><label for="login.username"><i class="fa fa-user fa"></i>&nbsp;User name</label></h5>
        <input 
          type="text"
          data-id="login.username" 
          class="form-control js-login__username"
          placeholder="Enter your username"
          v-model="credentials.username"
          @click="checkFirstClickUN()"
        >
      </div>
      <div class="alert alert-danger" v-if="username_err_msg">
        <p>{{ username_err_msg }}</p>
      </div>
      <div class="form-group">
        <h5><label><i class="fa fa-lock fa-lg"></i>&nbsp;Password</label></h5>
        <input
          type="password"
          class="form-control js-login__password"
          placeholder="Enter your password"
          v-model="credentials.password"
          @click="checkFirstClickPW()"
        >
      </div>
      <div class="alert alert-danger" v-if="password_err_msg">
        <p>{{ password_err_msg }}</p>
      </div>
       <div class="form-check">
        <input type="checkbox" class="form-check-input" id="remenberme">
        <label class="form-check-label" for="remenberme">Remenber me</label>
      </div>
      <button 
        data-id="login.submit"
        class="btn btn-default solid blank js-login__submit" 
        @click.stop.prevent="submit()"
        :disabled=isDisabled
      >
         &nbsp; Login &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
      </button>
      <br><br><br>
      <a href="#">Forgot your password?</a><br>
      Don’t have an account? &nbsp;<a href="#">Sign up here.</a>
    </form>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner';
import 'font-awesome/css/font-awesome.css';
import { mapActions } from 'vuex'

export default {
  name: 'login',
  components: { Spinner },
  data () {
    return {
      credentials: {
        username: '',
        passwd: ''
      },
      isUsernameClicked: false,
      isPasswordClicked: false,
      isSubmitAble: false,
      loggingIn: false,
      error: '',
      apiurl: '//127.0.0.1:3001/user/login',
      resLog: {}
    }
  },
  computed: {
    username_err_msg: function(){
      if(this._valid(this.credentials.username)){
        return "Username cannot begin with a digit!";
      }else if((this.credentials.username == '') && (this.isUsernameClicked)){
        return "User name cannot be empty!";
      }else{
        return '';
      }
    },
    password_err_msg: function(){
      if((this.credentials.password == '') && (this.isPasswordClicked)){
        return "Password cannot be empty!";
      }else{
        return '';
      }
    },
    isDisabled(){
      if((this.credentials.username != '') && (this.credentials.password != '') && (this.username_err_msg == '')){
        return false;
      }else{
        return true;
      }
    },
    postData: function(){
      return {'username': this.credentials.username,'passwd': this.credentials.password};
    },
    ...mapActions({
      UserLogin: 'UserLogin',
    })
  },
  methods: {
    submit() {
      var vm = this;
      vm.loggingIn = true;
      this.$store.dispatch('UserLogin', this.postData).then(response => {
        setTimeout(function(){
          let res = response;
          if(res.msg == 'not found'){
            vm.loggingIn = false;
            vm.error = "Your user name dosen't exist!";
          }else if(res.msg == 'success'){
            vm.loggingIn = false;
            vm.$router.replace('./Trading');
          }else{
            vm.loggingIn = false;
            vm.error = "Your password is incorrect!";
          }
          }, 500);
      }, error => {
        console.log(error);
      })
    },
    _valid: function(name) {
      return /^[0-9]/.test(name);
    },
    checkFirstClickUN(){
      this.error = '';
      this.isUsernameClicked = true;
    },
    checkFirstClickPW(){
      this.error = '';
      this.isPasswordClicked = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
.ev-login {
  margin-top: 100px;
}
</style>