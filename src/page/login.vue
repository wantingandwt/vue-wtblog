<template>
  <div class="login">
	  <img src="../style/img/loginLeft.png" title="VR">
		<el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="60px" class="login-form">
	    <div class="logo-img"> 
        <img src="../style/img/loginLogo.png" title="logo" alt="logo">
        <span>我的博客</span>
      </div>
			<el-form-item label="名称" prop="username">
				<el-input v-model="ruleForm.username" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pwd">
				<el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
			</el-form-item>
			<div class="formsubmit">	
				<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			</div>
		</el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        logining: '',
        ruleForm: {   
              username: '',         
              pwd: ''
        },
        rules: {
              username: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          pwd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
        }
	  }
  },
	 methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {   
            this.$api.get('/login', this.ruleForm, r => {
               this.logining = r.data.status;
              if (this.logining == "true"){
                sessionStorage.setItem('user', JSON.stringify(this.ruleForm));//存储在web
                this.$message({
                    message: '登录成功',
                    type: 'success'
                  }); 
                  this.$router.push({ path: '/myarticle' });
              }else{
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                });
              }
            })                            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
  @import "../style/login.css";
</style>