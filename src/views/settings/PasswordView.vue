<template>
  <div>
    <h3 class="mb-4">Password Settings</h3>
    <div class="card">
      <div class="flex-auto p-fluid flex flex-wrap p-4 gap-2">
        <div class="flex-auto">
          <Password
            v-model="oldPassword"
            promptLabel="Choose a password"
            weakLabel="Too simple"
            placeholder="old password"
            mediumLabel="Average complexity"
            strongLabel="Complex password"
            toggleMask
          />
        </div>
      </div>
      <div class="p-fluid flex flex-wrap p-4 gap-2">
        <div class="flex-auto">
          <Password
            v-model="newPassword"
            placeholder="Choose a new password"
            toggleMask
          >
            <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer>
              <Divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </Password>
        </div>
        <div class="flex-auto">
          <Password
            v-model="confirmNewPassword"
            promptLabel="Choose a password"
            placeholder="confirm a new password"
            weakLabel="Too simple"
            mediumLabel="Average complexity"
            strongLabel="Complex password"
            toggleMask
          />
        </div>
      </div>

      <div class="p-d-flex p-4">
        <ConfirmDialog></ConfirmDialog>
        <Button @click="updatePassword" icon="pi pi-check" label="Confirm"
          >Update</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // Import Axios library for making HTTP requests
export default {
  data() {
    return {
      firstName: "mohamed",
      lastName: "bougra",
      email: "mohamed@gmail.com",
      phone: "066454R544",
      company: "ENSA",
      designation: "student",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      bio: "Duis veniam ad dolore dolore anim dolor dolor proident ad. Laborum aute consequat culpa velit voluptate et anim excepteur aute. Ipsum nisi qui ad et. Fugiat enim commodo nisi id ipsum ut est occaecat. Consequat veniam aliquip tempor proident. Nostrud nulla commodo duis anim irure nisi in labore fugiat excepteur excepteur. Sit reprehenderit reprehenderit veniam aliquip ullamco exercitation enim minim exercitation reprehenderit dolore.",
    };
  },
  methods: {
    updatePassword() {
      // Check that new password and confirm password match
      if (this.newPassword !== this.confirmNewPassword) {
        alert("New password and confirm password do not match.");
        return;
      }

      // Make HTTP request to update password
      const userId = 1; // Replace with actual user ID
      axios
        .put(`/api/users/${userId}/password`, {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((response) => {
          alert("Password updated successfully!");
          // Clear input fields
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmNewPassword = "";
        })
        .catch((error) => {
          console.error(error);
          alert("Error updating password. Please try again later.");
        });
    },
  },
};
</script>
