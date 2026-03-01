<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-gray-800 border-b pb-2">Tu Receta</h2>

    <div class="mb-6">
      <h3 class="text-md font-semibold text-gray-700 mb-2">Totales de la Masa</h3>
      <ul class="space-y-2 text-gray-600 bg-orange-50 p-4 rounded-xl border border-orange-100">
        <li class="flex justify-between items-center">
          <span>Peso Total:</span> 
          <span class="font-bold text-gray-800">{{ formatWeight(totalWeight) }} g</span>
        </li>
        <li class="flex justify-between items-center text-sm">
          <span>Harina Total:</span> 
          <span class="font-medium">{{ formatWeight(totalFlour) }} g</span>
        </li>
        <li class="flex justify-between items-center text-sm">
          <span>Agua Total:</span> 
          <span class="font-medium">{{ formatWeight(totalWater) }} g</span>
        </li>
        <li class="flex justify-between items-center text-sm">
          <span>Sal:</span> 
          <span class="font-medium">{{ formatWeight(totalSalt) }} g</span>
        </li>
      </ul>
      <div v-if="calcMode === 'total_flour'" class="mt-3 text-sm text-orange-800 bg-orange-100 p-3 rounded-lg border border-orange-200 flex items-start">
        <span class="mr-2">💡</span>
        <p>
          Esta masa te rendirá para aproximadamente <strong>{{ formatWeight(estimatedPizzas) }} pizzas</strong> de {{ weightPerPizza }}g cada una.
        </p>
      </div>
      
    </div>

<div v-if="preferment" class="mb-6">
      <h3 class="text-md font-semibold text-blue-700 mb-1">Paso 1: {{ preferment.name }}</h3>
      <p class="text-xs text-gray-500 mb-3">Mezclar y dejar fermentar según tu temperatura.</p>
      
      <ul class="space-y-2 text-gray-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <li class="flex justify-between items-center">
          <span>Harina:</span> 
          <span class="font-medium">{{ formatWeight(preferment.flour) }} g</span>
        </li>
        <li class="flex justify-between items-center">
          <span>Agua:</span> 
          <span class="font-medium">{{ formatWeight(preferment.water) }} g</span>
        </li>
        
        <li v-if="preferment.yeast > 0" class="flex justify-between items-center">
          <span>Levadura Seca:</span> 
          <span class="font-medium">{{ formatWeight(preferment.yeast) }} g</span>
        </li>
        
        <li class="flex justify-between items-center font-bold border-t border-blue-200 pt-2 mt-2 text-blue-800">
          <span>Total a obtener:</span> 
          <span>{{ formatWeight(preferment.flour + preferment.water + preferment.yeast) }} g</span>
        </li>
      </ul>
    </div>

    <div>
      <h3 class="text-md font-semibold text-green-700 mb-1">
        {{ preferment ? 'Paso 2: Masa Final' : 'Mezcla Directa' }}
      </h3>
      <p v-if="preferment" class="text-xs text-gray-500 mb-3">
        Mezclar estos ingredientes y añadir todo el {{ preferment.name }} previo.
      </p>
      
      <ul class="space-y-2 text-gray-600 bg-green-50 p-4 rounded-xl border border-green-100">
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
        
        <li v-if="finalDough.yeast > 0" class="flex justify-between items-center">
          <span>Levadura ({{ finalDough.yeastType }}):</span> 
          <span class="font-medium">{{ formatWeight(finalDough.yeast) }} g</span>
        </li>
        
        <li v-if="preferment" class="flex justify-between items-center text-blue-700 font-bold pt-3 border-t border-green-200 mt-2 bg-blue-50/50 p-2 rounded-lg -mx-2">
          <span>+ Agregar {{ preferment.name }}:</span> 
          <span>{{ formatWeight(preferment.flour + preferment.water + preferment.yeast) }} g</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
// Definimos las propiedades que este componente espera recibir de App.vue
const props = defineProps({
  calcMode: String,
  estimatedPizzas: Number,
  weightPerPizza: Number,
  totalWeight: Number,
  totalFlour: Number,
  totalWater: Number,
  totalSalt: Number,
  preferment: Object,
  finalDough: Object
})

// Función de utilidad para redondear a 1 decimal (ej. 2.5) y evitar números largos
const formatWeight = (value) => {
  if (!value) return 0
  return Math.round(value * 100) / 100
}
</script>