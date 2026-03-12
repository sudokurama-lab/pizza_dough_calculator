<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-gray-800 border-b pb-2">Parámetros de la Masa</h2>

    <div class="space-y-4">
      <div class="bg-orange-50 p-1 rounded-lg flex space-x-1 mb-6">
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

      <template v-if="calcMode === 'target_weight'">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Número de pizzas</label>
          <input
            type="number"
            v-model="pizzas"
            min="1"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
          />
        </div>
      </template>

      <template v-else>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Harina disponible (gramos)</label
          >
          <input
            type="number"
            v-model="availableFlour"
            min="100"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
          />
        </div>
      </template>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Peso por pizza (gramos)</label>
        <input
          type="number"
          v-model="weightPerPizza"
          min="100"
          step="10"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hidratación (%)</label>
        <input
          type="number"
          v-model="hydration"
          min="50"
          max="100"
          step="1"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Sal (%)</label>
        <input
          type="number"
          v-model="salt"
          min="1"
          max="5"
          step="0.1"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Aceite de Oliva (gramos)</label>
        <input
          :value="totalOil ? totalOil.toFixed(1) : 0"
          readonly
          disabled
          class="w-full rounded-lg border-gray-200 shadow-sm p-2.5 border bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Fermento</label>
        <select
          v-model="fermentType"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2.5 border bg-gray-50"
        >
          <option value="Levadura Seca">Levadura Seca</option>
          <option value="Levadura Fresca">Levadura Fresca</option>
          <option value="Masa Madre">Masa Madre</option>
          <option value="Poolish">Poolish</option>
          <option value="Biga">Biga</option>
        </select>
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
const totalOil = defineModel('totalOil')
</script>
