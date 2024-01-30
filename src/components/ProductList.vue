<script lang="ts">
import { defineComponent } from 'vue';
import { Product } from '@/types/Product';
import ProductItem from '@/components/ProductItem.vue';

export default defineComponent({
  name: 'ProductList',
  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
  },
  components: {
    ProductItem,
  },
});
</script>

<template>
  <div class="products">
    <ProductItem 
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/mixins.scss';

.products {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-around;
  align-items: center;
  gap: 16px;

  @include onTablet {
    grid-template-columns: repeat(3, auto);
  }

  @include onPhone {
    grid-template-columns: auto;
  }
}
</style>
