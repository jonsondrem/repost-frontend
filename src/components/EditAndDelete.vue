<template>
    <div class="edit-delete">
        <span v-if="canEdit"><router-link :to="editRoute"><a>Edit</a></router-link>
        - </span>
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
        position: absolute;
        display: inline;
        font-size: 12px;
        right: 0;
    }

    .edit-delete a {
        text-decoration: none;
        color: white;
        margin-bottom: 2px;
    }

    .edit-delete a:hover {
        text-decoration: underline;
    }

    .edit-delete .delete {
        color: #ff0000;
    }

    .edit-delete .delete:hover {
        text-decoration: underline;
        cursor: pointer;
    }

</style>