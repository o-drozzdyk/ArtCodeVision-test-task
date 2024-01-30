<script lang="ts">
import { Product } from '@/types/Product';
import { defineComponent } from 'vue';
import { store } from '@/assets/store';

export default defineComponent({
  name: 'CreateView',
  data() {
    return {
      title: '',
      description: '',
      price: '',
      // price: 0,
      // discountPercentage: 0,
      discountPercentage: '',
      // rating: 0,
      rating: '',
      // stock: 0,
      stock: '',
      brand: '',
      category: '',
      thumbnail: '',
      images: [] as string[],

      product: {} as Product,
    };
    // return {
    //   "title": this.product?.title || '',
    //   "description": this.product?.description || '',
    //   "price": this.product?.price || '',
    //   "discountPercentage": this.product?.discountPercentage || '',
    //   "rating": this.product?.rating || '',
    //   "stock": this.product?.stock || '',
    //   "brand": this.product?.brand || '',
    //   "category": this.product?.category || '',
    //   "thumbnail": this.product?.thumbnail || '',
    //   "images": this.product?.images || [],
    // };
  },
  // computed: {
  //   product(): Product | undefined {
  //     const id = this.$route.params.id;
  //     const product = store.products.find(item => item.id === +id);

  //     return product;
  //   },
  // },
  // watch: {
  //   product: {
  //     immediate: true,
  //     handler(newProduct) {
  //       if (newProduct) {
  //         this.title = newProduct.title;
  //         this.description = newProduct.description;
  //         this.price = newProduct.price;
  //         this.discountPercentage = newProduct.discountPercentage;
  //         this.rating = newProduct.rating;
  //         this.stock = newProduct.stock;
  //         this.brand = newProduct.brand;
  //         this.category = newProduct.category;
  //         this.thumbnail = newProduct.thumbnail;
  //         this.images = newProduct.images;
  //       }
  //     },
  //   },
  // },
  mounted() {
    const id = this.$route.params.id;
    const foundProduct = store.products.find(item => item.id === +id);

    if (foundProduct) {
      this.product = foundProduct;

      this.title = foundProduct.title;
      this.description = foundProduct.description;
      this.price = foundProduct.price.toString();
      this.discountPercentage = foundProduct.discountPercentage.toString();
      this.rating = foundProduct.rating.toString();
      this.stock = foundProduct.stock.toString();
      this.brand = foundProduct.brand;
      this.category = foundProduct.category;
      this.thumbnail = foundProduct.thumbnail;
      this.images = foundProduct.images;
    }
  },
  methods: {
    handleFormSubmit() {
      if (
        this.title &&
        this.description &&
        this.price &&
        this.discountPercentage &&
        this.rating &&
        this.stock &&
        this.brand &&
        this.category &&
        this.thumbnail) {
        if (Object.keys(this.product).length === 0) {
          fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: this.title,
              description: this.description,
              price: +this.price,
              discountPercentage: +this.discountPercentage,
              rating: +this.rating,
              stock: +this.stock,
              brand: this.brand,
              category: this.category,
              thumbnail: this.thumbnail,
              images: [...this.images],
            })
          })
            .then(res => res.json())
            .then((newProduct) => {
              console.log(newProduct);
              store.products = [...store.products, { ...newProduct }];
              console.log('added', store.products);
              this.$router.push('/');
            });
        } else {
          fetch(`https://dummyjson.com/products/${this.product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: this.title,
              description: this.description,
              price: +this.price,
              discountPercentage: +this.discountPercentage,
              rating: +this.rating,
              stock: +this.stock,
              brand: this.brand,
              category: this.category,
              thumbnail: this.thumbnail,
              images: [...this.images],
            })
          })
          .then(res => res.json())
          .then((updatedProduct) => {
            console.log(updatedProduct);
            this.product = { ...updatedProduct };
            store.products = store.products.map(item => {
              return item.id === updatedProduct.id
                ? updatedProduct
                : item;
            })
            this.$router.push('/');
          });
        }
      }
    },
    handleCancelClick() {
      this.$router.push('/');
    },
  },
});
</script>

<template>
  <div class="form">
    <h1 class="form__title">{{ Object.keys(product).length > 0 ? 'Update product' : 'Add new product' }}</h1>

    <form @submit.prevent="handleFormSubmit" class="form__content">
      <div class="form-group">
        <label for="title" class="form-group__label">Title:</label>
        <input id="title" v-model="title" type="text" class="form-group__input" required />
      </div>

      <div class="form-group">
        <label for="description" class="form-group__label">Description:</label>
        <input id="description" v-model="description" class="form-group__input" required />
      </div>

      <div class="form-group">
        <label for="price" class="form-group__label">Price:</label>
        <input id="price" v-model.number="price" class="form-group__input" type="number" min="0" required />
      </div>

      <div class="form-group">
        <label for="discountPercentage" class="form-group__label">Discount Percentage:</label>
        <input id="discountPercentage" v-model.number="discountPercentage" class="form-group__input" type="number" min="0"
          max="100">
      </div>

      <div class="form-group">
        <label for="rating" class="form-group__label">Rating:</label>
        <input id="rating" v-model.number="rating" type="number" class="form-group__input" min="0" max="5" step="0.1">
      </div>

      <div class="form-group">
        <label for="stock" class="form-group__label">Stock:</label>
        <input id="stock" v-model.number="stock" type="number" class="form-group__input" min="0">
      </div>

      <div class="form-group">
        <label for="brand" class="form-group__label">Brand:</label>
        <input id="brand" v-model="brand" class="form-group__input" type="text">
      </div>

      <div class="form-group">
        <label for="category" class="form-group__label">Category:</label>
        <input id="category" v-model="category" class="form-group__input" type="text">
      </div>

      <div class="form-group">
        <label for="thumbnail" class="form-group__label">Thumbnail URL:</label>
        <input id="thumbnail" v-model="thumbnail" class="form-group__input" type="url">
      </div>

      <div class="form-group">
        <label class="form-group__label">Images URLs:</label>
        <input v-for="(image, index) in images" :key="image" v-model="images[index]" class="form-group__input" type="url"
          :placeholder="'Image URL ' + (index + 1)">
        <input class="form-group__input" type="url">
      </div>

      <button type="button" class="form__content-button form__content-button--cancel" @click.prevent="handleCancelClick">
        Cancel
      </button>

      <button type="submit" class="form__content-button form__content-button--add" @click.prevent="handleFormSubmit">
        {{ Object.keys(product).length > 0 ? 'Update' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/mixins.scss';

.form {
  margin-top: 16px;
  margin-inline: auto;
  width: 500px;
  padding: 16px 32px;
  border: 1px solid $color-grey;
  border-radius: 5px;

  &__title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 500;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 16px;

    &-button {
      justify-self: center;
      padding-inline: 16px;
      height: 35px;
      width: fit-content;
      border: none;

      color: $color-white;
      font-size: 16px;
      font-weight: 500;

      &:hover {
        box-shadow: 0 2px 10px 0 $shadow-color;
      }

      &--cancel {
        background-color: $color-grey;
      }

      &--add {
        background-image: linear-gradient(to right, $button-color1, $button-color2);
      }
    }
  }

  &-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;

    &__label {
      align-self: start;
    }

    &__input {
      padding: 8px;
      border-radius: 5px;
    }
  }
}
</style>
