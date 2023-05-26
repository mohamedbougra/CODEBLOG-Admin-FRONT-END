<template>
  <div class="card flex justify-content-center">
    <div class="multiselect-container">
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
      </MultiSelect>
      <Button class="button-padding" label="Submit" @click="submitSelection" />
    </div>
  </div>

  
		<div class="card">
			<h5>Top topics</h5>
			<DataTable :value="tableData" :rows="5" :paginator="true" responsiveLayout="scroll">
        <Column field="rank" header="Rank" :sortable="true"></Column>
        <Column field="title" header="Title" ></Column>
        <Column field="views" header="Views" :sortable="true"></Column>
        <Column field="answers" header="Answers" :sortable="true"></Column>
        <Column field="similarTitles" header="Similar Titles" :sortable="true"></Column>
			</DataTable>
		</div>
	

</template>

<style>
.multiselect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-padding{
  margin-top: 1rem !important;
}
</style>

<script>
export default {
  data() {
    return {
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
      selectedTags: [],
      tableData: [
        { rank: 1, title: "Example Title 1", views: 100, answers: 5, similarTitles: "Similar Title 1" },
        { rank: 2, title: "Example Title 2", views: 200, answers: 10, similarTitles: "Similar Title 2" },
        { rank: 3, title: "Example Title 3", views: 300, answers: 15, similarTitles: "Similar Title 3" },
        { rank: 4, title: "Example Title 4", views: 400, answers: 20, similarTitles: "Similar Title 4" },
        { rank: 5, title: "Example Title 5", views: 500, answers: 25, similarTitles: "Similar Title 5" },
      ],
    };
  },
  methods: {
    checkSelectionLimit() {
      if (this.selectedTags.length > 3) {
        this.selectedTags = this.selectedTags.slice(0, 3); // Limiter la sélection à trois éléments
      }
    },
    submitSelection() {
      if (this.selectedTags.length > 0) {
        alert("Merci pour votre choix");
      }
    },
  },
};
</script>
