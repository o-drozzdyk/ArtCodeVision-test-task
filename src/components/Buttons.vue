<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonsVue',
})
</script>

<template>
  <div class="buttons">
    <button type="button" class="buttons-buy">
      buy
    </button>

    <button type="button" class="buttons-favourites">
      <img 
        src="img/icons/heart.svg"
        alt="Heart"
        class="buttons-favourites__icon" 
      />
    </button>
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  height: 45px;

  &-buy {
    padding: 0;
    width: 100%;

    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
    color: $color-white;

    border: none;
    background-image: linear-gradient(to right, $button-color1, $button-color2);

    &:hover {
      box-shadow: 0 2px 10px 0 $color-grey;
    }
  }

  &-favourites {
    padding: 0;
    border: 1px solid $color-grey;
    background-color: $color-white;

    &__icon {
      padding: 10px;
      margin: 0;
    }

    &:hover {
      border-color: $text-color;
      box-shadow: 0 2px 10px 0 $shadow-color;
    }
  }
}
</style>
