import { Product } from '@/types/Product';
import { reactive } from 'vue'

export const store = reactive({
  products: [] as Product[],
  currentProduct: {} as Product,
});
