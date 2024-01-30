<script lang="ts">
import { defineComponent } from 'vue';
import ProductList from '@/components/ProductList.vue';
import { store } from '@/assets/store';
import { SortOptions } from '@/types/SortOptions';

export default defineComponent({
  name: 'HomeView',

  components: {
    ProductList,
  },

  data() {
    return {
      query: '',
      sortOption: SortOptions.Default,
      SortOptions,
    };
  },

  computed: {
    products() {
      let products = [...store.products];

      if (this.query.length >= 3) {
        products = products.filter(product => product.title.toLowerCase().includes(this.query.toLowerCase().trim()));
      }

      products.sort((a, b) => {
        switch (this.sortOption) {
          case SortOptions.Title:
            return a.title.localeCompare(b.title);
          case SortOptions.Rating:
            return b.rating - a.rating;
          default:
            return 0;
        }
      });

      return products;
    }
  },

  async mounted() {
    if (store.products.length === 0) {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        store.products = data.products;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  },
});
</script>

<template>
  <div class="home">
    <div class="home__top">
      <div class="home__top-form-group">
        <label for="search" class="home__top-form-group__label">Search:</label>
        <input id="search" v-model="query" type="text" class="home__top-form-group__search" />
      </div>

      <div class="home__top-form-group">
        <label for="sortOption" class="home__top-form-group__label">Sort by:</label>
        <select id="sortOption" v-model="sortOption" class="home__top-form-group__select">
          <option v-for="(key, value) in SortOptions" :key="key" :value="key">{{ value }}</option>
        </select>
      </div>
    </div>

    <ProductList :products="products" />
  </div>
</template>

<style lang="scss">
.home__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  &-form-group {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    &__label {
      align-self: center;
    }

    &__search,
    &__select {
      padding: 8px;
      border-radius: 5px;
    }

    &__select {
      cursor: pointer;
    }
  }
}
</style>
