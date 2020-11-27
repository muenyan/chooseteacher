<template>
    <div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item >遴选活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="query-wrapper">
            </div>
        </div>
        <div class="user-top">
            <div class="top-left" style="position: relative">
                <el-form :model="form" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">开始学生选导师时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselectonestartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStart"
                            @change="startTimeStatus"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">结束学生选导师时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselectoneenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEnd"
                            @change="endTimeStatus"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">开始导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselectonestartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStarta"
                            @change="startTimeStatusa"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">结束导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselectoneenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEnda"
                            @change="endTimeStatusa"
                            placeholder="选择结束日期时间">
                    </el-date-picker>

                </el-form>
            </div>
            <div class="top-center" style="position: relative">
                <el-form :model="form" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">开始学生选导师时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselecttwostartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStartb"
                            @change="startTimeStatusb"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">结束学生选导师时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselecttwoenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEndb"
                            @change="endTimeStatusb"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">开始导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselecttwostartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStartc"
                            @change="startTimeStatusc"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">结束导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselecttwoenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEndc"
                            @change="endTimeStatusc"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                </el-form>
            </div>
            <div class="top-right" style="position: relative">
                <el-form :model="form" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px;">开始导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselectthreestartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStartd"
                            @change="startTimeStatusd"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">学生开始选择学生的时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.studentselectthreeenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEndd"
                            @change="endTimeStatusd"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px;">学生结束选择学生的时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselectthreestartdate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsStarte"
                            @change="startTimeStatuse"
                            placeholder="选择开始日期时间">
                    </el-date-picker>
                    <p style="font-size: 18px;color: #312a2a;margin-left: 55px">结束导师选学生时间</p>
                    <el-date-picker
                            class="picker-1"
                            v-model="form.teacherselectthreeenddate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :picker-options="pickerOptionsEnde"
                            @change="endTimeStatuse"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                    <br>
                    <el-button type="primary"
                               @click="modifya"
                               class="anniu"
                               style="margin-left: 170px"
                    >修改</el-button>
                    <el-button
                            type="primary"
                            @click="Submita()"
                            v-show="pop"
                            class="anniu"
                            style="position: absolute;left: 260px;bottom: 13px"
                    >提交</el-button>
                </el-form>
            </div>
        </div>
        <div class="user-bottom"  style="margin-top: 30px">
            <template>
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="加入的导师" name="first" >
                        <div class="tbl-wrapper">
<!--                            -->
                            <el-table

                                    border
                                    @selection-change="handleBa"
                                    :data="list.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                                    style="width: 100%">
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
                                        width="200">
                                </el-table-column>
                                <el-table-column
                                        prop="education"
                                        label="学历"
                                        width="120"
                                >
                                </el-table-column>

                                <el-table-column
                                        prop="academicdegree"
                                        label="学位"
                                        width="140"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="arys.counts"
                                        label="数量"
                                        width="100"
                                >
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                v-show="uii"
                                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                v-show="uii"
                                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleSee(scope.$index, scope.row)">查看结果</el-button>

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
                                    :total="list.length"
                                    @current-change="handleCurrentChange"
                                    @size-change="handleSizeChange"
                            >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="未加入的导师" name="second" >
                        <div class="tbl-wrapper">
