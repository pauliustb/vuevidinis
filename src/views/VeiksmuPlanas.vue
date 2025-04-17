<template lang="pug">
  div.page.menu-paddingtop
    UserLoader(color="dark" v-if="loadingIntro")
    div(v-else)
      TopPage(v-bind:title="data.title" v-bind:text="introText" v-bind:img="null" v-bind:lefto="false" v-bind:righto="'blue'")
        div.container
          div.search(v-if="this.$store.getters['user/user'].role === 'mentorius'")
            UserInput(v-bind:placeholder="$t('rzodis')" v-on:input="setKeyword" v-model="keyword" type="input"
              v-on:click="submit"
              v-bind:error="false" v-bind:disabled="false")
          div.listcontainer
            UserLoader(color="dark" v-if="loading && !loadinglist")
            div(v-else)
              div(v-if="this.$store.getters['user/user'].role === 'frontuser'")
                div.add-plan(v-if="contactedMentors && contactedMentors.length > 0")
                  div
                  BtnSimple(v-bind:href="'#'" :wider="true" v-on:mousedown="createNewPlan" v-bind:active="false" color="blue" v-bind:disabled="disableAll" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('planas.pridetiplana')" textAligin="center")
                  transition(name="fade")
                    div(v-if="this.creatingNewPlan")
                      div.new-plan(v-if="creatingNewPlan")
                        div.mb-2.select-mentor
                          h3.form-heading {{$t('planas.pasirinkitementoriu')}}
                          v-select(
                            :options="contactedMentors"
                            :get-option-label="(mentor) => mentor.fullName"
                            v-model="selectedMentor"
                            class="style-chooser"
                            :placeholder="$t('planas.mentoriusuzklausa')"
                          )
                            span(slot="no-options") {{$t('planas.atitikmenunera')}}

                        div(v-if="selectedMentor").mb-2
                          h3.form-heading {{$t('planas.ivardinkitepagrtiksla')}}
                          div.pagrindinis-tikslas
                            UserInput(:placeholder="$t('planas.pagrindinistikslas')" v-model="pagrindinisTikslas" type="textarea"
                              v-bind:error="pagrindinisTikslasError" v-bind:disabled="disableAll" maxlength="1500" :showLength="true" :showLabel="true")
                        div(v-if="selectedMentor")
                          h3.form-heading {{$t('planas.veiksmotrumpasaprasymas')}}
                        transition-group(name="list")
                          div.plan-item(v-if="selectedMentor" v-for="(planItem, index) in planItems" :key="'planItem-'+index")
                            div.item-head
                              span {{index+1}}. {{$t('planas.planoveiksmas')}}
                            div.plan-item-content
                              div.veiksmas
                                UserInput(:placeholder="$t('planas.veiksmas')" v-model="planItem.veiksmas" type="textarea"
                                  v-bind:error="planItem.veiksmasError" v-bind:disabled="disableAll" maxlength="1500" :showLength="true" :showLabel="true")
                              div.rezultatas
                                UserInput(:placeholder="$t('planas.rezultatas')" v-model="planItem.rezultatas" type="textarea"
                                  v-bind:error="planItem.rezultatasError" v-bind:disabled="disableAll" maxlength="1500" :showLength="true" :showLabel="true")
                              div.terminas
                                div.terminas-label
                                  span {{$t('planas.terminas')}}
                                date-picker(v-model="planItem.terminas" :disabled-date="notBeforeToday" :class="{error: planItem.terminasError}" type="date" valueType="format" :placeholder="$t('planas.terminas')" v-bind:disabled="disableAll" lang="lt")
                              div.delete
                                a(v-show="planItems.length > 1 && !disableAll" href="#" :title="$t('planas.istrintieilute')" @click.prevent.default="deletePlanItem(planItem)")
                                  icon(:data="closeData" width="20" height="20" color="#5A98C8")
                        div.add-item.mt-2(v-if="selectedMentor")
                          BtnSimple(v-bind:href="'#'" v-on:mousedown="addPlanItem" v-bind:active="false" color="blue" v-bind:disabled="disableAll" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('planas.pridetieilute')" textAligin="center")
                        div.add-row.mt-2(v-if="selectedMentor")
                          div.update-status
                            div.error(v-if="updateError")
                              span {{$t('planas.nepavyko')}}
                            div.success(v-if="updateSuccess")
                              span {{$t('planas.issaugota')}}
                          BtnSimple(v-bind:href="'#'" v-on:mousedown="savePlan" v-bind:active="false" :wider="true" color="darkblue" v-bind:disabled="savePlanSuccess" v-bind:loading="loadingSaveBtn" v-bind:uppercase="false" v-bind:text="$t('planas.issaugotiirsiustimentoriui')" textAligin="center")
                div(v-else)
                  h4.no-mentor {{$t('planas.pirmasusisiekti')}}
              UserLoader(color="dark" v-if="loadinglist")
              div(v-else)
                div.list(v-if="list && list.length > 0")
                  div.top.split.mt-2
                    div
                      span {{$t('planas.plannr') }}
                    div {{$t('filter.data')}}
                    div
                      span(v-if="this.$store.getters['user/user'].role === 'mentorius'") {{$t('planauthor')}}
                      span(v-else) {{$t('planas.pasirinktasmentorius')}}
                    div
                  div.mid
                    div.item(v-for="item in list" v-bind:class="{strong:item.open===false, open:openedItems.find(e=>e===item.id)}" )
                      div.maininfo.split
                        div
                          span.mobile-only {{$t('planas.plannr')}}
                          span  {{item.id}}
                        div
                          span.mobile {{$t('filter.data')}}: <br>
                          span {{item.date}}
                        div
                          span(v-if="this.$store.getters['user/user'].role === 'mentorius'").mobile {{$t('messageauthor')}}: <br>
                          span(v-else).mobile {{$t('planas.mentorius')}}:
                          span  {{item.name}}
                        div.flex-end
                          BtnSimple(:href="'veiksmu-planai/'+item.id" class="ml-auto" @click.native.prevent="$router.push({ name: 'SingleVeiksmuPlanas', params: { id: item.id}})" v-bind:active="false" color="grey" v-bind:disabled="false" v-bind:uppercase="false" v-bind:text="$t('planas.atidarytiplana')" textAligin="center")
                  div.more(v-if="list.length < total")
                    UserBtn(v-bind:href="'#'" v-on:click="loadmore" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('more')" textAligin="center")
                div.mt-2(v-else)
                  span(v-if="this.$store.getters['user/user'].role === 'frontuser'") {{$t('planas.noplans')}}
                  span(v-else) {{$t('planas.noplansreceived')}}
</template>

<script>
import {mapGetters} from 'vuex';
import {debounce} from 'throttle-debounce';
import TopPage from '@/components/Blocks/TopPage.vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserInput from '@/components/elements/Userinput.vue';
import UserLoader from '@/components/elements/Loader.vue';
import BtnSimple from '@/components/elements/BtnSimple.vue';
import closeData from '@/assets/svg/close.svg'
import DatePicker from 'vue3-datepicker';
// import 'vue3-datepicker/locale/lt';
// import lt from 'date-fns/locale/lt';
import '@/assets/css/custom-select.css';
import "vue-select/dist/vue-select.css";

export default {

  name: 'VeiksmuPlanas',
  components: {
    TopPage,
    DatePicker,
    BtnSimple,
    UserBtn,
    UserInput,
    UserLoader
  },
  created() {
    if (this.page === 0) {
      this.$store.dispatch('VeiksmuPlanas/get').then(() => {
      });
    }
  },
  data() {
    return {
      closeData,
      loadingIntro: true,
      loadingBtn: false,
      openedItems: [],
      disableAll: false,
      creatingNewPlan: false,
      itemsError: false,
      planItems: [{
        veiksmas: '', veiksmasError: false, rezultatas: '', rezultatasError: false, terminas: '', terminasError: false,
      }],
      veiksmasError: false,
      rezultatasError: false,
      terminasError: false,
      loadingSaveBtn: false,
      setSelectedMentor: false,
      selectedMentor: false,
      updateSuccess: false,
      updateError: false,
      savePlanSuccess: false,
      loadinglist: false,
      pagrindinisTikslas: '',
      pagrindinisTikslasError: false,
      selectedMentorError: false,
    };
  },
  computed: {
    ...mapGetters('Pages', {
      data: 'default',
    }),
    keyword: {
      get() {
        return this.activeKeyword;
      },
      set() {

      },
    },
    activeKeyword() {
      return this.$store.getters['VeiksmuPlanas/keyword'];
    },
    list() {
      return this.$store.getters['VeiksmuPlanas/list'];
    },
    total() {
      return this.$store.getters['VeiksmuPlanas/total'];
    },
    loading() {
      return this.$store.getters['VeiksmuPlanas/loading'];
    },
    page() {
      return this.$store.getters['VeiksmuPlanas/page'];
    },
    contactedMentors() {
      return this.$store.getters['VeiksmuPlanas/contactedMentors'];
    },
    introText() {
      const user = this.$store.getters['user/user'];
      if (user && user.role === 'mentorius') {
        return this.$t('planas.versloplanotitlementorius');
      }
      return this.data?.text;
    },
  },
  methods: {
    createNewPlan() {
      this.creatingNewPlan = !this.creatingNewPlan;
      return;
    },
    setKeyword: debounce(300, function (value) { // eslint-disable-line
      this.$store.dispatch('VeiksmuPlanas/setKeyword', value);
    }),
    notBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.getTime() < today.getTime();
    },
    checkInputArray(arr) {
      this.itemsError = false;
      arr.forEach((obj) => {
        obj.veiksmasError = !obj.veiksmas === true;
        this.itemsError = obj.veiksmasError === true;

        obj.rezultatasError = !obj.rezultatas === true;
        this.itemsError = obj.rezultatasError === true;

        obj.terminasError = !obj.terminas === true;
        this.itemsError = obj.terminasError === true;
      });
      return this.itemsError;
    },

    addPlanItem() {
      this.checkInputArray(this.planItems);
      if (!this.itemsError) {
        this.planItems.push({
          veiksmas: this.veiksmas,
          veiksmasError: false,
          rezultatas: this.rezultatas,
          rezultatasError: false,
          terminas: this.terminas,
          terminasError: false,
        });
      }
    },

    deletePlanItem(planItem) {
      const planItemIndex = this.planItems.indexOf(planItem);
      this.planItems.splice(planItemIndex, 1);
    },

    savePlan() {
      this.pagrindinisTikslasError = false;
      this.selectedMentorError = false;

      if (!this.pagrindinisTikslas.length) {
        this.pagrindinisTikslasError = true;
      }
      if (this.selectedMentor.length < 0) {
        this.selectedMentorError = true;
      }

      if (!this.checkInputArray(this.planItems) && !this.pagrindinisTikslasError && !this.selectedMentorError) {
        this.disableAll = true;
        this.loadingSaveBtn = true;
        this.loadinglist = true;
        this.$store.dispatch('VeiksmuPlanas/saveNewPlan', {
          mentorId: this.selectedMentor.ID,
          pagrindinisTikslas: this.pagrindinisTikslas,
          planSteps: this.planItems,
        }).then((data) => {
          // this.loading = false;
          this.disabled = false;
          if (data.status === true) {
            this.msg = this.$t('user.successfullsave');
            this.loadingSaveBtn = false;
            this.updateSuccess = true;
            this.loadinglist = false;
            this.savePlanSuccess = true;
            this.$store.dispatch('VeiksmuPlanas/get', true);
          } else {
            this.msg = this.$t('user.failsave');
            this.disableAll = false;
            this.loadingSaveBtn = false;
            this.updateError = true;
            this.loadinglist = false;
          }
        });
      }
    },
    loadmore() {
      this.loadingBtn = true;
      this.$store.dispatch('VeiksmuPlanas/get').then(() => {
        this.loadingBtn = false;
      });
    },
  },
  watch: {
    '$route.meta.id': {
      handler() {
        this.loadingIntro = true;
        this.$store.dispatch('Pages/getDefault', this.$route.meta.id).then(() => {
          this.loadingIntro = false;
        });
      },
      deep: false,
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.item
  &.strong
    font-weight 700

.veiksmas-edit
  display block

.terminas-label
  font-size 14px
  color #6B798B

.form-heading
  font-size 18px
  font-weight 400
  line-height 22px
  margin-bottom 0.3rem
  color #5A98C8

.mobile-only
  display none

.update-status
  margin-right 2rem
  display flex
  align-items center
  font-weight 700
  .success
    color #2bac76
  .error
    color #e16969

.no-mentor
  font-weight 700
  margin-bottom 4rem
  color #231F4D
  font-size 18px

.style-chooser
  background #fff
  border-radius 0

.vs__dropdown-toggle
  border-radius 0 !important
  border 0
  background #fff
  padding 5px 10px
  border 1px solid #CFD5E1

.select-mentor
  .new-plan
    ::placeholder
      color #CFD5E1
    .plan-item
      .item-head
        background #DDE9F6
        display flex
        align-items center
        padding-left 2rem
        padding-right 2rem
        padding-top 1rem
        padding-bottom 1rem
        color #5A98C8
      .plan-item-content
        display flex
        background #FFFFFF
        padding 2rem
        flex-direction column
        margin-bottom 1.5rem
        display grid
        grid-template-columns repeat(3, minmax(0, 1fr)) 50px
        gap 30px
        @media(max-width 768px)
          flex-wrap wrap
          grid-template-columns 100%
          gap 20px 10px
          .mx-datepicker
            width 100%
            height 48px
          .delete
            margin-top 20px !important
    .add-row
      display flex
      justify-content flex-end
    .eil-nr
      background #25408f
      color #fff
      font-weight 700
      font-size 2em
      display flex
      align-items center
      justify-content center
    .delete
      display flex
      align-items center
      justify-content center
      margin-top 0 !important
      a
        margin-left 1rem
    @media(max-width 640px)
      .add-item
        display flex
        justify-content center
      .add-row
        justify-content center
      .update-status
        margin-right 0

.ml-auto
  margin-left auto

.new-plan
  margin-top 1rem
  background #F6F9FC
  padding 2rem
  padding-top 3rem
  transition all .4s ease

.mt-2
  margin-top 2rem

.mb-2
  margin-bottom 2rem

.page
  padding-bottom 40px
  .mobile
    display none
    @media(max-width 1024px)
      display inline
  >>>.tr
    width 250px
    @media(max-width 1024px)
      display none
  .search
    max-width 770px
    margin-bottom 40px
  .list
    .top
      align-items center
      height 30px
      color #B0C5DC
      font-size 12px
      line-height 16px
      font-weight 500
      font-family 'Spartan', sans-serif
      border-bottom 2px solid #DDE9F6
      @media(max-width 768px)
        display none !important
    .split
      display flex
      flex-wrap wrap
      display grid
      grid-template-columns 1fr 1fr 3fr auto
      gap 20px
      @media(max-width 1024px)
        grid-template-columns 50px 100px 140px auto
      @media(max-width 768px)
        grid-template-columns auto auto
        gap 20px 10px
    .more
      display flex
      justify-content center
      margin-top 20px
    .mid
      .item
        overflow hidden
        border-bottom 1px solid #DDE9F6
        @media(max-width 768px)
          padding 10px 0
        .emailme
          display flex
          justify-content center
        .arrow
          transition 0.2s all
        .content
          overflow hidden
          max-height 0
          transition 0.2s all
          @media(max-width 1024px)
            flex-wrap wrap
            grid-template-columns 1fr
            gap 0
          .msg
            padding-top 5px
            padding-bottom 5px
        .maininfo
          position relative
          align-items center
          min-height 70px
          font-size 14px
          line-height 20px
          color #231F4D
          @media(max-width 1024px)
            align-items flex-start
            .flex-end
              .ml-auto
                margin-left 0
          @media(max-width 768px)
            .mobile-only
              display block
        .click
          position absolute
          left 70px
          top 0
          width calc(100% - 70px)
          height 100%
          z-index 2
        &.strong
          font-weight 600
        &.open
          .content
            max-height 5000px
          .arrow
            transform rotate(180deg)

.fade-enter-active, .fade-leave-active
  transition all .5s

.fade-enter, .fade-leave-to
  opacity 0

.list-enter-active
  transition all .5s

.list-leave-active
  transition all .1s

.list-enter
  transform translateY(-50px)
  margin-bottom -50px

.mx-datepicker
  width 100%
  margin-top 2px

</style>
