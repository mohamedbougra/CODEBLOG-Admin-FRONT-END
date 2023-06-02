<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Toast />
        <Toolbar class="mb-4">
          <template v-slot:start>
            <div class="my-2">
              <Button
                label="New"
                icon="pi pi-plus"
                class="p-button-success mr-2"
                @click="openNew"
              />
              <Button
                label="Delete"
                icon="pi pi-trash"
                class="p-button-danger"
                @click="confirmDeleteSelected"
                :disabled="!selectedUsers || !selectedUsers.length"
              />
            </div>
          </template>

          <template v-slot:end>
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              class="p-button-help"
              @click="exportCSV($event)"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="Users"
          v-model:selection="selectedUsers"
          dataKey="id"
          :paginator="true"
          :rows="6"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
            >
              <h5 class="m-0">Manage Users</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Search..."
                />
              </span>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column header="Image" headerStyle="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span class="p-column-title">Image</span>
              <!-- :src="slotProps.data.image" -->
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.image"
                class="shadow-2"
                width="100"
              />
            </template>
          </Column>
          <Column
            field="code"
            header="Code"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Code</span>
              {{ slotProps.data.code }}
            </template>
          </Column>
          <Column
            field="name"
            header="Name"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Name</span>
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column
            field="Role"
            header="Role"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Role</span>
              {{ formatCurrency(slotProps.data.Role) }}
            </template>
          </Column>
          <Column
            field="followers"
            header="followers"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">followers</span>
              {{ slotProps.data.followers }}
            </template>
          </Column>

          <Column
            field="views"
            header="views"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Views</span>
              {{ slotProps.data.views }}
            </template>
          </Column>
          <!-- <Column
            field="email"
            header="email"
            :sortable="true"
            headerStyle="width:11%; min-width:8rem;"
          >
            <template #body="slotProps">
              <span class="p-column-title">Email</span>
              {{ slotProps.data.email }}
            </template>
          </Column> -->
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-eye"
                class="p-button-rounded mr-2"
                @click="userDetails(slotProps.data)"
              />
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="edituser(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-danger mt-2"
                @click="confirmDeleteuser(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>

        <Dialog
          v-model:visible="userDialog"
          :style="{ width: '450px' }"
          header="user Details"
          :modal="true"
          class="p-fluid"
        >
          <img
            :src="user.image"
            :alt="user.image"
            v-if="user.image"
            width="150"
            class="mt-0 mx-auto mb-5 block shadow-2"
          />
          <div class="field">
            <label for="name">Name</label>
            <InputText
              id="name"
              :disabled="req"
              v-model.trim="user.name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.name }"
            />
            <small class="p-invalid" v-if="submitted && !user.name"
              >Name is required.</small
            >
          </div>
          <div class="field">
            <label for="description">Description</label>
            <Textarea
              id="description"
              v-model="user.description"
              required="true"
              :disabled="req"
              rows="3"
              cols="20"
            />
          </div>

          <div class="field">
            <label for="email" class="mb-3">email</label>
            <InputText
              id="email"
              :disabled="req"
              v-model.trim="user.email"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.email }"
            />
            <small class="p-invalid" v-if="submitted && !user.email"
              >Email is required.</small
            >
          </div>
          <div class="field">
            <label for="email" class="mb-3">Telephone</label>
            <InputText
              id="tel"
              :disabled="req"
              v-model.trim="user.tel"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.tel }"
            />
            <small class="p-invalid" v-if="submitted && !user.tel"
              >Telephone is required.</small
            >
          </div>
          <div class="field">
            <label class="mb-3">Role</label>
            <div class="formgrid grid">
              <div class="field-radiobutton col-6">
                <RadioButton
                  id="Role1"
                  name="Role"
                  :disabled="req2"
                  value="Admin"
                  v-model="user.Role"
                />
                <label for="Role1">Admin</label>
              </div>
              <div class="field-radiobutton col-6">
                <RadioButton
                  :disabled="req2"
                  id="Role2"
                  name="Role"
                  value="Sup Admin"
                  v-model="user.Role"
                />
                <label for="Role2">Sup Admin</label>
              </div>
            </div>
          </div>

          <div class="formgrid grid">
            <div class="field col">
              <label for="followers">followers</label>
              <InputNumber
                id="followers"
                :disabled="req"
                v-model="user.followers"
              />
            </div>
            <div class="field col">
              <label for="views">Views</label>
              <InputNumber
                id="views"
                :disabled="req"
                v-model="user.views"
                integeronly
              />
            </div>
          </div>
          <template #footer v-if="!req">
            <Button
              label="Cancel"
              icon="pi pi-times"
              class="p-button-text"
              @click="hideDialog"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              class="p-button-text"
              @click="saveuser"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteuserDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="user"
              >Are you sure you want to delete <b>{{ user.name }}</b
              >?</span
            >
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteuserDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteuser"
            />
          </template>
        </Dialog>

        <Dialog
          v-model:visible="deleteUsersDialog"
          :style="{ width: '450px' }"
          header="Confirm"
          :modal="true"
        >
          <div class="flex align-items-center justify-content-center">
            <i
              class="pi pi-exclamation-triangle mr-3"
              style="font-size: 2rem"
            />
            <span v-if="user"
              >Are you sure you want to delete the selected Users?</span
            >
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              class="p-button-text"
              @click="deleteUsersDialog = false"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              class="p-button-text"
              @click="deleteSelectedUsers"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
