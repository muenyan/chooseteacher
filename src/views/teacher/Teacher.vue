<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>教师信息管理</el-breadcrumb-item>
        </el-breadcrumb>

<!--查询-->
        <div class="query-wrapper">
            <el-form :inline="true" size="mini" :model="formInline" class="demo-form-inline">
                <el-form-item label="姓名:">
                    <el-input v-model="input" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别:" >
                    <el-select  v-model="form.sex" >
                        <el-option label="请选择" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="handleAdd">添加</el-button>

                    <el-button type="primary"  @click="handleBatchDelete" >批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>


            <div class="tbl-wrapper">
<!--                :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"-->
<!--                :data="tables.slice((currentpage-1)*pagesize,currentpage*pagesize)"-->
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
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        label="性别"
                        width="180"
                        :formatter="handleSex">
                </el-table-column>

                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        :formatter="handleData"
                >
                </el-table-column>
                <el-table-column
                        prop="zzmm"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="education"
                        label="学历">
                </el-table-column>
                <el-table-column
                        prop="degree"
                        label="学位">
                </el-table-column>
                <el-table-column
                        prop="graduation"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        prop="direction"
                        label="研究方向">
                </el-table-column>
                <el-table-column
                       >
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    </template>
                </el-table-column>
            </el-table>
   </div>
        <div class="yang">
