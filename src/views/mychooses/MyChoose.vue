<template>
    <div>
        <div class="tbl-wrapper">
            <!--                :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"-->
            <!--                :data="tables.slice((currentpage-1)*pagesize,currentpage*pagesize)"-->
            <el-table

                    border
                    style="width: 100%"
                    :data="tableData"

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
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="teachernumber"
                        label="教工号"
                        width="120"
                >
                </el-table-column>

                <el-table-column
                        prop="sex"
                        label="性别"
                        width="60"
                >
                </el-table-column>
                <el-table-column
                        prop="politicaloutlook"
                        label="政治面貌"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="education"
                        label="学历"
                        width="100"
                >
                </el-table-column>

                <el-table-column
                        prop="academicdegree"
                        label="学位"
                        width="110"
                >
                </el-table-column>
                <el-table-column
                        prop="professionaltitle"
                        label="课题"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="researchdirection"
                        label="研究方向"
                        width="165">
                </el-table-column>
                <el-table-column
                        prop="school"
                        label="毕业院校"
                        width="165">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="160px"
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

                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChooseStudent",
        data(){
            return{
                tableData:[],
            }
        },
        methods:{
            handleEdit(){},
            handleDelete(){},
        }

    }
</script>

<style scoped>

</style>