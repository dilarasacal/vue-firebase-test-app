<template>
    <b-table striped hover :items="users"></b-table>
</template>

<script>
import { db } from '../firebase';
export default {
  name: "Home",
  data() {
    return {
      users: [],
      cities: []
    };
  },
  mounted() {
    const userRef = db.ref("users");
    const cityRef = db.ref("cities")

    //Only Mount
    cityRef.once("value").then((snapshot) => {
      const cities = snapshot.val();
      this.cities = Object.values(cities);
      userRef.once("value").then((snapshot) => {
        let users = Object.values(snapshot.val());
        users = users.map(user=>{
          return {
            ...user,
            city: cities.find(c => c.value == user.city).name
          }
        });
        this.users = Object.values(Object.assign({},users));
      });
    });

    //Listen city change
    cityRef.on("value", (snapshot) => {
      const cities = snapshot.val();
      this.cities = Object.values(cities);
      userRef.once("value").then((snapshot) => {
        let users = Object.values(snapshot.val());
        users = users.map(user=>{
          return {
            ...user,
            city: cities.find(c => c.value == user.city).name
          }
        });
        this.users = Object.values(Object.assign({},users));
      });
    })

    //Listen user change
    userRef.on("value", (snapshot) => {

      if (this.cities.length > 0) {
        let users = Object.values(snapshot.val());
        users = users.map(user=>{
          return {
            ...user,
            city: this.cities.find(c => c.value == user.city).name
          }
        });
        this.users = Object.values(Object.assign({},users));
      }
    })

  },
};
</script>

<style>
</style>
