<template>
  <header class="header">
    <p class="header--title">Q</p>
    <button @click="redirect" class="header--link">{{isAuthed ? 'LOGOUT' : 'LOGIN '}}</button>
  </header>
</template>
<script>
export default {
  computed:{
    isAuthed() {
      return this.$store.getters.isAuthed
    }
  },
  methods: {
    redirect() {
      if(this.$store.getters.isAuthed){
        this.$store.dispatch('logOut')
        this.$router.push('/login')
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  .header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 5px #000;
    &--title{
      font-size: 34px;
      font-weight: 700;
    }
    &--link{
      font-size: 20px;
      color: #777;
      cursor: pointer;
      background: none;
    }
  }
</style>