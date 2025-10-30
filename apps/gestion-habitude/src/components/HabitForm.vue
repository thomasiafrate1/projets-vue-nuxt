<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-3">Ajouter une habitude</h2>

    <div class="row">
      <div>
        <input
          v-model="name"
          v-bind="nameAttrs"
          type="text"
          placeholder="Nom"
          class="input"
        />
        <p v-if="errors.name" class="text-sm text-muted mt-2">{{ errors.name }}</p>
      </div>

      <div>
        <input
          v-model="category"
          v-bind="categoryAttrs"
          type="text"
          placeholder="Catégorie"
          class="input"
        />
        <p v-if="errors.category" class="text-sm text-muted mt-2">{{ errors.category }}</p>
      </div>
    </div>

    <div class="mt-3">
      <button class="btn" type="submit">Ajouter</button>
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useHabitsStore } from "../stores/habits";

const store = useHabitsStore();

const schema = yup.object({
  name: yup.string().required("Le nom est requis").max(50, "50 caractères max"),
  category: yup.string().optional().max(30, "30 caractères max"),
});

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema: schema,
  initialValues: { name: "", category: "" },
});

const [name, nameAttrs] = defineField("name");
const [category, categoryAttrs] = defineField("category");

const onSubmit = handleSubmit((vals) => {
  store.addHabit(vals);
  resetForm();
});
</script>