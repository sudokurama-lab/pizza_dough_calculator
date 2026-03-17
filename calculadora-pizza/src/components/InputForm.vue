<!-- src/components/InputForm.vue -->
<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-orange-800 border-b pb-2">Parámetros de la Masa</h2>

    <div class="space-y-6">
      <!-- Selector de Modo -->
      <div class="bg-orange-50 p-1 rounded-lg flex space-x-1">
        <button
          @click="calcMode = 'target_weight'"
          :class="
            calcMode === 'target_weight'
              ? 'bg-white shadow-sm text-orange-700'
              : 'text-gray-500 hover:text-gray-700'
          "
          class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
        >
          Por N° Pizzas
        </button>
        <button
          @click="calcMode = 'total_flour'"
          :class="
            calcMode === 'total_flour'
              ? 'bg-white shadow-sm text-orange-700'
              : 'text-gray-500 hover:text-gray-700'
          "
          class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
        >
          Por Harina Total
        </button>
      </div>

      <!-- Inputs Principales -->
      <div class="grid grid-cols-2 gap-4">
        <div v-if="calcMode === 'target_weight'">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Pizzas</label>
          <input
            type="number"
            v-model="pizzas"
            min="1"
            class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border"
          />
        </div>
        <div v-if="calcMode === 'target_weight'">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Peso (g)</label>
          <input
            type="number"
            v-model="weightPerPizza"
            min="100"
            step="10"
            class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border"
          />
        </div>
        <div v-if="calcMode === 'total_flour'" class="col-span-2">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Harina Total (g)</label>
          <input
            type="number"
            v-model="availableFlour"
            min="100"
            class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border"
          />
        </div>
      </div>

      <!-- Porcentajes -->
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase">Hidratación %</label>
          <input
            type="number"
            v-model="hydration"
            min="50"
            max="100"
            step="1"
            class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase">Sal %</label>
          <input
            type="number"
            v-model="salt"
            min="1"
            max="5"
            step="0.1"
            class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border"
          />
        </div>
      </div>

      <!-- Fermento -->
      <div class="border-t pt-4">
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-2">Tipo de Fermento</label>
        <select
          v-model="fermentType"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-gray-50 p-2 border mb-3"
        >
          <option value="Levadura Seca">Levadura Seca</option>
          <option value="Levadura Fresca">Levadura Fresca</option>
          <option value="Masa Madre">Masa Madre</option>
          <option value="Poolish">Poolish</option>
          <option value="Biga">Biga</option>
        </select>

        <!-- Preferment Percentage Input -->
        <div v-if="['Masa Madre', 'Poolish', 'Biga'].includes(fermentType)" class="bg-orange-50 p-3 rounded-lg border border-orange-100 animate-fade-in">
           <label class="block text-xs font-semibold text-orange-800 uppercase mb-1">
             Porcentaje de {{ fermentType }}
           </label>
           <div class="flex items-center gap-2">
             <input 
                type="number" 
                v-model="prefermentPercentage"
                min="1"
                max="100"
                class="w-20 rounded-md border-orange-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-1.5 border text-sm"
             />
             <span class="text-sm text-orange-700">%</span>
           </div>
           <p class="text-xs text-orange-600 mt-1">
             {{ fermentType === 'Masa Madre' ? '% de prefermento sobre el total de harina' : '% de harina fermentada previamente' }}
           </p>
        </div>

      </div>
      
      <!-- Aceite (Informativo) -->
      <div class="border-t pt-2">
         <div class="flex justify-between items-center text-sm text-gray-500">
           <span>Aceite de Oliva (calc):</span>
           <span class="font-medium">{{ totalOil ? totalOil.toFixed(1) : 0 }} g</span>
         </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const calcMode = defineModel('calcMode')
const availableFlour = defineModel('availableFlour')
const pizzas = defineModel('pizzas')
const weightPerPizza = defineModel('weightPerPizza')
const hydration = defineModel('hydration')
const salt = defineModel('salt')
const fermentType = defineModel('fermentType')
const prefermentPercentage = defineModel('prefermentPercentage')
const totalOil = defineModel('totalOil')
</script>