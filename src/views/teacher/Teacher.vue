<template>
    <div class="teacther-a">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>教师信息管理</el-breadcrumb-item>
        </el-breadcrumb>

<!--查询-->
        <div class="query-wrapper">
            <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                <el-form-item label="教师姓名:">
                    <el-input v-model="formInline.name" placeholder="教师姓名"></el-input>
                </el-form-item>
<!--                学号  专业 年级-->
                <el-form-item label="教师职工号:">
                    <el-input v-model="formInline.teachernumber" placeholder="教师职工号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="handleAdd">添加</el-button>

                    <el-button type="primary"  @click="handleBatchDelete" >批量删除</el-button>
                    <el-button type="primary"  @click="handleBatchAdd" >批量添加</el-button>
                </el-form-item>
            </el-form>
        </div>


            <div class="tbl-wrapper">

            <el-table

                    border
                    style="width: 100%"
                    @selection-change="handleBa"
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"

            >
                <!--                        v-model="this.form.photo"-->
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="teachernumber"
                        label="教工号"
                        width="150"
                >
                </el-table-column>

                <el-table-column
                        prop="sex"
                        label="性别"
                        width="80"
                >
                </el-table-column>
                <el-table-column
                        prop="politicaloutlook"
                        label="政治面貌"
                width="210">
                </el-table-column>
                <el-table-column
                        prop="education"
                        label="学历"
                        width="200"
                >
                </el-table-column>

                <el-table-column
                        prop="academicdegree"
                        label="学位"
                        width="180"
                >
                </el-table-column>
                <el-table-column

                        width="290px"
                        label="操作"
                >

                    <template slot-scope="scope">

                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)"
                                :disabled="pop"
                        >编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                                :disabled="pop"
                        >删除</el-button>
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
                    <input type="file" value="打开文件夹" @change="getFile($event)" name="fileInput">
                </from>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="outerVisible = false">取 消</el-button>
                    <el-button @click="outer" type="danger">确定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="yang">
