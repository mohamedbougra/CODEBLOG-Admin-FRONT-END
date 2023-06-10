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
        :max="3">
        <template #option="slotProps">
          <div class="flex align-items-center">
            <div>{{ slotProps.option }}</div>
          </div>
        </template>
      </MultiSelect>
      <Button class="button-padding" label="Submit" @click="sendTagsToAPI" />
    </div>
  </div>

		<div class="card">
			<h5>Top topics</h5>
			<DataTable :value="tableData" :rows="5" :paginator="true" responsiveLayout="scroll">
        <Column field="tags" header="Tags" :sortable="true"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="view_count" header="View Count" :sortable="true"></Column>
        <Column field="answer_count" header="Answer Count" :sortable="true"></Column>
        <Column field="similar_titles_count" header="Similar Titles Count" :sortable="true"></Column>
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
import axios from 'axios';
export default {
  data() {
    return {
      itTags: [
        "spring boot",
        "database",
        "cucumber",
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
      tableData: [],
      // tableData: [
      //   { rank: 1, title: "Example Title 1", views: 100, answers: 5, similarTitles: "Similar Title 1" },
      //   { rank: 2, title: "Example Title 2", views: 200, answers: 10, similarTitles: "Similar Title 2" },
      //   { rank: 3, title: "Example Title 3", views: 300, answers: 15, similarTitles: "Similar Title 3" },
      //   { rank: 4, title: "Example Title 4", views: 400, answers: 20, similarTitles: "Similar Title 4" },
      //   { rank: 5, title: "Example Title 5", views: 500, answers: 25, similarTitles: "Similar Title 5" },
      // ],
    };
  },
  methods: {
    async sendTagsToAPI() {
  try {
    const response = await axios.post('http://127.0.0.1:5000/data', { tags: this.selectedTags });
    const data = response.data;
    console.log(response.data)
    this.tableData = data; // Mettez à jour le tableau existant avec les nouvelles données
    console.log("Très bien");
  } catch (error) {
    console.error(error);
  }
},
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
