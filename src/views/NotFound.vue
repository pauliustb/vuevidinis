<template lang="pug">
div.full
  div.split
    div.l
      div.title 404
      div.subtitle Not found
</template>

<script>
// import '@/components/icons/donator';

export default {

  name: 'NotFound',
  components: {
  },
  created() {

  },
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped lang="stylus">
.split
  border: 8px solid #5a98c8
  background-color: rgba(255, 255, 255, 1)
  display: flex
  gap: 50px 
  max-width: 740px
  width: 100%
  margin: 0 auto
  padding: 70px
  align-items: flex-end
  margin-bottom: 20px

.full
  background: #fff
  position: relative
  overflow: hidden
  display: flex
  align-items: center
  padding: 10px 15px
  background-position: center center
  background-size: cover

</style>
