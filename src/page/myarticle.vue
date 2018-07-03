<template>
<div class="myarticle">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="文章名称">
        <el-input v-model="formInline.title" placeholder="文章名称"></el-input>
    </el-form-item>
    <el-form-item label="所属分类">
        <el-select v-model="formInline.sort" placeholder="所属分类">
            <el-option v-for="item in sorts" :key="item.pk" :label="item.fields.name" :value="item.pk"></el-option>
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
        prop="fields.title"
        label="文章名称">
        </el-table-column>
        <el-table-column
        label="所属分类"
        show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{sorts[scope.row.fields.sort-1].fields.name}}</span>
            </template>
        </el-table-column>
         <el-table-column
            label="创建时间">
            <template slot-scope="scope">
                <span> {{$utils.goodTime(scope.row.fields.createtime)}}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="fields.watch"
        label="浏览量">
        </el-table-column>
        <el-table-column
        label="是否推荐">
            <template slot-scope="scope">
                <span> {{$utils.goodrecommend(scope.row.fields.recommend)}}</span>
            </template>
        </el-table-column>
         <el-table-column
        label="是否显示">
            <template slot-scope="scope">
                <span> {{$utils.goodrecommend(scope.row.fields.display)}}</span>
            </template>
        </el-table-column>
         <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="myEye(scope.row.pk)">查看</el-button>
            <el-button type="text" size="small" @click="myEdit('编辑文章',scope.row.pk)">编辑</el-button>
            <el-button type="text" size="small" @click="myDel(scope.row.pk)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
   
    <div class="article-add" v-show="isShow">
      <articleAdd  :isAddc="isAdd" :isPkc="isPk" @child="xianshi"></articleAdd>
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
                recommend:'',
                display:'',
                sort:''
            },
            sorts:[],
            tableData: [],
            multipleSelection: [],
            isShow:false,
            isAdd:'',
            isPk:''
      }
    },
    created () {
         this.getSort(),   
         this.getList()
    },
    methods: {
      onSubmit() {
        //搜索提交
        this.$api.get('/get_articles?search_string='+this.formInline.title+'&sort_id='+this.formInline.sort, null, r => {
            if(r.data.datas=="None"){
                this.$message({
                    message: '未搜索到内容',
                    type: 'warning'
                });
            }else{
                 this.tableData =r.data.datas;
            }
        }) 
      },
      getSort(){
        //分类post请求
        this.$api.post('/get_article_sort', null, r => {
             this.sorts =r.data.datas;
        })   
      },
      getList(){
        //列表get请求
        this.$api.get('/get_articles', null, r => {
            this.tableData =r.data.datas;
        })  
      },
      //新增文章弹框
      myAdd:function(data){
            this.isAdd = data;
            this.isShow = true
      },
       //编辑文章弹框
      myEdit:function(data,pk){
            this.isAdd = data;
            this.isAdd = data;
            this.isShow = true
      },
       //删除单个文章
      myDel:function(pk){
       this.$api.get('/del_article?aid='+pk, null, r => {
            if (r.data.status == "true"){
                this.$message({
                        message: '删除文章成功',
                        type: 'success'
                });                   
            }
             setTimeout(function(){
                location.reload()                    
            },500)  
        })  
      },
      //查看文章
      myEye:function(pk){
         
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