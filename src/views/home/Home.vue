<template>

    <div class="home">
        <div class="side">
            <p class="title">选课系统</p>
            <el-menu
                    :default-active="active"
                    class="el-menu"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#222222"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <template v-for="(item ,i) in permission">
                    <el-submenu  v-if="item.children && item.children.length!=0" :index="i.toString()">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item
                                v-for="(m,idx) in item.children"
                                :index="i+'-'+idx"
                                @click="handleGo(m)">
                            <i :class="item.icons"></i>
                            {{ m.title }}</el-menu-item>
                         </el-submenu>
                    <el-menu-item
                            v-else
                            :index="i.toString()"
                            @click="handleGo(item)">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>

            </el-menu>
        </div>
        <div class="main">
            <div class="header">
               <router-link to="/"> <i class="iconfont icon-zhuce">更改用户</i></router-link>

                <div class="h-right">
       <el-dropdown @command="handleCommand" >
                          <span class="el-dropdown-link  dddd">


                              <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                              <span style="font-size: 20px; margin-right: 20px">
<!--                                  {{ $store.state.curruser.userName}}  最简单的写法-->
                                  {{ curruser.name}}

                              </span>
                          </span>
        <el-dropdown-menu slot="dropdown">
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
                activeIndex2: '1'
            };
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
                    //清空vuex
                    this.$store.commit('emptyState')
                    //清空session
                    sessionStorage.clear()
                    //跳转登录
                    this.$router.push('/')
                }
            }


        },
        computed:{
            ...mapState(['curruser','permission']),
        },
        mounted(){
            this.active = this.$route.name
        }
    }
</script>

<style scoped>
.home{
    display: flex;
}
.side{
        position:absolute;
        left: 0;
        top: 0;
        width: 220px;
        bottom: 0;
        background: black;
        overflow: auto;
    }
.side .title{
        line-height: 50px;
    text-align: center;
    color: rgba(255,255,255,0.8);

    }
.main{
        flex: 1;
        /*position: relative;*/
        position: absolute;
        left: 220px;
        top: 0;
        right: 0;
        bottom: 0;
        background: red;
    }
.main .header{
        position: fixed;
        height: 50px;
        line-height: 50px;
        right: 0;
        left: 220px;
        top: 0;
        background: white;

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
</style>