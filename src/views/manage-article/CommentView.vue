<template>
  <div class="col-12">
    <div class="card">
      <h5>Comments List</h5>
      <DataTable
        ref="dt"
        :value="comments"
        :rows="7"
        :paginator="true"
        responsiveLayout="scroll"
      >
        <Column field="name" header="name" :sortable="true"></Column>
        <Column field="article" header="article" :sortable="true"></Column>
        <Column field="comment" header="comment" :sortable="true"></Column>
        <Column
          field="publishdate"
          header="publish date"
          :sortable="true"
        ></Column>
        <Column field="Crud">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success m-2"
              @click="confirm(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger m-2"
              @click="report(slotProps.data)"
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

      comments: [
        {
          id: 1,
          name: "Example name 1",
          article: "java tuto",
          comment:
            "ostrud non exercitation. Et anim ipsum veniam cupidatat est sit et adipisicing cupidatat nisi laborum aliqua amet. In sunt adipisicing ex non. Consequat adipisicing elit ullamco cupidatat. Do in eiusmod voluptate pariatur quis ut elit magna aliqua ipsum aliqua commodo ad. Aliqua non ipsum adipisicing commodo consequat adipisicing ea esse nostrud tempor cillum nulla ad Lorem. Incididunt laborum velit incididunt enim reprehenderit cupidatat labore exercitation cillum cupidatat magna enim aute veniam.",
          status: "confirmed",
          publishdate: "2023-05-01",
        },
        {
          id: 2,
          name: "Example name 2",
          article: "java tuto",
          comment:
            "Et ipsum magna velit im labore. Deserunt amet id est labore do mollit do laborum dolore. Enim officia cillum nostrud proident in ad fugiat duis tempor exercitation veniam. Anim deserunt nulla anim cupidatat sint sunt reprehenderit velit laboris ex incididunt commodo.",
          status: "confirmed",
          publishdate: "2023-05-02",
        },
        {
          id: 3,
          name: "Example name 3",
          article: "java tuto",
          comment:
            "Sitation duis sint nisi qui non amet. Consectetur laboris elit do duis non amet aute aute ullamco ea consequat ea. In Lorem commodo velit velit ad Lorem aliqua esse.",
          status: "confirmed",
          publishdate: "2023-05-03",
        },
        {
          id: 4,
          name: "Example name 4",
          article: "java tuto",
          comment:
            "Commodo elit quis esse psum ut ea fugiat dolore. Fugiat velit occaecat magna sint aliquip. Sit occaecat veniam est enim ipsum laboris minim sit nostrud. Ea aliquip sint qui ad elit adipisicing nisi.",
          status: "confirmed",
          publishdate: "2023-05-04",
        },
        {
          id: 5,
          name: "Example name 5",
          article: "java tuto",
          comment:
            "Adipisicing consectetur do officia nulla laboris ex Lorem qui officia ea laboris enim. Consequat amet cupidatat est magna adipisicing tempor cupidatat anim excepteur eu est. Enim nostrud sunt ea consequat velit do occaecat adipisicing duis amet esse eiusmod cupidatat. Labore do pariatur laboris culpa minim.",
          status: "confirmed",
          publishdate: "2023-05-05",
        },
        {
          id: 6,
          name: "Example name 1",
          article: "java tuto",
          comment:
            "Non elit ut nostrud culpa ut id duis. Commodo commodo velit ut sint ex exercitation dolor. Lorem excepteur consequat est nulla nisi id nostrud voluptate adipisicing quis do ipsum. Cupidatat amet est sunt nisi nulla exercitation.",
          status: "confirmed",
          publishdate: "2023-05-01",
        },
        {
          id: 7,
          name: "Example name 2",
          article: "java tuto",
          comment:
            "Proident Lorem exercitation amet est veniam esse qui. Et consectetur sunt ipsum labore proident ex ad pariatur cillum esse. Et nisi nulla proident occaecat cupidatat et enim sunt sint ad. Veniam elit incididunt esse aliquip esse aute reprehenderit aute amet incididunt mollit adipisicing eu.",
          status: "confirmed",
          publishdate: "2023-05-02",
        },
        {
          id: 8,
          name: "Example name 3",
          article: "java tuto",
          comment:
            "Velit amet velit consectetur enim est elit ea ex est consequat non pariatur. Dolor et ea elit cillum. Quis deserunt magna do reprehenderit fugiat ad aliqua. Aliquip nulla tempor in non voluptate sit ipsum magna. Id ipsum exercitation qui ullamco exercitation nisi occaecat qui sunt sunt nostrud excepteur. Commodo reprehenderit nostrud eu reprehenderit occaecat sint aliqua tempor dolore excepteur nostrud consectetur elit. Ullamco enim nulla veniam cupidatat reprehenderit elit occaecat occaecat consectetur exercitation exercitation eu exercitation deserunt.",
          status: "confirmed",
          publishdate: "2023-05-03",
        },
        {
          id: 9,
          name: "Example name 4",
          article: "java tuto",
          comment:
            "Voluptate ipsum ullamco deserunt reprehenderit anim commodo sit magna non dolore nulla. Occaecat fugiat esse quis laborum reprehenderit consectetur proident. Dolore in dolore sunt laboris aute eiusmod mollit sunt sit deserunt anim. Esse pariatur ex cillum fugiat proident elit ipsum excepteur incididunt aute minim voluptate. Non nulla eiusmod amet deserunt ex id magna dolor veniam est excepteur. Ea cillum amet eiusmod adipisicing aute in ut dolor eiusmod.",
          status: "confirmed",
          publishdate: "2023-05-04",
        },
        {
          id: 10,
          name: "Example name 5",
          article: "java tuto",
          comment:
            "Aliquip cupidatat eu amet officia esse occaecat ipsum adipisicing duis veniam. Lorem sint amet veniam labore. Enim laborum officia sint ullamco dolor enim proident anim esse occaecat ipsum nisi. Deserunt aliqua cillum et veniam sit occaecat in nulla laborum ex excepteur in commodo. Ullamco duis reprehenderit est ad. Labore labore Lorem voluptate ea consequat anim proident.",
          status: "confirmed",
          publishdate: "2023-05-05",
        },
        {
          id: 11,
          name: "Example name 1",
          article: "java tuto",
          comment:
            "Labore do mollit nulla qui non deserunt ex eu magna officia ullamco. Eu enim exercitation aliquip nulla reprehenderit labore sunt aliqua ex velit anim in. Id magna magna sunt ullamco aliquip sint Lorem fugiat quis occaecat. Aliqua aliquip aliqua duis proident ut fugiat ut sunt veniam in tempor. Qui tempor deserunt minim ut proident magna nulla nisi sit quis fugiat. Duis ut esse tempor amet pariatur excepteur cupidatat commodo commodo duis.",
          status: "confirmed",
          publishdate: "2023-05-01",
        },
        {
          id: 14,
          name: "Example name 2",
          article: "java tuto",
          comment:
            "Sit velit esse ullamco nulla magna incididunt culpa. Tempor exercitation minim fugiat esse consequat deserunt ipsum. Pariatur amet elit irure ea adipisicing occaecat sint deserunt veniam est sint commodo ea voluptate. In nostrud nisi mollit ut non sint veniam nostrud laboris.",
          status: "confirmed",
          publishdate: "2023-05-02",
        },
        {
          id: 12,
          name: "Example name 3",
          article: "java tuto",
          comment:
            "Excepteur ut in anim sit laborum mollit aute reprehenderit. Dolore esse incididunt culpa ut in aute irure laboris. Eu commodo do ipsum cillum eiusmod exercitation duis elit id aliquip adipisicing velit. Et reprehenderit duis deserunt veniam consectetur dolor aute ullamco esse.",
          status: "confirmed",
          publishdate: "2023-05-03",
        },
        {
          id: 13,
          name: "Example name 4",
          article: "java tuto",
          comment:
            "Anim voluptate amet reprehenderit ut qui non mollit ut elit. Ipsum ut ut ipsum qui nisi aliqua pariatur non. Pariatur voluptate irure officia mollit et elit sunt voluptate nostrud officia duis.",
          status: "no confirmed",
          publishdate: "2023-05-04",
        },
        {
          id: 15,
          name: "Example name 5",
          article: "java tuto",
          comment: "e amet reprehenderit ut qui non mollit ut el",
          status: "confirmed",
          publishdate: "2023-05-05",
        },
      ],
      postId: "" as string,
      postname: "" as string,
      postImage: "" as string,
      postContent: "" as string,
      postTags: ["", "", ""],
    };
  },

  methods: {
    confirm(data: any) {
      //TODO : data to data.id
      data.status = "confirmed";
      routes.push({ name: "confirm", params: { id: data.name } });
      console.log("report ligne : ", data.name);
    },
    report(data: any) {
      console.log("report click : ", data.name);
    },
  },
};
</script>