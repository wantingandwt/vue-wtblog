<template>
  <div class="system">
     <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="博客名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
             <el-form-item label="博客logo">
                    <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.cover" :src="form.cover" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
            <el-form-item label="博客简介">
                <UE @ready="editorReady" :ueditorConfig="editorConfig"></UE>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
            </el-form>
  </div>
</template>
<script>
import UE from 'vue-ueditor';
export default {
  name:"system",
   components: {
        UE
    },
  data(){
        return {
            editorConfig:{
                retainOnlyLabelPasted: true,
                initialFrameHeight:400,
                initialFrameWidth:800
            },          
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
        editorReady(editorInstance){
            editorInstance.setContent('请在这里填写文章内容');
            editorInstance.addListener('contentChange',()=>{
               this.form.content = editorInstance.getContent()//获取编辑器内容
            })            
        },
        onSubmit() {
           console.log('submit');
      },
      handleAvatarSuccess(res, file) {
        this.form.cover = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>
<style lang="css" scoped>
.system{
  width:400px;
}
</style>