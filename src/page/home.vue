<template lang="html">
<div class="home-container">
  <el-row class="container">   
    <myHeader></myHeader>
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
import myHeader from '../components/header'
export default {
    name:'home',
    components: {
        myHeader
    },
    data() {
        return {
           
        }
    },
    
}
</script>

<style  lang="css" scope>
.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
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
.breadcrumb-container{
    border-bottom:1px solid #e7e7e7;
    margin-bottom: 30px;
}
.grid-content .title{
    margin-bottom: 20px;
}
</style>