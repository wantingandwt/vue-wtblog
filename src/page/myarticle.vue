<template>
<div class="myarticle">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章名称">
            <el-input v-model="formInline.title" placeholder="文章名称"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
            <el-select v-model="formInline.sort" placeholder="所属分类">
                <el-option v-for="item in sorts" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否推荐">
            <el-select v-model="formInline.recommend" placeholder="是否推荐">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
            <el-select v-model="formInline.display" placeholder="是否显示">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-button type="primary" @click="myAdd('新增文章')">新增文章</el-button>
    </el-form>
    <template>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    stripe
    style="width: 100%">
        <el-table-column
        prop="title"
        label="文章名称"
        width="500px">
        </el-table-column>
        <el-table-column
        label="所属分类"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
            </template>
        </el-table-column>
         <el-table-column
            label="创建时间">
            <template slot-scope="scope">
                <span> {{$utils.goodTime(scope.row.createtime)}}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="watch"
        label="浏览量"
        width="100px">
        </el-table-column>
        <el-table-column
        label="是否推荐"
        width="100px">
            <template slot-scope="scope">
                <span> {{$utils.goodrecommend(scope.row.recommend)}}</span>
            </template>
        </el-table-column>
         <el-table-column
        label="是否显示"
        width="100px">
            <template slot-scope="scope">
                <span> {{$utils.goodrecommend(scope.row.display)}}</span>
            </template>
        </el-table-column>
         <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="myEye(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" @click="myEdit('编辑文章',scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="myDel(scope.row.id)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="article-add" v-if="isShow">
      <articleAdd :formeditc="formedit" :pkc="pk" :isAddc="isAdd" @child="xianshi"></articleAdd>
    </div>
    </template>
</div>
</template>
<script>
import articleAdd from './articleadd'
export default {
    name:'myarticle',
    components: {
        articleAdd
    },
    data() {
        return {
            formInline: {
                title: '',
                sort:''
            },
            form: {//新增文章默认值
                title: '',
                author:'',
                pk:'',
                cover:'',
                sort: '',
                recommend: 1,
                display:2,
                summary: '',
                content:'请在这里输入内容'
            },
            sorts:[],
            tableData: [],
            formedit:{},
            multipleSelection: [],
            isShow:false,
            isAdd:'',
      }
    },
    created () {
         this.getSort(),   
         this.getList()
    },
    methods: {
      onSubmit() {
        //搜索提交
        // this.$api.get('/get_articles?search_string='+this.formInline.title+'&sort_id='+this.formInline.sort, null, r => {
        //     if(r.data.datas=="None"){
        //         this.$message({
        //             message: '未搜索到内容',
        //             type: 'warning'
        //         });
        //     }else{
        //          this.tableData =r.data.datas;
        //     }
        // }) 
      },
      getSort(){
        //分类post请求
        this.$api.post('/get_article_sort','')
        .then(r => {
             this.sorts =r.data;
        })   
      },
      getList(){
        //列表get请求
        this.$api.get('/get_articles', '')
        .then(r => {
           // console.log(r.data);
            this.tableData =r.data;
        })   
      },
      //新增文章弹框
      myAdd:function(data){
            this.isAdd = data;
            this.pk = '';
            this.isShow = true;
            this.formedit = this.form
      },
       //编辑文章弹框
      myEdit:function(data,pk){
            this.formedit= this.tableData[pk-1];
            this.isAdd = data;
            this.pk = pk;
            this.isShow = true         
      },
       //删除单个文章
      myDel:function(pk){
       this.$api.post('/get_articles',{
           params:{
               id:pk
           }
       })
       .then(r => {
            this.tableData =r.data;
            this.$message({
                    message: '删除文章成功',
                    type: 'success'
            });                   
        })  
      },
      //查看文章
      myEye:function(pk){
           this.$router.push({ path: '/articleeye/'+pk });
      },
      //接收子组件传递的值
      xianshi:function(q){
          this.isShow = q
      }
    }
}
</script>

<style lang="css" scoped>

</style>