<template>
<div>
    <br>
    <span>child1组件{{notice}}</span>
    <br>
    <input type="text" v-model="childValue">
    <span @click="childClick" style="border:1px solid black;padding:0.5vw">传父</span>
</div>
</template>


<script>
export default {
  name:'child1',
  data() {
    return {
      childValue:'',
    };
  },
  props:['notice'], // 接受父传值
  methods: {
    childClick(){
      this.$emit('childPastValue',this.childValue)    // $emit子传父
      console.log(1,this.childValue);
    }
  },
}
</script>