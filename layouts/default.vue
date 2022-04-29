<template>
  <div>
    <Header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    this.$store.dispatch('init')
    if(this.$store.getters.isAuthed){
      this.$router.push('/')
    } else{
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    padding: 10px 15px;
  }
</style>

