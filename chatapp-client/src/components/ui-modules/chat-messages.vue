<template>
  <ul class="list-unstyled">
    <b-media tag="li" class="my-4" v-for="(val, inx) in this.messages" :key="inx">
      <div
        v-if="val['user'] === 'System'"
        :style="'background: '+ val['color'] +'; padding: 5px; color:black;'"
      >System: {{val['msg']}}</div>
      <template v-else>
        <b-img
          slot="aside"
          blank
          blank-color="gray"
          width="64"
          alt="Placeholder - username"
          rounded="circle"
        ></b-img>

        <h5 class="mt-0 mb-1">{{val['user']}}</h5>
        <p class="mb-0">{{val['msg']}}</p>
      </template>
    </b-media>
  </ul>
</template>

<script>
export default {
  name: "ChatMessages",
  props: {
    messages: {
      require: true,
    },
  },
};
</script>

<style scoped>
</style>