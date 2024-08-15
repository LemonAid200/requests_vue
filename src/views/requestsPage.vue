<template>
    <div>
        <h1>requests</h1>
        <router-link to="login">registration</router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        redirectToAuth(){
            this.$router.push({name: 'Registration'})            
        }
    },
    mounted() {
        if (!this.$store.state.auth.isAuthorised){
            this.redirectToAuth()
        }
        
    },
    
}
</script>
<style lang="scss">

</style>