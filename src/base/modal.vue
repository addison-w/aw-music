<template>
    <transition name="fade">
        <div class="modal-wrap" v-show="isShow">
            <div class="blur-filter"></div>
            <div class="modal-container">
                <p class="modal-content">{{ content }}</p>
                <div class="modal-buttons">
                    <span class="btn-cancel" @click="onClickModal(false)">否</span>
                    <span class="btn-confirm" @click="onClickModal(true)">是</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            isShow: false
        }
    },
    props: {
        content: {
            type: String,
            default () {
                return ''
            }
        }
    },
    methods: {
        onClickModal (option) {
            this.$emit('selectOption', option)
        },
        show () {
            this.isShow = true
        },
        hide () {
            this.isShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/variable.scss';
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .modal-wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        z-index: 200;
        .blur-filter {
            position: absolute;
            height: 100vh;
            width: 100vw;
            background: rgba(255, 255, 255, 0.5);
        }
        .modal-container {
            position: fixed;
            width: 300px;
            height: 150px;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: $color-background;
            border-radius: 6px;
            border: 1px solid $color-gray;
            .modal-content {
                position: relative;
                height: 100px;
                line-height: 100px;
                width: 100%;
                text-align: center;
            }
            .modal-buttons {
                position: relative;
                height: 50px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                border-top: 1px solid $color-gray;
                .btn-cancel {
                    border-right: 1px solid $color-gray;
                    line-height: 50px;
                    flex: 1;
                }
                .btn-confirm {
                    flex: 1;
                    line-height: 50px;
                }
            }
        }
    }
</style>
