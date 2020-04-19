<template>
    <div>
        <Navbar></Navbar>
        <FormPage :error="error">
            <template v-slot:header>
                <span class="create-edit" v-if="post.id == null">Create</span>
                <span v-else>Edit</span>
                post in resub: <span class="resub-name">{{ resubname }}</span>
            </template>
            <form class="form" @submit="submitPost">
                <label for="title">Title*</label>
                <input id="title" type="text" v-model="post.title" required>
                <label for="content">Content*</label>
                <textarea id="content" v-model="post.content" required></textarea>
                <label for="url">URL</label>
                <input id="url" type="text" v-model="post.url">
                <input class="button" type="submit" :value="(post.id == null ? 'Create' : 'Edit') + ' Post'">
            </form>
        </FormPage>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import FormPage from '@/components/FormPage';

    export default {
        name: "PostForm",
        components: {FormPage, Navbar},
        props: {
            resubname: {
                type: String,
                default: '',
                required: true
            },
            post: {
                type: Object,
                default () {
                    return {
                        id: null
                    }
                }
            }
        },
        data() {
            return {
                error: ''
            }
        },
        created () {
            this.$loaded()
        },
        methods: {
            async submitPost (e) {
                e.preventDefault()
                this.$load()

                const data = {
                    title: this.post.title || null,
                    content: this.post.content || null,
                    url: this.post.url || null,
                }

                try {
                    if(this.post.id == null) {
                        const post = (await this.$http.post(`/resubs/${this.resubname}/posts/`, data)).data
                        await this.$router.push(`/resubs/${this.resubname}/posts/${post.id}`)
                    }
                    else {
                        await this.$http.patch(`/posts/${this.post.id}/`, data)
                        await this.$router.push(`/resubs/${this.resubname}/posts/${this.post.id}`)
                    }
                }
                catch (error) {
                    this.$loaded()
                    this.error = `${error.response.status} ${error.response.statusText}<br>` +
                        'Something went wrong while submitting info to server. Check your connection.'
                }

            }
        }
    }
</script>

<style scoped>
    .resub-name {
        color: #45b1ff;
    }
</style>