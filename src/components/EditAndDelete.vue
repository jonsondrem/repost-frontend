<template>
    <div class="edit-delete">
        <router-link :to="editRoute"><a>Edit</a></router-link>
        -
        <span @click="deleteAction" class="delete">Delete</span>
    </div>
</template>
<script>
    export default {
        name: 'EditAndDelete',
        props: {
            editRoute: [String, Object],
            deleteAction: Function
        }
    }
</script>
<style scoped>

    .edit-delete {
        float: right;
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