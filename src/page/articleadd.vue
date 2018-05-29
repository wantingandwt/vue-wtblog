<template>
<div class="myarticleadd">
    <div class="addtk">
        <div class="tk-title">
            <h3>添加文章</h3>
            <div class="tkclose">
               <i class="el-icon-circle-close-outline" @click="close"></i>
            </div>
        </div>
        <div class="addbody">
           <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
               <el-select v-model="form.sort" placeholder="所属分类">
                    <el-option v-for="item in sorts" :key="item.pk" :label="item.fields.name" :value="item.pk"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="文章作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐">
                <el-switch v-model="form.recommend"></el-switch>
            </el-form-item>
             <el-form-item label="是否显示">
                <el-switch v-model="form.display"></el-switch>
            </el-form-item>
             <el-form-item label="文章封面">
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
            <el-form-item label="文章摘要">
                <el-input type="textarea" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item label="文章内容">
                <UE @ready="editorReady" :ueditorConfig="editorConfig"></UE>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="tkbg"  @click="close"></div>
</div>
</template>
<script>
import UE from 'vue-ueditor';
export default {
    name:'articleadd',
    components: {
        UE
    },
    props:{
        isdisplay:''
    },
    data() {
        return {
            editorConfig:{
                retainOnlyLabelPasted: true,
                initialFrameHeight:400
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
    created () {
         this.getSort();       
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
      close:function(){
          this.isShow = false,
          this.$emit('child',this.isShow);
      },
      getSort(){
        this.$api.post('/get_article_sort', null, r => {
             this.sorts =r.data.datas;
        })   
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
.tkbg{
    position: absolute;
    background: #000;
    opacity: .5;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    right: 0;
}
.addtk{
     position: absolute;
     width:860px;
     height:80%;
     top:10%;
     left:50%;
     margin-left:-430px;
     z-index: 4;
     background: #fff;
     overflow-y: auto;
}
.tk-title{
   height:50px;
   line-height: 50px;
   background: #deeafc;
   padding:0 20px;
}
.tk-title h3{
    margin:0;
    display:inline-block;
}
.tkclose{
    float:right;
}
.tkclose i{
    font-size:30px;
    color:#666;
    vertical-align: -5px;
    cursor: pointer;
}
.addbody{
    padding:30px;
}
</style>