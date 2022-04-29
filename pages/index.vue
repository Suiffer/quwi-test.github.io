<template>
  <div>
    <ul class="projects">
      <li v-for="(project, index) in handleGetProjects" :key="index" @click="openModal(project)">
        <div class="title">
          <img :src="project.logo_url" :alt="project.name">
          <p>{{project.name}}</p>
        </div>
        <div class="status">
          <span>Active</span>
        </div>
        <ul class="time-list">
          <li>
            <p>this time week</p>
            <span>{{ convertTimeValue(project.spent_sec_all_time) }}</span>
          </li>
          <li>
            <p>this month</p>
            <span>{{ convertTimeValue(project.spent_sec_all_time) }}</span>
          </li>
          <li>
            <p>total</p>
            <span>{{ convertTimeValue(project.spent_sec_all_time) }}</span>
          </li>
        </ul>
      </li>
    </ul>

    <update-project-modal v-if="isModal" :currentProject="currentProject" @closeModal='closeModal'/>
  </div>
</template>

<script>
import UpdateProjectModal from '~/components/UpdateProjectModal.vue'
export default {
  components: { UpdateProjectModal },
  layout: 'default',
  data() {
    return{
      isModal: false,
      currentProject: {}
    }
  },
  mounted(){
    this.$store.dispatch('handleGetProjects')
  },
  methods:{
    convertTimeValue(time) {
      const hours = Math.floor(time / 3600 ).toString().length < 2 ? `0${Math.floor(time / 3600 )}` : Math.floor(time / 3600 )
      const minutes = Math.floor(time % 3600 / 60).toString().length <2 ? `0${Math.floor(time % 3600 / 60)}` : Math.floor(time % 3600 / 60)
      const seconds= (time % 60).toString().length < 2 ? `0${(time % 60)}` : (time % 60)
      return `${hours}:${minutes}:${seconds}`
    },
    openModal(project){
      this.currentProject = project
      this.isModal = true
    },
    closeModal(){
      this.currentProject = {}
      this.isModal = false
    }
  },
  computed: {
    handleGetProjects() {
      return this.$store.getters.projects
    }
  }
}
</script>

<style lang="scss" scoped>
  .projects{
    display: grid;
    grid-template-columns: auto;
    gap: 30px;
    padding: 20px;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    & > li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.315);
      padding: 10px 15px;
    }
    .title{
      display: flex;
      align-items: center;
      gap: 20px;
      width: 38%;
      p{
        font-weight: 600;
      }
    }
    .status{
      width: 33%;
      display: flex;
      justify-content: center;
      span{
        font-size: 24px;
        color: rgb(0, 190, 0);
        font-weight: 600;
      }
    }
    .time-list{
      width: 29%;
      display: grid;
      grid-template-columns: auto;
      gap: 15px;
      li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-weight: 600;
        }
      }
    }
  }
</style>
