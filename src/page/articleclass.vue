<template lang="html">
  <div class="table-content">
    <el-form>
        <el-button type="primary" >新增分类</el-button>
    </el-form>
     <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        stripe
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="title"
        label="分类名称">
        </el-table-column>
        <el-table-column
        prop="createtime"
        label="创建时间">
        </el-table-column>
         <el-table-column
        prop="display"
        label="是否显示">
        </el-table-column>
         <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name:"articleclass",
    data() {
        return {
          tableData: [],
        }
    },
    created () { 
         this.getList()
    },
    methods: {
        getList(){
            //列表get请求
            this.$api.get('/get_article_sort', null, r => {
                this.tableData =r.data.datas;
            })  
        },
    }

}
</script>

<style lang="css">
</style>