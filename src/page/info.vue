<template>
  <div class="system">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>
<script>
export default {
  name:"info",
  data(){
        return {     
            isShow:'',
            sorts:[],
            form: {
                title: '',
                author:'',
                cover:'',
                sort: '',
                recommend: false,
                display:true,
                summary: '',
                content:''
            }
      }
  },
   methods: {
        onSubmit() {
           console.log('submit');
      },
    }
}
</script>
<style lang="css" scoped>
.system{
  width:400px;
}
</style>