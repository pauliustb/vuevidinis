<template lang="pug">
div.footer
  div.full-container
    div.top
      div
        a(href="https://www.verslilietuva.lt/" target="_BLANK")
          //icon(data="@/assets/svg/logo_full.svg" color="#fff" width="195" height="69")
          img(src="/img/logo2-white.png" alt="Logo")
      div
        div.block(v-if="footer && footer.block1")
          div.title {{footer.block1.title}}
          div.text(v-if="footer.block1.type=='links' && footer.block1.links")
            div(v-for="item in footer.block1.links")
              router-link(v-bind:to="item.link") {{item.text}}
          div.text(v-if="footer.block1.type=='text' && footer.block1.text" v-html="footer.block1.text")
      div
        div.block(v-if="footer && footer.block2")
          div.title {{footer.block2.title}}
          div.text(v-if="footer.block2.text" v-html="footer.block2.text")
        div.share(v-if="footer && footer.share && (footer.share.facebook_url || footer.share.twitter_url || footer.share.linkedin_url)")
          a(v-if="footer.share.facebook_url" v-bind:href="footer.share.facebook_url" target="_BLANK")
            icon(:data="faData" color="#5A98C8" width="6px" height="12px")
          a(v-if="footer.share.twitter_url" v-bind:href="footer.share.twitter_url" target="_BLANK")
            icon(:data="twData" color="#5A98C8" width="15" height="12")
          a(v-if="footer.share.linkedin_url" v-bind:href="footer.share.linkedin_url" target="_BLANK")
            icon(:data="lnData" color="#5A98C8" width="12" height="12")
          a(v-if="footer.share.youtube_url" v-bind:href="footer.share.youtube_url" target="_BLANK")
            icon(:data="youtubeData" color="#5A98C8" width="14" height="10")

    div.copy
      div © {{new Date().getFullYear()}}. "Enterprise Lithuania"
        //- router-link(v-bind:to="{name:'PrivatumoPolitika'}" style="  color: #c7c8ca;  font-size: 12px;text-decoration: underline;") {{$t('privatumopolitika')}}
      div.r
        span touched by
        a(href="https://digitouch.lt/" target="_BLANK").link digitouch!
</template>

<script>
import { mapGetters } from 'vuex';
import faData from '@/assets/svg/fa.svg';
import twData from '@/assets/svg/tw.svg';
import lnData from '@/assets/svg/ln.svg';
import youtubeData from '@/assets/svg/youtube.svg';
export default {

  name: 'FooterEl',
  components: {
  },
  created() {
  },
  data() {
    return {
      faData,
      twData,
      lnData,
      youtubeData,
      loading: true,
    };
  },
  computed: {
    ...mapGetters('Menu', {
      footer: 'footer',
    }),
  },
  methods: {
  },
  watch: {
  },
};
</script>

<style scoped lang="stylus">
.footer
  border-top 1px solid #D0D3DC
  background-color #231F4D
  padding-top 80px

  @media (max-width 1024px)
    padding-top 50px

  .copy
    padding 30px 0px
    font-size 12px
    color #C7C8CA
    line-height 12px
    display grid
    grid-template-columns 1fr 1fr
    gap 20px

    @media (max-width 500px)
      display flex
      flex-wrap wrap
      gap 5px

    .r
      text-align right

      @media (max-width 500px)
        text-align left

  .top
    display grid
    grid-template-columns 200px auto 360px
    gap 80px
    margin-bottom 30px

    @media (max-width 1024px)
      display flex
      flex-wrap wrap
      gap 60px

    @media (max-width 500px)
      display flex
      flex-wrap wrap
      flex-direction column
      gap 60px

    .block
      .title
        margin-top 20px
        font-size 24px
        line-height 24px
        margin-bottom 30px
        font-weight 600
        font-family 'Spartan', sans-serif
        color #FFFFFF

      .text
        font-size 14px
        line-height 24px
        font-weight 300
        color #FFFFFF

        >>> a
          text-decoration underline

    .share
      margin-top 30px
      display flex

      a
        width 40px
        height 40px
        display flex
        border-radius 50%
        border 1px solid #5A98C8
        justify-content center
        align-items center
        margin-right 14px

        &:last-child
          margin-right 0px

</style>
