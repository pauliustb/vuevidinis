<template lang="pug">
  div.block
    div.list-item(v-for="(klausimas, index) in data.klausimai")
      div.check-yes(@click="toggleYesNo(index)")
      div.yesno
        YesNo(:showYesNo='true' :value="klausimaiArray[index].checkedYes" @input="eventHandler(index, $event)")
      div.item-title {{klausimas.klausimas}} {{klausimaiArray[index].checkedYes}}
    div.submit-result
      UserBtn(v-bind:href="'#'" @click="seeResult" v-bind:active="false" color="blue" v-bind:uppercase="false" v-bind:text="$t('pamatykRezultata')" textAligin="center")
    div.result(v-if="showResult")
      transition(name="fade")
        div.result-yes(v-if="!resultWithNo")
          UserWyswyg(v-bind:html="'<h4>'+data.tekstas_kuris_rodomas_kai_visi_klausimai_pazymeti_varnele+'</h4>'")
        div.result-no(v-else)
          UserWyswyg(v-bind:html="'<h4>'+data.tekstas_kuris_rodomas_kai_ne_visi_klausimai_pazymeti_varnele+'</h4>'")
</template>

<script>
import UserBtn from '@/components/elements/Btn.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';

export default {
  name: 'SarasasSuVarnelemis',
  components: {
    UserBtn,
    UserWyswyg,
  },
  data() {
    return {
      klausimaiArray: [],
      resultWithNo: false,
      showResult: false,
    };
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.data.klausimai.forEach((v) => {
      const el = {};
      el.klausimas = v.klausimas;
      el.checked = false;
      this.klausimaiArray.push(el);
    });
  },
  methods: {
    eventHandler(index, $event) {
      this.klausimaiArray[index].checked = $event;
    },
    seeResult() {
      if (this.klausimaiArray.some((e) => e.checked === false)) {
        this.resultWithNo = true;
        this.showResult = true;
      } else {
        this.resultWithNo = false;
        this.showResult = true;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.submit-result
  margin-top: 40px;
  margin-bottom:50px
.list-item
  display:flex
  margin-bottom: 30px;
  .item-title
    margin-left: 20px
    flex-grow: 1
    align-items: center;
    display: flex;
    font-weight: 500
    color: #040E30
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
