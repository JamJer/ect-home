<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="navbar_top">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link :to="'/'" class="navbar-brand"><font size="4" color="#ff6600"><i class="fa fa-copyright"></i>ECT</font><font size="4" color="#66d9ff">Trader</font></router-link>
              <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent">
                <span class="navbar-toggler-icon"></span>
              </button>
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="'/'" class="nav-link"><font size="4" color="#66d9ff">HOME</font></router-link>
              </li>
              <li class="nav-item">
                <router-link :to="'/'" class="nav-link"><font size="4" color="#ffffff">CONTACT</font></router-link>
              </li>
              <li class="nav-item">
                <router-link :to="'/'" class="nav-link"><font size="4" color="#ffffff">TALK</font></router-link>
              </li>
            </ul>
        </div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="'/Login'" v-show="!isLoggedIn" class="nav-link"><font size="4" color="#00ccff">LOG IN</font></router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/Register'" v-show="!isLoggedIn" class="nav-link"><font size="4" color="#66ffcc">SIGN UP</font></router-link>
          </li>
          <li class="nav-item">
            <a @click="logOut()" v-show="isLoggedIn" class="nav-link"><font size="4" color="#ccccff">LOG OUT</font></a>
          </li>
          <li class="nav-item">
              <div class="dropdown">
                <button class="dropbtn">Language 
                  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                  <a href="#">Link 1</a>
                  <a href="#">Link 2</a>
                  <a href="#">Link 3</a>
                </div>
              </div> 
          </li>
        </ul>
      </div>
    </nav>
    <div class="container col-md-8 col-md-offset-2">
      <br><br><br><br><br><br><br>
      <!-- router view goes here -->
      <router-view/>
      <!-- router view goes here -->
    </div>
    <div class="navbar fixed-bottom navbar-expand-md bg-dark navbar-dark text-nowrap">
      <span class="hide-phone footer-link">
        <a class="navbar-brand mx-auto px-5" href="./Main"><font size="4" color="#ff6600">ECT</font><font size="4" color="#66d9ff">Trader</font></a>
      </span>
      <span class="navbar-text"><font size="4" color="#b3d9ff"><i class="fa fa-copyright"></i>2018 ALL Right Reserved. Copyright by ECT Trader</font></span>
    </div>
  </div>
</template>

<script>
import store from './store/index'
import { USER_SIGNIN,USER_SIGNOUT,USER_REG } from './store/types'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      sys_ver: '0.0.0.1'
    }
  },
  computed:{
    isLoggedIn: function(){
      return Boolean(store.state.login.token)
    },
    ...mapActions({
      UserLogout: 'UserLogout',
    })
  },
  methods:{
    logOut(){
      if(this.isLoggedIn){
        this.$store.dispatch('UserLogout');
      }else{
        this.$router.replace('./');
      }
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
/*@import "~font-awesome/scss/font-awesome";*/
.navbar {
    overflow: hidden;
    background-color: #333;
    font-family: Arial, Helvetica, sans-serif;
}

.navbar a {
    float: left;
    font-size: 16px;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.dropdown {
    float: left;
    overflow: hidden;
}

.dropdown .dropbtn {
    font-size: 16px;    
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin: 0;
}

.navbar a:hover, .dropdown:hover .dropbtn {
    background-color: red;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
