<!-- src/components/RecipeResult.vue -->
<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-gray-800 border-b pb-2">Tu Receta</h2>

    <!-- Totales Generales -->
    <div class="mb-6">
      <h3 class="text-md font-semibold text-gray-700 mb-2">Totales de la Masa</h3>
      <ul class="space-y-1 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <li class="flex justify-between items-center">
          <span>Harina Total:</span>
          <span class="font-bold">{{ formatWeight(totalFlour) }} g</span>
        </li>
        <li class="flex justify-between items-center">
          <span>Agua Total:</span>
          <span class="font-bold">{{ formatWeight(totalWater) }} g</span>
        </li>
        <li class="flex justify-between items-center">
          <span>Sal:</span>
          <span class="font-bold">{{ formatWeight(totalSalt) }} g</span>
        </li>
        <li class="flex justify-between items-center">
          <span>Aceite:</span>
          <span class="font-bold">{{ formatWeight(totalOil) }} g</span>
        </li>
        <li class="flex justify-between items-center pt-2 border-t border-gray-200 mt-2 font-bold text-gray-800 text-base">
          <span>Peso Total:</span>
          <span>{{ formatWeight(totalWeight) }} g</span>
        </li>
      </ul>
      
      <div
        v-if="calcMode === 'total_flour'"
        class="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-start"
      >
        <span class="mr-2">💡</span>
        <p>
          Rinde aprox. <strong>{{ formatWeight(estimatedPizzas) }} pizzas</strong> de {{ weightPerPizza }}g.
        </p>
      </div>
    </div>

    <!-- Prefermento (Si existe) -->
    <div v-if="preferment" class="mb-6">
      <h3 class="text-md font-semibold text-blue-700 mb-2">1. Prefermento: {{ preferment.name }}</h3>
      
      <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p class="text-xs text-blue-600 mb-3 italic">
          💡 {{ preferment.instructions }}
        </p>

        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          <div class="flex justify-between">
            <span>Harina:</span>
            <span class="font-medium">{{ formatWeight(preferment.flour) }} g</span>
          </div>
          <div class="flex justify-between">
            <span>Agua:</span>
            <span class="font-medium">{{ formatWeight(preferment.water) }} g</span>
          </div>
          <div v-if="preferment.yeast > 0" class="flex justify-between col-span-2 sm:col-span-1">
            <span>Levadura:</span>
            <span class="font-medium">{{ formatWeight(preferment.yeast) }} g</span>
          </div>
        </div>

        <div class="mt-3 pt-2 border-t border-blue-200 flex justify-between items-center text-blue-800 font-bold text-sm">
          <span>Total a preparar:</span>
          <span>{{ formatWeight(preferment.flour + preferment.water + preferment.yeast) }} g</span>
        </div>
      </div>
    </div>

    <!-- Masa Final -->
    <div>
      <h3 class="text-md font-semibold text-green-700 mb-2">
        {{ preferment ? '2. Masa Final' : 'Mezcla Directa' }}
      </h3>

      <div class="bg-green-50 p-4 rounded-xl border border-green-100">
        <p v-if="finalDough.instructions" class="text-xs text-green-700 mb-3 italic">
          💡 {{ finalDough.instructions }}
        </p>

        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex justify-between items-center">
            <span>Harina:</span>
            <span class="font-medium">{{ formatWeight(finalDough.flour) }} g</span>
          </li>
          <li class="flex justify-between items-center">
            <span>Agua:</span>
            <span class="font-medium">{{ formatWeight(finalDough.water) }} g</span>
          </li>
          <li class="flex justify-between items-center">
            <span>Sal:</span>
            <span class="font-medium">{{ formatWeight(finalDough.salt) }} g</span>
          </li>
          <li class="flex justify-between items-center">
            <span>Aceite:</span>
            <span class="font-medium">{{ formatWeight(finalDough.oil) }} g</span>
          </li>

          <li v-if="finalDough.yeast > 0" class="flex justify-between items-center">
            <span>Levadura ({{ finalDough.yeastType }}):</span>
            <span class="font-medium">{{ formatWeight(finalDough.yeast) }} g</span>
          </li>

          <li
            v-if="preferment"
            class="flex justify-between items-center text-blue-700 font-bold pt-2 border-t border-green-200 mt-2"
          >
            <span>+ Agregar {{ preferment.name }}:</span>
            <span>{{ formatWeight(preferment.flour + preferment.water + preferment.yeast) }} g</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  calcMode: String,
  estimatedPizzas: Number,
  weightPerPizza: Number,
  totalWeight: Number,
  totalFlour: Number,
  totalWater: Number,
  totalSalt: Number,
  totalOil: Number,
  preferment: Object,
  finalDough: Object
})

const formatWeight = (value) => {
  if (!value) return 0
  return Math.round(value * 100) / 100
}
</script>