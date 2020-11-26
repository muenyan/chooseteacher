<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >我的选择</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <div class="title">-->
<!--      <el-input-->
<!--          placeholder="请输入内容"-->
<!--          v-model="planname"-->
<!--          :disabled="true">-->
<!--      </el-input>-->
<!--      <el-input-->
<!--          style="margin-left: 20px"-->
<!--          placeholder="请输入内容"-->
<!--          v-model="statusmean"-->
<!--          :disabled="true">-->
<!--      </el-input>-->
<!--    </div>-->
    <div class="main-table" >
      <el-table

          border
          style="width: 99%"
          :data="tableData"
      >
        <el-table-column
            align="center"
            prop="tTeacher.name"
            label="教师姓名"
            width="200">
        </el-table-column>
        <el-table-column
            align="center"
            prop="tTeacher.teachernumber"
            label="教工号"
            width="150"
        >
        </el-table-column>

        <el-table-column
            align="center"
            prop="tTeacher.sex"
            label="性别"
            width="80"
        >
        </el-table-column>

        <el-table-column
            align="center"
            prop="tTeacher.professionaltitle"
            label="课题"
        >
        </el-table-column>
        <el-table-column
            align="center"
            prop="tTeacher.researchdirection"
            label="研究方向"
        >
        </el-table-column>
        <el-table-column
            align="center"
            width="150"
            label="审核结果"
            prop="status" :formatter="stateFormat"
        >


        </el-table-column>

      </el-table>
    </div>
    <div class="page-warpper">
<!--      <el-pagination-->
<!--          background-->
<!--          layout="total,prev, pager, next,sizes,jumper"-->
<!--          :page-size="pagesize"-->
<!--          :page-sizes="[5, 10, 20, 30]"-->
<!--          :total="tableData.length"-->
<!--          @current-change="handleCurrentChange"-->
<!--          @size-change="handleSizeChange"-->
<!--      >-->
<!--      </el-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseStudent",
  data(){
    return{
      tableData:[],
      st:''
      // currentpage:1,
      // pagesize:5,
      // //总页数
      // total:0,

      // statusmean:'',
      // planname:''
    }
  },
  mounted() {
    this.selectionActivities()
  },
  methods:{
    // 查询加入的遴选活动
    selectionActivities(){
      this.$post('api/TutorSelectionSystem_war/student/selectionActivities',this.$Qs.stringify()).then((res) =>{
        // console.log(res)
        if (res.code == 200){

          let ids = res.plans.map((item) => item.id).toString()
          // console.log(ids)
          this.$post('api/TutorSelectionSystem_war/student/studentFindResult',this.$Qs.stringify({id:ids})).then((res) =>{
            if (res.code == 200){
              // console.log(res.planstudent)

              // this.tableData.push(newstatus)
              this.tableData = res.planstudent
              // this.tableData.statu = newstatus
              // console.log(this.tableData.statu)
              // console.log(newstatus)


            }
            // if (res.code == 501){
            //   this.$message({
            //     message: res.msg,
            //     type: 'warning'
            //   });
            // }
            if (res.code == 500){
              this.$message.error(res.msg);
            }
            if (res.code ==502 ){
              this.$message.error(res.msg)
            }

          })
        }

      })
    },
    // 分页代码
    handleCurrentChange(val){
      // console.log('单击页码',val)
      this.currentpage = val

    },
    handleSizeChange(val){
      this.pagesize = val
    },
    stateFormat(row, column) {
      if (row.status == 0) {
        return '审核中'
      } else if(row.status == 1) {
        return '被退回'
      }else if (row.status == 2) {
        return '通过'
      }
    },

  }


}
</script>


<style scoped>
.main-table{
  margin-top: 20px;
}
.title{

  margin-top: 10px;
  display: flex;
  width: 400px
}
</style>