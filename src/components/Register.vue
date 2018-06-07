<template>
  <div class="container jumbotron">
    <form role="form">
      <spinner v-show="registering" message="Registering..."></spinner>
      <div class="panel-heading">
        <div class="panel-title text-center">
            <h1 class="title"><i class="fa fa-bitcoin"></i>&nbsp;ECT Trader Register</h1>
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
      <div class="form-group">
        <h5><label><i class="fa fa-lock fa-lg"></i>&nbsp;Confirm Password</label></h5>
        <input
          type="password"
          class="form-control js-login__password"
          placeholder="Enter your password again"
          v-model="cfpassword" 
          @click="checkFirstClickCFPW()"
        >
      </div>
      <div class="alert alert-danger" v-if="cf_password_err_msg">
        <p>{{ cf_password_err_msg }}</p>
      </div>
      <button 
        data-id="login.submit"
        class="btn btn-default solid blank js-login__submit" 
        @click.stop.prevent="submit()"
        :disabled=isDisabled
      >
         &nbsp; Register &nbsp; <i class="fa fa-arrow-circle-o-right"></i>
      </button>
      <br><br><br>
      Already have an account?<router-link :to="'./Login'" class="nav-link">LOGIN here</router-link>
    </form>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner';
import 'font-awesome/css/font-awesome.css';
import { mapActions } from 'vuex';
var english = /^[A-Za-z0-9]*$/;

export default {
  name: 'register',
  components: { Spinner },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      cfpassword: '',
      isUsernameClicked: false,
      isPasswordClicked: false,
      isCFPasswordClicked: false,
      isSubmitAble: false,
      registering: false,
      error: '',
      apiurl: '//127.0.0.1:3001/user/register',
      resLog: {}
    }
  },
  computed: {
    username_err_msg: function(){
      if(this._valid(this.credentials.username)){
        return "Username cannot begin with a digit!";
      }else if((this.credentials.username == '') && (this.isUsernameClicked)){
        return "User name cannot be empty!";
      }else if((this.credentials.username.length < 6) && (this.isUsernameClicked)){
        return "User name length require at least six.";
      }else if((this.credentials.username.length >= 12) && (this.isUsernameClicked)){
        return "User name length require at most twenty.";
      }else if(!english.test(this.credentials.username)){
        return "User name require english and digit only.";
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
    cf_password_err_msg: function(){
      if((this.cfpassword == '') && (this.isCFPasswordClicked)){
        return "Comfirm password cannot be empty!";
      }else if(this.cfpassword != this.credentials.password){
        return 'Your comfirmed password is not the same as your password';
      }else{
        return '';
      }
    },
    isDisabled(){
      if((this.credentials.username != '') && (this.credentials.password != '') && (this.username_err_msg == '') && (this.cfpassword != '') && (this.cf_password_err_msg == '')){
        return false;
      }else{
        return true;
      }
    },
    postData: function(){
      return {'username': this.credentials.username,'passwd': this.credentials.password};
    },
    ...mapActions({
      UserReg: 'UserReg',
    })
  },
  methods: {
    submit() {
      var vm = this;
      vm.registering = true;
      this.$store.dispatch('UserReg', this.postData).then(response => {
        setTimeout(function(){
          if(response.data.msg == 'success'){
            vm.registering = false;
            vm.$router.replace('./Trading');
          }else{
            vm.registering = false;
            vm.error = "Your user name has been taken!";
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
    },
    checkFirstClickCFPW(){
      this.error = '';
      this.isCFPasswordClicked = true;
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