<!--            各种dialog-->
            <el-dialog :title="dangkang" :visible.sync="dialogFormVisible">
                <el-form :model="form"   :rules="rules" ref="form">
                        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" size="mini" style="width: 230px"></el-input>
                        </el-form-item>
                    <el-form-item size="mini" label="出生日期" :label-width="formLabelWidth">
                        <el-date-picker
                                v-model="form.birthday"

                                placeholder="选择日期时间"

                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item size="mini" label="政治面貌" :label-width="formLabelWidth">
                        <el-select v-model="form.zzmm" placeholder="请选择活动区域">
                            <el-option v-for="(item,idx) in mm" :key="idx" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" label="学历" :label-width="formLabelWidth">
                        <el-select v-model="form.education" >
                            <el-option v-for="(item,idx) in edu" :key="idx" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别:" size="mini" :label-width="formLabelWidth">
                        <el-select v-model="form.sex" >
                            <el-option label="请选择" value="0"></el-option>
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" label="学位" :label-width="formLabelWidth">
                        <el-select v-model="form.degree" >
                            <el-option v-for="(item,idx) in deg" :key="idx" :label="item" :value="item"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" label="毕业院校" :label-width="formLabelWidth">
                        <el-input v-model="form.graduation" placeholder="请输入内容" style="width: 217px"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" label="研究方向" :label-width="formLabelWidth">
                        <el-input v-model="form.direction" placeholder="请输入内容" style="width: 217px"></el-input>
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
                input:'',
                id:0,
                    handleList:[],
                // batchDeleteArr:[],
                name: [
                    { validator: checkAge, trigger: 'blur' }
                ],

                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                dialogFormVisible: false,
                handle: false,
                form: {
                    sex: '请选择',
                    name: '',
                    education: '',
                    zzmm: '',
                    degree: '',
                    birthday:'',
                    graduation:'',
                    direction:'',
                    input: '',
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
                mm:[],
                edu:[],
                deg:[],
                formInline: {
                    name: '',
                    sex: '0'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min:2,max:5, message: '请正确输入', trigger: 'blur' },
                        { number: true, message: '请正确输入', trigger: 'blur' },
                    ],
                }
            }
        },
        mounted() {

            this.getList()
        },
        methods:{
            handleSave(){
                //第一步： 通过原始的对象生成一个新的对象
                let obj = Object.assign({},this.form)
               /*第二步：
                 1）首先要判断本次是添加还是修改？
               * 如果是添加，则调用添加接口。如果是修改，则调用修改接口。这里是调用接口省略
               * 2） 如果是修改，则修改表格中对应行的数据。如果是添加，则添加到表格中
               */
                if (this.dangkang == '教师添加'){
                    //添加
                    //调用接口  省略
                    //把数据添加到表格中

                    if (this.form.name=='',this.form.name.length>5){

                    }else {
                        this.tableData.push(obj)
                    }
                }
                else {
                    //修改
                    //调用修改接口，发送thhp请求
                    //修改表格中的数据
                    if (this.form.name=='',this.form.name.length>5){

                    }else {
                        this.tableData.splice(this.eidtIndex,1,obj)
                    }

                }
                //清空form
               // Object.keys(this.form).forEach((key) =>{// Object.keys是取他的建返回
               //     return this.form[key] = ''
               // })

                for(let key in this.form){
                    this.form[key] = ''
                }
                //隐藏dialog
                this.dialogFormVisible = false
            },
            handleAdd(){
                Object.keys(this.form).forEach((key) =>{
                    return this.form[key] = ''
                })
       this.dialogFormVisible =true

            },
            //查询
            onSubmit() {
               // //调用后台的接口传递参数，获取数据赋值给tableData
               //  //get固定写法   查询
               //  this.$axios.get('/',{
               //      params:{
               //          name:this.formInline.name,
               //          sex:this.formInline.sex
               //      }
               //  }).then((res) =>{
               //      //把数据赋值给tableData
               //  })
               //
               //  //如果是post请求做法如下
               //  this.$axios.post('',this.formInline).then((res) =>{
               //      //把数据赋值给tableData
               //  })
                this.$get('/api/teacher.json').then((res) =>{
                    let rs = res.data
                    this.tableData = rs.dt
                    for (let i = 0; i <this.tableData.length ; i++) {

                     if (this.form.sex == 1){
                         let newSex = this.tableData.filter(o => o.sex==1)
                         this.tableData = newSex
                     }else {
                         let newIem =this.tableData.filter(u => u.sex==2)
                         this.tableData = newIem
                     }
                    }
                    const input = this.input
                    let newInput  = this.tableData.filter(p => p.name.indexOf(input)!==-1)
                    this.tableData =newInput
                })


            },
            handleEdit(index, row) {
                //1.弹出dialog
                this.dialogFormVisible = true
                //清空form
                for(let key in this.form){
                    this.form[key] = ''
                }
                this.dangkang = '教师信息修改' //不能掉了他因为掉了会变成添加
                let newRow = Object.assign( {},row)
                this.form = newRow
                this.eidtIndex = this.tableData.findIndex((t) =>{
                    return t.id ==row.id
                })
                //保存单击行的索引
            },
            handleDelete(index, row) {
                console.log(index, row);

                //通过要删除的行的id去数组中进行查询到该行的索引
                let newIdex = this.tableData.findIndex((t)=> {
                    return t.id==row.id
                })
                this.tableData.splice(newIdex,1)
            },
            getList(){
                console.log('getList')
                //this.$axios.get('/api/teacher.json')返回结果是peomise
                //'/api/teacher.json?page=2&pagesize=10'  一般有接口这样写
                this.$get('/api/teacher.json').then((res) =>{
                    console.log(res)
                    let rs = res.data
                    this.tableData = rs.dt

                    this.mm=rs.mm
                    this.edu=rs.edu
                    this.deg=rs.deg
                })
            },
            handleData(row,column,cellValue,index){
                if (!cellValue) return ''
                //字符转成日期格式
               let dt = new Date(cellValue)
                let year = dt.getFullYear()
                let month = dt.getMonth()+1<10 ? '0'+ (dt.getMonth()+1) : (dt.getMonth()+1)
                let  day = dt.getDate() <10 ? '0'+ dt.getDate() : dt.getDate()
                return year+'-'+month+'-'+day
            },
            handleSex(row,column,cellValue,index){
                if (!cellValue) return ''
              return cellValue == 1 ? '男':'女'

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
                console.log(handleList)
            },
            handleBatchDelete() {

                // this.handleList.splice()
                for (let i = 0; i <this.handleList.length ; i++) {
                let index = this.tableData.findIndex((item) =>{//// 默认去遍历tableData集合，将集合中的每个元素传入到item里，
                    return item.id === this.handleList[i].id  // this.handleList[i].id 这个是外部的函数id
                    console.log(index)
                })
                    this.tableData.splice(index,1)
            }


            },


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
    margin-top: 30px;
}
    .query-wrapper,.page-warpper{
        margin-top: 20px;
    }
    .yang{
        width: 100%;
        height: 100%;
        background: #42b983;
        z-index: 99;
    }
</style>