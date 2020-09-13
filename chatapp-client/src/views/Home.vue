<template>
  <div>
    <HeaderNavigation :userData="user" />
    <b-container fluid>
      <b-row class="pt-4">
        <b-col md="3" xl="2">
          <h2>Chat rooms</h2>
          <ChatRoom />
        </b-col>
        <b-col class="chat-content">
          <div class="chat-messages">
            <h2>Room</h2>

            <div class="chat-content-messages">
              <ChatMessages :messages="messages" />
            </div>
          </div>
          <div class="chat-input">
            <div class="chat-input__box">
              <b-input-group>
                <b-input-group-text slot="prepend" v-if="user">{{user['user_name']}}</b-input-group-text>
                <b-input-group-text slot="prepend" v-else>n/a</b-input-group-text>
                <b-form-input v-model="message" v-on:keyup.enter="sendMessage"></b-form-input>
                <b-input-group-append>
                  <b-button variant="danger" @click="sendMessage">Send message</b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
          </div>
        </b-col>
        <b-col md="3" xl="2">
          <h2>Online people</h2>
          <ChatOnlinePeople />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import HeaderNavigation from "@/components/ui-modules/header.vue";
import ChatRoom from "@/components/ui-modules/chat-room.vue";
import ChatMessages from "@/components/ui-modules/chat-messages.vue";
import ChatOnlinePeople from "@/components/ui-modules/chat-online-people.vue";
export default {
  name: "Chat",
  components: {
    HeaderNavigation,
    ChatRoom,
    ChatMessages,
    ChatOnlinePeople,
  },
};
</script>

<style scoped lang="scss">
$header-nav-height: 58px;
$title-chat-height: 10px;
$chat-input-height: 60px;
$chat-view-sticky-height: $chat-input-height + $header-nav-height +
  $title-chat-height;
.chat-content-messages {
  height: calc(100% - 55px);
  overflow: auto;
}
.chat-content {
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  .chat-messages {
    position: sticky;
    top: $header-nav-height;
    z-index: 1000;
    height: calc(100vh - #{$chat-view-sticky-height});
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .chat-input {
    .chat-input__box {
      margin-top: 15px;
    }
  }
}
</style>