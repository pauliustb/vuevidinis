<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    TopPage(v-if="this.$store.getters['user/user'].role === 'mentorius' || this.$store.getters['user/user'].role === 'frontuser'" :title="$t('planas.veiksmuplanasnr')+' '+single.id" :text="false" v-bind:img="null" v-bind:lefto="false" v-bind:righto="'blue'")
      div.container
        div.listcontainer
          UserLoader(color="dark" v-if="loading")
          div(v-else)
            div.main-info(v-if="single")
              div.author
                div
                  span {{$t('planas.autorius')}}
                div
                  span.highlight {{single.verslininkas.fullname}}
              div.plan-info
                div.date-created(v-if="single.sukurimo_data")
                  span.lblue {{$t('planas.planodata')}}
                  span.reg  {{changeDateFormat(single.sukurimo_data)}}
                div.date-edited(v-if="single.redagavimo_data")
                  span.lblue {{$t('planas.paskutiniopakeitimodata')}}
                  span.reg  {{changeDateFormat(single.redagavimo_data)}}
                div.mentee-status(v-if="single.verslininko_paskirtas_statusas")
                  span.lblue {{$t('planas.verslstatus')}}
                  span.reg  {{single.verslininko_paskirtas_statusas}}
                div.mentor-status(v-if="single.mentoriaus_paskirtas_statusas")
                  span.lblue {{$t('planas.mentstatus')}}
                  span.reg  {{single.mentoriaus_paskirtas_statusas}}
                div.pagrindinis-tikslas(v-if="single.mentoriaus_paskirtas_statusas")
                  div
                    span.lblue {{$t('planas.pagrindinistikslas')}}:
                  div
                  span.reg  {{single.pagrindinis_tikslas}}
            div.etapai
              div.single-etapas
                div.mentor-plan-item.single-etapas-head
                  div.veiksmas.px-30 {{$t('planas.versveiksmas')}}
                  div.rezultatas.px-30 {{$t('planas.siekrezultatas')}}
                  div.terminas.px-30 {{$t('planas.singleterminas')}}
                  div.step-status {{$t('planas.statusas')}}
              div.single-etapas(v-for="(singleEtapas, index) in single.etapai" :key="singleEtapas.uid")
                div.veiksmas-title.px-30.py-2
                  div
                    span  {{index+1}}. {{$t('planas.planoveiksmas')}}
                  div.update-status(v-if="editingItem === index")
                    div.error(v-if="updateStepError")
                      span {{$t('planas.nepavyko')}}
                    div.success(v-if="updateStepSuccess")
                      span {{$t('planas.atnaujinta')}}
                  div.buttons
                    div(v-if="!editingItem && single.mentoriaus_paskirtas_statusas ==='aktyvus' && this.$store.getters['user/user'].role === 'frontuser'")
                    BtnSimple(href="#" @click.prevent="editItem(singleEtapas, index)" v-bind:active="false" color="blue" v-bind:disabled="saveDisabled" v-bind:uppercase="false" v-bind:text="$t('planas.redaguoti')" textAligin="center")
                    div(v-if="editingItem === index")
                    BtnSimple(href="#" @click.prevent="cancelEdit()" v-bind:active="false" color="grey" v-bind:disabled="saveDisabled" v-bind:uppercase="false" v-bind:text="$t('planas.atsaukti')" textAligin="center")
                    div(v-if="editingItem === index")
                      UserBtn(href="#" @click.prevent="saveChange()" :loading="loadingSaveBtn" v-bind:active="false" color="green" v-bind:disabled="saveDisabled" v-bind:uppercase="false" v-bind:text="$t('planas.issaugoti')" textAligin="center")
                div.mentor-plan-item.item-content(:class="{ editing : editingItem === index}")
                  div.veiksmas.px-30.py-2
                    div.content(v-if="editingItem !== index")
                      span.mobile-only {{$t('planas.versveiksmas')+':'}}
                      span {{singleEtapas.veiksmas}}
                    div.veiksmas-edit(v-else)
                      UserInput(:placeholder="$t('planas.veiksmas')" value="testas" type="textarea"
                      :maxlength="1500" :error="veiksmasError" v-model="veiksmas" :showLength="true" :showLabel="true")
                  div.rezultatas.px-30.py-2
                    div.content(v-if="editingItem !== index")
                      span.mobile-only {{$t('planas.siekrezultatas')+':'}}
                      span {{singleEtapas.siekiamas_rezultatas}}
                    div.rezultatas-edit(v-else)
                      UserInput(:placeholder="$t('planas.siekrezultatas')" type="textarea"
                      :maxlength="1500" :error="siekiamas_rezultatasError" v-model="siekiamas_rezultatas" :showLength="true" :showLabel="true")
                  div.terminas.px-30.py-2
                    div.content(v-if="editingItem !== index")
                      span.mobile-only {{$t('planas.singleterminas')+':'}}
                      span {{changeDateFormat(singleEtapas.terminas)}}
                    div.terminas-edit(v-else)
                      div.terminas-label
                        span.small-label {{$t('planas.terminas')}}
                      DatePicker(v-model="terminas" :disabled-date="notBeforeToday" :enable-time-picker="false" default-value="2021-12-17" :class="{error: terminasError}" type="date" valueType="format" locale='lt')

                  div.step-status.px-30.py-2(:class="{unfinished: !singleEtapas.status && editingItem !== index, finished: singleEtapas.status && editingItem !== index, editing: editingItem === index, active: savedStatus.includes(index)}")
                    div.status-content(v-if="editingItem !== index")
                      div.inactive(v-show="singleEtapas.status === false" :class="{hidden : savedStatus.includes(index)}")
                        UserLoader(color="dark" v-if="loadingSaveStatus === index" class="complete-loader")
                        div(v-if="loadingSaveStatus !== index" class="status-wrapper")
                          icon(:data="vykdomasData" width="40" height="40" color="#6B798B")
                          span.spantext {{ stepStatus(singleEtapas.status) }}
                          div(v-if="this.$store.getters['user/user'].role === 'frontuser' && single.mentoriaus_paskirtas_statusas ==='aktyvus'")
                            a(href="#" @click.prevent="completeStep(singleEtapas, index)") {{$t('planas.pazymetiivykdytu')}}
                      div.active(v-if="singleEtapas.status === true || savedStatus.includes(index)")
                        AnimatedCheckmark
                        div
                          span.spantext {{$t('planas.atlikta')}}
                    div.status-edit(v-else)
                      span.small-label {{$t('planas.statusas')}}
                      v-select(:options="statusLabels"
                      :get-option-label="(statusLabels) => statusLabels.label"
                      v-model="status"
                      label="label"
                      class="style-chooser"
                      :class="{error: statusError}"
                      :placeholder="$t('planas.pasirinkite')"
                      )
            div.mt-2.update-block
              div.update-status
                div.error(v-if="updateError")
                  span {{$t('planas.nepavyko')}}
                div.success(v-if="updateSuccess")
                  span {{$t('planas.atnaujinta')}}
              div(v-if="this.$store.getters['user/user'].role === 'frontuser' && single.verslininko_paskirtas_statusas ==='aktyvus' || this.$store.getters['user/user'].role === 'mentorius' && single.mentoriaus_paskirtas_statusas ==='aktyvus' ")
              BtnSimple(href="#" @click.prevent="submit" v-bind:active="false" color="blue" :wider="true" v-bind:disabled="disabled" v-bind:loading="loadingBtn" v-bind:uppercase="false" v-bind:text="$t('planas.pazymetiivygdytu')" textAligin="center")
    div.container(v-else)
      h1.error {{$t('planas.prisijunkite')}}
