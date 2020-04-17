<template>
    <div>
        <Navbar></Navbar>
        <div class="create-post">
            <div class="header">
                <div>Create post in resub: <span>{{ resub.name }}</span></div>
            </div>
            <div class="form">
                <form>
                    <label>Title*</label><br>
                    <input type="text" v-model="title"><br>
                    <label>Content*</label><br>
                    <input type="text" v-model="content"><br>
                    <label>URL to picture</label><br>
                    <input type="text" v-model="url"><br>
                    <button value="Create" @click="createPost" class="create_button" type="button">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';

    export default {
        name: "CreatePost",
        components: {Navbar},
        props: {
            user: {
                type: Object,
                default: null,
                required: true
            },
            resub: {
                type: Object,
                default: null,
                required: true
            }
        },
        data() {
            return {
                title: '',
                url: '',
                content: '',
                errormsg: ''
            }
        },
        methods: {
            async createPost() {
                if(this.title.length == 0) {
                    console.log('title not long enough')
                    return
                }
                if(this.content.length == 0) {
                    console.log('content not long enough')
                    return
                }

                const data = {
                    title: this.title,
                    url: this.url,
                    content: this.content
                }

                try {
                    const post = (await this.$http.post(`/resubs/${this.resub.name}/posts`, data)).data
                    this.$router.push(`/resubs/${this.resub.name}/posts/${post.id}`)
                }
                catch (error) {
                    this.errormsg = 'Something went wrong LOL'
                }

            }
        }
    }
</script>

<style scoped>
    .create-post {
        position: absolute;
        top: 200px;
        left: 35%;
        width: 30%;
        border-radius: 25px 25px 0 0;
        background-color: #2e2e2e;
    }

    .header {
        position: relative;
        width: 100%;
        color: #ffffff;
        font-size: 22px;
        height: 50px;
    }

    .header div {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .header span {
        color: #45b1ff;
    }

    .form {
        color: white;
    }
</style>