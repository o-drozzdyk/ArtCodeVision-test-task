<script lang="ts">
import { defineComponent } from 'vue';
import { Product } from '@/types/Product';
import { getPriceWithDiscount } from '@/assets/helpers';
import Buttons from '@/components/Buttons.vue';

export default defineComponent({
  name: 'ProductItem',
  data() {
    return {
      actualPrice: 0,
    };
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },
  components: {
    Buttons,
  },
  mounted() {
    this.actualPrice = getPriceWithDiscount(this.product.price, this.product.discountPercentage);
  },
  methods: {
    clickHandler() {
      this.$router.push(`/${this.product.id}`);
    },
  },
});
</script>

<template>
  <article class="product" @click="clickHandler">
    <div class="product__photo-container">
      <img :src="product.thumbnail" alt="Product photo" class="product__photo-container-img" />
    </div>

    <div class="product__info">
      <div class="product__info__title">
        <h3 class="product__info__title-text">
          {{ product.title }}
        </h3>
      </div>

      <div class="product__info__rating">
        <p class="product__info__rating-text">Rating:</p>

        <p class="product__info__rating-number">{{ product.rating }}</p>
      </div>

      <div class="product__info__stock">
        <p class="product__info__stock-text">Stock:</p>

        <p class="product__info__stock-number">{{ product.stock }}</p>
      </div>

      <div class="product__info__price">
        <p class="product__info__price-text">Price:</p>

        <p class="product__info__price-number">{{ `$${actualPrice}` }}</p>
      </div>

      <Buttons />
    </div>
  </article>
</template>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/mixins.scss';

.product {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  padding: 16px;

  border: 1px solid $color-grey;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 10px 0 $shadow-color;
  }

  &__photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;

    &-img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__title {
      height: 28px;

      &-text {
        font-size: 14px;
        font-weight: 500;
      }
    }

    &__price,
    &__stock,
    &__rating {
      display: flex;
      justify-content: space-between;

      &-text {
        font-size: 14px;
      }

      &-number {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
</style>
