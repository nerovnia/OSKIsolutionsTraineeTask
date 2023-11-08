<script>
/*
import { ref } from 'vue'

const text = ref('')

function onInputLogin(e) {
  text.value = e.target.value;
  console.log(e.target.value);
}

function onInputPassword(e) {
  login.value = e.target.value
}


const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ login, password }) => {
    if (login && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(login, password) {
  emit('submit', { login, password })
}
*/

export default {
  props: {
    login: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="p-5 border border-primary border-opacity-25 rounded-4">
    <form class="row g-3" onSubmit="submitForm">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" :placeholder="Login"  :value="login" @input="$emit('update:modelValue', $event.target.value)">
        <p>{{ login }}</p>
        <label for="floatingInput">Login</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" :placeholder="Password" :value="password" @input="onInputPassword" >
          <p>{{ password }}</p>
          <label for="floatingPassword">Password</label>
      </div>
      <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>