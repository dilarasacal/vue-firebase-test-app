<template>
  <div>
    <div id="app">
      <b-nav pills>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/create">Create</b-nav-item>
        <b-nav-item to="/settings">Settings</b-nav-item>
      </b-nav>
      <div class="router-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.selector-for-some-widget {
  box-sizing: content-box;
}

.router-link-exact-active {
  color: #495057;
  font-weight: 600;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.router-container {
  padding: 20px;
}

</style>
