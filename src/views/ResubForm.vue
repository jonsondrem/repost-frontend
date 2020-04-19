<template>
    <div>
        <Navbar></Navbar>
        <FormPage :submit="submitResub">
            <template v-slot:header>
                <span v-if="isNew">Create</span>
                <span v-else>Edit</span>
                resub<template class="resub-name" v-if="!isNew">:
                   <span class="resub-name">{{ localResub.name }}</span>
                </template>
            </template>

            <!-- Name can only be set when creating a resub -->
            <template v-if="isNew">
                <label for="name">Name*</label>
                <input id="name" type="text" v-model="localResub.name" required>
            </template>

            <label for="description">Description</label>
            <textarea id="description" v-model="localResub.description"></textarea>

            <!-- Owner can only be transferred when editing a resub -->
            <template v-if="!isNew">
                <label for="new-owner">New owner</label>
                <input id="new-owner" type="text" v-model="new_owner_username">
            </template>

            <input class="button" type="submit" :value="(isNew ? 'Create' : 'Edit') + ' Resub'">
        </FormPage>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import FormPage from '@/components/FormPage';

    export default {
        name: "ResubForm",
        components: {FormPage, Navbar},
        props: {
            resub: {
                type: Object,
                default () {
                    return {
                        name: null
                    }
                }
            },
            resubname: {
                type: String,
                required: false
            }
        },
        data () {
            return {
                localResub: {},
                new_owner_username: null
            }
        },
        computed: {
            isNew () {
                return !this.resubname || !this.resub.name
            }
        },
        async created () {
            if (!this.resub.name && this.resubname) {
                this.localResub = (await this.$http.get(`/resubs/${this.resubname}/`)).data
            }
            else {
                Object.assign(this.localResub, this.resub)
            }

            this.$loaded()
        },
        methods: {
            async submitResub () {
                if (this.isNew) {
                    this.localResub = (await this.$http.post('/resubs/', {
                        name: this.localResub.name,
                        description: this.localResub.description || null
                    })).data
                }
                else {
                    const data = { description: this.localResub.description }
                    if (this.new_owner_username) {
                            data.new_owner_username = this.new_owner_username
                    }

                    await this.$http.patch(`/resubs/${this.resub.name}/`, data)
                }

                await this.$router.push(`/resubs/${this.localResub.name}`)
            }
        }
    }
</script>

<style scoped>
    .resub-name {
        color: #45b1ff;
    }
</style>