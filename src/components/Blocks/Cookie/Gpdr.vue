<template lang="pug">
div.gpdr
  div.leftc
    //- div.logo
    //-   svgico(name="logo" width="150" height="100" color="#000")
    div.menu
      div.r
        UserBtn(v-on:click="settab(0)" size="mid" v-bind:active="active==0" color="blue" v-bind:href="'#'" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('gdpr.slappolitika')" textAligin="center")
          template(slot="left")
            icon(data="@/assets/svg/gpdr1.svg" width="20" height="20" color="#fff")
      div.r
        UserBtn(v-on:click="settab(1)" v-bind:active="active==1" size="mid" color="blue" v-bind:href="'#'" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('gdpr.butslapukai')" textAligin="center")
          template(slot="left")
            icon(data="@/assets/svg/gpdr2.svg" width="20" height="20" color="#fff")
      div.r
        UserBtn(v-on:click="settab(2)" v-bind:active="active==2" size="mid" color="blue" v-bind:href="'#'" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('gdpr.trecsaliuslapukai')" textAligin="center")
          template(slot="left")
            icon(data="@/assets/svg/gpdr3.svg" width="20" height="20" color="#fff")
  div.right
    div.close(v-on:click="$emit('close')")
      icon(data="@/assets/svg/close.svg" width="20" height="20" color="#fff")
    div.top
      transition(name="fade" mode="out-in")
        div(v-if="active==0" key="0")
          div.title {{$t('gdpr.slappolitika')}}
          div.text {{$t('gdpr.slapukutext')}}
          //- router-link(v-bind:to="{name:'PrivatumoPolitika'}" style="  color: #000;  font-size: 12px;text-decoration: underline;" target="_BLANK") {{$t('privatumopolitika')}}
        div(v-if="active==1" key="1")
          div.title {{$t('gdpr.butslapukai')}}
          div.text {{$t('gdpr.bslapukai1')}}
          YesNo(v-model="butinieji").m
          div.text(v-if="butinieji===false") {{$t('gdpr.bslapukai2')}}
        div(v-if="active==2" key="2")
          div.title {{$t('gdpr.trecsaliuslapukai')}}
          div.text {{$t('gdpr.treciusaliu1')}}
          YesNo(v-model="treciujusaliu" v-bind:disabled="butinieji===false").m
          div.text(v-if="butinieji===false") {{$t('gdpr.treciusaliu2')}}
    div.bot
      Btn(v-if="showsave" v-on:click="save" size="mid" color="blue" v-bind:href="'#'" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('user.save')" textAligin="center")
</template>
<script>
import Cookies from 'js-cookie';

export default {

  name: 'UserGpdr',
  components: {
  },
  created() {
    const butinieji = Cookies.get('butinieji');
    const treciujusaliu = Cookies.get('treciujusaliu');
    if (butinieji === '0') {
      this.butinieji = false;
    } else {
      this.butinieji = true;
    }
    if (treciujusaliu === '0') {
      this.treciujusaliu = false;
    } else {
      this.treciujusaliu = true;
    }
    this.$nextTick(() => { this.showsave = false; });
  },
  data() {
    return {
      active: 0,
      butinieji: true,
      treciujusaliu: true,
      showsave: false,
    };
  },
  computed: {
  },
  methods: {
    settab(index) {
      this.active = index;
    },
    save() {
      if (this.butinieji === false && this.treciujusaliu === false) {
        Cookies.set('butinieji', 0);
        Cookies.set('treciujusaliu', 0);
        Cookies.set('hidecookiebar', 1);
        this.$gtag.optOut();
      }
      if (this.butinieji === true && this.treciujusaliu === false) {
        Cookies.set('butinieji', 1, { expires: 356 });
        Cookies.set('treciujusaliu', 0, { expires: 356 });
        Cookies.set('hidecookiebar', 1, { expires: 356 });
        this.$gtag.optOut();
      }
      if (this.butinieji === true && this.treciujusaliu === true) {
        Cookies.set('butinieji', 1, { expires: 356 });
        Cookies.set('treciujusaliu', 1, { expires: 356 });
        Cookies.set('hidecookiebar', 1, { expires: 356 });
        this.$gtag.optIn();
      }
      this.$emit('close');
      // location.reload();
    },
  },
  watch: {
    'butinieji'() { // eslint-disable-line
      this.showsave = true;
      if (this.butinieji === false) {
        this.treciujusaliu = false;
      }
    },
    'treciujusaliu'() { // eslint-disable-line
      this.showsave = true;
    },
  },
};
</script>

<style scoped lang="stylus">
.gpdr
  border: 0px solid #000
  position: relative
  background: #fff
  width: 100%
  max-width: 1000px
  display: flex
  flex-wrap: wrap
  justify-content: space-between

  .leftc
    padding: 50px
    display: flex
    align-items: center
    .btn
      justify-content: flex-start

  .right
    min-height: 530px
    display: flex
    flex-direction: column
    background-color: #efefef
    padding: 50px

    .title
      font-family: 'Spartan', sans-serif
      color: #000
      font-size: 30px
      font-weight: 600
      line-height: 36px
      margin-bottom: 30px

    .text
      color: #000000
      font-size: 14px
      font-weight: 400
      line-height: 22px
      margin-bottom: 20px

    .m
      margin-bottom: 20px

  .logo
    margin-bottom: 30px
    svg
      width: 100% !important
      height: auto !important

  .menu
    width: 100%
    .r
      margin-bottom: 20px
      >a
        max-width: 100%
        width: 100%

.top
  display: flex
  flex-grow: 1

.close
  z-index: 8
  position: absolute
  right: 0
  top: 0
  width: 50px
  height: 50px
  background-color: #5a98c8
  cursor: pointer
  display: flex
  justify-content: center
  align-items: center

.bot
  display: flex
  justify-content: flex-end
  padding-top: 30px

@media (max-width: 800px)
  .gpdr
    .right, .left
      padding: 20px

    .leftc
      padding: 20px
      padding-top: 40px

    flex-wrap: wrap
    .right
      min-height: 200px
    .leftc, .right
      width: 100%

</style>
