import Vue from 'vue'
import VueRouter from 'vue-router'
// import axios from 'axios'
import { get, post } from "../request/http";
import store from '../store'
import Login from "../views/login/Login";
import Home from "../views/home/Home";
import ChooseStudent from "../views/choosestudent/ChooseStudent";
import Teacher from "../views/teacher/Teacher";
import Student from "../views/student/Student";
import ChooseTeacher from "../views/chooseteacher/ChooseTeacher";
import MyChoose from "../views/mychooses/MyChoose";
import Role from "../views/role/Role";
import MyStudent from "../views/mystudent/MyStudent";
import Dict from "../views/dict/Dict";
import User from "../views/user/User";
import InFo from "../views/info/InFo";
import PWD from "../views/pwd/PWD";
import NotFound from "../views/notfound/NotFound";
import QueryTeachers from "../views/queryteachers/QueryTeachers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]
const dynamicRoutes = [

    {path: 'teacher', name: 'teacher', component: Teacher},
    {path: 'student', name: 'student', component: Student},
    {path: 'choosestudent', name: 'choosestudent', component: ChooseStudent},
    {path: 'chooseteacher', name: 'chooseteacher', component: ChooseTeacher},
    {path: 'user/:id', name: 'user', component: User},
    {path: 'mychoose', name: 'mychoose', component: MyChoose},
    {path: 'role', name: 'role', component: Role},
    {path: 'mystudent', name: 'mystudent', component: MyStudent},
    {path: 'dict', name: 'dict', component: Dict},
    {path: 'info', name: 'info', component: InFo},
    {path: 'pwd', name: 'pwd', component: PWD},
    {path: 'queryteachers/:id', name: 'queryteachers', component: QueryTeachers},
]

const router = new VueRouter({
  routes
})

function getUserRoutes(permission) {
  let  ary = []
//获取用户登录的菜单
  for (let i = 0; i <permission.length ; i++) {
    if (permission[i].children && permission[i].children.length > 0){
      permission[i].children.forEach((item,i) =>{
        let rt = dynamicRoutes.find((u) =>{
         return u.name == item.name
        })
        ary.push(rt)
      })
    }else {
      // for (let j = 0; j <dynamicRoutes.length ; j++) {
      //   if (permission[i].name == dynamicRoutes[i].name){
      //     ary.push(dynamicRoutes[i])
      //
      //   }
      // }
      let rt =dynamicRoutes.find((u) =>{
        return u.name == permission[i].name
      })
      ary.push(rt)
    }



  }
  return ary
}
//全局的导航守卫
router.beforeEach((to,from,next) =>{
  let curruser =store.state.curruser
  //如果permission中没数据则进行请求
    if(!store.state.permission && curruser){
      let role = curruser.role
      get('/apis/permission.json').then((p) => {
        let permission = p.data[role]
        //通过菜单和动态路由进行比对，获取当前用户所拥有的路由
        let  dr = permission && getUserRoutes(permission)
        //需要把该用户拥有的路由添加到router中
        let temp= {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect:'home/role',
            children:  dr
        }
          //创建404路由：注意：404路由一定放在最后一个
        let notfound ={
          path: '*',
          name: 'notfound',
          component: NotFound
        }
        router.addRoutes([temp,notfound])
        //吧当前用户的菜单存入Vuex当中
        store.commit('setPermission',permission)
      })

    }
    //如果curruser有id属性，则说明已经登录
    if (curruser){
      next()
    }else {
      if (to.path=='/'){
        next()
      }else {
        next('/')
      }
    }

})


export default router