<!--            各种dialog-->
            <el-dialog :title="dangkang" :visible.sync="dialogFormVisible">
                <el-form :model="form"   :rules="rules" ref="form">
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" size="mini" style="width: 230px"></el-input>
                        </el-form-item>
                    <el-form-item label="教工号" prop="teachernumber" :label-width="formLabelWidth" >
                        <el-input v-model="form.teachernumber"  :disabled="thn" size="mini" style="width: 230px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" :label-width="formLabelWidth">
                        <el-select v-model="form.sex" placeholder="性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="政治面貌" :label-width="formLabelWidth">
                        <el-select v-model="form.politicaloutlook" placeholder="政治面貌">
                            <el-option label="党员" value="党员"></el-option>
                            <el-option label="团员" value="团员"></el-option>
                            <el-option label="群众" value="群众"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历" :label-width="formLabelWidth">
                        <el-select v-model="form.education" placeholder="政治面貌">
                            <el-option label="专科" value="专科"></el-option>
                            <el-option label="本科" value="本科"></el-option>
                            <el-option label="研究生" value="研究生"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学位" :label-width="formLabelWidth">
                        <el-select v-model="form.academicdegree" placeholder="政治面貌">
                            <el-option label="学士" value="学士"></el-option>
                            <el-option label="硕士" value="硕士"></el-option>
                            <el-option label="博士" value="博士"></el-option>
                        </el-select>
                    </el-form-item>



                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSave">确 定</el-button>
                </div>
            </el-dialog>
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
        name: "Teacher",
        data() {

            var checkAge = (rule, value, callback) => {
                    if (!value) {
                        return callback(new Error('年龄不能为空'));
                    }
            }

            return {
                file: '',
                thn:false,
                outerVisible: false,
                innerVisible: false,
                pop:false,
                input:'',
                StudentNumber:'',
                Department:'',
                id:0,
                    handleList:[],
                // batchDeleteArr:[],
                name: [
                    { validator: checkAge, trigger: 'blur' }
                ],
                dialogFormVisible: false,
                handle: false,
                formBj:{
                    id:''
                },
                formId:{
                    id:''
                },
                form: {
                    id:'',
                    sex: '',
                    name: '',
                    teachernumber: '',
                    politicaloutlook: '',
                    education: '',
                    academicdegree:'',
                },
                // treeArrayDate:'',
                eidtIndex:0,
                //分页代码
                currentpage:1,
                pagesize:5,
                selectedRow:'',
                operate:'',
                formLabelWidth: '300px',
                dangkang:'教师添加',
                tableData: [],
                formInline: {
                    name:'',
                    teachernumber:''
                },
                //ids:[]
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min:1,max:5, message: '请正确输入', trigger: 'blur' },
                        { number: true, message: '请正确输入', trigger: 'blur' },
                    ],
                    teachernumber:[
                        { required: true, message: '请输入教职工号', trigger: 'blur' }
                        ],
                    number: [
                        { required: true, message: '请输入教工号', trigger: 'blur' },

                    ],
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
                this. outerVisible=false,
                event.preventDefault();
                let formData = new FormData();
                formData.append('fileInput', this.file);
                let config = {
                    // headers: {
                    //   'Content-Type': 'multipart/form-data'
                    // }
                }

                this.$post('api/TutorSelectionSystem_war/admin/insertTeachers', formData, config).then((res) => {
                    if (res.code == 200){
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
            handleSave(index,row){
                //第一步： 通过原始的对象生成一个新的对象
               /*第二步：
                 1）首先要判断本次是添加还是修改？
               * 如果是添加，则调用添加接口。如果是修改，则调用修改接口。这里是调用接口省略
               * 2） 如果是修改，则修改表格中对应行的数据。如果是添加，则添加到表格中
               */
                if (this.dangkang == '教师添加'){
                    //添加
                    //调用接口  省略
                    //把数据添加到表格中

                    if (this.form.name==''){
                            this.dialogFormVisible=true
                    }else  {

                        this.dialogFormVisible =false
                        this.$post('/api/TutorSelectionSystem_war/admin/addTeacher',this.$Qs.stringify(this.form)).then((res) =>{
                            console.log(res)
                            if (res.code==200){
                                //刷新数据
                               this.getList()
                            }
                    else {
                                alert('添加失败')
                            }
                        })
                    }
                }
                else {
                    //修改
                    //调用修改接口，发送thhp请求
                    //修改表格中的数据

                        this.dialogFormVisible=false
                       console.log(this.form)
                    this.$post('/api/TutorSelectionSystem_war/admin/editTeacher',this.$Qs.stringify(this.form)).then((res) =>{
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
            handleAdd(){
                Object.keys(this.form).forEach((key) =>{
                    return this.form[key] = ''
                })
       this.dialogFormVisible =true
                this.dangkang = '教师添加'
                this.thn=false
            },
            //查询
            onSubmit() {
                console.log(this.formInline)
               this.$post('/api/TutorSelectionSystem_war/admin/findTeacher',this.$Qs.stringify(this.formInline)).then((res) =>{
                   console.log(res)
                   if (res.code==200){
                       this.tableData=res.list
                   }else {
                       alert('查询失败')
                   }
               })


            },
            handleEdit(index, row) {
                this.thn=true
                //1.弹出dialog
                this.dialogFormVisible = true
                //清空form

                for(let key in this.form){
                    this.form[key] = ''
                }

                this.dangkang = '教师信息修改' //不能掉了他因为掉了会变成添加
                let newRow = Object.assign( {},row)
                this.form = newRow
                console.log(this.form)
                this.eidtIndex = this.tableData.findIndex((t) =>t.id ==row.id)

            },
            handleDelete(index, row) {
                console.log(index, row);

                //通过要删除的行的id去数组中进行查询到该行的索引
                //
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    this.formId.id=this.tableData[newIndex].id
                    this.$post('/api/TutorSelectionSystem_war/admin/deleteTeacher',this.$Qs.stringify(this.formId)).then((res) =>{
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
            handlereset(index, row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                    this.formId.id=this.tableData[newIndex].id
                    this.$post('/api/TutorSelectionSystem_war/admin/resetTeacher',this.$Qs.stringify(this.formId)).then((res) =>{
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
                this.$post('/api/TutorSelectionSystem_war/admin/findTeacher',this.$Qs.stringify()).then((res) =>{
                    if(res.code == 200) {
                        this.tableData = res.list
                    }
                    if (res.code == 500){
                        alert('更新失败')
                    }
                })
            },
            //分页代码
            handleCurrentChange(val){
                console.log('单击页码',val)
                this.currentpage = val
            },
            handleSizeChange(val){
                this.pagesize = val
            },
            //批量删除
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
            handleBatchDelete() {

                if (this.handleList.length>0){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'

                    }).then(() => {
                        let ids = this.handleList.map((item) => item.id)
                        console.log(ids)
                        this.$post('/api/TutorSelectionSystem_war/admin/deleteTeachers',this.$Qs.stringify( {
                            ids: ids
                        }, { indices: false })).then((res)=>{
                                console.log(res)
                            if (res.code==200){
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
            }


            },
        computed:{
            // tables(){
            //     const input = this.input
            //     if (input){
            //         return this.tableData.filter(data =>{
            //             return  Object.keys(data).some(key =>{
            //                 //some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
            //                 return String(data[key]).toLowerCase().indexOf(input)>-1
            //                 //String（）必须有object参数 String（object）这样。     String() 把对象的值转换为字符串
            //                 //toLowerCase()是以小写字母来显示    因为indexOf大小写敏感，要提前用toLowerCase（）吧字母都变成小写的
            //             })
            //         })
            //
            //     }
            //     return  this.tableData
            // }
        }


    }
</script>

<style scoped>
.tbl-wrapper{

}
    .query-wrapper,.page-warpper{
        margin-top: 20px;
    }
    .yang{
        width: 100%;
        height: 100%;
    }

</style>