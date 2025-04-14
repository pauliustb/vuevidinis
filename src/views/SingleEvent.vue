<template lang="pug">
div.page.menu-paddingtop
  UserLoader(color="dark" v-if="loading")
  div(v-else)
    transition(name="intro" appear v-bind:duration="{ enter: 1000, leave: 0 }"  )
      div.event
        icon(:data="triangleData" v-bind:original="true").tr
        div.container
          h1 {{single.title}}
          div.singleinfo
            div.left
              div.dates
                div(v-if="!ivykesEvent")
                  div.s1
                    div
                      icon(:data="calendarData" color="#5A98C8" width="16" height="18")
                    div {{$t('singleevent.rpradzia')}}
                  div.text {{datestart}}
                // div(v-if="!ivykesEvent")
                //   div(v-if="single.dates.show_end")
                //     div.s1
                //       div
                //         icon(:data="calendarData" color="#5A98C8" width="16" height="18")
                //       div {{$t('singleevent.rpabaiga')}}
                //     div.text {{dateend}}
                div(v-if="ivykesEvent")
                  div
                    div.s1
                      div
                        icon(:data="calendarData" color="#5A98C8" width="16" height="18")
                      div {{$t('singleevent.rvyko')}}
                    div.text(v-if="single.dates.end_date") {{single.dates.end_date}}
                    div.text(v-if="single.dates.start_date && !single.dates.end_date") {{single.dates.start_date}}
                div(v-if="single.vieta")
                  div.s1
                    div
                      icon(:data="locationData" color="#5A98C8" width="14" height="18")
                    div {{$t('singleevent.rvieta')}}
                  div.text {{single.vieta}} <br>
                    a(v-if="single.map_url" v-bind:href="single.map_url" target="_BLANK") ({{$t('singleevent.map')}})
              div.img(v-if="single.img")
                LazyImg(v-bind:image="single.img" v-bind:cover="false")
            div.info
              h1 {{single.title}}
              div.ivykes(v-if="ivykesEvent")
                h4 Renginys jau įvyko
              div.btnc(v-else)
                div(v-if="single.url")
                  UserBtn(v-on:click="openurl(single.url)" v-bind:href="single.url" v-bind:active="false" color="blue" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('register')" textAligin="center")
                div.addcal
                  DropDown(color="blue")
                    UserBtn(v-bind:href="'#'" v-bind:active="false" color="white" v-bind:disabled="false" v-bind:loading="false" v-bind:uppercase="false" v-bind:text="$t('singleevent.addtocal')" textAligin="center")
                      template(slot="right")
                        icon(:data="calendarcheckData" color="#5A98C8" width="16" height="18")
                    template(slot="menu")
                      ul
                        li
                          a(v-on:click.prevent="opencalendar('google')" href="#" target="_BLANK") Google {{$t('singleevent.calendar')}}
                        li
                          a(v-on:click.prevent="opencalendar('ical')" href="#" target="_BLANK") iCal {{$t('singleevent.calendar')}}
                        li
                          a(v-on:click.prevent="opencalendar('ical')" href="#" target="_BLANK") Outlook {{$t('singleevent.calendar')}}
              div.files(v-if="single.files")
                a(v-for="item in single.files" v-bind:href="item.file" target="_BLANK")
                  div
                    icon(:data="fileData" color="#5A98C8" width="16" height="16")
                  div {{item.text}}

              div.pranesejai(v-if="single.pranesejai")
                div.name
                  span(v-if="single.pranesejai.length === 1") {{$t('singleevent.pranesejas')}}:
                  span(v-else) {{$t('singleevent.pranesejai')}}:
                div.list(v-for="item in single.pranesejai")
                  div.title {{item.title}}
                  div.subtitle {{item.subtitle}}

              div.text(v-if="single.aprasymas")
                UserWyswyg(v-bind:html="single.aprasymas")

              div.shareel
                UserShare(v-bind:url="single.share_link")
          div.slot
            h3 {{$t('kitirenginiai')}}
            EventsFilter
</template>

<script>
import { mapGetters } from 'vuex';
import EventsFilter from '@/components/Blocks/EventsFilter.vue';
import UserShare from '@/components/Blocks/Share.vue';
import UserWyswyg from '@/components/elements/Wyswyg.vue';
import UserLoader from '@/components/elements/Loader.vue';
import UserBtn from '@/components/elements/Btn.vue';
import DropDown from '@/components/elements/DropDown.vue';
import triangleData from '@/assets/svg/triangle_ornament_left.svg';
import calendarData from '@/assets/svg/calendar.svg';
import locationData from '@/assets/svg/location.svg';
import calendarcheckData from '@/assets/svg/calendar-check.svg';
import fileData from '@/assets/svg/file.svg';
import { format, parse, compareAsc } from 'date-fns';
import { lt } from 'date-fns/locale'; // eslint-disable-line
let locale = false;

export default {

  name: 'SingleStory',
  components: {
    EventsFilter,
    UserShare,
    UserWyswyg,
    UserLoader,
    UserBtn,
    DropDown
  },
  created() {
    if (this.$i18n.locale === 'lt') {
      locale = lt;
    }
  },
  data() {
    return {
      triangleData,
      calendarData,
      locationData,
      calendarcheckData,
      fileData,
      loading: true,
    };
  },
  computed: {
    ...mapGetters('Events', {
      single: 'single',
    }),
    datestart() {
      if (this.single && this.single.dates && this.single.dates.start_date) {
        const date = parse(this.single.dates.start_date, 'yyyy-MM-dd', new Date());
        const m = format(date, 'MMMM', { locale });
        const d = format(date, 'd', { locale });
        let h = '';
        if (this.single.dates.start_time) {
          h = `, ${this.single.dates.start_time}`;
        }
        return `${d} ${m}${h}`;
      }
      return false;
    },
    dateend() {
      if (this.single && this.single.dates && this.single.dates.show_end && this.single.dates.end_date) {
        const date = parse(this.single.dates.end_date, 'yyyy-MM-dd', new Date());
        const m = format(date, 'MMMM', { locale });
        const d = format(date, 'd', { locale });
        let h = '';
        if (this.single.dates.end_time) {
          h = `, ${this.single.dates.end_time}`;
        }
        return `${d} ${m}${h}`;
      }
      return false;
    },
    ivykesEvent() {
      if (this.single && this.single.dates) {
        let compareDate;
        if (this.single.dates.end_date) {
          compareDate = parse(this.single.dates.end_date, 'yyyy-MM-dd', new Date());
        }
        if (this.single.dates.start_date) {
          compareDate = parse(this.single.dates.start_date, 'yyyy-MM-dd', new Date());
        }
        if (compareDate) {
          const now = Date.now();
          if (compareAsc(now, compareDate) === 1) {
            return true;
          }
        }
      }
      return false;
    },
  },
  methods: {
    opencalendar(type) {
      if (this.single && this.single.dates && this.single.dates.start_date) {
        let h = '';
        let dateFormat = 'yyyy-MM-dd';
        if (this.single.dates.start_time) {
          h = ` ${this.single.dates.start_time}`;
          dateFormat = 'yyyy-MM-dd HH:mm';
        }
        const date = parse(`${this.single.dates.start_date}${h}`, dateFormat, new Date());
        const dateStart = format(date, "yyyyMMdd'T'HHmm'02Z'", { locale });
        let dateEnd = '';
        if (this.single && this.single.dates && this.single.dates.show_end && this.single.dates.end_date) {
          let h = '';
          let dateFormat = 'yyyy-MM-dd';
          if (this.single.dates.end_time) {
            h = ` ${this.single.dates.end_time}`;
            dateFormat = 'yyyy-MM-dd HH:mm';
          }
          const fdate = parse(`${this.single.dates.end_date}${h}`, dateFormat, new Date());
          dateEnd = format(fdate, "yyyyMMdd'T'HHmm'02Z'", { locale });
        } else {
          dateEnd = dateStart;
        }


        const ical = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${this.single.share_link}
DTSTART:${dateStart}
DTEND:${dateEnd}
SUMMARY:${this.single.title}
DESCRIPTION:
LOCATION:${this.single.vieta}
END:VEVENT
END:VCALENDAR`;
        const google = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURI(this.single.title)}&dates=${dateStart}/${dateEnd}&details=&location=${encodeURI(this.single.vieta)}&ctz=Europe/Vilnius`;
        if (type === 'ical') {
          window.open(ical, '_blank');
        }
        if (type === 'google') {
          window.open(google, '_blank');
        }
      }
      return false;
    },
    openurl(url) {
      window.open(url, '_blank');
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loading = true;
        this.$store.dispatch('Events/getSingle', this.$route.params.slug).then(() => {
          this.loading = false;
        });
      },
      deep: false,
      immediate: true,
    },
  },
};
</script>

