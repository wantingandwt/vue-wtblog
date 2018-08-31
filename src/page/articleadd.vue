<template>
<div class="myarticleadd">
    <div class="addtk">
        <div class="tk-title">
            <h3>{{isAddc}}</h3>
            <div class="tkclose">
               <i class="el-icon-circle-close-outline" @click="close"></i>
            </div>
        </div>
        <div class="addbody">
           <el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
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
                        action="/get_upload_file"
                        list-type="picture-card"
                        name="upfile"
                        :file-list="img_list"
                        :on-preview="handlePictureCardPreview"
                        :on-error="uploadError"
                        :on-success="handleUploadSuccess"
                        :on-remove="handleRemove"
                        accept="image/jpeg,image/gif,image/png,image/bmp">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="文章摘要">
                    <el-input type="textarea" v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item label="文章内容">
                    <UE @ready="editorReady" :ueditorConfig="editorConfig"></UE>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即提交</el-button>
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
        formeditc:Object,
        pkc:'',
        isAddc:''
    },
    data() {
        return {
            img_list:[],
            img_list2:[{
                url:''
            }],
            dialogImageUrl: '',
            dialogVisible: false,
            editorConfig:{
                retainOnlyLabelPasted: true,
                initialFrameHeight:400
            },        
            isShow:'',
            isSuccess:'',
            sorts:[],
            form: {},
            id:{
                aid:''
            },
            allform:{}
      }
    },
    mounted(){
        this.form = this.formeditc
        this.getform(this.form.recommend) 
        this.getform2(this.form.display)   
        this.id.aid = this.pkc
        this.allForm()
    },
    watch:{//监听当值改变时
        formeditc(newVal, oldVal){
           this.form = newVal;
           this.getform(this.form.recommend)//转唤是否推荐
           this.getform2(this.form.display)//转唤是否显示
           this.allimg(this.form.cover) //转换封面
           this.allForm()
        },
        pkc(newVal, oldVal){
           this.id.aid = newVal 
           this.allForm()
        }
    },
    created () {
        this.getSort(); 
    },
    methods: {
        allForm(){
            this.allform =Object.assign(this.id, this.form);//将2个对象合并成一个
        },  
        allimg(str){
           if(str != ''){
               this.img_list2[0].url = str;
               this.img_list=this.img_list2
           }
        },
        getform(str){
           if(str==1){
              this.form.recommend = true
           }else{
              this.form.recommend =  false
           }
        },
        getform2(str){
           if(str==1){
              this.form.display = true
           }else{
              this.form.display = false
           }
        },
        editorReady(editorInstance){
            editorInstance.setContent(this.form.content);
            editorInstance.addListener('contentChange',()=>{
               this.form.content = editorInstance.getContent()//获取编辑器内容
            })            
        },
        onSubmit() {
            this.$api.post('/do_article',this.allform, r => {
                this.isSuccess = r.data.status;
                if (this.isSuccess == "true"){
                    this.$message({
                            message: '添加/修改文章成功',
                            type: 'success'
                    });
                    setTimeout(function(){
                        location.reload()                    
                    },500)                   
                }else{
                    this.$message({
                            message: '添加/修改文章失败，请重新添加',
                            type: 'warning'
                    });
                }
            }) 
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
        // 上传图片
        handleRemove(file, fileList) {
            this.$message({
                message: '封面删除成功',
                type: 'success'
            }); 
        },
        uploadError (res, file, fileList) {
            this.$message({
                message: '封面上传失败，请重试！',
                type: 'warning'
            });
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleUploadSuccess(res, file) {
            this.$message({
                message: '封面上传成功',
                type: 'success'
            }); 
            this.form.cover =res.filename;
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
}
.tk-title{
   height:50px;
   line-height: 50px;
   background: #deeafc;
   padding:0 20px;
}
.addbody{
    height: 80%;
    overflow-y: auto;
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