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
        <el-select v-model="formInline.display" placeholder="是否推荐">
        <el-option label="是" value="true"></el-option>
        <el-option label="否" value="false"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-button type="primary" @click="myAdd()">新增文章</el-button>
    <el-button type="info">删除文章</el-button>
    </el-form>
    <template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="title"
        label="文章名称">
        </el-table-column>
        <el-table-column
        prop="sort"
        label="所属分类"
        show-overflow-tooltip>
        </el-table-column>
        <el-table-column
        prop="createtime"
        label="创建时间">
        </el-table-column>
        <el-table-column
        prop="watch"
        label="浏览量">
        </el-table-column>
        <el-table-column
        prop="recommend"
        label="是否推荐">
        </el-table-column>
         <el-table-column
        prop="display"
        label="是否显示">
        </el-table-column>
         <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="article-add" v-show="isShow">
      <articleAdd :isdisplay="isShow" @child="xianshi"></articleAdd>
    </div>
    <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>       
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
            tableData: [
                {
                    title:'0',
                    sort:'0',
                    createtime:'0',
                    watch:'0',
                    recommend:'0',
                    display:'0'
                }
            ],
            multipleSelection: [],
            isShow:false
      }
    },
    created () {
         this.getSort();       
    },
    methods: {
        onSubmit() {
        console.log('submit!');
      },
      //取消选择
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //选择的数量
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getSort(){
        this.$api.post('/get_article_sort', null, r => {
             this.sorts =r.data.datas;
        })   
      },
      myAdd:function(){
            this.isShow = true
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