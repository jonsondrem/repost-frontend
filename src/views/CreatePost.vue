<template>
    <div>
        <Navbar></Navbar>
        <div class="section">
            <div class="create-post">
                <div class="header">
                    <div>Create post in resub: <span>{{ resub.name }}</span></div>
                </div>
                <div class="form">
                    <form>
                        <label>Title*</label><br>
                        <input type="text" v-model="title"><br>
                        <label>Content*</label><br>
                        <textarea v-model="content" class="content"></textarea><br>
                        <label>URL to picture</label><br>
                        <input type="text" v-model="url"><br>
                        <button value="Create" @click="createPost" class="create_button" type="button">Create Post
                        </button>
                    </form>
                </div>
            </div>
            <div v-show="errored" class="err">You need to fill in title and content.</div>
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
                errored: false
            }
        },
        methods: {
            async createPost() {
                if(this.title.length == 0) {
                    this.errored = true
                    return
                }
                if(this.content.length == 0) {
                    this.errored = true
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
    .section {
        position: absolute;
        top: 200px;
        left: 35%;
        width: 30%;
    }

    .create-post {
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
        padding-left: 4%;
    }

    label {
        display: inline-block;
        padding-bottom: 12px;
    }

    input {
        margin-bottom: 24px;
        width: 92%;
        border-radius: 2px;
        border-style: none;
    }

    .content {
        height: 300px;
        padding: 0;
        margin-bottom: 24px;
        width: 92%;
        border-radius: 2px;
        border-style: none;
    }

    .create_button {
        position: relative;
        left: 50%;
        transform: translate(-50%);
        border-radius: 4px;
        border-style: none;
        color: #45b1ff;
        background-color: #242424;
        height: 36px;
        font-weight: bold;
        transition: 0.2s;
        margin-bottom: 24px;
    }

    .create_button:hover {
        color: white;
    }

    .err {
        background-color: #2e2e2e;
        border-radius: 5px;
        height: 24px;
        margin-top: 8px;
        text-align: center;
        vertical-align: middle;
        color: #ff0000;
    }
</style>