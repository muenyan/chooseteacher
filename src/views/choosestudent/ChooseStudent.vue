<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>选择学生</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input
                style="width: 220px;margin-top:20px;margin-left: 20px"
                v-model="fromday.input"
                :disabled="true">
        </el-input>
        <el-input
                style="width: 170px;margin-top:20px;margin-left: 50px"
                v-model="fromday.inputs"
                :disabled="true">
        </el-input>
        <div class="tbl-wrapper" style="margin-top: 15px">
            <el-table
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="tStudent.stuname"
                        label="学生姓名"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="tStudent.sex"
                        label="性别"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="tStudent.stunumber"
                        label="学号"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="tStudent.profession"
                        label="专业"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="tStudent.grade"
                        label="年级"
                        width="120">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleYes(scope.$index, scope.row)">通过</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleNo(scope.$index, scope.row)">驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-warpper">
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
    </div>
</template>

<script>
    export default {
        name: "ChooseStudent",
        data(){
            return{
                tableData:[],
                currentpage:1,
                pagesize:5,
                fromday:{
                    input: '',
                    inputs: '',
                },
            }
        },
        mounted() {
            this.getList()
        },
        methods:{
            handleYes(index ,row){
                console.log(row.id)
                this.$post('/api/TutorSelectionSystem_war/teacher/commitChooseStu',this.$Qs.stringify({id:row.id})).then((res) =>{
                  if (res.code == 200){
                      console.log('22222')
                      this.$router.push(row.id)
                      this.getList()

                  }else {
                      alert(res.msg)
                  }
                })
            },
            handleNo(index ,row){
                this.$post('/api/TutorSelectionSystem_war/teacher/backStudent',this.$Qs.stringify({id:row.id})).then((res) =>{
                    if (res.code == 200){
                        this.getList()
                    }else {
                        alert(res.msg)
                    }
                })
            },
            handleCurrentChange(val){
                console.log('单击页码',val)
                this.currentpage = val
            },
            handleSizeChange(val){
                this.pagesize = val
            },
            getList(){
                this.$post('/api/TutorSelectionSystem_war/teacher/findPlan',this.$Qs.stringify()).then((res) =>{
                    if (res.code==200){
                        for (let i = 0; i <res.plans.length ; i++) {
                                this.fromday.input =res.plans[i].planname
                                if (res.plans[i].status == '1'){
                                    // status ==' 第二轮学生选老师'
                                    this.fromday.inputs =res.plans[i].status = '第一轮学生选择老师'
                                }if (res.plans[i].status == '-2'){
                                this.fromday.inputs =res.plans[i].status = '未开始'
                            }if (res.plans[i].status == '-1'){
                                this.fromday.inputs =res.plans[i].status = '已结束'
                            }if (res.plans[i].status == '0'){
                                this.fromday.inputs =res.plans[i].status = ''
                            }if (res.plans[i].status == '2'){
                                this.fromday.inputs =res.plans[i].status = '老师第一轮选择'
                            }
                            if (res.plans[i].status == '3'){
                                this.fromday.inputs =res.plans[i].status = '第二轮学生选择'
                            }if (res.plans[i].status == '4'){
                                this.fromday.inputs =res.plans[i].status = '老师第二轮选择'
                            }if (res.plans[i].status == '5'){
                                this.fromday.inputs =res.plans[i].status = '第三轮学生选择'
                            }if (res.plans[i].status == '6'){
                                this.fromday.inputs =res.plans[i].status = '老师第三轮选择'
                            }
                        }
                        let ids = res.plans.map((item) => item.id).toString()
                        // this.ppf = ids
                        let planId = ids
                        this.$post('/api/TutorSelectionSystem_war/teacher/checkCanStu',this.$Qs.stringify({planId:planId})).then((res) =>{
                            // console.log(res)
                            if (res.code == 200){

                                // let ids = res.students.map((item) => item).toString()
                                // // this.ppf = ids
                                // console.log(ids)
                                // let ppp = ids
                                this.tableData = res.students
                            }
                            if(res.code == '502'){
                                alert(res.msg)
                            }
                        })
                    }else {
                        alert(res.msg)
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>