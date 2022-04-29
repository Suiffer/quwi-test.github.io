<template>
  <div class="overlay">
    <form @submit.prevent="handleSubmit">
      <span class="close" @click="$emit('closeModal')"></span>
      <div>
        <label for="name">
          New Project Name
        </label>
        <input type="text" name="name" v-model="nameField">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    currentProject: {}
  },
  data(){
    return{
      nameField: ''
    }
  },
  methods:{ 
    handleSubmit(){
      this.$store.dispatch('handleUpdateProject', {
        ...this.currentProject,
        name: this.nameField
      }).then(() => {
        this.$emit('closeModal')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgb(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .close{
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:before{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      width: 100%;
      height: 1px;
      background: #000;
    }
    &:after{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%) rotate(-45deg);
      width: 100%;
      height: 1px;
      background: #000;
    }
  }
  form{
    position: relative;
    max-width: 500px;
    width: 100%;
    background: #fff;
    padding: 30px 40px;
    display: grid;
    grid-template-columns: auto;
    gap: 30px;
    div{
      display: flex;
      flex-direction: column;
      gap: 15px;
      label{
        font-size: 20px;
        font-weight: 600;
      }
    }
    button{
      width: 200px;
      padding: 15px 20px;
      margin: 0 auto;
      background: none;
      border: 1px solid #999;
      cursor: pointer;
      font-size: 18px ;
    }
  }
</style>