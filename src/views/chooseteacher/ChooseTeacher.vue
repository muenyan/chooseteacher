<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >选择导师</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title">
      <el-input
          placeholder="请输入内容"
          v-model="planname"
          :disabled="true">
      </el-input>
      <el-input
          style="margin-left: 20px"
          placeholder="请输入内容"
          v-model="statusmean"
          :disabled="true">
      </el-input>
    </div>
    <div class="main-table" >
      <el-table

          border
          style="width: 99%"
          :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
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
            width="100"
            prop="counts"
            label="学生数量"
        >
        </el-table-column>
        <el-table-column
            align="center"
            fixed="right"
            width="160px"
              label="操作">
          <template  slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="handleselect(scope.$index, scope.row)"
            >选择</el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>
  <div class="page-warpper">
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
            //总页数
            total:0,
            statusmean:'',
            planname:''
          }
      },
      mounted() {
      this.selectionActivities()
      },
      methods:{
        //查询加入的遴选活动
        selectionActivities(){
          this.$post('api/TutorSelectionSystem_war/student/selectionActivities',this.$Qs.stringify()).then((res) =>{
            console.log(res)

            if (res.code == 200){

              let status = res.plans.map((item) => item.status).toString()
              this.planname = res.plans.map((item) => item.planname).toString()
              // console.log(res.plans.planname)
              if (status == -2){
                this.statusmean = '遴选活动未开始'
              }
              if (status == -1){
                this.statusmean = '遴选活动已结束'
              }
              if (status == 0){
                this.statusmean = '其他'
              }
              if (status == 1){
                this.statusmean = '第一轮学生选择'
              }
              if (status == 2){
                this.statusmean = '第一轮老师选择'
              }
              if (status == 3){
                this.statusmean = '第二轮学生选择'
              }
              if (status == 4){
                this.statusmean = '第二轮老师选择'
              }
              if (status == 5){
                this.statusmean = '第三轮学生选择'
              }
              if (status == 6){
                this.statusmean = '第三轮老师选择'
              }
              let ids = res.plans.map((item) => item.id).toString()
              // console.log(ids)
              this.$post('api/TutorSelectionSystem_war/student/studentFindTeacher',this.$Qs.stringify({id:ids})).then((res) =>{
              // console.log(res)
                if (res.code == 200){

                  this.tableData = res.teachers
                  // console.log(this.tableData)

                }
                if (res.code == 501){
                  console.log(res.msg)
                  this.$message({
                    message: res.msg,
                    type: 'warning'
                  });
                }
                if (res.code == 500){
                  console.log(res.msg)
                  this.$message(res.msg);
                }
                if (res.code ==502 ){
                  console.log(res.msg)
                  this.$message(res.msg)
                }
                if (res.code ==503 ){
                  console.log(res.msg)
                  this.$message(res.msg)
                }

              })
            }

          })
        },
        //选择老师
        handleselect(index,row){
          // console.log(row.planid,row.tTeacher.id)
          this.$post('api/TutorSelectionSystem_war/student/studentChooserTeacher',this.$Qs.stringify(
              {
                planid:row.planid,
                selectteacherid:row.tTeacher.id
              }
              )).then((res) =>{
            this.selectionActivities()
            console.log(res)
            this.$router.push('/home/mychoose')

          })
        },
        //分页代码
        handleCurrentChange(val){
          // console.log('单击页码',val)
          this.currentpage = val

        },
        handleSizeChange(val){
          this.pagesize = val
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