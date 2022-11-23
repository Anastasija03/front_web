<template>
  <v-hover v-slot="{ hover }">
      <v-card
        :elevation="hover ? 12 : 2"
        class="pa-4 my-2 col newsItem"
        :class="{ 'on-hover': hover }"
      >
        <div class="newsItem__text-section">
          <h2>{{ formData.name }} {{formData.surname}}</h2>
          <p class="newsItem__shorttext">
            {{ formData.email }}
          </p>
          <p>Страна: {{ formData.country }}, Возраст: {{formData.years}}</p>
        </div>
      </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.on-hover {
  cursor: pointer;
  transform: scale(1.003);
  transition: 200ms;
}

.link {
  text-decoration: none;
}

.newsItem {
  display: flex;

  &__text-section {
    margin-left: 8px;
  }

  &__shorttext {
    max-width: 50ch;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img {
    height: 100%;
    max-width: 140px;
  }
}
</style>