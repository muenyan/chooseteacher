<template>
    <div>
        <div class="tbl-wrapper">
            <el-table
                    :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
                    border
                    style="width: 100%">
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
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
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
                tableData:[],
                currentpage:1,
                pagesize:5,
            }
        },
        methods:{
            handleEdit(){},
            handleDelete(){},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentpage = val
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagesize = val
            },
        }
    }
</script>

<style scoped>

</style>