// import UserService from "../service/UserService.ts";

export default {
  data() {
    return {
      Users: [
        {
          id: 1,
          code: "P001",
          name: "user 1",
          image: "https://picsum.photos/200",
          followers: 432,
          Role: "Admin",
          views: 44442,
          email: "mohamad.bougra2001@gmail.com",
          tel: "0697822768",
        },
        {
          id: 2,
          code: "P002",
          name: "user 2",
          image: "https://picsum.photos/200",
          followers: 123,
          Role: "Admin",
          views: 4441,
          email: "hamza@gmail.com",
          tel: "0697822768",
        },
        {
          id: 3,
          code: "P002",
          name: "user 2",
          image: "https://picsum.photos/200",
          followers: 19,
          Role: "Admin",
          views: 8,
          email: "ikram@gmail.com",
          tel: "0697822768",
        },
        // Add more user objects as needed
      ],
      userDialog: false,
      deleteuserDialog: false,
      deleteUsersDialog: false,
      user: {},
      selectedUsers: null,
      filters: {},
      submitted: false,
      req: false,
      req2: false,
    };
  },
  Userservice: null,
  created() {
    // this.Userservice = new Userservice();
    this.initFilters();
  },
  //   mounted() {
  //     this.Userservice.getUsers().then((data) => (this.Users = data));
  //   },
  methods: {
    formatCurrency(value) {
      if (value)
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      return;
    },
    openNew() {
      this.req2 = false;
      this.req = false;
      this.user = {};
      this.submitted = false;
      this.userDialog = true;
    },
    hideDialog() {
      this.userDialog = false;
      this.submitted = false;
    },
    saveuser() {
      this.submitted = true;
      if (this.user.name.trim()) {
        if (this.user.id) {
          this.user.email = this.user.email.value
            ? this.user.email.value
            : this.user.email;
          this.Users[this.findIndexById(this.user.id)] = this.user;
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "user Updated",
            life: 3000,
          });
        } else {
          this.user.id = this.createId();
          this.user.code = this.createId();
          this.user.image = "user-placeholder.svg";
          this.user.email = this.user.email ? this.user.email.value : "INSTOCK";
          this.Users.push(this.user);
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "user Created",
            life: 3000,
          });
        }
        this.userDialog = false;
        this.user = {};
      }
    },
    edituser(user) {
      this.req2 = false;
      this.req = true;
      this.user = { ...user };
      this.userDialog = true;
    },
    userDetails(user) {
      this.req2 = true;
      this.req = true;
      this.user = { ...user };
      this.userDialog = true;
    },
    confirmDeleteuser(user) {
      this.user = user;
      this.deleteuserDialog = true;
    },
    deleteuser() {
      this.Users = this.Users.filter((val) => val.id !== this.user.id);
      this.deleteuserDialog = false;
      this.user = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "user Deleted",
        life: 3000,
      });
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.Users.length; i++) {
        if (this.Users[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    },
    createId() {
      let id = "";
      var chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteUsersDialog = true;
    },
    deleteSelectedUsers() {
      this.Users = this.Users.filter(
        (val) => !this.selectedUsers.includes(val)
      );
      this.deleteUsersDialog = false;
      this.selectedUsers = null;
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Users Deleted",
        life: 3000,
      });
    },
    // initFilters() {
    //   this.filters = {
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //   };
    // },
  },
};
</script>

<style>
/*  @import "../assets/demo/badges.scss";  */
</style>
