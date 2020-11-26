<template>

    <div class="home">
      <div class="side">
        <p class="title">导师遴选系统</p>
        <el-menu
            :default-active="active"
            class="el-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#222222"
            text-color="#fff"
            active-text-color="#ffd04b">
          <template v-for="(item,i) in permission">

            <el-submenu v-if="item.children && item.children.length!=0" :index="item.name">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                  v-for="(m,idx) in item.children"
                  :index="m.name"
                  @click="handleGo(m)"
              > <i :class="m.icon"></i>{{ m.title }}</el-menu-item>
            </el-submenu>

            <el-menu-item
                v-else
                :index="item.name"
                @click="handleGo(item)"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>

          </template>

        </el-menu>
      </div>
<!--        <div class="side">-->
<!--            <p class="title">导师遴选系统</p>-->

<!--            <el-menu-->
<!--                    :default-active="active"-->
<!--                    class="el-menu"-->
<!--                    @open="handleOpen"-->
<!--                    @close="handleClose"-->
<!--                    background-color="#222222"-->
<!--                    text-color="#fff"-->
<!--                    active-text-color="#ffd04b">-->
<!--                <template v-for="(item ,i) in permission">-->
<!--                    <el-submenu  v-if="item.children && item.children.length!=0" :index="i.toString()">-->
<!--                        <template slot="title">-->
<!--                            <i :class="item.icon"></i>-->
<!--                            <span>{{ item.title }}</span>-->
<!--                        </template>-->
<!--                        <el-menu-item-->
<!--                                v-for="(m,idx) in item.children"-->
<!--                                :index="i+'-'+idx"-->
<!--                                @click="handleGo(m)">-->
<!--                            <i :class="item.icons"></i>-->
<!--                            {{ m.title }}</el-menu-item>-->
<!--                         </el-submenu>-->
<!--                    <el-menu-item-->
<!--                            v-else-->
<!--                            :index="i.toString()"-->
<!--                            @click="handleGo(item)">-->
<!--                        <i :class="item.icon"></i>-->
<!--                        <span slot="title">{{ item.title }}</span>-->
<!--                    </el-menu-item>-->
<!--                </template>-->

<!--            </el-menu>-->
<!--        </div>-->
        <div class="main">
            <div class="header">
                <div class="h-left">
                  <div v-text="message">

                  </div>
                </div>
                <div class="h-right">
                <el-dropdown @command="handleCommand" >
                          <span class="el-dropdown-link  dddd">
                              <span class="aaaa" style="position: absolute;top: 8px;right:110px;display: inline-block;width: 30px;height: 30px;border-radius: 20px;">
                                <img style="border-radius: 30px;width: 30px;height: 30px" :src="'http://192.168.31.114:8080/TutorSelectionSystem_war/'+curruser.img" alt="">

                              </span>
                              <span style="font-size: 20px; margin-right: 20px">
                                  {{ curruser.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                              </span>

                          </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="base">个人资料</el-dropdown-item>
            <el-dropdown-item command="update">修改密码</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
                </div>

            </div>
            <div class="container">
                <router-view/>
            </div>
        </div>
    </div>

</template>

<script>
    import { mapState} from 'vuex'
    export default {
        name: "Home",
        data() {
            return {
                active:'',
                activeIndex: '1',
                activeIndex2: '1',
                message:'***请在规定时间内完成互选，超出规定时间未完成互选的同学将进行随机分配,***请在规定时间内完成互选，超出规定时间未完成互选的同学将进行随机分配'
            }

        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleGo(item){
                this.$router.push({name: item.name })
            },
            handleCommand(command) {
                if (command == 'exit'){
                    //清空session
                    sessionStorage.clear()
                  this.$post('api/TutorSelectionSystem_war/user/userOut',this.$Qs.stringify()).then((res) =>{
                    if (res.code == 200){
                      this.$message({
                        message: res.msg,
                        type: 'success'
                      });
                    }
                  })

                    //跳转登录
                    this.$router.push('/')
                } if (command == 'update'){
                    //清空session
                    sessionStorage.clear()
                    this.$router.push('/home/pwd')
                }if (command == 'base'){
                    //清空session
                    sessionStorage.clear()
                    this.$router.push('/home/info')
                }

            },
          //实现警示公告滚动
          show(){
            if(this.timer != null) return;
            this.timer = setInterval(() => {
              //获取到头的第一个字符
              let start = this.message.substring(0,1);
              //获取到后面的所有字符
              let end = this.message.substring(1);
              //重新拼接得到新的字符串，并赋值给this.message
              this.message = end + start;
            },300)
          }
        },
        computed:{
            ...mapState(['curruser','permission']),
        },
        mounted(){
            this.active = this.$route.name
            this.show()
            // this.getList()
        }
    }
</script>

<style scoped>
.home{
    display: flex;
}
.side {
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  bottom: 0;
  background: #222222;
  overflow: hidden;
}
.side .title {
  line-height: 50px;
  text-align: center;
  color: rgba(255,255,255,0.8);
}
.el-menu {
  box-sizing: border-box;
  width: 100%;
}
.main{
        flex: 1;
        /*position: relative;*/
        position: absolute;
        left: 220px;
        top: 0;
        right: 0;
        bottom: 0;
    }
.main .header{
        position: fixed;
        height: 50px;
        line-height: 50px;
        right: 0;
        left: 220px;
        top: 0;
        background: white;
        display: flex;
        box-sizing: border-box;
    }
.main .container{
        position: absolute;
        right: 0;
        bottom: 0;
        background: #f2f2f2;
        left: 0;
        top: 50px;
        padding: 15px;
        box-sizing: border-box;
        overflow: auto;
    }
.el-menu{
        width: 100%;
    }
    .zzz{
        position: absolute;
        right: 400px;
        top: 5px;
        font-size: 20px;
    }
    .zzz:hover{
        color: blue;
    }
    .icon-zhuce{
        position: absolute;
        right: 270px;
        top: 5px;
        font-size: 20px;
    }
    .icon-zhuce:hover{
        color: red;
    }
    .sss{
        position: absolute;
        right: 120px;
        top: 5px;
        font-size: 20px;
    }
    .sss:hover{
       color: blue;
    }
.header .h-left{
  padding-left: 20px;
  flex: 3;
  text-align: left;
  /*width: 50%;*/
  margin-top: 2px;
  color: red;
  font-size: 13px;
  /*border: 1px solid red;*/
}
    .header .h-right{
        flex: 1;
        text-align: right;
        margin-top: 2px;
        font-size: 25px;
    }
    .dddd:hover{
        color: blue;
    }
    .nini{
        position: absolute;
        right: 80px;
        top: 0px;
        font-size: 30px;
        font-family: 微软雅黑;
    }
    .aaaa{
      /*background: url(curruser.img);*/
    }
</style>