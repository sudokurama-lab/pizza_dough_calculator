<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-orange-50/30 py-10 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-6">
        <h1 class="text-4xl font-extrabold text-orange-600 tracking-tight">
          🍕 Calculadora de Pizza
        </h1>
      </header>
      
      <!-- TABS -->
      <div class="flex justify-center mb-8 border-b border-gray-200">
         <nav class="-mb-px flex space-x-8">
            <button 
              @click="currentTab = 'simple'"
              :class="currentTab === 'simple' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
              Simulador Básico
            </button>
            <button 
              @click="currentTab = 'advanced'"
              :class="currentTab === 'advanced' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            >
               🧪 Laboratorio Avanzado
            </button>
         </nav>
      </div>

      <!-- MODO SIMPLE -->
      <main v-if="currentTab === 'simple'" class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <section>
          <InputForm
            v-model:calcMode="simple.calcMode"
            v-model:availableFlour="simple.availableFlour"
            v-model:pizzas="simple.pizzas"
            v-model:weightPerPizza="simple.weightPerPizza"
            v-model:hydration="simple.hydration"
            v-model:salt="simple.salt"
            v-model:fermentType="simple.fermentType"
            v-model:prefermentPercentage="simple.prefermentPercentage" 
            v-model:totalOil="simple.totalOil"
          />
        </section>

        <section>
          <RecipeResult
            v-bind="simple"
          />
        </section>
      </main>

      <!-- MODO AVANZADO -->
      <main v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
         <section>
            <AdvancedInputForm 
               v-model:calcMode="adv.calcMode"
               v-model:availableFlour="adv.availableFlour"
               v-model:pizzas="adv.pizzas"
               v-model:weightPerPizza="adv.weightPerPizza"
               v-model:hydration="adv.hydration"
               v-model:salt="adv.salt"
               v-model:oil="adv.oil"
               v-model:yeast="adv.yeast"
               :preferments="adv.preferments"
               @add-preferment="adv.addPreferment"
               @remove-preferment="adv.removePreferment"
            />
         </section>
         <section>
            <AdvancedRecipeResult 
               :totalFlour="adv.totalFlour"
               :totalWater="adv.totalWater"
               :totalSalt="adv.totalSalt"
               :totalOil="adv.totalOil"
               :totalWeight="adv.totalWeight"
               :prefermentsList="adv.prefermentsList"
               :finalDough="adv.finalDough"
            />
         </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Importar Componentes
import InputForm from './components/InputForm.vue'
import RecipeResult from './components/RecipeResult.vue'
import AdvancedInputForm from './components/AdvancedInputForm.vue'
import AdvancedRecipeResult from './components/AdvancedRecipeResult.vue'

// Importar Composables
import { usePizzaMath } from './composables/usePizzaMath.js'
import { useAdvancedPizzaMath } from './composables/useAdvancedPizzaMath.js'

const currentTab = ref('simple')

// Lógica Simple (reactiva)
const simple = reactive(usePizzaMath())

// Lógica Avanzada (reactiva)
const adv = reactive(useAdvancedPizzaMath())
</script>