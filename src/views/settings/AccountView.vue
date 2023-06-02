<template>
  <div>
    <h3 class="mb-4">Account Settings</h3>

    <div class="card">
      <div class="p-fluid flex flex-wrap p-5 gap-2">
        <div class="flex-auto">
          <span class="p-float-label">
            <InputText id="username" v-model="user.firstName" />
            <label for="username">First Name</label>
          </span>
        </div>
        <div class="flex-auto">
          <span class="p-float-label">
            <InputText id="lastname" v-model="user.lastName" />
            <label for="lastname">Last Name</label>
          </span>
        </div>
      </div>
      <div class="p-fluid flex flex-wrap p-5 gap-2">
        <div class="flex-auto">
          <span class="p-float-label">
            <InputText id="email" v-model="user.email" />
            <label for="email">Email</label>
          </span>
        </div>
        <div class="flex-auto">
          <span class="p-float-label">
            <InputMask
              v-model="user.phone"
              date="phone"
              mask="(999) 999-999-999"
              placeholder="(212) 699-999-999"
            />
            <label for="phone">Phone number</label>
          </span>
        </div>
      </div>
      <div class="p-fluid flex flex-wrap p-5 gap-2">
        <div class="flex-auto">
          <span class="p-float-label">
            <InputText id="company" v-model="user.company" />
            <label for="company">Company</label>
          </span>
        </div>
        <div class="flex-auto">
          <span class="p-float-label">
            <InputText id="designation" v-model="user.designation" />
            <label for="designation">Designation</label>
          </span>
        </div>
      </div>
      <div class="p-fluid flex flex-wrap p-5 gap-1">
        <div class="flex-auto">
          <span class="p-float-label">
            <Textarea v-model="user.bio" rows="5" cols="30" />
            <label>Bio</label>
          </span>
        </div>
      </div>
      <div class="p-d-flex p-5">
        <ConfirmDialog></ConfirmDialog>
        <Button @click="update" icon="pi pi-check" label="Confirm"
          >Update</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        firstName: "mohamed",
        lastName: "bougra",
        email: "mohamed@gmail.com",
        phone: "066454R544",
        company: "ENSA",
        designation: "student",
        bio: "Duis veniam ad dolore dolore anim dolor dolor proident ad. Laborum aute consequat culpa velit voluptate et anim excepteur aute. Ipsum nisi qui ad et. Fugiat enim commodo nisi id ipsum ut est occaecat. Consequat veniam aliquip tempor proident. Nostrud nulla commodo duis anim irure nisi in labore fugiat excepteur excepteur. Sit reprehenderit reprehenderit veniam aliquip ullamco exercitation enim minim exercitation reprehenderit dolore.",
      },
    };
  },
  methods: {
    update() {
      // Update logic goes here
    },
  },
};
</script>
