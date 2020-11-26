<template>
  <div class="main">
    <div class="main-flow">
      <div class="main-text">
        <span class="text-title">欢迎登录导师遴选系统</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Role"
}
</script>

<style scoped>
.main{
  z-index: 1;

  position: fixed;
  top: 0;
  left: 218px;
  /*border: 1px solid red;*/
  background: url("../../assets/flower.jpg");
  background-size: 100% 100%;
}
.main-flow{
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 218px;
  background:rgba(0,0,0,0.2);
}
.main-text{
  text-align: center;
}
.text-title{
  position: absolute;
  top: 25%;
  left: 32%;
  font-size: 35px;
  text-shadow: 5px 10px 10px #484848;
  color: white;

}
</style>