<template>
  <div class="col-12">
    <div class="card">
      <h5>Articles List</h5>
      <!-- <DataTable
        :value="products"
        v-model:expandedRows="expandedRows"
        dataKey="id"
        responsiveLayout="scroll"
      >
        <template #header>
          <div>
            <Button
              icon="pi pi-plus"
              label="Expand All"
              class="mr-2 mb-2"
            />
            <Button
              icon="pi pi-minus"
              label="Collapse All"
              class="mb-2"
            />
          </div>
        </template>
        <Column :expander="true" headerStyle="width: 3rem" />
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="'images/product/' + slotProps.data.image"
              :alt="slotProps.data.image"
              class="shadow-2"
              width="100"
            />
          </template>
        </Column>
        <Column field="name" header="name" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.name }}
          </template>
        </Column>

        <Column field="category" header="Category" :sortable="true">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.category) }}
          </template></Column
        >
        <Column field="category" header="Views" :sortable="true">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.category) }}
          </template>
        </Column>
        <Column field="category" header="saves" :sortable="true">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.category) }}
          </template>
        </Column> 

        <Column field="inventoryStatus" header="Status" :sortable="true">
          <template #body="slotProps">
            <span
              :class="
                'product-badge status-' +
                (slotProps.data.inventoryStatus
                  ? slotProps.data.inventoryStatus.toLowerCase()
                  : '')
              "
              >{{ slotProps.data.inventoryStatus }}</span
            >
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="p-3">
            <h5>Orders for {{ slotProps.data.name }}</h5>
            <DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
              <Column field="id" header="Id" :sortable="true">
                <template #body="slotProps">
                  {{ slotProps.data.id }}
                </template>
              </Column>
              <Column field="category" header="category" :sortable="true">
                <template #body="slotProps">
                  {{ slotProps.data.category }}
                </template>
              </Column>
              <Column field="date" header="last modification" :sortable="true">
                <template #body="slotProps">
                  {{ slotProps.data.date }}
                </template>
              </Column>
              <Column field="amount" header="Amount" :sortable="true">
                
              </Column>
              <Column field="status" header="Status" :sortable="true">
                <template #body="slotProps">
                  <span
                    :class="
                      'order-badge order-' +
                      (slotProps.data.status
                        ? slotProps.data.status.toLowerCase()
                        : '')
                    "
                    >{{ slotProps.data.status }}</span
                  >
                </template>
              </Column>
              <Column headerStyle="width:4rem">
                <template #body>
                  <Button icon="pi pi-search" />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable> -->
      <DataTable
        ref="dt"
        :value="tableData"
        :rows="7"
        :paginator="true"
        responsiveLayout="scroll"
      >
        <Column field="image" header="Image">
          <template #body="slotProps">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.image"
              width="50"
              class="shadow-2"
            />
          </template>
        </Column>
        <Column field="title" header="Title" :sortable="true"></Column>
        <Column field="views" header="Views" :sortable="true"></Column>
        <Column
          field="lastUpdate"
          header="Last Update"
          :sortable="true"
        ></Column>
        <Column field="Crud">
          <template #body="slotProps">
            <Button
              icon="pi pi-eye"
              class="p-button-rounded mr-2"
              @click="readd(slotProps.data)"
            />
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="update(slotProps.data)"
            />

            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger mr-2"
              @click="delet(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import routes from "../../router"; // Import your route configuration

import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomerService from "../../service/CustomerService";
import ProductService from "../../service/ProductService";
import ColorPicker from "primevue/colorpicker";

export default {
  data() {
    return {
      customer1: null as any,
      customer2: null as any,
      customer3: null as any,
      filters1: null as any,
      filters2: {},
      loading1: true,
      loading2: true,
      idFrozen: false,
      products: null as any,
      expandedRows: [] as any[],
      statuses: [
        "unqualified",
        "qualified",
        "new",
        "negotiation",
        "renewal",
        "proposal",
      ],

      tableData: [
        {
          id: 1,
          image: "https://picsum.photos/200",
          title: "Example Title 1",
          views: 100,
          lastUpdate: "2023-05-01",
        },
        {
          id: 2,
          image: "https://picsum.photos/200",
          title: "Example Title 2",
          views: 200,
          lastUpdate: "2023-05-02",
        },
        {
          id: 3,
          image: "https://picsum.photos/200",
          title: "Example Title 3",
          views: 300,
          lastUpdate: "2023-05-03",
        },
        {
          id: 4,
          image: "https://picsum.photos/200",
          title: "Example Title 4",
          views: 400,
          lastUpdate: "2023-05-04",
        },
        {
          id: 5,
          image: "https://picsum.photos/200",
          title: "Example Title 5",
          views: 500,
          lastUpdate: "2023-05-05",
        },
        {
          id: 6,
          image: "https://picsum.photos/200",
          title: "Example Title 1",
          views: 100,
          lastUpdate: "2023-05-01",
        },
        {
          id: 7,
          image: "https://picsum.photos/200",
          title: "Example Title 2",
          views: 200,
          lastUpdate: "2023-05-02",
        },
        {
          id: 8,
          image: "https://picsum.photos/200",
          title: "Example Title 3",
          views: 300,
          lastUpdate: "2023-05-03",
        },
        {
          id: 9,
          image: "https://picsum.photos/200",
          title: "Example Title 4",
          views: 400,
          lastUpdate: "2023-05-04",
        },
        {
          id: 10,
          image: "https://picsum.photos/200",
          title: "Example Title 5",
          views: 500,
          lastUpdate: "2023-05-05",
        },
        {
          id: 11,
          image: "https://picsum.photos/200",
          title: "Example Title 1",
          views: 100,
          lastUpdate: "2023-05-01",
        },
        {
          id: 14,
          image: "https://picsum.photos/200",
          title: "Example Title 2",
          views: 200,
          lastUpdate: "2023-05-02",
        },
        {
          id: 12,
          image: "https://picsum.photos/200",
          title: "Example Title 3",
          views: 300,
          lastUpdate: "2023-05-03",
        },
        {
          id: 13,
          image: "https://picsum.photos/200",
          title: "Example Title 4",
          views: 400,
          lastUpdate: "2023-05-04",
        },
        {
          id: 15,
          image: "https://picsum.photos/200",
          title: "Example Title 5",
          views: 500,
          lastUpdate: "2023-05-05",
        },
      ],
      postId: "" as string,
      postTitle: "" as string,
      postImage: "" as string,
      postContent: "" as string,
      postTags: ["", "", ""],
    };
  },

  methods: {
    update(data: any) {
      //TODO : data to data.id
      routes.push({ name: "update", params: { id: data.title } });
      console.log("delete ligne : ", data.title);
    },
    delet(data: any) {
      console.log("update ligne : ", data.title);
    },
    readd(data: any) {
      console.log("title in read click : ", data.title);
    },
  },
};
</script>
