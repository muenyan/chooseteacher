<template>
    <div>
        <div class="tbl-wrapper">
            <el-table
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                    border
                    style="width: 100%"
                   >
                <el-table-column
                        prop="stuname"
                        label="学生姓名"
                        width="210">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="155">
                </el-table-column>
                <el-table-column
                        prop="stunumber"
                        label="学号"
                        width="250">
                </el-table-column>
                <el-table-column
                        prop="profession"
                        label="专业"
                        width="290">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="年级"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="230">
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
        name: "QueryTeachers",
        data(id){
            return{
                tableData:[],
                currentpage:1,
                pagesize:5,
                jok:'',
                form:{
                    selectteacherid:'',
                    planid:''
                }
            }
        },
        mounted() {
            console.log('id: ' + this.$route.params.id);
            let id = this.$route.params.id
            this.pdf(id)
            // this.getlist(id)
        },
        methods:{
            handleSizeChange(val) {
                this.pagesize = val
            },
            handleCurrentChange(val) {
                this.currentpage = val
            },
            // getlist(id){
            //     console.log(this.jok)
            //     this.form.selectteacherid = id
            //     this.$post('/api/TutorSelectionSystem_war/admin/TeacherToViewFinalSelectionResults',this.$Qs.stringify(this.form)).then((res) =>{
            //         console.log(res)
            //     })
            // },
            pdf(id){
                this.$post('/api/TutorSelectionSystem_war/admin/findPlan',this.$Qs.stringify()).then((res) =>{
                    console.log(res.list)
                    if (res.code == 200){
                         let ary =res.list.map((item) =>item.id).toString()

                        // this.from.planid = res.list.map((item) =>item.id).toString()
                        console.log('....',ary)
                        this.jok = ary
                        console.log('123456',this.jok)
                        this.form.planid = this.jok
                        console.log('123456',this.form.planid)
                        this.form.selectteacherid = id
                        this.$post('/api/TutorSelectionSystem_war/admin/TeacherToViewFinalSelectionResults',this.$Qs.stringify(this.form)).then((res) =>{
                            console.log(res.student)
                            this.tableData = res.student
                        })
                    }else {

                    }

                })
            },

        }
    }
</script>

<style scoped>

</style>