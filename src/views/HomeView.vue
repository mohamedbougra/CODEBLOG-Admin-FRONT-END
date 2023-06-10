

<script >
import EventBus from '@/AppEventBus';
import ProductService from '../service/ProductService';
import axios from 'axios';

export default {
  data() {
    return {
      newArray : []  ,
      dataLit: [
        { count: 89, tags: 'java' },
        { count: 30, tags: 'spring-boot' },
        { count: 14, tags: 'spring' },
        { count: 11, tags: 'android' },
        { count: 8, tags: 'spring-security' },
        { count: 6, tags: 'hibernate' },
        { count: 5, tags: 'gradle' },
        { count: 5, tags: 'junit' },
        { count: 5, tags: 'docker' },
        { count: 4, tags: 'kotlin' },
      ],
      datatx: null,
      products: null,
      lineData: {
        labels: [],
        datasets: [
          {
            label: 'Revenue',
            data: [],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },

        ]
      },
      barData: {
        labels: ['Java', 'spring', 'spring-boot', 'jpa', 'jsf', 'jsp', 'hibernat'],
        datasets: [
          {
            label: 'Revenue',
            data: [65, 59, 80, 81, 150, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
          },
          {
            label: 'Sales',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
          },
          {
            label: 'Sales1',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
          },
          {
            label: 'Sales2',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
          },
          {
            label: 'Sales3',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
          }
        ]
      },
      items: [
        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
      ],
      lineOptions: null,
    }
  },


  productService: null,
  themeChangeListener: null,

  beforeUnmount() {
    EventBus.off('change-theme', this.themeChangeListener);

  },
  created() {
    this.productService = new ProductService();
      axios.get('http://127.0.0.1:5000/data')
      .then(response => {
        const data = response.data;
        const labels = data.map(item => item.tags);
        const counts = data.map(item => item.count);
        this.lineData.labels = labels;
        this.lineData.datasets[0].data = counts;
        this.newArray =  data;
  }
  )
 
  },
  methods: {

    // fetchChartData() {
    //   axios.get('/chart-data')
    //     .then(response => {
    //       const data = response.data;
    //       const labels = data.map(item => item.tags);
    //       const counts = data.map(item => item.count);
          
    //       this.lineData.labels = labels;
    //       this.lineData.datasets[0].data = counts;
          
    //       // Do any additional processing or rendering here
    //     })
    //     .catch(error => {
    //       console.error('Error fetching chart data:', error);
    //     });
    // }
  

    fetData() {
      axios.get('http://127.0.0.1:5000/day')
        .then(response => {
          const datax = response.data;
          this.datatx = datax;
          console.log("3iiiiiiiiiiw", datax)
          console.log("3aaaaaaaaaaw", typeof this.datatx)

        })
        .catch(error => {
          console.error(error);
        });
    },

    formatCurrency(value) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#495057'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef',
            }
          },
          y: {
            ticks: {
              color: '#495057'
            },
            grid: {
              color: '#ebedef',
            }
          },
        }
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: '#ebedef'
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#ebedef'
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)',
            }
          },
          y: {
            ticks: {
              color: '#ebedef'
            },
            grid: {
              color: 'rgba(160, 167, 181, .3)',
            }
          },
        }
      };
    }
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="container" style="display: flex; align-items: center;">

          <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width:2.5rem;height:2.5rem; margin-right: 10px;">
            <i class="pi pi-sun text-blue-500 text-xl"></i>
          </div>
          <h3>Tap into the <span style="color: blue;">trends</span> and let your articles make a lasting impact</h3>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">All calls related to java </span>
            <div class="text-900 font-medium text-xl">1200 </div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width:2.5rem;height:2.5rem">
            <i class="pi pi-megaphone text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Articles count</span>
            <div class="text-900 font-medium text-xl">1020</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width:2.5rem;height:2.5rem">
            <i class="pi pi-copy text-orange-500 text-xl"></i>
          </div>
        </div>

      </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Comments</span>
            <div class="text-900 font-medium text-xl">152 Unread (85 responded)</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width:2.5rem;height:2.5rem">
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Top tags related to java </h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />

      </div>
      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Articles statistics</h5>
          <div>
            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu2.toggle($event)"></Button>
            <Menu ref="menu2" :popup="true" :model="items"></Menu>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Article 1</span>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">

              <span class="text-orange-500 ml-3 font-medium">80 view</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Article 2</span>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">

              <span class="text-blue-500 ml-3 font-medium">60 view</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Article 3</span>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">

              <span class="text-green-500 ml-3 font-medium">120 view</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Article 4</span>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">

              <span class="text-yellow-500 ml-3 font-medium">200 view</span>
            </div>
          </li>


        </ul>
      </div>
    </div>
    <!-- <div>
      <h1>Data List</h1>
      <h5 v-if="newArray.length === 0">Data List is empty</h5>
      <h5>{{ newArray }}</h5>
      <ul>
        <li v-for="item in newArray" :key="item.tags">
          <h1>{{ item.tags }}</h1>
          <p>{{ item.count }}</p>
        </li>
      </ul>
    </div> -->
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Tags Evolution</h5>
        <Chart type="bar" :data="barData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Top comments</h5>
          <div>
            <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"></Button>
            <Menu ref="menu1" :popup="true" :model="items"></Menu>
          </div>
        </div>

        <span class="block text-600 font-medium mb-3">This week</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
              <i class="pi pi-comment text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3">Ahmed Elgahtani <br />
              <span class="text-700">This article helps me a lot in my studies</span>
            </span>
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
              <i class="pi pi-comment text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3">Sabir Robai <br /> why you shouse to use hibernate not eclipslink</span>
          </li>
        </ul>


      </div>

    </div>
  </div>
</template>