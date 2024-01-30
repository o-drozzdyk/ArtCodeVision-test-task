<script lang="ts">
import { defineComponent } from 'vue';
import { store } from '@/assets/store';
import { Product } from '@/types/Product';

export default defineComponent({
  name: 'CreateView',

  data(): {product: Product, photoUrl: string} {
    return {
      product: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 5,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [] as string[],
      },
      photoUrl: '',
    };
  },

  methods: {
    addPhoto() {
      if (this.photoUrl.length > 0) {
        this.product.images.push(this.photoUrl);
      }
    },
    deletePhoto(url: string) {
      this.product.images = this.product.images.filter(photo => photo !== url);
    },
    handleFormSubmit() {
      if (
        this.product.title &&
        this.product.description &&
        this.product.price &&
        this.product.rating &&
        this.product.stock &&
        this.product.brand &&
        this.product.category &&
        this.product.thumbnail) {
        if (this.product.id !== 0) {
          if (this.product.id !== 101) {
            fetch(`https://dummyjson.com/products/${this.product.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: this.product.title,
                description: this.product.description,
                price: this.product.price,
                discountPercentage: this.product.discountPercentage,
                rating: this.product.rating,
                stock: this.product.stock,
                brand: this.product.brand,
                category: this.product.category,
                thumbnail: this.product.thumbnail,
                images: [...this.product.images],
              })
            })
              .then(res => res.json())
              .then((updatedProduct) => {
                this.product = { ...updatedProduct };
                store.products = store.products.map(item => {
                  return item.id === updatedProduct.id
                    ? updatedProduct
                    : item;
                })
                this.$router.push('/');
              });
          } else {
            store.products = store.products.map(item => {
              return item.id === this.product.id
                ? this.product
                : item;
            })
            this.$router.push('/');
          }
        } else {
          fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: this.product.title,
              description: this.product.description,
              price: +this.product.price,
              discountPercentage: +this.product.discountPercentage,
              rating: +this.product.rating,
              stock: +this.product.stock,
              brand: this.product.brand,
              category: this.product.category,
              thumbnail: this.product.thumbnail,
              images: [...this.product.images],
            })
          })
            .then(res => res.json())
            .then((newProduct) => {
              store.products = [...store.products, { ...newProduct }];
              this.$router.push('/');
            });
        }
      }
    },
    handleCancelClick() {
      this.$router.push('/');
    },
  },

  mounted() {
    const id = this.$route.params.id;
    const foundProduct = store.products.find(item => item.id === +id);

    if (foundProduct) {
      this.product = { ...foundProduct };
    }
  },
});
</script>

<template>
  <div class="form">
    <h1 class="form__title">
      {{ product.id !== 0 ? 'Update product' : 'Add new product' }}
    </h1>

    <form @submit.prevent="handleFormSubmit" class="form__content">
      <div class="form-group">
        <label for="title" class="form-group__label">Title:</label>
        <input
          id="title"
          v-model="product.title"
          type="text"
          class="form-group__input"
          required 
        />
      </div>

      <div class="form-group">
        <label for="description" class="form-group__label">Description:</label>
        <input
          id="description"
          v-model="product.description"
          class="form-group__input"
          required
        />
      </div>

      <div class="form-group">
        <label for="price" class="form-group__label">Price:</label>
        <input
          id="price"
          v-model.number="product.price"
          class="form-group__input"
          type="number"
          min="0"
          required
        />
      </div>

      <div class="form-group">
        <label for="discountPercentage" class="form-group__label">Discount Percentage:</label>
        <input
         id="discountPercentage"
         v-model.number="product.discountPercentage"
         class="form-group__input"
         type="number"
         min="0"
         max="100" 
        />
      </div>

      <div class="form-group">
        <label for="rating" class="form-group__label">Rating:</label>
        <input
          id="rating"
          v-model.number="product.rating"
          type="number"
          class="form-group__input"
          min="0"
          max="5"
          step="0.1"
        />
      </div>

      <div class="form-group">
        <label for="stock" class="form-group__label">Stock:</label>
        <input
          id="stock"
          v-model.number="product.stock"
          type="number"
          class="form-group__input"
          min="0"
        />
      </div>

      <div class="form-group">
        <label for="brand" class="form-group__label">Brand:</label>
        <input
          id="brand"
          v-model="product.brand"
          class="form-group__input"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="category" class="form-group__label">Category:</label>
        <input
          id="category"
          v-model="product.category"
          class="form-group__input"
          type="text"
        />
      </div>

      <div class="form-group">
        <label for="thumbnail" class="form-group__label">Thumbnail URL:</label>
        <input
          id="thumbnail"
          v-model="product.thumbnail"
          class="form-group__input"
          type="url"
        />
      </div>

      <div class="form-group">
        <label class="form-group__label">Images URLs:</label>
        <div 
          v-for="(image, index) in product.images" 
          :key="image" 
          class="form-group__container"
        >
          <input  
            v-model="product.images[index]"
            class="form-group__container-input" 
            type="url" 
          />

          <img 
            src="img/icons/cross.svg" 
            alt="Delete" 
            class="form-group__container-icon"
            @click.prevent="deletePhoto(image)"
          />
        </div>
        
        <div class="form-group__container">
          <input 
            type="url"
            class="form-group__container-input"
            v-model="photoUrl"
          />

          <img 
            src="img/icons/plus.svg"
            alt="Add"
            class="form-group__container-icon"
            @click.prevent="addPhoto"
          />
        </div>
      </div>

      <button
        type="button"
        class="form__content-button form__content-button--cancel"
        @click.prevent="handleCancelClick"
      >
        Cancel
      </button>

      <button
        type="submit"
        class="form__content-button form__content-button--add"
        @click.prevent="handleFormSubmit"
      >
        {{ product.id !== 0 ? 'Update' : 'Create' }}
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

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4px;

      &-input {
        padding: 8px;
        width: 100%;
        border-radius: 5px;
      }

      &-icon {
        width: 24px;
        height: 24px;
        opacity: 0.5;
        cursor: pointer;
      }
    }

    &__input {
      padding: 8px;
      border-radius: 5px;
    }
  }
}
</style>
