<template lang="pug">
  div.sendreview
    div.title {{$t('writereview')}}
    div.row
      <star-rating :show-rating="false" v-model:rating="rating" active-color="#246cb5" :star-size="20" @update:rating="mouseOverRating = $event"></star-rating>
      div {{mouseOverRatingText}}
    div.row
      div.pl {{$t('message')+'*'}}
      UserInput(placeholder="" v-model="message" type="textarea"
        v-bind:error="errormessage" v-bind:disabled="disabled")
    div.btnc
      div
        UserBtn(v-bind:active="false" v-on:mousedown="submit" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('send')" textAligin="center")
      div.rsp
        div(v-if="msg") {{msg}}
</template>

<script>
import axios from 'axios';
import UserInput from '@/components/elements/Userinput.vue';
import UserBtn from '@/components/elements/Btn.vue';
import StarRating from 'vue-star-rating';

export default {

  name: 'MentoriuView',
  props: ['mentorId'],
  components: {
    UserInput,
    UserBtn,
    StarRating,
  },
  created() {

  },
  data() {
    return {
      message: '',
      errormessage: false,
      loading: false,
      disabled: false,
      msg: '',
      rating: 0,
      mouseOverRating: null,
    };
  },
  computed: {
    mouseOverRatingText() {
      const ratings = {
        5: 'Puikiai',
        4: 'Gerai',
        3: 'Vidutiniškai',
        2: 'Prastai',
        1: 'Blogai'
      };
      return ratings[this.mouseOverRating] || '';
    }
  },
  methods: {
    async submit() {
      let valid = true;
      this.errormessage = false;
      this.msg = '';

      if (!this.message) {
        this.errormessage = true;
        valid = false;
      }

      if (this.rating === 0) {
        this.msg = this.$t('ratemissing');
        valid = false;
      }

      if (valid === true) {
        this.disabled = true;
        this.loading = true;
        // (this.userID);

        try {
          const userId = await this.$store.dispatch('user/getUserId');
          const mentorId = this.$props.mentorId;

          if (!userId) throw new Error('User ID not found');

          const { data } = await axios.post('/wp-json/data/v1/submit-review', {
            userId: userId,
            mentorId: mentorId,
            comment: this.message,
            rating: this.rating,
          });

          this.loading = false;
          this.disabled = false;

          if (data.status === true) {
            this.message = '';
            this.rating = 0;
            this.msg = this.$t('reviewsuccessfullysent');
          } else {
            this.msg = this.$t('erroroccurred');
          }
        } catch (err) {
          this.loading = false;
          this.disabled = false;
          this.msg = this.$t('errorconnectingtoserver');
          console.error(err);
        }
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.sendreview
  padding-top: 40px
  padding-bottom: 40px
  width: 100%
  max-width: 500px
  margin: 0 auto

  .ico
    margin-bottom: 24px

  .title
    font-size: 24px
    line-height: 24px
    color: #231F4D
    font-weight: 800
    font-family: 'Spartan', sans-serif
    margin-bottom: 40px

  .row
    margin-bottom: 20px

  .pl
    margin-bottom: 10px
    color: #6b798b
    font-size: 14px
    font-weight: 600
    line-height: 14px

  .btnc
    align-items: center
    display: flex
    gap: 20px
    justify-content: space-between

</style>
