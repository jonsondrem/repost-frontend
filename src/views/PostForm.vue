<template>
    <div>
        <Navbar></Navbar>
        <FormPage :submit="submitPost">
            <template v-slot:header>
                <span v-if="isNew">Create</span>
                <span v-else>Edit</span>
                post in resub: <span class="resub-name">{{ resubname }}</span>
            </template>

            <label for="title">Title*</label>
            <input id="title" type="text" v-model="localPost.title" required>
            <label for="content">Content*</label>
            <textarea id="content" v-model="localPost.content" required></textarea>
            <label for="url">URL</label>
            <input id="url" type="text" v-model="localPost.url">
            <input class="button" type="submit" :value="(isNew ? 'Create' : 'Edit') + ' Post'">
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
            },
            post_id: {
                type: String,
                required: false
            }
        },
        data () {
            return {
                localPost: {}
            }
        },
        computed: {
            isNew () {
                return !this.post_id || this.post.id == null
            }
        },
        async created () {
            if (!this.post.id && this.post_id) {
                this.localPost = (await this.$http.get(`/posts/${this.post_id}/`)).data
            }
            else {
                Object.assign(this.localPost, this.post)
            }

            this.$loaded()
        },
        methods: {
            async submitPost () {
                const data = {
                    title: this.localPost.title || null,
                    content: this.localPost.content || null,
                    url: this.localPost.url || null,
                }

                if (this.isNew) {
                    this.localPost = (await this.$http.post(`/resubs/${this.resubname}/posts/`, data)).data
                }
                else {
                    await this.$http.patch(`/posts/${this.localPost.id}/`, data)
                }

                await this.$router.push(`/resubs/${this.resubname}/posts/${this.localPost.id}`)
            }
        }
    }
</script>

<style scoped>
    .resub-name {
        color: #45b1ff;
    }
</style>