<!--                            -->
                            <el-table
                                    :data="lists.slice((currentpages-1)*pagesizes,currentpages*pagesizes)"
                                    border
                                    @selection-change="handleBas"
                                    style="width: 100%">
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
                                        width="200"
                                >
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                                size="mini"
                                                @click="handletianjia(scope.$index, scope.row)">添加</el-button>

                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="page-warpper">
                            <el-pagination
                                    background
                                    layout="total,prev, pager, next,sizes"
                                    :page-size="pagesizes"
                                    :page-sizes="[5, 10, 20, 30]"
                                    :total="lists.length"
                                    @current-change="handleCurrentChanges"
                                    @size-change="handleSizeChanges"
                            >
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-dialog :title="dangkang" :visible.sync="dialogFormVisible">
                        <el-form>
                            <el-form-item label="所带学生数量" prop="counts" :label-width="formLabelWidth">
                                <el-input v-model="count" size="mini" style="width: 230px"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="handleSave">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-tabs>
            </template>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import moment from 'moment' //引入文件
    export default {
        name: "User",
        data(){
            return{
                pickerOptionsStart: {
                    disabledDate: time => {
                        let endDateVal = this.overDate;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEnd: {
                    disabledDate: time => {
                        let beginDateVal = this.createDate;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                    },
                pickerOptionsStarte: {
                    disabledDate: time => {
                        let endDateVal = this.overDatee;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEnde: {
                    disabledDate: time => {
                        let beginDateVal = this.createDate;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                },
                pickerOptionsStartd: {
                    disabledDate: time => {
                        let endDateVal = this.overDatede;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEndd: {
                    disabledDate: time => {
                        let beginDateVal = this.createDated;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                },
                pickerOptionsStartc: {
                    disabledDate: time => {
                        let endDateVal = this.overDatec;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEndc: {
                    disabledDate: time => {
                        let beginDateVal = this.createDatec;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                },
                pickerOptionsStartb: {
                    disabledDate: time => {
                        let endDateVal = this.overDateb;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEndb: {
                    disabledDate: time => {
                        let beginDateVal = this.createDateb;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                },
                pickerOptionsStarta: {
                    disabledDate: time => {
                        let endDateVal = this.overDatea;
                        if (endDateVal) {
                            return time.getTime() > new Date(endDateVal).getTime();
                        }
                    }
                },
                pickerOptionsEnda: {
                    disabledDate: time => {
                        let beginDateVal = this.createDatea;
                        if (beginDateVal) {
                            return (
                                time.getTime() <
                                new Date(beginDateVal).getTime()
                            );
                        }
                    }
                },
                uii:false,
                lid:'',
                dialogFormVisible: false,
                formLabelWidth: '200px',
                dangkang:'添加教师和数量',
                handleList:[],
                handleLists:[],
                poy:false,
                pop:false,
                pot:false,
                eidtIndex:0,
                activeName: 'first',
                currentpage:1,
                pagesize:5,
                currentpages:1,
                pagesizes:5,
                list: [],
                lists:[],
                thn:false,
                formby:{
                    planid:'',
                    selectteacherid:''
                },
                form:{
                    id:'',
                    teacherselectonestartdate:'',
                    teacherselectoneenddate:'',
                    studentselectonestartdate:'',
                    studentselectoneenddate:'',
                    teacherselecttwostartdate:'',
                    teacherselecttwoenddate:'',
                    teacherselectthreestartdate:'',
                    teacherselectthreeenddate:'',
                    studentselecttwostartdate:'',
                    studentselecttwoenddate:'',
                    studentselectthreestartdate:'',
                    studentselectthreeenddate:'',
                },
                formInline:{
                    id:''
                },
                formPid:{
                    id:''
                },
                formId:{
                    planid:'',
                    teacherid:'',
                    counts: ''
                },
                count:'',
                lay:{
                    id:'',
                    counts:''
                }
            }
        },

        mounted() {
            console.log('555555')
            this.mapui()
            let id = this.$route.params.id
            console.log('id: ' + this.$route.params.id);
            // this.form.id=this.$router.params.id
            this.getList(id)
        },
        methods:{
            // 时间开始选择器
            startTimeStatus:function(value){
                this.createDate = value
            },
            // 时间结束选择器
            endTimeStatus:function(value){
                this.overDate = value
            },
            startTimeStatuse:function(value){
                this.createDatee = value
            },
            endTimeStatuse:function(value){
                this.overDatee = value
            },
            startTimeStatusd:function(value){
                this.createDated = value
            },
            endTimeStatusd:function(value){
                this.overDated = value
            },
            startTimeStatusc:function(value){
                this.createDatec = value
            },
            endTimeStatusc:function(value){
                this.overDatec = value
            },
            startTimeStatusb:function(value){
                this.createDateb = value
            },
            endTimeStatusb:function(value){
                this.overDateb = value
            },
            startTimeStatusa:function(value){
                this.createDatea = value
            },
            endTimeStatusa:function(value){
                this.overDatea = value
            },
            handleSave(){
                if (this.dangkang == '添加教师和数量'){

         // console.log(this.$route.params.id)
         this.formId.planid = this.$route.params.id
         this.formId.teacherid = this.lid
         // console.log(this.formId.teacherid)
         this. dialogFormVisible = false
         console.log(this.count)
         this.formId.counts = this.count
         this.$post('/api/TutorSelectionSystem_war/admin/insertTeacherInPlan',this.$Qs.stringify(this.formId)).then((res) =>{
             console.log(res)
             if(res.code==200){
                 this.handlebuli()

             }else {
                 alert(res.msg)
             }
         })
         this.count=''
     }else {
         this.dialogFormVisible =false

                  this.lay.counts = this.count
                    console.log(this.lay)
                    this.$post('/api/TutorSelectionSystem_war/admin/editTeacherInPlan',this.$Qs.stringify(this.lay)).then((res) =>{
                        console.log(res)
                        if (res.code == 200){
                             this.count =res.counts

                            this.handlebulis()
                        }else {

                        }
                    })

     }
            },
            Submita(index ,row){
                this.pop = false
               let ary = moment(this.form).format('YYYY-MM-DD HH:mm:ss')
                console.log(ary)
                 this.form.id = this.$route.params.id
                // this.form = ary
                this.$post('/api/TutorSelectionSystem_war/admin/updatePlan',this.$Qs.stringify(this.form)).then((res) =>{
                    console.log(res)
                    if (res.code==200){
                console.log('88888888888')
                        this.getList()
                        // this.$router.push('/home/user/'+row.id)
                        alert('设置成功')
                    }else {
                            alert(res.msg)
                    }
                })
            },
            handleAdd(){},
            handleBatchAdd(){},
            onSubmit(){},
            //批量删除
            handleBa(handleList){
                this.handleList = handleList
            },
            handleBas(handleLists){
                this.handleLists = handleLists
            },
            //查看
            handleSee(index ,row){
                console.log('dddd',row.id)
                this.formby.selectteacherid = row.id
                this.$post('/api/TutorSelectionSystem_war/admin/TeacherToViewFinalSelectionResults',this.$Qs.stringify(this.formby)).then((res) =>{
                    console.log(res)
                    this.$router.push('/home/queryteachers/'+row.id)
                })

            },
            //删除
            handleDelete(index, row){

                console.log(row.id)
                this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'

                }).then(() => {
                    this.$post('/api/TutorSelectionSystem_war/admin/deleteTeacherInPlan',this.$Qs.stringify({id:row.id})).then((res) =>{
                        if(res.code==200){
                            this.handlebulis()

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
            // 编辑
            handleEdit(index ,row){
                this.dialogFormVisible =true
                this.dangkang = '教师信息修改' //不能掉了他因为掉了会变成添加
                let newRow = Object.assign( {},row)
                this.form = newRow
                 this.lay.id = row.id
            },
            //添加
            handletianjia(index ,row){
                this.dialogFormVisible = true
                for(let key in this.formId){
                    this.formId[key] = ''
                }
                console.log(row.id)
                this.lid = row.id

                //planid   teacherid   counts
                // let newIndex = this.tableData.findIndex((t)=> t.id==row.id)
                // let newIndex = this.lists.findIndex((t)=> t.id==row.id)
                // this.eidtIndex.id=this.lists[newIndex].id
            },
            handleCurrentChange(val){
                this.currentpage = val
            },
            handleSizeChange(val){
                this.pagesize = val
            },
            handleCurrentChanges(val){
                this.currentpage = val
            },
            handleSizeChanges(val){
                this.pagesize = val
            },
            handlebuli(){
                this.formInline.id = this.form.id
                this.$post('/api/TutorSelectionSystem_war/admin/teacherNoPlan',this.$Qs.stringify({id:this.formInline.id})).then((res) =>{
                    if (res.code==200){
                        this.lists = res.teachers
                    }else {
                        alert(res.msg)
                    }

                })
            },
            handlebulis(){
                this.$post('/api/TutorSelectionSystem_war/admin/teacherInPlan',this.$Qs.stringify({id:this.formPid})).then((res) =>{

                    if (res.code==200){
                        let pot = []
                        let pop = []
                        for (let i = 0; i <res.teachers.length ; i++) {
                            pot.push(res.teachers[i])
                        }
                        this.list = pot
                    }else{}
                })
            },
            handleClick(tab, row) {

                if (tab.name=='second'){
                    // console.log(this.form.id)
                    this.formInline.id = this.form.id
                    this.$post('/api/TutorSelectionSystem_war/admin/teacherNoPlan',this.$Qs.stringify({id:this.formInline.id})).then((res) =>{
                        if (res.code==200){
                            // console.log(res)
                            if (res.teachers) {
                                this.lists = res.teachers
                            }
                        }else {
                            alert(res.msg)
                        }
                    })
                } if (tab.name=='first') {
                    // console.log(this.form.id)
                    this.formPid = this.form.id
                    this.$post('/api/TutorSelectionSystem_war/admin/teacherInPlan',this.$Qs.stringify({id:this.formPid})).then((res) =>{
                            console.log('rrrr',res.teachers)
                        if (res.code==200){
                            let ary = res.teachers.map((item) => item.tTeacher)
                            // let arys = res.teachers.map((item) => item.counts)
                            // console.log('count',arys)
                            this.list = ary
                            // this.list.counts = arys
                            // this.list.counts.push(arys)
                            // console.log(this.list)


                            let kuyt = res.teachers.map((item) =>item.status)
                            console.log('852',kuyt)
                            if (res.teachers.map((item) =>item.status) == '7'){
                                this.uii = true
                            }
                        }else{
                        }
                    })
                }
            },
            mapui(){
                this.$post('/api/TutorSelectionSystem_war/admin/teacherInPlan',this.$Qs.stringify({id:this.formPid})).then((res) =>{
                    // console.log(res.teachers)
                    if (res.code==200){

                        let ary = res.teachers.map((item) => item.tTeacher)
                        // let arys = res.teachers.map((item) => item.counts)
                        // console.log('count',ary)
                        this.list = ary
                        // this.list.counts = arys
                        // this.list.push(arys)
                        // console.log(this.list)

                    }else{

                    }


                })
            },
            modifya(){
                this.pop = true
            },
            getList(id){
                this.$post('/api/TutorSelectionSystem_war/admin/findPlanById',this.$Qs.stringify({id: id})).then((res) =>{
                   // console.log('???',res.plan.status)
                    this.formby.planid = res.plan.id
                    console.log('???',res.plan.id)
                    if (res.code==200){
                        this.form.id = res.plan.id
                         this.form.studentselectonestartdate=res.plan.studentselectonestartdate
                        this.form.studentselectoneenddate = res.plan.studentselectoneenddate
                        this.form.teacherselectonestartdate = res.plan.teacherselectonestartdate
                        this.form.teacherselectoneenddate = res.plan.teacherselectoneenddate
                        this.form.studentselecttwostartdate = res.plan.studentselecttwostartdate
                        this.form.studentselecttwoenddate = res.plan.studentselecttwoenddate
                        this.form.teacherselecttwostartdate = res.plan.teacherselecttwostartdate
                        this.form.teacherselecttwoenddate = res.plan.teacherselecttwoenddate
                        this.form.studentselectthreestartdate = res.plan.studentselectthreestartdate
                        this.form.studentselectthreeenddate = res.plan.studentselectthreeenddate
                        this.form.teacherselectthreestartdate = res.plan.teacherselectthreestartdate
                        this.form.teacherselectthreeenddate = res.plan.teacherselectthreeenddate

                        if (res.plan.status == '-2'){
                            this.uii = true
                        }
                    }else {
                    }
                })
            }
        },

    }


</script>

<style scoped>
    .user-top{
        display: flex;
        width: 100%;
        height: 500px;
        margin-top: 10px;
    }
.top-left{
    background: #ffffff;
flex: 1;
    height: 100%;
}
    .top-center{
        background: #ffffff;
        flex: 1;
        height: 100%;
    }
    .top-right{
        background: #ffffff;
        flex: 1;
        height: 100%;
    }
    .user-bottom{
        width: 100%;
        height: 800px;
    }
    .picker-1{
        margin-left: 65px;
    }
    .anniu{
        margin: 30px 140px;
    }

</style>