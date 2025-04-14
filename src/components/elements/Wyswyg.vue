<template lang="pug">
div.html(v-html="html")
</template>
<script>

export default {

  name: 'UserWyswyg',
  props: ['html'],
  components: {
  },
  mounted() {

  },
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {

  },
  beforeUnmount() {
  }
  // beforeDestroy() {
  // },
};
</script>

<style scoped lang="stylus">
.html{
  >>>strong{
    font-weight: 600;
  }
  >>>hr{
    margin-top: 10px;
    margin-bottom: 10px;
  }
>>>h1{
      margin-top: 20px;
font-family: 'Spartan', sans-serif;
  color: #231F4D;
font-size: 36px;
font-weight: 800;
line-height: 46px;
margin-bottom: 20px;
}
>>>h2{
      margin-top: 20px;
font-family: 'Spartan', sans-serif;
color: #231F4D;
font-size: 30px;
font-weight: 800;
line-height: 34px;
margin-bottom: 20px;
}
>>>h3{
      margin-top: 20px;
font-family: 'Spartan', sans-serif;
color: #231F4D;
font-size: 24px;
font-weight: 800;
line-height: 28px;
margin-bottom: 20px;
}
>>>h4{
      margin-top: 20px;
font-family: 'Spartan', sans-serif;
  color: #231F4D;
font-size: 18px;
font-weight: 800;
line-height: 24px;
margin-bottom: 20px;
}
>>>h5{
      margin-top: 20px;
font-family: 'Spartan', sans-serif;
color: #231F4D;
font-size: 16px;
font-weight: 800;
line-height: 20px;
margin-bottom: 20px;
}
>>>h6{
      margin-top: 20px;
 font-family: 'Spartan', sans-serif;
color: #231F4D;
font-size: 16px;
font-weight: 800;
line-height: 20px;
margin-bottom: 20px;
}
>>>.alignleft {
    float: left;
    margin:0 15px 30px 0;
}
>>>.aligncenter {
    display: block;
    margin: 0 auto 30px auto;
}
>>>.alignright {
    float: right;
    margin:0 0 30px 15px;
}
>>>.alignnone {
    float: none;
    display:block;
    margin:0 0 30px 0;
    img{
      display: block;
      margin: 0 auto;
    }
}
>>>.size-full {
    width:100%;
    height:auto;
    margin:0 0 30px 0;
}
>>>p .alignleft {
    float: left;
    margin:5px 15px 30px 0;
}
>>>p .aligncenter {
    display: block;
    margin: 5px auto 30px auto;
}
>>>p .alignright {
    float: right;
    margin:5px 0 30px 15px;
}
>>>p .alignnone {
    float: none;
    display:block;
    margin:5px 0 30px 0;
}
>>>p .size-full {
    width:100%;
    height:auto;
    margin:5px 0 30px 0;
}
>>>p{
  color: #6B798B;
font-size: 14px;
font-weight: 300;
line-height: 22px;
margin-bottom: 10px;
}
>>>span{
  font-size: 16px !important;
}
>>>table{
  border-collapse: collapse;
  border: 1px solid #6B798B;
  color: #6B798B;
font-size: 14px;
font-weight: 400;
margin-bottom: 10px;
th{
  padding: 5px;
  border: 1px solid #6B798B;
  font-weight: 700;
  text-align: left;
}
td{
  padding: 5px;
  border: 1px solid #6B798B;
}
}
>>>ul,>>>ol{
  color: #6B798B;
font-size: 14px;
font-weight: 400;
line-height: 22px;
padding-left: 30px;
margin-bottom: 20px;
  li{
    margin-bottom: 10px;
  }
}
>>>ul{
    list-style: none;
    li{
      position: relative;
      &:before{
        content: '';
        position:absolute;
        left: -28px;
        top: 7px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #5A98C8;
      }
    }
}
>>>ol{
  list-style: decimal;
}
>>>a{
  color: #5A98C8;
  text-decoration: underline;
}
}
>>>img{
  max-width: 100%;
  height auto;
}
>>>iframe{
  width: 100%;
  max-width: 100%;
}
>>>blockquote{

 width: 100%;
 font-style: italic;
 font-weight: 300;
   background-color: #5A98C8;
   padding: 30px 40px;
     margin-bottom: 30px;
     p:last-child{
      margin-bottom:0;
     }
}

</style>
