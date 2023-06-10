<template>
  <div class="p-grid card flex justify-content-center">
    <div class="xl:flex-row xl:align-items-start p-4 gap-4">
      <InputText
        id="title"
        v-model="title"
        type="text"
        placeholder="Blog title"
      />
    </div>
    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
      <Toast />
      <FileUpload
        mode="basic"
        name="demo[]"
        url="./upload.php"
        accept="image/*"
        :maxFileSize="1000000"
        chooseLabel="Hero Image"
        @upload="onUpload"
      />
    </div>

    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
      <MultiSelect
        v-model="selectedTags"
        :options="itTags"
        placeholder="Select topic tags"
        display="chip"
        class="w-full md:w-20rem"
        @change="checkSelectionLimit"
        :max="3"
      >
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
        <template #footer>
          <div class="py-2 px-3">
            <b>{{ selectedTags ? selectedTags.length : 0 }}</b>
            item{{ (selectedTags ? selectedTags.length : 0) > 1 ? "s" : "" }}
            selected.
          </div>
        </template>
      </MultiSelect>
    </div>
  </div>
  <div class="card">
    <Editor v-model="value" editorStyle="height: 220px" />
    <div class="p-d-flex p-3">
      <ConfirmDialog></ConfirmDialog>
      <Button @click="update" icon="pi pi-check" label="Confirm">Update</Button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // Access the parameter value
    this.title = this.$route.params.id;
    // Do something with the parameter value
  },
  data() {
    return {
      title: null,
      itTags: [
        "spring boot",
        "java",
        "javascript",
        "html",
        "css",
        "react",
        "angular",
        "node.js",
        "mongodb",
      ],
      selectedTags: null,
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
    };
  },
  methodes: {
    checkSelectionLimit() {
      if (this.selectedTags.length > 3) {
        this.selectedTags = this.selectedTags.slice(0, 3); // Limit selection to three items
      }
    },

    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },
    update() {
      // Update logic goes here
    },
  },
};
</script>
