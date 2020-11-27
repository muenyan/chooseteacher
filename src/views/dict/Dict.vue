<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >遴选活动</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="query-wrapper">
                <el-form :inline="true" size="mini" :model="form" class="demo-form-inline">

                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">添加遴选活动</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="tbl-wrapper">
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="planname"
                        label="遴选活动名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="startdate"
                        label="开始日期"
                        width="230">
                </el-table-column>
                <el-table-column
                        prop="enddate"
                        label="结束日期"
                        width="230">
                </el-table-column>
                <el-table-column
                        prop="selectgrade"
                        label="参与遴选活动的年级"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        width="170">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                          <el-button
                              @click="handday(scope.$index, scope.row)"
                              size="mini"
                              type="danger">详情</el-button>
                        <el-button
                                @click="handdays(scope.$index, scope.row)"
                                size="mini"
                                v-show="jiangzhi"
                                type="danger">强制选择</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div> <el-dialog :title="dangkang" :visible.sync="dialogFormVisible">
            <el-form :model="form"   ref="form">
                <el-form-item label="活动名称" prop="planname" :label-width="formLabelWidth">
                    <el-input v-model="form.planname" size="mini" style="width: 230px"></el-input>
                </el-form-item>

                <el-form-item label="开始日期" :label-width="formLabelWidth">
                    <el-date-picker
                            :label-width="formLabelWidth"
                            v-model="form.startdate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" :label-width="formLabelWidth">
                    <el-date-picker
                            :label-width="formLabelWidth"
                            v-model="form.enddate"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="年级" :label-width="formLabelWidth">
                    <el-select v-model="form.selectgrade" placeholder="年级">
                        <el-option label="2017级" value="2017级"></el-option>
                        <el-option label="2018级" value="2018级"></el-option>
                        <el-option label="2019级" value="2019级"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog></div>
    </div>

</template>

<script>
    // import store from '@/store'
    export default {
        name: "Dict",
        data(){
            return{
                kanglen:'',
                jiangzhi:false,
                eidtIndex:'',
                dangkang:'添加活动',
                dialogFormVisible: false,
                formLabelWidth: '300px',
                tableData:[],
                form:{
                    id:'',
                    planname:'',
                    startdate:'',
                    enddate:'',
                    selectgrade:'',
                },
                formId:{
                    id:''
                },
            }
        },
        mounted() {

            this.getList()
        },
        methods:{
            handleSave(index, row){
                //第一步： 通过原始的对象生成一个新的对象
                /*第二步：
                  1）首先要判断本次是添加还是修改？
                * 如果是添加，则调用添加接口。如果是修改，则调用修改接口。这里是调用接口省略
                * 2） 如果是修改，则修改表格中对应行的数据。如果是添加，则添加到表格中
                */
                if (this.dangkang == '添加活动'){
                    //添加
                    //调用接口  省略
                    //把数据添加到表格中
                    this.dialogFormVisible =false
                    this.$post('/api/TutorSelectionSystem_war/admin/createPlan',this.$Qs.stringify(this.form)).then((res) =>{
                        if (res.code==200) {
                            this.getList()
                        }else {
                            alert(res.msg)
                        }
                    })
                }
                else {
                    //修改
                    //调用修改接口，发送thhp请求
                    //修改表格中的数据

                    this.dialogFormVisible =false
                    console.log(this.eidtIndex)
                    this.form.id = this.eidtIndex
                    this.$post('/api/TutorSelectionSystem_war/admin/updatePlan',this.$Qs.stringify(this.form)).then((res) =>{
                        console.log(res)
                        if (res.code==200){
                            this.getList()
                        }else {
                            alert(res.msg)
                        }
                    })
                }

                for(let key in this.form){
                    this.form[key] = ''
                }
                //隐藏dialog

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentpage = val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagesize = val
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.dialogFormVisible = true
                //清空form

                for(let key in this.form){
                    this.form[key] = ''
                }

                this.dangkang = '修改' //不能掉了他因为掉了会变成添加
                let newRow = Object.assign( {},row)
                console.log(newRow)
                this.form = newRow
                let pid = row.id
                console.log(pid)
                this.eidtIndex = pid
                // this.eidtIndex = this.tableData.findIndex((t) =>t.id ==row.id)
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    this.formId.id=this.tableData[newIndex].id
                    this.$post('/api/TutorSelectionSystem_war/admin/deletePlan',this.$Qs.stringify(this.formId)).then((res) =>{
                        console.log(res)
                        if(res.code==200){
                            this.getList()
                        }else {
                            alert(res.msg)
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onSubmit(){
                console.log(this.form)
            },
            handleAdd(){
                this.dangkang='添加活动'
                this.dialogFormVisible = true
                for(let key in this.form){
                    this.form[key] = ''
                }
            },
            handleBatchDelete(){},
            handleBatchAdd(){},
            //强制选择
            handdays(index ,row){
                console.log(row.id)
             this.$post('/api/TutorSelectionSystem_war/admin/forceSelect',this.$Qs.stringify({id:row.id})).then((res) =>{
                 console.log(res)
                 if (res.code == 200){
                     this.getList()
                     alert('强制选择成功')
                 }else {
                     alert('强制选择失败')
                 }
             })
            },
            handday(index, row){
                // this.eidtIndex = this.tableData.findIndex((t) =>t.id ==row.id)
                // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                // console.log(this.tableData[newIndex].id)
                // this.form.id=this.tableData[newIndex].id
                console.log(row.id)
                     this.$post('/api/TutorSelectionSystem_war/admin/findPlanById',this.$Qs.stringify({id:row.id})).then((res) =>{
                         if (this.code='200'){
                             // this.$emit("pty",this.form.id);
                             // store.commit('welcome',this.form.id)
                             // this.$store.commit('dictId',res.id)
                             // sessionStorage.setItem('currId',JSON.stringify(res.id))
                             this.$router.push('/home/user/'+row.id)
                         }else {
                             alert(res.msg)
                         }
                     })
            },
            getList(){
                this.$post('/api/TutorSelectionSystem_war/admin/findPlan',this.$Qs.stringify()).then((res) =>{
                    console.log(res)
                    if (res.code==200){
                        this.tableData=res.list

                        for (let i = 0; i <res.list.length ; i++) {
                            if (res.list[i].status == '7'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "未完成"
                                }
                                this.jiangzhi = true
                            } if (res.list[i].status == '8'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "已完成"
                                }
                                this.jiangzhi = false
                            }if (res.list[i].status == '1'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第一轮学生选择时间"
                                }
                                this.jiangzhi = true
                            }if (res.list[i].status == '2'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第一轮老师选择时间"
                                }
                                this.jiangzhi = true
                            }if (res.list[i].status == '3'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第二轮学生选择时间"
                                }
                                this.jiangzhi = true
                            }if (res.list[i].status == '4'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第二轮老师选择时间"
                                }
                                this.jiangzhi = true
                            }if (res.list[i].status == '5'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第三轮学生选择时间"
                                }
                                this.jiangzhi = true
                            }if (res.list[i].status == '6'){
                                for (let j = 0; j <this.tableData.length ; j++) {
                                    this.tableData[i].status = "第三轮老师选择时间"
                                }
                                this.jiangzhi = true
                            }
                        }
                    }else {
                        alert(res.msg)
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .query-wrapper{
        margin-top: 20px;
    }
</style>