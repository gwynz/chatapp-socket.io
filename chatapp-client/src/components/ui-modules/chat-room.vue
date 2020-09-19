<template>
  <b-list-group>
    <b-list-group-item
      v-for="(r, inx) in availableRooms"
      :key="inx"
      @click="goToRoom(r)"
      :active="selected_room.id === r.id"
      type="dark"
      variant="dark"
      style="cursor:pointer"
    >
      {{r['name']}}
      <b-badge pill>{{r.online}}</b-badge>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "ChatRoom",
  props: {
    availableRooms: {
      require: true,
    },
    room: {
      require: true,
    },
  },
  computed: {
    selected_room() {
      return this.room;
    },
  },
  methods: {
    goToRoom(room) {
      console.log("user change room ", this.room, "=>", room);
      if (this.selected_room.id != room.id) this.$emit("joinRoom", room);
    },
  },
};
</script>

<style scoped>
.list-group-item.active {
  background-color: pink;
  border-color: pink;
}
</style>