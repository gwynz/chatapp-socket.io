<template>
  <div class="onlinePeople">
    <div :key="inx" v-for="(val, inx) in userList">
      <b-img v-b-tooltip.hover :title="val.username" v-bind="onlinePeopleProps" rounded="circle"></b-img>
      <span>{{val.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatOnlinePeople",
  props: {
    userList: {
      require: true,
    },
  },
  data() {
    return {
      onlinePeopleProps: {
        blank: true,
        blankColor: "gray",
        width: 50,
        height: 50,
        class: "online-people-icon",
      },
    };
  },
};
</script>

<style scoped lang="scss">
.online-people-icon {
  margin-right: 5px;
  margin-bottom: 5px;
}
.onlinePeople {
  display: flex;
  flex-direction: column;
}
</style>