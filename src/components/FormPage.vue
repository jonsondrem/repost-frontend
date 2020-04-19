<template>
    <div class="section">
        <div class="form-panel">
            <div class="header">
                <div><slot name="header"></slot></div>
            </div>
            <slot></slot>
        </div>
        <div v-show="error" class="error">{{ formatError() }}</div>
    </div>
</template>

<script>
    export default {
        name: "FormPage",
        props: ['error'],
        methods: {
            formatError () {
                if (this.error.response) {
                    return `Failed with response: ${this.error.response.status} ${this.error.response.statusText}`
                }

                return 'Something went wrong while submitting info to server. Check your connection.'
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

    .form-panel {
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

    form {
        color: white;
        padding-left: 4%;
    }

    label, input[type=text], textarea {
        display: block;
    }

    label {
        display: inline-block;
        padding-bottom: 12px;
    }

    input[type=text] {
        margin-bottom: 24px;
        width: 92%;
        border-radius: 2px;
        border-style: none;
    }

    textarea {
        height: 300px;
        padding: 0;
        margin-bottom: 24px;
        width: 92%;
        border-radius: 2px;
        border-style: none;
    }

    button, input[type=button], input[type=submit] {
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

    button:hover, input[type=button]:hover, input[type=submit]:hover {
        color: white;
    }

    .error {
        background-color: #2e2e2e;
        border-radius: 5px;
        height: 24px;
        margin-top: 8px;
        text-align: center;
        vertical-align: middle;
        color: #ff0000;
    }


</style>