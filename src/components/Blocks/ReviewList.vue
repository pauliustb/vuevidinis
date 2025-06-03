<template lang="pug">
  div.title {{ $t('reviews') }}
  div.reviewlist
    template(v-if="reviews.length > 0")
      div
        div(v-for="(review, index) in visibleReviews" :key="index").reviewcard
          div.cardtop
            <star-rating :rating="Number(review.rating)" active-color="#246cb5" :show-rating="false" :star-size="20" :read-only="true" :increment="0.01"></star-rating>
            p {{ review.user_name }}
          div.cardbottom
            p {{ review.comment }}
      UserBtn(v-if="visibleReviewsCount < reviews.length" v-bind:href="'#'" v-on:mousedown="loadmore" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('more')" textAligin="center")
</template>

<script>
import UserLoader from '@/components/elements/Loader.vue';
import StarRating from 'vue-star-rating';
import UserBtn from '@/components/elements/Btn.vue';

export default {
  name: 'ReviewList',
  props: {
    mentorId: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    UserLoader,
    StarRating,
    UserBtn
  },
  data() {
    return {
      reviews: [],
      visibleReviewsCount: 3,
      loadingBtn: false,
    };
  },
  mounted() {
    this.fetchReviews();
  },
  computed: {
    visibleReviews() {
      return this.reviews.slice(0, this.visibleReviewsCount);
    },
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await fetch(`/wp-json/data/v1/get_reviews/?mentor_id=${this.mentorId}`);
        const data = await response.json();
        this.reviews = data.reviews || [];
      } catch (error) {
        console.error('Klaida gaunant atsiliepimus:', error);
      }
    },
    loadmore() {
      const nextCount = this.visibleReviewsCount + 3;
      this.visibleReviewsCount = Math.min(nextCount, this.reviews.length);
      console.log('Visible reviews:', this.visibleReviewsCount, '/', this.reviews.length);
    }
  },
};
</script>

<style scoped lang="stylus">
.title
  font-size: 24px
  line-height: 24px
  color: #231F4D
  font-weight: 800
  font-family: 'Spartan', sans-serif
  margin-bottom: 40px

.reviewlist
  width: 100%
  .cardtop
    display flex
    gap 20px

.reviewcard
  border-bottom 1px solid #246cb5
  margin-bottom 10px
  padding 10px

</style>