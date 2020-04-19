<template>
    <div>
        <Navbar/>
        <FormPage v-if="!state.currentUser" :submit="submitUser">
            <template v-slot:header>
                Sign Up
            </template>

            <label for="username">Username*</label>
            <input id="username" type="text" v-model="user.username" required>
            <label for="password">Password*</label>
            <input id="password" type="password" v-model="user.password" required>
            <input type="submit" value="Sign Up">
        </FormPage>

        <Notice v-else title="Already logged in">
            Please logout before attempting to sign up.
        </Notice>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import FormPage from "@/components/FormPage";
    import Notice from "@/components/Notice";

    export default {
        name: "SignUp",
        components: {Notice, FormPage, Navbar},
        data () {
            return {
                user: {},
                state: this.$store.state,
                from: null
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => vm.from = from.path)
        },
        created () {
            this.$loaded()
        },
        methods: {
            async submitUser () {
                const newUser = (await this.$http.post('/users/', this.user)).data
                await this.$router.push({ name: 'login', params: { propUsername: newUser.username, redirect: this.from || '/' }})
            }
        }
    }
</script>

<style scoped>

</style>