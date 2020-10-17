<template>
  <div>
    <div class="container">
      <h2 class="font-weight-bold m-4">Customer Details:</h2>
      <hr />
      <form>
        <div class="clearfix mt-4">
          <div class="w-50 float-left">
            <div class="form group">
              <label for="name"> <h4>Full Name</h4></label>
                <input type="text" id="name" class="form-control" />
            </div>
            <small class="form-text text-muted"> First Name </small>
          </div>
          <div class="w-50 float-left pl-4">
            <div class="form group">
                 <label for="name"><h4 class="invisible">Full Name</h4></label>
              <input type="text" id="lastname" class="form-control" />
            </div>
            <small class="form-text text-muted float-left">Last Name</small>
          </div>
        </div>
        <div class="form-group my-4">
          <label for="adres"> <h4>Adress</h4></label>
          <input type="adres" id="adres" class="form-control" />
          <small class="form-text text-muted"> Street Adress </small>
        </div>
        <div class="clearfix mt-4">
          <div class="w-50 float-left">
            <div class="form-group">
              <select name="city" id="city" class="form-control">
                <option value="0"></option>
                <option value="0">Kocaeli</option>
                <option value="1">İstanbul</option>
                <option value="2">Çorum</option>
              </select>
              <small class="form-text text-muted">City </small>
            </div>
          </div>
          <div class="w-50 float-left pl-4">
            <div class="form group">
              <input type="text" id="name" class="form-control" />
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
          />
        </div>
        <hr />
        <button class="btn btn-success m-3 pl-5 pr-5">Submit</button>
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
      success: true,
      user: {
        city: "",
        email: "",
        firsName: "",
        lastName: "",
        stateProvince: "",
        streetAddress: "",
      },
    };
  },
  methods: {
    onSave: function (user) {
      const saveObj = {
        name: user.name,
        surname: user.surname,
        mail: user.mail,
      };
      var usersRef = db.ref("users").push();
      usersRef.set(saveObj);
    },
  },
};
</script>

<style>
.create-page-container {
  text-align: center;
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
