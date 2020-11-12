<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small" label-width="80px" class="ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="pwd"></el-input>
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
                    name: '',
                    region: '',
             userName:'',
                    pwd:''
                },
                rules: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                   pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],

                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        //发请求，进行登录
                        //         let _this = this
                        // this.$axios.get("/api/package.json").then(function(res) {
                        //     let users = res.data.data
                        //     users.find((u) => u.userName == _this.ruleForm.userName && u.pwd == _this.ruleForm.pwd)
                        //     console.log(users)

                        this.$get('/api/package.json').then((res) => {
                            let users = res.data
                           let rs =  users.find((u) => u.userName == this.ruleForm.userName && u.pwd == this.ruleForm.pwd)
                            if (rs){
                                //存进去了  存入数据   一定要记住    不但把登陆信息存入vuex中，同时存入sessionStorage
                                this.$store.commit('setuser',rs)
                            sessionStorage.setItem('curruser',JSON.stringify(rs))
                                // let  u =sessionStorage.getItem('curruser')  这是取



                                //放松请求I，根据用户角色获取该用户权限（菜单）
                                // this.$axios.get('/api/permission.json').then((p) => {
                                //    let permission = p.data.data[rs.role]
                                //     //吧当前用户的菜单存入Vuex当中
                                //     this.$store.commit('setPermission',permission)
                                //
                                //         //跳转到首页
                                    this.$router.push('/home')
                                // })

                            }else {
                                this.$message.error('用户名密码错误')
                            }
                           //登录成功，会吧登录用户信息存入vuex当中
                            /*
                             面试题
                            vuex和本地存储（localStorage）有什么区别：
                            主要区别有2个
                            * 第一个:vuex中的数据浏览器属性会消失，而localStorage不会
                            * 第二个：vuex中的数据会及时刷新，而localStorage不会
                            * */


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