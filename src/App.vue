<template>
  <div class="page">
    <header class="page__header">
      <nav class="page__header__nav">
        <router-link to="/" class="page__header__nav__logo">
          <img src="img/logo.svg" alt="Logo" class="page__header__nav__logo__img" />
        </router-link>

        <router-link to="/create" class="page__header__nav__create">Create</router-link>
      </nav>
    </header>

    <router-view class="page__main" />
  </div>
</template>

<style lang="scss">
@import '@/assets/colors.scss';
@import '@/assets/mixins.scss';

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  background-color: $color-white;
}

* {
  box-sizing: border-box;
  transition: all 0.3s;
}

button {
  border-radius: 5px;
  cursor: pointer;
}

.page {
  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    box-shadow: 0px 1px 8px 0px $color-grey;
    background-color: $color-white;

    @include onPhone {
      height: 48px;
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-inline: 80px;

      @include onTablet {
        padding-inline: 40px;
      }

      @include onPhone {
        padding-inline: 20px;
      }

      &__logo {
        display: flex;
        align-items: center;

        &__img {
          height: 48px;
          width: auto;

          @include onTablet {
            height: 40px;
          }

          @include onPhone {
            height: 32px;
          }
        }
      }

      &__create {
        padding-inline: 18px;
        height: 40px;
        border-radius: 5px;

        font-size: 18px;
        font-weight: 500;
        text-decoration: none;
        line-height: 40px;
        color: $color-white;
        background-image: linear-gradient(to right, $button-color1, $button-color2);

        @include onPhone {
          padding-inline: 14px;
          height: 32px;
          line-height: 32px;
        }

        &:hover {
          box-shadow: 0 2px 10px 0 $shadow-color;
        }
      }
    }
  }

  &__main {
    padding: 20px;
  }
}
</style>