<style scoped lang="stylus">
.page
  padding-bottom: 0px
  background-color: #fff
  .event
    position: relative
    padding-top: 50px
    .container
      position: relative
      z-index: 2
    h3
      text-align: center
      font-size: 24px
      line-height: 24px
      color: #231F4D
      font-weight: 800
      font-family: 'Spartan', sans-serif
      margin-bottom: 40px
    h1
      color: #231F4D
      font-size: 36px
      line-height: 44px
      font-family: 'Spartan', sans-serif
      font-weight: 800
      margin-bottom: 30px
      display: none
      @media(max-width: 1024px)
        display: block
        font-size: 28px
        line-height: 34px
    .tr
      position: absolute
      left: -30px
      top: 0px
      width: 370px
      height: auto
      @media(max-width: 1024px)
        display: none
    .singleinfo
      display: flex
      max-width: 100%
      margin-bottom: 50px
      @media(max-width: 1200px)
        gap: 20px
      @media(max-width: 1024px)
        flex-wrap: wrap
        gap: 20px
      .dates
        background-color: #F2F5F9
        padding: 40px
        margin-bottom: 44px
        display: flex
        flex-wrap: wrap
        gap: 30px 40px 
        @media(max-width: 1024px)
          margin-bottom: 0px
          padding: 20px
          gap: 20px
        .s1
          align-items: flex-end
          font-family: 'Spartan', sans-serif
          font-size: 12px
          line-height: 12px
          letter-spacing: 0.4px
          color: #5A98C8
          font-weight: 500
          display: flex
          gap: 14px
          margin-bottom: 12px
        .text
          color: #231F4D
          font-size: 16px
          line-height: 16px
          font-weight: 500
          line-height: 20px
          a
            color: #5A98C8
            text-decoration: underline
      .img
        margin-bottom: 30px
        @media(max-width: 1024px)
          display: none
    .info
      h1
        display: block
        @media(max-width: 1024px)
          display: none
      .ivykes
        margin-bottom: 2rem
        h4
          font-weight: 700
          font-size: 1.1em
          color: #25408f
      .btnc
        display: flex
        margin-bottom: 30px
        flex-wrap: wrap
        > div
          margin-bottom: 4px
          margin-right: 10px
          &:last-child
            margin-right: 0px
        .addcal
          min-width: 214px
          >>> .btn
            width: 100%
            max-width: 100%
      .files
        margin-bottom: 40px
        @media(max-width: 1024px)
          margin-bottom: 20px
        > a
          font-size: 13px
          line-height: 13px
          font-family: 'Spartan', sans-serif
          font-weight: 600
          color: #5A98C8
          display: flex
          align-items: center
          gap: 14px
          margin-bottom: 6px
          &:last-child
            margin-bottom: 0px
      .pranesejai
        margin-bottom: 40px
        @media(max-width: 1024px)
          margin-bottom: 20px
        .name
          font-family: 'Spartan', sans-serif
          font-size: 12px
          line-height: 12px
          font-weight: 500
          color: #5A98C8
          margin-bottom: 10px
        > div
          margin-bottom: 10px
          &:last-child
            margin-bottom: 0px
          .title
            font-size: 18px
            line-height: 24px
            font-weight: 500
            color: #231F4D
          .subtitle
            font-size: 16px
            line-height: 24px
            color: #6B798B
            font-weight: 300
      .text
        margin-bottom: 40px
        @media(max-width: 1024px)
          margin-bottom: 20px
      .shareel
        margin-bottom: 40px
.singleinfo
  .left
    display: block
    align-self: auto
    width 470px
.singleinfo
  .info
    margin-left 140px
.singleinfo
  .info
    h1
      text-tranformation: none
.intro-enter-active
  .left
    transition: all 0.2s ease-in 0.2s
  .info
    transition: all 0.2s ease-in 0.4s
  .slot
    transition: all 0.2s ease-in 0.6s
  .tr
    >>> path[pid="0"]
      transition: all 0.2s ease-in 0.5s
    >>> path[pid="1"]
      transition: all 0.2s ease-in 0.4s
    >>> path[pid="2"]
      transition: all 0.2s ease-in 0.6s

.intro-enter
  .left
    transform: translateX(-10px)
    opacity: 0
  .info
    opacity: 0
    transform: translateY(-10px)
  .slot
    opacity: 0
    transform: translateY(-10px)
  .tr
    >>> path[pid="0"]
      opacity: 0
      transform: translateY(10px) translateX(0px)
    >>> path[pid="1"]
      opacity: 0
      transform: translateY(-10px)
    >>> path[pid="2"]
      opacity: 0
      transform: translateY(10px) translateX(-10px)

</style>