</template>

<script>
import { mapGetters } from 'vuex';
// import { throttle } from 'throttle-debounce';
import TopPage from '@/components/Blocks/TopPage.vue';
import AnimatedCheckmark from '@/components/elements/AnimatedCheckmark.vue';
import BtnSimple from '@/components/elements/BtnSimple.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';
import UserInput from '@/components/elements/Userinput.vue';
import vykdomasData from '@/assets/svg/icon-vykdomas.svg'
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { lt } from 'date-fns/locale'
// eslint-disable-next-line no-unused-vars
import { format, parse } from 'date-fns';


export default {

  name: 'SingleVeiksmuPlanas',
  components: {
    TopPage,
    AnimatedCheckmark,
    BtnSimple,
    DatePicker,
    UserLoader,
    UserBtn,
    UserInput
  },
  data() {
    return {
      vykdomasData,
      lt,
      editing: false,
      loadingIntro: true,
      loadingBtn: false,
      openedItems: [],
      loading: true,
      updateSuccess: false,
      updateError: false,
      loadingSaveStatus: false,
      savedStatus: [],
      disabled: false,
      editingItem: false,
      siekiamas_rezultatas: false,
      veiksmas: false,
      terminas: false,
      status: false,
      uid: false,
      siekiamas_rezultatasError: false,
      terminasError: false,
      veiksmasError: false,
      statusError: false,
      loadingSaveBtn: false,
      saveDisabled: false,
      updateStepSuccess: false,
      updateStepError: false,
      statusLabels: [{
        label: 'Įvykdytas',
        value: true,
      },
      {
        label: 'Vykdomas',
        value: false,
      }],
      editedItem: [
        {
          status: false,
          terminas: false,
          uid: false,
          veiksmas: false,
        },
      ],
    };
  },
  created() {
    if (this.single === 'undefined') {
      this.$router.push({ name: 'Home' });
    }
  },
  computed: {
    ...mapGetters('VeiksmuPlanas', {
      single: 'single',
    }),
  },
  methods: {
    changeDateFormat(date) {
      const dateOb = parse(date, 'dd/MM/yyyy', new Date());
      const dateString = format(dateOb, 'yyyy-MM-dd');
      return dateString;
    },
    cancelEdit() {
      this.editingItem = false;
      this.editing = false;
    },
    editItem(item, index) {
      // eslint-disable-next-line no-unused-expressions
      this.editing = true;
      this.editingItem = index;
      this.siekiamas_rezultatas = item.siekiamas_rezultatas;
      this.veiksmas = item.veiksmas;
      this.uid = item.uid;

      if (item.status === true) {
        this.status = [{ label: 'Įvykdytas', value: true }];
      }
      if (!item.status) {
        this.status = [{ label: 'Vykdomas', value: false }];
      }

      this.editedItem.status = item.status;
      const date = parse(item.terminas, 'dd/MM/yyyy', new Date());
      this.terminas = date;
      this.editedItem.uid = item.uid;

      return true;
    },
    notBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date.getTime() < today.getTime();
    },
    stepStatus(param) {
      if (param) {
        return this.$t('planas.ivykdytas');
      }
      return this.$t('planas.vykdomas');
    },
    submit() {
      if (!this.loadingBtn) {
        this.loadingBtn = true;
        this.$store.dispatch('VeiksmuPlanas/markPlanAsCompleted', {
          planId: this.single.id,
        }).then((data) => {
          this.loadingBtn = false;
          this.disabled = false;
          if (data.status === true) {
            this.disabled = true;
            this.updateSuccess = true;
            this.updateError = false;
          } else {
            this.updateError = true;
          }
        });
      }
    },
    saveChange() {
      console.log("Terminas prieš pakeitimą:", this.terminas);
      this.updateEmptyField = false;
      this.siekiamas_rezultatasError = false;
      this.veiksmasError = false;
      this.statusError = false;
      this.terminasError = false;

      if (!this.siekiamas_rezultatas) {
        this.siekiamas_rezultatasError = true;
        this.updateEmptyField = true;
      }
      if (!this.terminas) {
        this.terminasError = true;
        this.updateEmptyField = true;
      }
      if (!this.veiksmas) {
        this.veiksmasError = true;
        this.updateEmptyField = true;
      }
      if (!this.status) {
        this.statusError = true;
        this.updateEmptyField = true;
      }
      if (!this.loadingSaveBtn && !this.updateEmptyField) {
        this.loadingSaveBtn = true;
        this.$store.dispatch('VeiksmuPlanas/updateStep', {
          planId: this.single.id,
          siekiamas_rezultatas: this.siekiamas_rezultatas,
          veiksmas: this.veiksmas,
          status: this.status.value,
          uid: this.uid,
          terminas: this.terminas,
        }).then((data) => {
          this.loadingSaveBtn = false;
          this.saveDisabled = false;
          if (data.status === true) {
            this.updateStepSuccess = true;
            this.updateStepError = false;
            setTimeout(() => {
              this.loadingIntro = true;
              this.loading = true;
              this.$store.dispatch('VeiksmuPlanas/getSingle', this.$route.params.id).then(() => {
                this.loadingIntro = false;
                this.loading = false;
                this.updateStepSuccess = false;
                this.cancelEdit();
              });
            }, 2000);
          } else {
            this.updateStepError = true;
          }
        });
      }
    },
    completeStep(singleEtapas, index) {
      if (!this.loadingSaveStatus) {
        this.loadingSaveStatus = index;
        this.$store.dispatch('VeiksmuPlanas/markStepAsCompleted', {
          planId: this.single.id,
          stepUid: singleEtapas.uid,
        }).then((data) => {
          this.loadingSaveStatus = false;
          if (data.status === true) {
            this.savedStatus.push(index);
          } else {
            this.updateStepError = true;
          }
        });
      }
    },
    openStatus() {
      if (this.single.open === false) {
        this.$store.dispatch('VeiksmuPlanas/open', this.single.id).then(() => {
          this.$store.dispatch('VeiksmuPlanas/getUnreadPlansCount');
          this.$store.dispatch('VeiksmuPlanas/get').then(() => {});
        });
      }
    },
  },
  watch: {
    '$route.meta.id': {
      handler() {
        this.loadingIntro = true;
        this.loading = true;
        this.$store.dispatch('VeiksmuPlanas/getSingle', this.$route.params.id).then(() => {
          this.loadingIntro = false;
          this.loading = false;
          this.openStatus();
        });
      },
      deep: false,
      immediate: true,
    },
    terminas(newValue) {
      console.log("Nauja termino reikšmė:", newValue);
    }
  },
};
</script>

