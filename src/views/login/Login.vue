<template>
    <div class="login">
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
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('/api/TutorSelectionSystem_war/user/login',this.$Qs.stringify(this.ruleForm)).then((res) => {
                            if(res.code == 200 || res.code == 201 || res.code == 202 ) {
                                // 登录成功
                                // console.log(res)
                                this.$store.commit('setPermission',null)
                                this.$store.commit('setuser',res.user)
                                sessionStorage.setItem('curruser',JSON.stringify(res.user))
                                this.$router.push('/home')
                            }
                            if (res.code == 500){
                                this.$message.error('用户名或密码错误')
                            }

                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
   .ruleForm{

       position: absolute;
       left: 50%;
       top: 50%;
       margin-left: -180px;
       margin-top: -180px;
       border: 1px solid #eeeeee;
       width: 350px;
       height: 350px;
       box-sizing: border-box;
       padding-right: 30px;
       padding-top: 60px;
       background: rgba(255,255,255,0.6);
   }
    .login{
        background-image: url("../../assets/bg_banner.png");
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
    }
</style>