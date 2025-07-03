<template lang="pug">
  div.page.menu-paddingtop
    UserLoader(v-if="loading")
    div(v-else)
      TopPage(:title="'Pokalbis'" :text="''" :img="null")
        div.container
          UserBtn(v-bind:active="false" @mousedown="goBack" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('backtomessages')" textAligin="center")
          div.chat-wrapper
            div.message(
              v-for="msg in messages"
              :key="msg.id"
              :class="getAlignment(msg.author_id)"
              :style="getStyle(msg.author_id)"
            )
              div.author {{ msg.author_name || 'Naudotojas' }}
              div.content {{ msg.content }}
              div.meta {{ msg.created_at }}
          div.send-box
            form(@submit.prevent="messageReply")
              textarea(v-model="newReply" placeholder="Žinutės tekstas" rows="2")
              UserBtn(v-bind:active="false" @mousedown="messageReply" color="blue" v-bind:disabled="false" v-bind:loading="loading" v-bind:uppercase="false" v-bind:text="$t('send')" textAligin="center")
</template>

<script>
import TopPage from '@/components/Blocks/TopPage.vue';
import UserLoader from '@/components/elements/Loader.vue';
import axios from 'axios';
import { mapActions } from 'vuex';
import UserBtn from "@/components/elements/Btn.vue";

export default {
  name: 'UserConversation',
  components: {UserBtn, TopPage, UserLoader},
  data() {
    return {
      messages: [],
      loading: true,
      currentUserId: null,
      newReply: '',
    };
  },
  mounted() {
    this.pollingInterval = setInterval(this.fetchMessages, 5000);
  },
  beforeUnmount() {
    clearInterval(this.pollingInterval);
  },

  methods: {
    ...mapActions('user', ['getUserId']),

    async fetchMessages() {
      const convoId = this.$route.params.id;
      const res = await axios.get(`/wp-json/data/v1/get_conversation_meta/?convo_id=${convoId}`);
      this.messages = res.data.map(m => ({ ...m, author_id: Number(m.author_id) }));
    },

    goBack() {
      this.$router.push({ name: 'zinutes' });
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const wrapper = this.$el.querySelector('.chat-wrapper');
        if (wrapper) wrapper.scrollTop = wrapper.scrollHeight;
      });
    },

    async messageReply() {
      const content = this.newReply.trim();
      if (!content) return;

      const convoId = this.$route.params.id;
      try {
        const res = await axios.post('/wp-json/data/v1/message_reply', {
          convo_id: convoId,
          content: content,
        });

        const newReply = res.data;
        this.messages.push({
          ...newReply,
          author_id: Number(newReply.author_id),
        });

        this.newReply = '';

        this.$nextTick(() => {
          const wrapper = this.$el.querySelector('.chat-wrapper');
          if (wrapper) wrapper.scrollTop = wrapper.scrollHeight;
        });
      } catch (err) {
        console.error('Nepavyko išsiųsti žinutės:', err);
      }
    },

    getAlignment(authorId) {
      return authorId === this.currentUserId ? 'right' : 'left2';
    },
    getStyle(authorId) {
      const isCurrentUser = authorId === this.currentUserId;
      return {
        backgroundColor: isCurrentUser ? '#5a98c8' : '#efefef',
        color: isCurrentUser ? '#fff' : '#000'
      };
    },
  },

  async created() {
    const convoId = this.$route.params.id;

    try {
      const userIdFromAction = await this.getUserId();

      const userIdNumber = Number(userIdFromAction);

      if (!isNaN(userIdNumber) && userIdNumber > 0) {
        this.currentUserId = userIdNumber;
      } else {
        console.warn('Nepavyko gauti prisijungusio vartotojo ID arba ID yra 0. Pokalbiai bus rodomi be asmeninių žinučių išskyrimo.');
        this.currentUserId = null;
      }
    } catch (error) {
      console.error('Klaida gaunant vartotojo ID:', error);
      this.currentUserId = null;
    }

    axios.get(`/wp-json/data/v1/get_conversation_meta/?convo_id=${convoId}`)
        .then(res => {
          this.messages = res.data
              .map(m => ({ ...m, author_id: Number(m.author_id) }))
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

          this.loading = false;
          this.scrollToBottom();
        })
        .catch(error => {
          console.error("Klaida gaunant pokalbio duomenis:", error);
          this.loading = false;
        });
  },
}
</script>

<style scoped lang="stylus">
.chat-wrapper
  margin-top 20px
  max-height 350px
  overflow-y auto
  background #f8f9fa
  padding 20px
  border-radius 8px
  border 1px solid #ccc
  width 100%

.toppage {
  padding-top 20px
}

.message
  max-width 70%
  padding 12px 16px
  border-radius 16px
  margin-bottom 15px
  font-size 14px
  line-height 1.4
  box-shadow 0 1px 2px rgba(0, 0, 0, 0.05)
  clear both

.message.left2
  float left
  border-top-left-radius 4px

.message.right
  float right
  border-top-right-radius 4px

.message .author
  font-weight bold
  margin-bottom 5px

.message .meta
  font-size 11px
  margin-top 8px
  text-align right
  opacity 0.7

.send-box
  margin-top 15px
  display flex
  gap 10
  margin-bottom 20px

.send-box textarea
  flex 1
  resize none
  padding 10px
  border-radius 8px
  border 1px solid #ccc
  font-size 14px

form
  width 100%
  display flex
  gap 20px
  align-items center
</style>