<style scoped lang="stylus">
.single-etapas
  .update-status
    margin-left: auto
.small-label
  color: #6b798b
  font-size: 14px
.px-30
  padding-left: 30px
  padding-right: 30px
.py-2
  padding-top: 20px
  padding-bottom: 20px
.plan-info
  max-width: 320px
  div
    margin-bottom: .3rem
    display: flex
    justify-content: space-between
    .lblue
      color: #5A98C8
    .reg
      text-transform: capitalize
  .pagrindinis-tikslas
    display: block
.author
  margin-bottom: 2rem
  span
    color: #5A98C8
  .highlight
    font-size: 24px
    color: #000
    font-weight: 600
.hidden
  height: 0
  visibility: hidden
  opacity: 0
.mobile-only
  display: none
h1
  &.error
    font-weight: 700
    color: #231f4d
    font-size: 2em
    margin-top: 5rem
.mt-2
  margin-top: 2rem
.px-2
  padding-left: 10px
  padding-right: 10px
.update-block
  display: flex
  justify-content: flex-end
  .update-status
    margin-right: 2rem
    display: flex
    align-items: center
    font-weight: 700
    .success
      color: #2bac76
    .error
      color: #e16969
.etapai
  margin-top: 4rem
  padding-bottom 290px
  @media(max-width: 1024px)
    .single-etapas-head
      display: none !important
  .single-etapas
    .terminas-edit
      //Pakeičiame mx-datepicker i vue3-datepicker-input
      .vue3-datepicker-input
        width: 100%
    .buttons
      display: flex
      div
        margin-left: 10px
      @media(max-width: 580px)
        width: 100%
        justify-content: space-between
        margin-top: 15px
    .veiksmas-title
      @media(max-width: 580px)
        display: block !important
    .mentor-plan-item
      min-height: 65px
      display: flex
      flex-wrap: wrap
      gap: 0px
      @media(max-width: 1024px)
        margin-top: 5px
        gap: 20px
        .step-status, .terminas, .rezultatas, .veiksmas
          padding-top: 1rem
          padding-bottom: 1rem
          border-bottom: 1px solid #e3edfa
          display: flex
          flex-direction: column
          align-items: normal
        .status-wrapper
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          div
            flex-direction: column
        .mobile-only
          display: block
          margin-right: 8px
          text-align: left
          width: 100%
        .checkmark
          margin: 0 auto !important
      &.item-content
        .veiksmas .content, .rezultatas .content
          display: flex
          align-items: flex-start
        .status-wrapper
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          text-align: center
          span
            color: #6B798B
            text-transform: uppercase
            font-weight: 700
            font-size: 14px
        .step-status
          padding-top: 2rem
          padding-bottom: 2rem
          align-items: center
          justify-content: center
          transition: background 1s ease
          .spantext
            margin-top: .5rem
          &.unfinished
            background: #F6F9FC
          &.finished, &.active
            background: #F0FBE0
          .active
            text-align: center
            flex-direction: column
            align-items: center
            div
              span
                text-transform: uppercase
                font-weight: 700
                color: #7AC142
                font-size: 14px
      &.editing
        .veiksmas-edit, .rezultatas-edit, .terminas-edit, .status-edit
          display: block
          width: 100%
          max-width: 340px
        .terminas, .step-status
          align-items: flex-start !important
        .step-status
          padding-top: 20px
          padding-bottom: 20px
          display: block
          .error
            border: 1px solid #dc4e41
      .rezultatas
        span
          color: #6B798B
      .terminas
        span
          color: #6B798B
      &.single-etapas-head
        margin-bottom: 0
        background: #7EB4DE
        color: #fff
        font-weight: 500
        font-size: 14px
        div
          border-right: 1px solid #fff
        div:last-child
          border: none
    .veiksmas-title
      padding-top: 20px
      padding-bottom: 20px
      background: #DDE9F6
      display: flex
      justify-content: space-between
      align-items: center
      span
        color: #5A98C8

    .veiksmas, .rezultatas
      width: 30%

    .terminas, .step-status
      width: 20%

  .eilnr
    background: #25408F
    color: #fff
    font-weight: 700
    font-size: 2em
    display: flex
    align-items: center
    justify-content: center
    &.sm
      font-size: 16px
  .veiksmas, .rezultatas, .terminas
    display: flex
    align-items: center
  .step-status
    position: relative
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    &.editing
      align-items: normal !important
    a
      margin-top: 1rem
      font-weight: 600
      text-decoration: underline
      color: #5a98c8
