<template>
  <div>
    <div class="card">
      <h3 class="mb-4">Notification Settings</h3>
      <div class="flex-auto p-fluid flex flex-wrap p-4 gap-1">
        <InputSwitch v-model="checkedPhone" id="phoneNotif" />
        <label for="phoneNotif">Enable phone notification</label>
      </div>
      <div class="flex-auto p-fluid flex flex-wrap p-4 gap-1">
        <InputSwitch v-model="checkedEmail" id="emailNotif" />
        <label for="phoneNotif">Enable e-mail notification</label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Import Axios library for making HTTP requests
export default {
  data() {
    return {
      checkedPhone: false,
      checkedEmail: true,
    };
  },
  methods: {},
};
</script>
