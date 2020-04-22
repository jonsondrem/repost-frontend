<template>
    <div class="edit-delete">
        <router-link v-if="canEdit" :to="editRoute"><a>Edit</a></router-link>
        -
        <span @click="deleteAction" class="delete">Delete</span>
    </div>
</template>
<script>
    export default {
        name: 'EditAndDelete',
        props: {
            editRoute: [String, Object],
            deleteAction: Function,
            canEdit: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
<style scoped>

    .edit-delete {
        text-align: right;
        font-size: 12px;
    }

    .edit-delete a {
        text-decoration: none;
        color: white;
        margin-bottom: 2px;
    }

    .edit-delete a:hover {
        text-decoration: underline;
    }

    .edit-delete span {
        color: #ff0000;
    }

    .edit-delete span:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>