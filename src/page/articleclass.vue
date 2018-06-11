<template lang="html">
  <div class="table-content">
    <el-form>
        <el-button type="primary" >新增分类</el-button>
        <el-button type="info">删除分类</el-button>
    </el-form>
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
            <el-button type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
     <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>       
    </div>
  </div>
</template>

<script>
export default {
    name:"articleclass",
    data() {
        return {
          tableData: [
                {
                    title:'123',
                    sort:'123',
                    createtime:'123',
                    watch:'123',
                    recommend:'123',
                    display:'13'
                }
            ],
        }
    },
    methods: {
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }

}
</script>

<style lang="css">
</style>