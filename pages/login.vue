<template>
  <div>
    <div  class="errors" v-if="errors.length">
      <p v-for="error in errors" :key="error">{{ error }}</p>
    </div>
    <form class="form" @submit.prevent="handleSubmit" noValidate>
      <div class="form--input_box">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="userEmail"/>
      </div>
      <div class="form--input_box">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="userPassword"/>
      </div>
      <button type="submit" class="submit">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  layout: 'default',
  data(){
    return {
      errors: [],
      userEmail: '',
      userPassword: ''
    }
  },
  watch:{
    errors(val) {
      if(val){
        setTimeout(()=> {
          this.errors = ''
        }, 2000)
      }
    }
  },
  mounted() {
    if(this.$store.getters.isAuthed){
      this.$router.push('/')
    }
  },
  methods: {
    handleSubmit() {
      this.errors = []
      if (!this.userPassword) {
        this.errors.push("Password required.");
      }
      if (!this.userEmail) {
        this.errors.push('Email required.');
      } else if (!this.validEmail()) {
        this.errors.push('Valid email required.');
      }
      if(this.userPassword && this.validEmail){
        this.$store.dispatch('logIn', {
          'email': this.userEmail,
          'password': this.userPassword
        }).then(response => {
          if(response && response.status === 200){
            this.$router.push('/')
          }
        })
      }
    },
    validEmail() {
      return /^[a-zA-Z0-9\.-_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}/.test(this.userEmail)
    }
  },
  computed:{
    reroute() {
      if(this.$store.getters.isAuthed){
        this.$router.push('/')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.errors{
  position: fixed;
  right: 0;
  top: 0;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgb(197, 36, 36);
  p{
    color: #fff;
  }
}
  .form{
    display: grid;
    grid-template-columns: auto ;
    gap: 20px;
    max-width: 500px;
    width: 100%;
    margin: 40px auto;
    box-shadow: 0 0 5px #000;
    padding: 15px 20px 25px;
    &--input_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .submit{
      max-width: 200px;
      padding: 10px;
      font-size: 20px;
      margin: 0 auto;
      border: 1px solid #000;
      background: transparent;
      &:hover{
        box-shadow: 0 0 5px #000;
      }
    }
  }
</style>