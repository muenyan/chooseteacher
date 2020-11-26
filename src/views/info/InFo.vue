<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item >个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人资料</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="main">

        <div class="main-info">
          <div class="admin" v-if = "adminShow">
            <el-form :model="curradmin"   status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="登录名" prop="pass">
                <el-input type="userName" v-model="curradmin.name" autocomplete="off"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="邮箱"  prop="checkPass">
                <el-input type="text" v-model="curradmin.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="age">
                <el-input type="text" v-model="curradmin.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" align="center" style="width: 150px" @click="submitadmin">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="teacher"  v-if= "teacherShow">
            <el-form :model="currteacher" status-icon  ref="currteacher" label-width="100px" class="demo-ruleForm">
              <el-form-item label="教师编号" prop="teachernumber">
                <el-input type="userName" v-model="currteacher.teachernumber" autocomplete="off"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="currteacher.name" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="currteacher.sex" placeholder="性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" prop="birth">
                <el-date-picker
                    v-model="currteacher.birth"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="政治面貌" prop="politicaloutlook">
                <el-select v-model="currteacher.politicaloutlook" placeholder="政治面貌">
                  <el-option label="党员" value="党员"></el-option>
                  <el-option label="团员" value="团员"></el-option>
                  <el-option label="群众" value="群众"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历" prop="education">
                <el-select v-model="currteacher.education" placeholder="政治面貌">
                  <el-option label="专科" value="专科"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="研究生" value="研究生"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学位" prop="academicdegree">
                <el-select v-model="currteacher.academicdegree" placeholder="政治面貌">
                  <el-option label="学士" value="学士"></el-option>
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="博士" value="博士"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 150px" @click="submitteacher()">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="student"  v-if = "studentShow">
            <el-form :model="currstudent" status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="学号" prop="pass">
                <el-input type="userName" v-model="currstudent.stunumber" autocomplete="off"  :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="stuname">
                <el-input type="text" v-model="currstudent.stuname" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="currstudent.sex" placeholder="性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" prop="birth">
                <el-date-picker
                    v-model="currstudent.birth"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="专业" prop="profession">
                <el-input type="text" v-model="currstudent.profession" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="年级" prop="grade">
                <el-input type="text" v-model="currstudent.grade" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input type="text" v-model="currstudent.phone" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="currstudent.email" autocomplete="off"  ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 150px" @click="submitstu">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
<!--        <div class="header">-->
<!--          <form >-->
<!--            <input type="file" name="fileInput" @change="getFile($event)">-->
<!--            <button @click="submitForm($event)">提交</button>-->
<!--          </form>-->

