<template>
  <div>
    <div class="create-container container">
      <h2 class="font-weight-bold m-4">Customer Details:</h2>
      <hr />
      <form>
        <div class="clearfix mt-4">
          <div class="w-50 float-left">
            <div class="form group">
              <label for="name"> <h4>Full Name</h4></label>
                <input v-model="user.firstName" @change="(e) => onChangeInput('firstName',e.target.value)" type="text" id="name" class="form-control" />
            </div>
            <small class="form-text text-muted"> First Name </small>
          </div>
          <div class="w-50 float-left pl-4">
            <div class="form group">
                 <label for="name"><h4 class="invisible">Full Name</h4></label>
              <input v-model="user.lastName" @change="(e) => onChangeInput('lastName',e.target.value)" type="text" id="lastname" class="form-control" />
            </div>
            <small class="form-text text-muted float-left">Last Name</small>
          </div>
        </div>
        <div class="form-group my-4">
          <label for="adres"> <h4>Adress</h4></label>
          <input v-model="user.streetAddress" @change="(e) => onChangeInput('streetAddress',e.target.value)" type="adres" id="adres" class="form-control" />
          <small class="form-text text-muted"> Street Adress </small>
        </div>
        <div class="clearfix mt-4">
          <div class="w-50 float-left">
            <div class="form-group">
              <select v-model="user.city" @change="(e) => onChangeInput('city',e.target.value)" name="city" id="city" class="form-control">
                <option v-for="item in cities" :key="item.value" v-bind:value="item.value"> {{ item.name }}</option>
              </select>
              <small class="form-text text-muted">City </small>
            </div>
          </div>
          <div class="w-50 float-left pl-4">
            <div class="form group">
              <input v-model="user.stateProvince" @change="(e) => onChangeInput('stateProvince',e.target.value)" type="text" id="name" class="form-control" />
            </div>
            <small class="form-text text-muted"> State/Province</small>
          </div>
        </div>
        <div class="form-group my-3">
          <label for="email"> <h4>E-mail</h4></label>
          <input
            type="email"
            id="email"
            class="form-control d-inline-block m-0"
            placeholder="ex:email@yahoo.com"
            @change="(e) => onChangeInput('email',e.target.value)"
            v-model="user.email"
          />
        </div>
        <hr />
        <button type="submit" v-bind:disabled="btnDisable" @click="onSave" class="btn btn-success m-3 pl-5 pr-5">Submit</button>
        <div class="success-message" v-if="success">Create Success!</div>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Create",
  data() {
    return {
      cities: [],
      success: false,
      btnDisable: true,
      user: {
        city: "",
        email: "",
        firstName: "",
        lastName: "",
        stateProvince: "",
        streetAddress: "",
      },
    };
  },
  mounted(){
      var cityRef = db.ref("cities");
      cityRef.once('value').then(snapshot => {
        var cityVal = snapshot.val();
        this.cities = cityVal
        this.user.city = cityVal[0].value
      })
      cityRef.on("value", (snapshot) => {
        var cityVal = snapshot.val();
        this.cities = cityVal
        this.user.city = cityVal[0].value
      })
  },
  methods: {
    onSave() {
      var usersRef = db.ref("users").push();
      usersRef.set(this.user);
      this.success = true;
      this.btnDisable = true;
      this.user = {
        city: "",
        email: "",
        firstName: "",
        lastName: "",
        stateProvince: "",
        streetAddress: "",
      }
    },
    onChangeInput(propertyName,value){
      if(this.success)
        this.success = false
      this.user[propertyName] = value

      const {city, email, firstName, lastName, stateProvince, streetAddress} = this.user
      if(
      firstName != '' &&
      email != '' &&
      firstName != '' &&
      lastName != '' &&
      stateProvince != '' &&
      streetAddress != ''
      )
        this.btnDisable = false;
    }
  },
};
</script>

<style>
 .create-container{
  text-align:left;
  border: 8px solid #000;
}

.created-list-container {
  width: 300px;
}

.create-submit-button {
  margin: 20px;
}

.success-message {
  margin: 20px;
  font-size: 25px;
  color: #4CAF50;
}
</style>
