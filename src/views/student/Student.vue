<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >学生信息管理</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="query-wrapper">
                <el-form :inline="true" size="mini" :model="form" class="demo-form-inline">
                    <el-form-item label="学生姓名:" >
                        <el-input  placeholder="学生姓名" v-model="form.stuname" size="mini" style="width: 150px"></el-input>
                    </el-form-item>
                    <!--                学号  专业 年级-->
                    <el-form-item  label="学号:">
                        <el-input  placeholder="学号" v-model="form.stunumber" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="专业:">
                        <el-input  placeholder="专业" v-model="form.profession" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="年级:">
                        <el-input  placeholder="年级" v-model="form.grade" style="width: 150px"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" @click="handleAdd">添加</el-button>

                        <el-button type="primary"  @click="handleBatchDelete" >批量删除</el-button>
                        <el-button type="primary"  @click="handleBatchAdd" >批量添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div>
            <el-dialog title="批量添加信息" :visible.sync="outerVisible">
                <el-dialog
                        width="30%"
                        title="内层 Dialog"
                        :visible.sync="innerVisible"
                        append-to-body>
                </el-dialog>
                <span>请选择文件夹</span>
                <from>
                    <input type="file" name="fileInput" value="打开文件夹" @change="getFile($event)" >
                </from>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="outerVisible = false">取 消</el-button>
                    <el-button @click="outer" type="danger">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="tbl-wrapper">
            <el-table
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                    border
                    style="width: 100%"
                    @selection-change="handleBa">
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        prop="stuname"
                        label="学生姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="stunumber"
                        label="学号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="profession"
                        label="专业"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="年级"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话"
                        width="180">
                </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    :disabled="pop"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    :disabled="pop"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handlereset(scope.$index, scope.row)"
                                    :disabled="pop"
                            >重置密码</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
       <div> <el-dialog :title="dangkang" :visible.sync="dialogFormVisible">
           <el-form :model="form"   :rules="rules" ref="form">
               <el-form-item label="学生姓名" prop="stuname" :label-width="formLabelWidth">
                   <el-input v-model="form.stuname" size="mini" style="width: 230px"></el-input>
               </el-form-item>
               <el-form-item label="学号" prop="stunumber" :label-width="formLabelWidth">
                   <el-input v-model="form.stunumber" size="mini" style="width: 230px"></el-input>
               </el-form-item>
               <el-form-item label="专业" prop="profession" :label-width="formLabelWidth">
                   <el-input v-model="form.profession" size="mini" style="width: 230px"></el-input>
               </el-form-item>
               <el-form-item label="年级" prop="grade" :label-width="formLabelWidth">
                   <el-input v-model="form.grade" size="mini" style="width: 230px"></el-input>
               </el-form-item>
               <el-form-item label="性别:" :label-width="formLabelWidth">
                   <el-input  v-model="form.sex" size="mini" style="width: 230px"></el-input>
               </el-form-item>
               <el-form-item label="电话:" :label-width="formLabelWidth">
                   <el-input   v-model="form.phone" size="mini" style="width: 230px"></el-input>
               </el-form-item>
           </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
               <el-button type="primary" @click="handleSave">确 定</el-button>
           </div>
       </el-dialog></div>
        <el-pagination
                background
                layout="total,prev, pager, next,sizes,jumper"
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
        name: "Student",
        data(){
            return{
                innerVisible: false,
                outerVisible: false,
                pop:false,
                handleList:[],
                currentpage:1,
                pagesize:5,
                 // 总页数
                total: 0,

              dangkang:'学生添加',
                dialogFormVisible: false,
                formLabelWidth: '300px',
                tableData:[],
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min:2,max:5, message: '请正确输入', trigger: 'blur' },
                        { number: true, message: '请正确输入', trigger: 'blur' },
                    ],
                    number: [
                        { required: true, message: '请输入教工号', trigger: 'blur' },

                    ],
                },
                form:{
                    stuname:'',
                    stunumber:'',
                    profession:'',
                    grade:'',
                    phone:'',
                    sex:''
                },
                formId:{
                    id:''
                }
            }
        },
        mounted() {

            this.getList()
        },
        methods:{
            getFile(event){
                this.file = event.target.files[0];
                console.log(this.file);
            },

            outer(event) {
                this.outerVisible = false
                event.preventDefault();
                let formData = new FormData();
                formData.append('fileInput', this.file);
                let config = {
                    // headers: {
                    //   'Content-Type': 'multipart/form-data'
                    // }
                }
                this.$post('api/TutorSelectionSystem_war/admin/insertStudents', formData, config).then((res) => {
                    if (res.code == 200){
                        //导入图片
                        // this.$store.commit('setuser', res.user)
                        // sessionStorage.setItem('curruser', JSON.stringify(res.user))
                        this.$message(
                            {
                                type:"success",
                                message:'导入成功'
                            }
                        )
                    }
                })
            },
            handleSave(){
                //第一步： 通过原始的对象生成一个新的对象
                /*第二步：
                  1）首先要判断本次是添加还是修改？
                * 如果是添加，则调用添加接口。如果是修改，则调用修改接口。这里是调用接口省略
                * 2） 如果是修改，则修改表格中对应行的数据。如果是添加，则添加到表格中
                */
                if (this.dangkang == '学生添加'){
                    //添加
                    //调用接口  省略
                    //把数据添加到表格中
                        this.dialogFormVisible =false
                        this.$post('/api/TutorSelectionSystem_war/admin/addStudent',this.$Qs.stringify(this.form)).then((res) =>{
                            console.log(res)
                            if (res.code==200){
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
                    this.dialogFormVisible=false
                    console.log(this.form)
                    this.$post('/api/TutorSelectionSystem_war/admin/editStudent',this.$Qs.stringify(this.form)).then((res) =>{
                        console.log(res)
                        if (res.code==200){
                            //刷新数据
                            this.getList()
                        }
                        else {
                            alert(res.msg)
                        }
                    })

                }
                //清空form
                // Object.keys(this.form).forEach((key) =>{// Object.keys是取他的建返回
                //     return this.form[key] = ''
                // })

                for(let key in this.form){
                    this.form[key] = ''
                }
                //隐藏dialog

            },

            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val
                //重新发送请求
                this.getList()
            },
          //通过jumper改变当前页码
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.currentpage = val
              //重新发送请求
                this.getList()
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.thn=true
                //1.弹出dialog
                this.dialogFormVisible = true
                //清空form

                for(let key in this.form){
                    this.form[key] = ''
                }

                this.dangkang = '学生信息修改' //不能掉了他因为掉了会变成添加
                let newRow = Object.assign( {},row)
                this.form = newRow
                console.log(this.form)
                this.eidtIndex = this.tableData.findIndex((t) =>t.id ==row.id)
            },
            handleDelete(index, row) {
                // console.log(index, row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    this.formId.id=this.tableData[newIndex].id
                    this.$post('/api/TutorSelectionSystem_war/admin/deleteStudent',this.$Qs.stringify(this.formId)).then((res) =>{
                        // console.log(res)
                        if(res.code==200){

                          //记录总页数,
                          //此时已经实现删除操作，所以total的值需要减1，Math.ceil是向上取整，保证始终大于等于1
                          const totalPage = Math.ceil((this.total - 1) / this.pagesize)

                          //记录当前页码
                          //记住删除最后一条数据时当前码是最后一页
                          const currentpage = this.currentpage > totalPage ? totalPage : this.currentpage

                          //实现跳转
                          this.currentpage = currentpage < 1 ? 1 : currentpage
                          // 重新渲染
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
                this.$post('/api/TutorSelectionSystem_war/admin/findStudent',this.$Qs.stringify(this.form)).then((res) =>{
                    console.log(res)
                    if (res.code==200){
                        this.tableData=res.list
                    }else {
                        alert('查询失败')
                    }
                })
            },
            handleAdd(){
                this.dialogFormVisible = true
            },
            handleBa(handleList){
                this.handleList = handleList
                if (handleList.length>0){
                    this.pop= true
                }else {
                    this.pop=false
                }

                // if (this.pop==true){
                //     this.pop = false
                // }else {
                //
                // }

            },
            handleBatchDelete(){
                if (this.handleList.length>0){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        let ids = this.handleList.map((item) => item.id)
                        console.log(ids)
                        this.$post('/api/TutorSelectionSystem_war/admin/deleteStudents',this.$Qs.stringify( {
                            ids: ids
                        }, { indices: false })).then((res)=>{
                            console.log(res)
                            if (res.code==200){
                              const totalPage = Math.ceil((this.total - 1) / this.pagesize)

                              //记录当前页码
                              //记住删除最后一条数据时当前码是最后一页
                              const currentpage = this.currentpage > totalPage ? totalPage : this.currentpage

                              //实现跳转
                              this.currentpage = currentpage < 1 ? 1 : currentpage
                              // 重新渲染
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
                }else {

                }

            },
            handleBatchAdd(){
                this.outerVisible = true
            },
            //重置密码
            handlereset(index, row){
                this.$confirm('确定重置密码？, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    this.formId.id=this.tableData[newIndex].id
                    this.$post('/api/TutorSelectionSystem_war/admin/resetStudent',this.$Qs.stringify(this.formId)).then((res) =>{
                        console.log(res)
                        if(res.code==200){
                            this.$message({
                                type: 'success',
                                message: '重置密码成功!'
                            });
                        }else {
                            alert(res.msg)
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消重置密码'
                    });
                });
            },
            getList(){
                this.$post('/api/TutorSelectionSystem_war/admin/findStudent',this.$Qs.stringify()).then((res) =>{
                    console.log(res)
                    if (res.code==200){
                        this.tableData=res.list
                    }else {
                        alert('查询失败')
                    }
                })
            }

        },
    }
</script>

<style scoped>
.tbl-wrapper{
    margin-top: 30px;
}
    .query-wrapper{
        margin-top: 20px;
    }
</style>