<!--        </div>-->
        <div class="update">
          <el-button  @click="centerDialogVisible = true">上传头像</el-button>
          <el-dialog
              title="请选择头像"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
            <span slot="footer" class="dialog-footer">
               <form style=" margin-bottom: 40px" >
                <input ref="clearFile" class="input-photo" type="file" name="fileInput" @change="getFile($event)">

              </form>

    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm($event)" >确 定</el-button>
  </span>
          </el-dialog>
        </div>
      </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Moment from "moment"

    export default {
        name: "InFo",
        data() {
            return {
              adminShow:true,
              teacherShow:false,
              studentShow:false,
              adminform:{
                email: '',
                phone:''

              },
              teacherform:{
                name:'',
                teachernumber:'',
                sex:'',
                birth:'',
                politicaloutlook:'',
                education:'',
                academicdegree:'',
              },
              studentform:{
                stuname:'',
                stunumber:'',
                profession:'',
                grade:'',
                email:'',
                sex:'',
                birth:''
              },
              file: '',
              centerDialogVisible: false
            }
        },
      mounted() {

          // console.log(this.curruser.role)
          if (this.curruser.role == 2){
            console.log(this.curruser.role)
            this.adminShow = false
            this.teacherShow = true
            this.studentShow = false
          }
          if (this.curruser.role == 1){
            console.log(this.curruser.role)
            this.adminShow = true
            this.teacherShow = false
            this.studentShow = false
          }
          if (this.curruser.role == 3 ){
            console.log(this.curruser.role)
            this.adminShow = false
            this.teacherShow = false
            this.studentShow = true
          }

      },
      methods: {
            submitadmin(){
                this.adminform = this.curradmin
              this.$post('api/TutorSelectionSystem_war/admin/edit',this.$Qs.stringify(this.adminform)).then((res) =>{
                console.log(res)
                if (res.code == 200){
                  // 更新vuex
                  this.$store.commit('setadmin',this.curradmin)
                  //更新sessionStorage
                  sessionStorage.setItem('curradmin', JSON.stringify(this.curradmin))
                  this.$message({
                    message: '修改个人信息成功',
                    type: 'success'
                  })
                }else if (res.code == 500){
                  this.$message.error('修改个人信息失败');
                }
              })
                },
            submitstu(){
              //提交学生
              this.studentform = this.currstudent
              let currbirth = Moment(this.currstudent.birth).format('YYYY-MM-DD')
              console.log(currbirth)
              this.studentform.birth = currbirth
              // console.log(this.studentform)
              this.$post('api/TutorSelectionSystem_war/student/edit',this.$Qs.stringify(this.studentform)).then((res) =>{
                console.log(res)
                if (res.code == 200){
                  // 更新vuex
                  this.$store.commit('setstudent',this.currstudent)
                  //更新sessionStorage
                  sessionStorage.setItem('currstudent', JSON.stringify(this.currstudent))
                  this.$message({
                    message: '修改个人信息成功',
                    type: 'success'
                  })
                }else if (res.code == 500){
                  this.$message.error('修改个人信息失败');
                }
              })

        },
            submitteacher(){

              //提交教师

              this.teacherform = this.currteacher
              let currbirth = Moment(this.currteacher.birth).format('YYYY-MM-DD')
              console.log(currbirth)
              this.teacherform.birth = currbirth
              // console.log(this.teacherform)
              this.$post('api/TutorSelectionSystem_war/teacher/edit',this.$Qs.stringify(this.teacherform)).then((res) =>{
                console.log(res)
                if (res.code == 200){
                  // 更新vuex
                  this.$store.commit('setteacher',this.currteacher)
                  //更新sessionStorage
                  sessionStorage.setItem('currteacher', JSON.stringify(this.currteacher))
                  // sessionStorage.setItem('currteacher', JSON.stringify(this.currteacher))
                  this.$message({
                    message: '修改个人信息成功',
                    type: 'success'
                  })
                }else if (res.code == 500){
                  this.$message.error('修改个人信息失败');
                }
              })

            },
        getFile(event) {
          this.file = event.target.files[0];
          // console.log(this.file);
        },
        submitForm(event) {
          event.preventDefault();
          let formData = new FormData();
          formData.append('fileInput', this.file);
          this.centerDialogVisible = false
          this.$post('api/TutorSelectionSystem_war/user/updateImg',formData).then((res) => {
            if (res.code == 200){
              this.$store.commit('setuser', res.user)
              sessionStorage.setItem('curruser', JSON.stringify(res.user))
              this.$refs.clearFile.value = '';
              this.$message(
                  {
                    type:"success",
                    message:'上传头像成功'
                  }
              )
            }if (res.code == 500){
              this.error.$message('上传失败')
            }
          })
        }
        },
        computed:{
            ...mapState(['curruser','currteacher','currstudent','curradmin']),
        },
    }
</script>

<style scoped>
.main{
  position: relative;
  margin: 0 auto;
  margin-top: 50px;
  width: 500px;
  /*height: 300px;*/
  /*border: 1px solid red;*/
  border-radius: 10px;
  background: white;
}
.main-info{
  padding: 20px 100px 0px 40px;
  /*padding-right: 60px;*/
}

.header{
  /*border: 1px solid red;*/
  width: 100px;
  margin-left: 140px;
  /*margin-bottom: 40px;*/
  padding-bottom: 20px;
}
.update{
  margin-left: 140px;
  padding-bottom: 20px;
  /*position: absolute;*/
}
.input-photo{
/*display: none;*/
}
</style>