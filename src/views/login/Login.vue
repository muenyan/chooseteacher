<template>
    <div class="login">
        <div class="login-title">
          <span class="title-left">导师遴选系统</span>
          <span class="title-right">用户登录</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="80px" class="ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.password" autocomplete="pwd"></el-input>
            </el-form-item>
            <el-form-item>
               <!--<router-link to="/home"><el-button type="primary" @click="submitForm('ruleForm')">登录</el-button></router-link>-->
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],

                }
            };
        },
      mounted() {
          this.getsession()
      },
      methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.$post('/api/TutorSelectionSystem_war/user/login',this.$Qs.stringify(this.ruleForm)).then((res) => {
                            if (res.code=='505'){

                            }
                            if(res.code == 200) {
                              // 登录成功
                              console.log(res)
                              this.$store.commit('setPermission', null)
                              this.$store.commit('setuser', res.user)
                              sessionStorage.setItem('curruser', JSON.stringify(res.user))
                              this.$router.push('/home')
                              //将管理员信息保存到vuex
                              this.$store.commit('setadmin', res.admin)
                              sessionStorage.setItem('curradmin', JSON.stringify(res.admin))
                            }
                            if (res.code == 201){
                              console.log(res)
                              this.$store.commit('setPermission', null)
                              this.$store.commit('setuser', res.user)
                              sessionStorage.setItem('curruser', JSON.stringify(res.user))
                              this.$router.push('/home')
                              //将老师的信息保存到vuex
                              this.$store.commit('setteacher', res.teacher)
                              sessionStorage.setItem('currteacher', JSON.stringify(res.teacher))
                            }
                            if (res.code == 202){
                              console.log(res)
                              this.$store.commit('setPermission', null)
                              this.$store.commit('setuser', res.user)
                              sessionStorage.setItem('curruser', JSON.stringify(res.user))
                              this.$router.push('/home')
                              //将学生的信息保存到vuex
                              this.$store.commit('setstudent', res.student)
                              sessionStorage.setItem('currstudent', JSON.stringify(res.student))
                            }
                            if (res.code == 500){
                              console.log(res)
                                this.$message.error('用户名或密码错误')
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
            getsession(){
                  this.$get('/api/TutorSelectionSystem_war/getSession',this.$Qs.stringify()).then((res) =>{
                    // console.log(res)
                    Cookies.set('JSESSIONID', res)
                  // let a =  Cookies.get('JSESSIONID')
                  //   console.log(a)

              })

            }
        }
    }
</script>

<style scoped>
   .ruleForm{

     position: absolute;
     left: 50%;
     top: 35%;
     margin-left: -150px;
     /*margin-top: -100px;*/
     /*border: 1px solid #eeeeee;*/
     border-radius: 10px;
     width: 300px;
     height: 250px;
     box-sizing: border-box;
     padding-right: 30px;
     padding-top: 30px;
     background: rgba(255,255,255,0.2);
   }
    .login{
      background-image: url("../../assets/blue.jpg");
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-size: cover;
    }
   .login-title{
     margin-top: 170px;
     width: 100%;
     text-align: center;
   }
   .title-left{
     /*border: 1px solid red;*/
     margin-right: 30px;
     font-size: 38px;
     /*font-family: Dialog;*/
     text-shadow: 5px 5px 25px #484848 ;
     color:white;
   }
   .title-right{
     text-shadow:2px 2px 25px #484848 ;
     /*border: 1px solid darkmagenta;*/
     font-size: 25px;
     color: white;
   }
</style>