.page
  padding-bottom: 40px
  .mobile
    display: none
    @media(max-width: 1024px)
      display: inline
  >>> .tr
    width: 250px
    @media(max-width: 1024px)
      display: none
  .search
    max-width: 770px
    margin-bottom: 40px
  .list
    .top
      align-items: center
      height: 30px
      color: #B0C5DC
      font-size: 12px
      line-height: 16px
      font-weight: 500
      font-family: 'Spartan', sans-serif
      border-bottom: 2px solid #DDE9F6
      @media(max-width: 768px)
        display: none !important
    .split
      display: flex
      flex-wrap: wrap
      gap: 20px
      @media(max-width: 1024px)
        gap: 20px
      @media(max-width: 768px)
        gap: 10px
    .more
      display: flex
      justify-content: center
      margin-top: 20px
    .mid
      .item
        overflow: hidden
        border-bottom: 1px solid #DDE9F6
        @media(max-width: 768px)
          padding: 10px 0px
        .emailme
          display: flex
          justify-content: center
        .arrow
          transition: 0.2s all
        .content
          overflow: hidden
          max-height: 0px
          transition: 0.2s all
          @media(max-width: 1024px)
            flex-wrap: wrap
            gap: 0px
          .msg
            padding-top: 5px
            padding-bottom: 5px
        .maininfo
          position: relative
          align-items: center
          min-height: 70px
          font-size: 14px
          line-height: 20px
          color: #231F4D
          @media(max-width: 1024px)
            align-items: flex-start
        .click
          position: absolute
          left: 70px
          top: 0
          width: calc(100% - 70px)
          height: 100%
          z-index: 2
        &.strong
          font-weight: 600
        &.open
          .content
            max-height: 5000px
          .arrow
            transform: rotate(180deg)
</style>
