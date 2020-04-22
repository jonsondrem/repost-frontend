<template>
    <vue-notification-renderless>
        <div class="notification-wrapper" slot-scope="{ items }">
            <transition-group name="notification">
                <div class="notification" v-for="item in items" :key="item.id">
                    {{ item.text }}
                </div>
            </transition-group>
        </div>
    </vue-notification-renderless>
</template>

<script>
    export default {
        name: "NotificationWrapper"
    }
</script>

<style scoped>
    .notification-wrapper {
        position: fixed;
        margin: 20px;
        bottom: 0;
        right: 0;
        text-align: right;
        width: 100%;
    }

    .notification {
        font-size: 12px;
        color: white;
        padding: 7px;
        cursor: default;
    }

    .notification-enter-active,
    .notification-leave-active {
        transition: all 0.2s;
    }

    .notification-enter,
    .notification-leave-to {
        opacity: 0;
    }

    .notification-move {
        transition: transform 0.2s;
    }
</style>