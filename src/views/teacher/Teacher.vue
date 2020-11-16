<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '' }">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--        查询-->
    <div class="query-wrapper">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="姓名">
          <el-input v-model="search" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formInline.sex">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleAdd">添加</el-button>
          <el-button type="primary" @click="handleBatchDelete">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--        dailog-->
    <div class="dialog-wrapper">
      <el-dialog :title="dailogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form" class="dlwp-form" :rules="rules"  ref="form">
          <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择" >
              <el-option v-for="item in ss" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <el-date-picker
                v-model="form.birthday"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="政治面貌" :label-width="formLabelWidth">
            <el-select v-model="form.zzmm" placeholder="请选择">
              <el-option v-for="(item,i) in mm" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" :label-width="formLabelWidth">
            <el-select v-model="form.education" placeholder="请选择">
              <el-option v-for="(item,i) in edu" :label="item" :value="item"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="学位" :label-width="formLabelWidth">
            <el-select v-model="form.degree" placeholder="请选择">
              <el-option v-for="(item,i) in deg" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="毕业院校" :label-width="formLabelWidth">
            <el-input v-model="form.graduation" autocomplete="off" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="研究方向" :label-width="formLabelWidth">
            <el-input v-model="form.direction" autocomplete="off" style="width: 220px"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--        数据列表-->
    <div class="tbl">
      <div class="tbl-wrapper">
        <!--              -->
        <!--              :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"-->
        <el-table
            :data="tableData.slice((currentpage-1)*pagesize,currentpage*pagesize)"
            border
            @selection-change = "handleSelection"
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
              :formatter="handleSex"
              prop="sex"
              label="性别"
              width="80">
          </el-table-column>
          <!--                    :formatter="handleDate"-->
          <el-table-column
              prop="birthday"
              label="出生日期"
              width="120">
          </el-table-column>
          <el-table-column
              prop="zzmm"
              label="政治面貌"
              width="120">
          </el-table-column>
          <el-table-column
              prop="education"
              label="学历"
              width="120">
          </el-table-column>
          <el-table-column
              prop="degree"
              label="学位"
              width="100">
          </el-table-column>
          <el-table-column
              prop="graduation"
              label="毕业院校"
              width="180">
          </el-table-column>
          <el-table-column
              prop="direction"
              label="研究方向"
          >
          </el-table-column>
          <el-table-column
              align="center"
              label="操作"
              width="180">
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
    </div>
    <!--        分页控件-->
    <div class="page-wrapper">
      <el-pagination
          background
          layout="total,sizes,prev, pager, next"
          :total="tableData.length"
          :page-sizes="[5, 10, 20]"
          :page-size="pagesize"
          @current-change="handlePageChange"
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
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      name: '',
      sex:'',
      tableData: [],
      ss:[],
      mm:[],
      edu:[],
      deg:[],
      formInline: {
        name: '',
        sex: '0'
      },
      dialogFormVisible: false,
      form: {
        name: '',
        birthday:'',
        sex: '',
        zzmm:'',
        education:'',
        degree:'',
        graduation:'',
        direction:''
      },
      formLabelWidth: '120px',
      dailogTitle:'教师信息添加',
      editIndex:0,
      currentpage:1,
      pagesize:5,
      selectedRow:[],
      rules:{
        name:  [
          { required: true, message: '请输入姓名', trigger: ['blur','change'] }
        ]
      },
      search:'',

    }
  },
  //实时监听表格
  computed:{

    // tables: function () {
    //   const search = this.search
    //   if (search){
    //     return this.tableData.filter(d => {
    //       return Object.keys(d).some(key => {
    //         return String(d[key]).indexOf(search) > -1
    //       })
    //     })
    //
    //   }
    //   return this.tableData
    // }
  },
  mounted() {
    this.getList()


  },
  methods: {
    getList(){
      // 如果有后台，则可以这样请求 第一页，一次10条 this.$axios.get('/api/teacher.json ?page =1 &pagesize = 10').then((res) =>
      this.$get('/api/teacher.json').then((res) =>{
        let rs = res.data
        this.tableData = rs.dt

        this.mm = rs.mm
        this.edu = rs.edu
        this.deg = rs.deg
        this.ss = rs.ss
      })
    },
    //查询
    onSubmit() {
      //思路：调用后台接口，传递参数，获取数据赋值给tableData
      // get请求：
      // this.$axios.get('/api/query',{
      //     params:{
      //         name: this.formInline.name,
      //         sex: this.formInline.sex,
      //         page:1
      //     }
      // }).then((res) =>{
      //     //把数据赋值给tableData
      // })

      //如果是post请求
      // this.$axios.post('',this.formInline).then((res) =>{
      //     //把数据赋值给tableData
      // })
      this.$get('/api/teacher.json').then((res) =>{
        let rs = res.data
        this.tableData = rs.dt
        const search = this.search
        let newTableData = this.tableData.filter((p) => p.name.indexOf(search) !== -1 )
        this.tableData =newTableData

        // console.log(this.formInline.sex)
        if (this.formInline.sex == 1){
          let newsexdata = this.tableData.filter(d => d.sex == 1)
          this.tableData =newsexdata
        }else if (this.formInline.sex == 2){
          let newsexdata = this.tableData.filter(d => d.sex == 2)
          this.tableData =newsexdata
        }

      })
    },
    handleSelection(sel){
      this.selectedRow = sel
      // console.log(sel)
    },
    //批量删除
    handleBatchDelete(){
      //第一步：获取选中的项


      this.$confirm('确定删除该教师么?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除操作：1.这里应该调用接口，此处没有接口，省略。。。

        //2.从数组中删除掉数据
        //思路：根据通过要删除行的id去数组中进行查询到该行的索引
        //   console.log(this.selectedRow)
        for (let i = 0; i < this.selectedRow.length; i++) {
          let newBatchindex = this.tableData.findIndex((d) => d.id == this.selectedRow[i].id)
          this.tableData.splice(newBatchindex,1)
          console.log(this.selectedRow[i].name+'已成功删除')
        }
        //提示
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

    //添加
    handleAdd() {
      this.dialogFormVisible = true
      // 清空form //.keys 取对象的所有键
      Object.keys(this.form).forEach((key) => this.form[key] = '')
      this.dailogTitle = '教师信息添加'
    },
    //保存
    handleSave(){
      //第一步 通过原始的对象生成一个新的对象
      let obj =  Object.assign({},this.form)
      /*
      * 第二步

      *
      * 2）如果是修改，则修改表格中对用的数据，如果是添加，则添加到表格中
      *
      *
      * */
      // 首先要判断本次是添加还是修改？
      // 如果是添加，则调用添加接口，如果是修改，则调用修改接口，这里修改接口省略
      if (this.dailogTitle == '教师信息添加'){
        //添加
        //调用接口省略
        // 。。。
        //把数据添加到表格中

        // 验证姓名表单不能为空
        this.$refs.form.validate((valid) => {
          if (valid){
            //第二步 添加到数组
            this.tableData.push(obj)
            //关闭dialog
            this.dialogFormVisible = false
          }else {
            //保持dialog打开
            this.dialogFormVisible = true
            //控制台打印
            console.log('请输入姓名')
            return false;
          }
        })
        //第三步 清空form //.keys 取对象的所有键
        Object.keys(this.form).forEach((key) => this.form[key] = '')
      }else if (this.dailogTitle = '教师信息修改'){
        //修改
        //调用修改接口，发送http请求
        //。。。。

        //验证修改的dialog中form表单姓名不能为空
        this.$refs.form.validate((valid) => {
          if (valid){
            //修改表格中对应行的数据
            this.tableData.splice(this.editIndex,1,obj)
            this.dialogFormVisible = false
          }else {
            this.dialogFormVisible = true
            console.log('请输入姓名')
            return false;
          }
        })

      }


      //第三步 第二种写法等同与第一种
      // for (let key in this.form) {
      //     this.form[key] = ''
      // }
      //第三步 第三种方式：挨个清空form的值，不推荐
      // this.form.name = ''
      // ....
      // ....
      // ....
      // 第四步 隐藏dialog

    },
    //格式化日期  -- 此方法本项目未用到  -- 用的 format="yyyy 年 MM 月 dd 日"  和   value-format="yyyy-MM-dd"
    // handleDate(row, column, cellValue, index){
    //     //验证环节 ---
    //     //字符串转成日期
    //     let dt =new Date(cellValue)
    //     //获取年，月，日
    //     let year=dt.getFullYear()
    //     let  month=dt.getMonth()+1 <10 ? '0'+ (dt.getMonth()+1) :(dt.getMonth()+1)
    //     let day=dt.getDate()<10 ? '0'+(dt.getDate()):(dt.getDate())
    //     return year+'-'+month+'-'+day
    //
    // }
    //如果后台给的男女为1和2 则用这个方法
    handleSex(row,column,cellValue,index){
      return cellValue == 1 ? '男' : (cellValue == 2 ? '女' : '')
    },
    handleDelete(index, row) {
      this.$confirm('确定删除该教师么?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除操作：1.这里应该调用接口，此处没有接口，省略。。。

        //2.从数组中删除掉数据
        //思路：根据通过要删除行的id去数组中进行查询到该行的索引
        let newIndex =  this.tableData.findIndex((t) => t.id == row.id)
        console.log(this.tableData[newIndex].name+'已成功删除')
        this.tableData.splice(newIndex,1)
        //提示
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
    handleEdit(index, row){
      //第一步 弹出dailog
      this.dialogFormVisible = true
      this.dailogTitle = '教师信息修改'
      //第二步 给this.form 赋值
      let newRow =  Object.assign({},row)
      this.form = newRow
      //保存单击行的索引

      this.editIndex = this.tableData.findIndex((t) => t.id == row.id)
    },
    handlePageChange(val){
      // console.log('单击的页码:',val)
      this.currentpage = val
    },
    handleSizeChange(val){
      this.pagesize = val
    }
  }
}
</script>

<style scoped>
.query-wrapper{
  margin-top: 20px;
}

/*.tbl-wrapper{*/
/*  display: table-cell !important*/
/*}*/
.page-wrapper{
  margin-top: 20px;
}
.dialog-wrapper .dlwp-form{
  display: flex;
  flex-wrap: wrap;
}


</style>