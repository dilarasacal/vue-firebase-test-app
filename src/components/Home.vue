<template>
    <b-table striped hover :items="users"></b-table>
</template>

<script>
import { db } from '../firebase';
export default {
  name: "Home",
  data() {
    return {
      users: []
    };
  },
  mounted() {
    const userRef = db.ref("/users");
    userRef
      .once("value")
      .then((snapshot) => {
        const val = snapshot.val();
        this.users = Object.values(val);
      });
      userRef.on("value", (snapshot) => {
        const val = snapshot.val();
        this.users = Object.values(val);
      })
  },
};
</script>

<style>
</style>
