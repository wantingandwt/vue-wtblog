<template>
<div class="container">
    <myHeader></myHeader>
    <div class="details">
        <div class="details-left">
            <h1 class="details-title">{{ details.title }}</h1>
            <p class="details-p"><span>发布人：{{ details.author }}</span><span>创建时间：{{$utils.goodTime(details.createtime)}}</span><span>浏览量：{{ details.watch }}</span></p>
            <article class="details-summary"><strong>摘要：</strong>{{ details.summary }}</article>
            <article class="details-content" v-html="details.content"></article>
        </div>
        <div class="details-right">
            <ul>
                <h3>推荐文章</h3>
                <li>
                    <router-link :to="'/articleeye/'+id">
                        <img :src="details.cover">
                        <p>{{ details.title }}</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/articleeye/'+id">
                        <img :src="details.cover">
                        <p>{{ details.title }}</p>
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/articleeye/'+id">
                        <img :src="details.cover">
                        <p>{{ details.title }}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import myHeader from '../components/header'
export default {
data () {
    return {
        id: this.$route.params.id,
        details:[]
   }
},
components: {
    myHeader
},
created () {
    this.getData()
},
methods: {
    getData () {
        this.$api.get('/get_articles?aid=' + this.id, null, r => {
            this.details = r.data.datas[0].fields;
        })
    }
}
}
</script>
<style scope lang="css">
.details{
    width:80%;
    font-size:0;
    margin:20px auto;
    overflow-y: auto;
}
.details-left, .details-right{
    box-sizing: border-box;
    vertical-align: top;
    font-size:14px;
    display:inline-block;
    background: #f5f9fe;
}
.details-left{    
    min-height:400px; 
    width:80%;
    padding:20px;
    border-right:20px solid #fff;
}
.details-right{
    width:20%;
    padding:20px 0;
}
.details-right ul{
    padding:0;
    margin:0 5px;
}
.details-right ul li{
    width:46%;
    display:inline-block;
    margin:10px 1%;
    list-style: none;
    border:1px solid #e7e7e7;
}
.details-right ul li img{
    width:100%;
}
.details-right ul li p{
    text-align: center;
    margin:5px 0;
    color:#333;
}
.details-right ul li:hover p{
    color:#377ef1;
}
.details-right ul h3{
    margin:0 0 10px;
}
.details-title{
    font-size:30px;
    line-height: 80px;
    text-align: center;
    border-bottom:1px solid #e7e7e7;
}
.details-p{
    text-align: center;
}
.details-p span{
    margin:0 10px;
    color:#666;
}
.details-summary{
    padding:20px;
    background: #e9f1fc
}
.details-content{
    margin-top:30px;
}
 </style>