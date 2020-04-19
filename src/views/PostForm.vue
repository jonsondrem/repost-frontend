<template>
    <div>
        <Navbar></Navbar>
        <FormPage :submit="submitPost">
            <template v-slot:header>
                <span v-if="post.id == null">Create</span>
                <span v-else>Edit</span>
                post in resub: <span class="resub-name">{{ resubname }}</span>
            </template>

            <label for="title">Title*</label>
            <input id="title" type="text" v-model="post.title" required>
            <label for="content">Content*</label>
            <textarea id="content" v-model="post.content" required></textarea>
            <label for="url">URL</label>
            <input id="url" type="text" v-model="post.url">
            <input class="button" type="submit" :value="(post.id == null ? 'Create' : 'Edit') + ' Post'">
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
        created () {
            this.$loaded()
        },
        methods: {
            async submitPost () {
                const data = {
                    title: this.post.title || null,
                    content: this.post.content || null,
                    url: this.post.url || null,
                }

                if (this.post.id == null) {
                    const post = (await this.$http.post(`/resubs/${this.resubname}/posts/`, data)).data
                    await this.$router.push(`/resubs/${this.resubname}/posts/${post.id}`)
                }
                else {
                    await this.$http.patch(`/posts/${this.post.id}/`, data)
                    await this.$router.push(`/resubs/${this.resubname}/posts/${this.post.id}`)
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