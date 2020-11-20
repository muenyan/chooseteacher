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
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="enddate"
                        label="结束日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="selectgrade"
                        label="参与遴选活动的年级"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="grade"
                        label="年级"
                        width="100">
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
                            placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" :label-width="formLabelWidth">
                    <el-date-picker
                            :label-width="formLabelWidth"
                            v-model="form.enddate"
                            type="datetime"
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
    export default {
        name: "Dict",
        data(){
            return{
                dangkang:'添加活动',
                dialogFormVisible: false,
                formLabelWidth: '300px',
                tableData:[],
                form:{
                    planname:'',
                    startdate:'',
                    enddate:'',
                    selectgrade:'',
                }
            }
        },
        mounted() {

            this.getList()
        },
        methods:{
            handleSave(){
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
                    this.$post('/api/TutorSelectionSystem_war/admin/updatePlan',this.$Qs.stringify(this.form)).then((res) =>{
                        console.log(res)
                    })
                }
                else {
                    //修改
                    //调用修改接口，发送thhp请求
                    //修改表格中的数据
                    this.dialogFormVisible =false
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
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            onSubmit(){
                console.log(this.form)
            },
            handleAdd(){
                this.dialogFormVisible = true
            },
            handleBatchDelete(){},
            handleBatchAdd(){},
            getList(){}

        }
    }
</script>

<style scoped>
    .query-wrapper{
        margin-top: 20px;
    }
</style>