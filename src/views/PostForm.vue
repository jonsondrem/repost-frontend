<template>
    <div>
        <Navbar></Navbar>
        <div class="section">
            <div class="create-post">
                <div class="header">
                    <div><span class="create-edit" v-if="post_id == null">Create</span><span v-else>Edit</span> post in resub: <span class="resub-name">{{ resubname }}</span></div>
                </div>
                <div class="form">
                    <form>
                        <label>Title*</label><br>
                        <input type="text" v-model="dTitle" value="dTitle"><br>
                        <label>Content*</label><br>
                        <textarea v-model="dContent" class="content">dContent</textarea><br>
                        <label>URL to picture</label><br>
                        <input type="text" v-model="dPic_url" value="dPic_url"><br>
                        <button value="Create" @click="submitPost" class="button" type="button">
                            <span v-if="post_id == null">Create</span><span v-else>Edit</span> Post
                        </button>
                    </form>
                </div>
            </div>
            <div v-show="errored" class="err">{{ errormsg }}</div>
        </div>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';

    export default {
        name: "PostForm",
        components: {Navbar},
        props: {
            resubname: {
                type: String,
                default: '',
                required: true
            },
            post_id: {
                type: String,
                default: null,
            },
            title: {
                type: String,
                default: ''
            },
            pic_url: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                dTitle: null,
                dPic_url: null,
                dContent: null,
                errored: false,
                errormsg: ''
            }
        },
        created () {
            this.dTitle = this.title;
            this.dPic_url = this.pic_url;
            this.dContent = this.content;
            this.$loaded()
        },
        methods: {
            async submitPost() {
                if(this.dTitle.length == 0) {
                    this.errored = true
                    this.errormsg = 'You need a title'
                    return
                }
                if(this.dContent.length == 0) {
                    this.errored = true
                    this.errormsg = 'You need to fill in something in content.'
                    return
                }

                const data = {
                    title: this.dTitle,
                    url: this.dPic_url,
                    content: this.dContent
                }

                try {
                    if(this.post_id == null) {
                        const post = (await this.$http.post(`/resubs/${this.resubname}/posts/`, data)).data
                        await this.$router.push(`/resubs/${this.resubname}/posts/${post.id}`)
                    }
                    else {
                        await this.$http.patch(`/posts/${this.post_id}/`, data).data
                        await this.$router.push(`/resubs/${this.resubname}/posts/${this.post_id}`)
                    }
                }
                catch (error) {
                    this.errormsg = 'Something went wrong while submitting info to server. Check your connection.'
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

    .header .resub-name {
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

    .button {
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

    .button:hover {
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