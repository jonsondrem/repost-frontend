<template>
    <div>
        <template v-if="user">
            <Navbar/>
            <FormPage :submit="submitUser">
                <template v-slot:header>
                    Edit your profile
                </template>

                <label for="bio">Bio</label>
                <textarea id="bio" v-model="user.bio"/>
                <label for="avatar-url">Avatar URL*</label>
                <input id="avatar-url" type="text" v-model="user.avatar_url">
                <input type="submit" value="Apply">
            </FormPage>
        </template>
        <Unauthorized v-else-if="loaded"/>
    </div>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import FormPage from "@/components/FormPage";
    import Unauthorized from "@/views/Unauthorized";

    export default {
        name: "UserEdit",
        components: {Unauthorized, FormPage, Navbar},
        data () {
            return {
                user: null,
                loaded: false
            }
        },
        async created () {
            this.user = await this.$store.getCurrentUser()
            this.$loaded()
        },
        methods: {
            async submitUser () {
                const user = (await this.$http.patch('/users/me', this.user)).data
                await this.$router.push(`/users/${user.username}`)
            }
        }
    }
</script>

<style scoped>

</style>