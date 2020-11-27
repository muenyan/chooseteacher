<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>我的学生</el-breadcrumb-item>
        </el-breadcrumb>
<!--        <template slot-scope="scope">-->
        <el-button
                size="mini"
                @click="handleEdit()"
                style="position: absolute;top: 8px;right: 50px;"
        >导出</el-button>
<!--        </template>-->
        <div class="tbl-wrapper" style="margin-top: 15px">
            <el-table
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="stuname"
                        label="学生姓名"
                        width="230">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="stunumber"
                        label="学号"
                        width="230">
                </el-table-column>
                <el-table-column
                        prop="profession"
                        label="专业"
                        width="275">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="年级"
                        width="190">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="220">
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
                background
                layout="total,prev, pager, next,sizes"
                :page-size="pagesize"
                :page-sizes="[5, 10, 20, 30]"
                :total="tableData.length"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
        >
        </el-pagination>
    </div>

</template>

<script>
    export default {
        name: "ChooseStudent",
        data(){
            return{
                kang:'',
                tableData:[],
                currentpage:1,
                pagesize:5,
                form:{
                    stuname:'',
                    sex:'',
                    stunumber:'',
                    profession:'',
                    grade:'',
                    phone:''
            }
            }
        },
        mounted() {
            // console.log(this.$route.params.id)
            // // console.log('id:' + this.$route.params.id);
            // let id = this.$route.params.id
            this.getList()
        },
        methods: {
            handleEdit(){
                let ary = this.kang
                window.location.href = "http://192.168.31.114:8080/TutorSelectionSystem_war/teacher/daochu?planid="+ary;

              // this.$post('/pai/TutorSelectionSystem_war/teacher/daochu',this.$Qs.stringify({planid:ary})).then((res) =>{
              //     console.log(res)
              // })
            },
            handleDelete() {
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentpage = val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagesize = val
            },
            getList(){

                this.$post('/api/TutorSelectionSystem_war/teacher/findPlan',this.$Qs.stringify()).then((res) =>{
                    if (res.code == 200){
                        let ids = res.plans.map((item) => item.id).toString()
                        this.kang = ids
                        let id = ids
                        console.log(ids)
                        this.$post('/api/TutorSelectionSystem_war/teacher/TeacherToViewFinalSelectionResults',this.$Qs.stringify({planid:id})).then((res) =>{
                            console.log(res.student)
                            if (res.code == 200){
                                this.tableData = res.student
                            }else {
                                    alert(res.msg)
                            }
                        })
                    }else {

                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>