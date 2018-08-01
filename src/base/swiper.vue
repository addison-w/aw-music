<template>
    <section :class="cname">
        <swiper :options="options" :not-next-tick="options.notNextTick">
            <swiper-slide v-for="item in items" :key="item.url">
                <router-link to="">
                    <img class="swiper-img" :src="item.picUrl" alt="">
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
    props: {
        options: {
            type: Object,
            default () {
                return {
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    notNextTick: false
                }
            }
        },
        items: {
            type: Array,
            default () {
                return []
            }
        },
        cname: String
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="css">
@import "~swiper/dist/css/swiper.css";
</style>
