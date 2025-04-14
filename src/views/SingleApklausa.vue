<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(v-if="single" :title="single.title" :text="single.instrukcijos" v-bind:img="false" v-bind:lefto="false" v-bind:righto="'blue'")
      div.container
        div.apklausa-wrapper
          UserLoader(color="dark" v-if="loading")
          div(v-else)
            div.klausimai(:class="{sending: sendingQuestions}")
              div.klausimas-wrapper(v-for="(block, index) in apklausosLaukai" :key="index")
                component(v-bind:is="block.acf_fc_layout" :block="apklausosLaukai[index]" :answer.sync="localAnswer[index]" :error="errorCheck(index)")
            div.update-block.mt-2
              div.btn-wrapper
                UserBtn(href="#" @click.prevent="submitPoll()" v-bind:active="false" color="green" :wider="true" v-bind:disabled="loadingBtn || updateSuccess" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('apklausa.pateikti')" textAligin="center")
              div.update-status
                div.error(v-if="updateError")
                  span {{$t('planas.nepavyko')}}
                div.success(v-if="updateSuccess")
                  span {{$t('planas.atnaujinta')}}
    div.container(v-else)
      h1.error {{$t('apklausa.neegzistuoja')}}
</template>

<script>
import { mapGetters } from 'vuex';
import TopPage from '@/components/Blocks/TopPage.vue';
import AnimatedCheckmark from '@/components/elements/AnimatedCheckmark.vue';
import DynamicBlocks from '@/components/elements/Apklausa/DynamicBlocks.vue';
import KlausimasIrIrasomasAtsakymas from '@/components/elements/Apklausa/KlausimasIrIrasomasAtsakymas.vue';
import KlausimasIrAtsakymoBalas from '@/components/elements/Apklausa/KlausimasIrAtsakymoBalas.vue';
import KlausimasIrAtsakymuPasirinkimas from '@/components/elements/Apklausa/KlausimasIrAtsakymuPasirinkimas.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';

export default {
  name: 'SingleApklausa',
  components: {
    TopPage,
    AnimatedCheckmark,
    DynamicBlocks,
    KlausimasIrIrasomasAtsakymas,
    KlausimasIrAtsakymoBalas,
    KlausimasIrAtsakymuPasirinkimas,
    UserLoader,
    UserBtn
  },
  data() {
    return {
      loadingIntro: true,
      loadingBtn: false,
      sendingQuestions: false,
      loading: true,
      updateSuccess: false,
      updateError: false,
      loadingSaveStatus: false,
      savedStatus: [],
      itemsError: false,
      localAnswer: [],
      errorArray: [],
    };
  },
  computed: {
    ...mapGetters('Apklausa', {
      single: 'single',
    }),
    apklausosLaukai() {
      let apklausosLaukai = [];
      apklausosLaukai = this.single.klausimai.map((i) => ({ ...i, isError: false, answer: '' }));
      return apklausosLaukai;
    },
  },

  mounted() {
  },
  methods: {
    errorCheck(val) {
      if (this.errorArray && this.errorArray.length > 0 && this.errorArray[val].isError) {
        return true;
      }
      return false;
    },
    submitPoll() {
      this.itemsError = false;
      this.errorArray = [];

      // eslint-disable-next-line no-unused-vars
      this.apklausosLaukai.forEach((obj, i) => {
        const el = {};
        el.isError = false;
        this.errorArray.push(el);
        if (!obj.answer) {
          obj.isError = true;
          this.errorArray[i].isError = true;
          this.itemsError = true;
        }
      });

      if (!this.loadingBtn && !this.sendingQuestions && !this.itemsError) {
        this.loadingBtn = true;
        this.sendingQuestions = true;

        const filteredKlausimaiAtsakymai = this.apklausosLaukai.map((i) => ({
          klausimas: i.klausimas, answer: i.answer, answerName: i.answer.name,
        }));

        this.$store.dispatch('Apklausa/submitApklausa', {
          klausimaiAtsakymai: filteredKlausimaiAtsakymai,
          apklausaId: this.$route.params.id,
          userHash: this.$route.params.userHash,
        }).then((data) => {
          this.loadingBtn = false;
          this.disabled = false;
          if (data.status === true) {
            this.disabled = true;
            this.updateSuccess = true;
            this.updateError = false;
            this.sendingQuestions = false;
          } else {
            this.updateError = true;
            this.sendingQuestions = false;
          }
        });
      }
    },
  },
  props: {
    block: {
      type: Object,
    },
    isError: {
      type: Boolean,
    },
    answer: {
      type: String,
    },
  },
  watch: {
    '$route.meta.id': {
      handler() {
        this.loadingIntro = true;
        this.loading = true;
        this.$store.dispatch('Apklausa/getSingle', [this.$route.params.id, this.$route.params.userHash]).then(() => {
          this.loadingIntro = false;
          this.loading = false;
        });
      },
      deep: false,
      immediate: true,
    },
    localAnswer(values) {
      values.forEach((element, index) => {
        this.apklausosLaukai[index].answer = element;
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.apklausa-wrapper
  max-width 800px
.hidden
  height: 0;
  visibility: hidden;
  opacity: 0;
h1
  &.error
    font-weight:700;
    color:#231f4d;
    font-size:2em;
    margin-top:5rem
.mt-2
  margin-top: 2rem
.px-2
  padding-left: 10px;
  padding-right: 10px;
.update-block
  display flex
  justify-content: flex-start;
  .update-status
    margin-left:2rem
    display:flex
    align-items:center
    font-weight 700
    .success
      color #2bac76
    .error
      color #e16969
.page
  padding-bottom 40px
  .mobile
    display none
    @media(max-width 1024px)
      display inline
  >>>.tr
    width: 250px;
    @media(max-width 1024px)
      display none
.klausimai
  position: relative
  &:after
    transition: all .5s ease
  &.sending
    &:after
      position: absolute
      left:0
      top:0
      content: "";
      width: 100%;
      height: 100%;
      background-color: #FFF;
      opacity: 0.8
.klausimas-wrapper
  margin-bottom: 4rem
</style>
