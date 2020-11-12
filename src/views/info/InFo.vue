<template>
    <div>
        <el-form :model="curruser" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="登录名" prop="pass">
                <el-input type="userName" v-model="curruser.userName" autocomplete="off"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="checkPass">
                <el-input type="text" v-model="curruser.mailbox" autocomplete="off"  ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="age">
                <el-input type="text" v-model="curruser.tel" autocomplete="off"  ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "InFo",
        data() {
            return {

            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                //保存需要调接口，更新VUEX
                this.$store.commit('setuser',this.curruser)
            },
        },
        computed:{
            ...mapState(['curruser']),
        },
    }
</script>

<style scoped>

</style>