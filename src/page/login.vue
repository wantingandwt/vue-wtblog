<template>
  <div class="login">
	  <img src="../style/img/loginLeft.png" title="VR">
		<el-form :model="ruleForm"  ref="ruleForm" :rules="rules" label-width="60px" class="login-form">
	    <img src="../style/img/loginLogo.png" title="VR仿真教学实训平台logo" alt="VR仿真教学实训平台logo">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
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
        logining: false,
        ruleForm: {   
              name: '',         
              pass: ''
        },
        rules: {
              name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          pass: [
                { required: true, message: '请输入密码', trigger: 'blur' }
              ],
        },
        list: []
	  }
  },
  created () {
    this.getData()
  },
	 methods: {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {     
            var loginParams = {//获取填写的值
                username: this.ruleForm.name,
                password: this.ruleForm.pass
            }; 
            this.list.forEach((item) => {//循环获取axios传递的值           
                 if (loginParams.username == item.name && loginParams.password == item.pass) {//对比
                    this.logining = true;//相等时将logining设置为true
                    sessionStorage.setItem('user', JSON.stringify(loginParams));//存储在web
                    this.$message({
                      message: '登录成功',
                      type: 'success'
                    });                 
                  } else {
                      this.logining = false; //不相等时将logining设置为false               
                  }  
            })
            if (this.logining == true) {//当logining==true时代表登陆成功
                this.$router.push({ path: '/myarticle' });//成功后跳转页面
                this.logining = false;
              }else {            
                this.$message({
                  message: '用户名或密码错误',
                  type: 'warning'
                });
                this.logining = false;
              }                               
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       getData () {
        this.$api.get('login.json', null, r => {
             this.list = r.data
        })
     }
    }
  }
</script>
<style>
  @import "../style/login.css";
</style>