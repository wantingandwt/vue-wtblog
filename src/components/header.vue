<template>
  <div class="header-top">
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
                        <el-dropdown-item divided @click.native="myinfo">个人信息</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
  </div>
</template>
<script> 
export default {
    name:'myheader',
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
        myinfo:function(){
           this.$router.push('/info');
        }
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
<style scope>
.header-top{
   height: 60px;
   width:100%;
}
.header {
    height: 60px;
    line-height: 60px;
    background: #deeafc;
    color: #333;                                      
}
.header .tools {
    padding: 0 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
}
.header .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    
}
.header .logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238,241,146,0.3);
    border-right-width: 1px;
    border-right-style: solid;
}
.header .logo-width {
    width: 260px;
}
.header .logo span{
    display:inline-block;
    vertical-align: top;
}
.header .logo-collapse-width {
    width: 60px;
}
.header .userinfo .userinfo-inner {
    cursor: pointer;
    color: #333;
}
</style>
