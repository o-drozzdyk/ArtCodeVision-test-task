<script lang="ts">
import { defineComponent } from 'vue';
import { Product } from '@/types/Product';
import { getPriceWithDiscount } from '@/assets/helpers';
import Buttons from '@/components/Buttons.vue';
import { store } from '@/assets/store';

export default defineComponent({
  name: 'ProductDetailsView',
  data() {
    return {
      product: {} as Product,
      currentPhoto: '',
      actualPrice: 0,
    };
  },
  components: {
    Buttons,
  },
  async mounted() {
    const id = this.$route.params.id || 0;

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.product = data;
      this.currentPhoto = data.images[0];
      this.actualPrice = getPriceWithDiscount(this.product.price, this.product.discountPercentage);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.product.id = +id;
    }
  },
  methods: {
    handlePhotoClick(photoUrl: string) {
      this.currentPhoto = photoUrl;
      console.log('curr photo:', this.currentPhoto);
    },
    handleUpdateClick() {
      this.$router.push({
        name: "update",
        params: { id: this.product.id },
      });
    },
    handleDeleteClick() {
      fetch(`https://dummyjson.com/products/${this.product.id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(() => {
        store.products = [...store.products.filter(productItem => productItem.id !== this.product.id)];
        console.log(store.products);
        this.$router.push('/');
      });
      },
    },
});
</script>

<template>
  <article class="details">
    <div class="details__top">
      <h3 class="details__top__title">
        {{ product.title }}
      </h3>

      <div class="details__top__buttons">
        <button 
          type="button" 
          class="details__top__buttons-button"
          @click.prevent="handleUpdateClick"
        >
          Update
        </button>

        <button 
          type="button" 
          class="details__top__buttons-button details__top__buttons-button--delete"
          @click.prevent = "handleDeleteClick"
        >
          Delete
        </button>
      </div>
    </div>

    <div class="details__main">
      <div class="details__main__photos">
        <div class="details__main__photos__block">
          <div 
            v-for="photo in product.images" 
            :key="photo"
            class="details__main__photos__block__container"
            :class="{ 'details__main__photos__block__container--active': currentPhoto === photo }"
          >
            <img 
              :src="photo" 
              alt="More photos" 
              class="details__main__photos__block__container-item"
              @click="handlePhotoClick(photo)"
            />
          </div>
        </div>

        <div class="details__main__main-photo">
          <img 
            :src="currentPhoto" 
            alt="Product photo" 
            class="details__main__main-photo-img" 
          />
        </div>
      </div>

      <div class="details__main__info">
        <p class="details__main__info-description">
          {{ product.description }}
        </p>

        <div class="details__main__info__category">
          <p class="details__main__info__category-text">Category:</p>

          <p class="details__main__info__category-value">{{ product.category }}</p>
        </div>

        <div class="details__main__info__brand">
          <p class="details__main__info__brand-text">Brand:</p>

          <p class="details__main__info__brand-value">{{ product.brand }}</p>
        </div>

        <div class="details__main__info__rating">
          <p class="details__main__info__rating-text">Rating:</p>

          <p class="details__main__info__rating-value">{{ product.rating }}</p>
        </div>

        <div class="details__main__info__stock">
          <p class="details__main__info__stock-text">Stock:</p>

          <p class="details__main__info__stock-value">{{ product.stock }}</p>
        </div>

        <div class="details__main__info__price">
          <p class="details__main__info__price-text">Price:</p>

          <div class="details__main__info__price-prices">
            <p class="details__main__info__price-prices-old">{{ `$${product.price}` }}</p>

            <p class="details__main__info__price-prices-discount">{{ `$${actualPrice}` }}</p>
          </div>
        </div>

        <Buttons />
      </div>
    </div>
  </article>
</template>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/mixins.scss';

.details {
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 24px;
      font-weight: 700;
      text-align: left;
    }

    &__buttons {
      display: flex;
      gap: 16px;

      &-button {
        padding-inline: 18px;
        height: 32px;
        background-color: $color-white;
        border: none;
        font-size: 16px;
        font-weight: 500;
        color: $text-color;
        background-color: $shadow-color;

        &:hover {
          box-shadow: 0 2px 10px 0 $shadow-color;
        }

        &--delete {
          color: $color-red;
          background-color: $color-light;
        }
      }
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 16px;

    @include onPhone {
      flex-direction: column;
    }

    &__photos {
      display: flex;
      gap: 16px;

      @include onPhone {
        flex-direction: column-reverse;
      }
    
      &__block {
        display: flex;
        flex-direction: column;
        gap: 8px;

        @include onPhone {
          flex-direction: row;
          justify-content: center;
        }

        &__container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          padding: 8px;
          border: 1px solid $color-grey;
          border-radius: 5px;
          cursor: pointer;

          &--active {
            border-color: $text-color;
          }

          &-item {
            max-width: 100%;
            max-height: 100%;
          }

          &:hover {
            box-shadow: 0 2px 10px 0 $text-color;
          }
        }
      }
    }

    &__main-photo {
      width: 100%;

      &-img {
        width: 100%;
        height: auto;
      }
    }

    &__info {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 360px;

      @include onPhone {
        width: 100%;
      }

      &-description {
        margin-bottom: 8px;
        font-size: 16px;
        text-align: left;
      }

      &__category,
      &__brand,
      &__rating,
      &__stock,
      &__price {
        display: flex;
        justify-content: space-between;

        &-text {
          font-size: 14px;
        }

        &-value {
          font-size: 16px;
          font-weight: 700;
        }
      }

      &__price {
        margin-bottom: 8px;

        &-prices {
          display: flex;
          gap: 8px;

          &-old {
            font-size: 16px;
            font-weight: 400;
            text-decoration: line-through;
            color: $color-grey;
          }

          &-discount {
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
