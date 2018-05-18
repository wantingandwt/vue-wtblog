<template lang="html">
<div class="home-container">
  <el-row class="container">
    <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                 <img src="../style/img/loginLogo.png" title="logo" alt="logo">
                 <span>{{collapsed?'':sysName}}</span>
            </el-col>
            <el-col :span="10">
        <div class="tools" @click.prevent="collapseFun">
          <i class="fa fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">欢迎登陆！{{sysUserName}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
    <el-col :span="24" class="main">
        <aside>
            <ul class="el-menu home-nav">
                <template v-for="(item,index) in $router.options.routes">
                    <li class="el-submenu" v-for="child in item.children">
                        <router-link :to="child.path" exact>
                            <i :class="child.iconCls"></i>
                            <span>{{child.name}}</span>
                        </router-link>
                    </li>
                </template>
            </ul>
        </aside>
     <section class="content-container">
       <div class="grid-content bg-purple-light">
         <el-col :span="24" class="breadcrumb-container">
           <strong class="title">{{$route.name}}</strong>
         </el-col>
         <el-col :span="24" class="content-wrapper">
           <transition name="fade">
             <router-view></router-view>
           </transition>
         </el-col>
       </div>
     </section>
   </el-col>
 </el-row>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            sysName: '',
            sysUserName: '',
            collapsed: false
        }
    },
    methods: {        
        //退出登录
        logoutFun: function() {
            var _this = this;
            this.$confirm('确认退出吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('user');
                _this.$router.push('/login');
            }).catch(() => {

            });


        },
    },
    mounted() {
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.sysUserName = user.username || '';
        }
    }
}
</script>

<style scoped lang="css">
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}
.container .header {
    height: 60px;
    line-height: 60px;
    background: #deeafc;
    color: #333;                                      
}
.container .header .tools {
    padding: 0 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}
.container .header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    
}
.container .header .logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
}
.container .header .logo-width {
    width: 260px;
}
.container .header .logo span{
    display:inline-block;
    vertical-align: top;
}
.container .header .logo-collapse-width {
    width: 60px;
}
.container .header .userinfo .userinfo-inner {
    cursor: pointer;
    color: #333;
}
.container .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;                             
}
.container .main .content-container {
    flex: 1;
    overflow-y: scroll;
    padding: 20px;     
}
.container .main .breadcrumb-container .title{
    width: 200px;
    float: left;
    color: #475669;
   
}
.container .main .content-container   .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
}
.container .main aside {
    flex: 0 0 260px;
    width: 260px;        
}
.container .main aside .el-menu {
    height: 100%;
}
.home-nav li{
    height:50px;
    line-height: 50px;
    font-size:18px;
    padding-left:30px;
    border-bottom: 1px solid #e7e7e7;
}
.home-nav li i{
    font-size:20px;
}
.home-nav li:hover span,.home-nav li:hover i{
    color:#377ef1;
}
.content-container strong{
    font-size:18px;
}
</style>