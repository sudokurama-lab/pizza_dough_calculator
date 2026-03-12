<template>
  <div class="min-h-screen bg-orange-50/30 py-10 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-4xl mx-auto">
      
      <header class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-orange-600 tracking-tight">
          🍕 Calculadora de Pizza
        </h1>
        <p class="mt-2 text-lg text-gray-600">
          Calcula tus ingredientes al gramo con precisión profesional.
        </p>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <section>
          <InputForm 
            v-model:calcMode="calcMode"
            v-model:availableFlour="availableFlour"
            v-model:pizzas="pizzas"
            v-model:weightPerPizza="weightPerPizza"
            v-model:hydration="hydration"
            v-model:salt="salt"
            v-model:fermentType="fermentType"
          />
        </section>

        <section>
          <RecipeResult 
            :calcMode="calcMode"
            :estimatedPizzas="estimatedPizzas"
            :weightPerPizza="weightPerPizza"
            :totalWeight="totalWeight"
            :totalFlour="totalFlour"
            :totalWater="totalWater"
            :totalSalt="totalSalt"
            :totalOil="totalOil"
            :preferment="preferment"
            :finalDough="finalDough"
          />
        </section>

      </main>
      
    </div>
  </div>
</template>

<script setup>
// 1. Importamos nuestros componentes visuales
import InputForm from './components/InputForm.vue'
import RecipeResult from './components/RecipeResult.vue'

// 2. Importamos nuestro composable matemático
import { usePizzaMath } from './composables/usePizzaMath.js'

// 3. Extraemos todas las variables y cálculos de nuestra lógica
const {
  calcMode,
  availableFlour,
  pizzas,
  weightPerPizza,
  hydration,
  salt,
  fermentType,
  totalWeight,
  totalFlour,
  totalWater,
  totalSalt,
  totalOil,
  preferment,
  finalDough,
  estimatedPizzas
} = usePizzaMath()
</script>