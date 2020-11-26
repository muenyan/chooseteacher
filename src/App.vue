<template>
  <div id="app" >  <!--v-on:pty="popTy"-->
    <router-view/>
  </div>
</template>
<!--<script>-->
<!--  export default {-->
<!--    methods:{-->
<!--      popTy: function (data1) {-->
<!--        console.log('data1')-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->
<style>
  /* 解决element-ui的table表格控件表头与内容列不对齐问题 */
  .el-table th.gutter{
    display: table-cell!important;
  }
</style>
