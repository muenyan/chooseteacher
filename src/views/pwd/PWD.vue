<template>
    <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item >个人中心</el-breadcrumb-item>
            <el-breadcrumb-item >密码修改</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="main">
            <div class="main-info">
                <el-form :model="curruser" status-icon   label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="pass">
                        <el-input type="userName" v-model="curruser.username" autocomplete="off"  :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" prop="checkPass">
                        <el-input type="text" v-model="curruser.password" autocomplete="off" :disabled="true" ></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                        <!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "PWD",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.password !== '') {
                        this.$refs.ruleForm.validateField('password');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    password: '',
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            };


        },


        mounted() {
            // getList()
        },
        methods: {
            getList(){
                this.$post('/api/TutorSelectionSystem_war/admin/findTeacher',this.$Qs.stringify()).then((res) =>{
                    if(res.code == 200) {
                        console.log(res)
                    }
                    if (res.code == 500){
                        alert('更新失败')
                    }
                })
            },
            submitForm() {
                // this.$refs[formName].validate((valid) => {
                //   if (valid) {
                //     alert('submit!');
                //   } else {
                //     console.log('error submit!!');
                //     return false;
                //   }
                // });
                //保存需要调接口，更新VUEX
                // let password = this.ruleForm.password
                // this.$store.commit('setuser',this.curruser)
                console.log(this.ruleForm.password)
                this.$post('/api/TutorSelectionSystem_war/user/changePwd',this.$Qs.stringify(
                    {password:this.ruleForm.password}
                )).then((res) =>{
                    if(res.code == 200) {
                        console.log(res)
                    }
                    if (res.code == 500){
                        console.log(res)
                    }
                })
            },
        },
        computed:{
            ...mapState(['curruser']),
        }
    }

</script>

<style scoped>
    .main{
        margin: 0 auto;
        margin-top: 80px;
        width: 500px;
        height: 350px;
        /*border: 1px solid red;*/
        border-radius: 10px;
        background: white;
    }
    .main-info{
        padding: 40px;
        padding-right: 60px;
    }
</style>