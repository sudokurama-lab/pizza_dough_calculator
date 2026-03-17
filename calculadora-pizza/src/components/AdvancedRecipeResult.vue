<!-- src/components/AdvancedRecipeResult.vue -->
<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-gray-800 border-b pb-2">Receta Avanzada</h2>

    <!-- Totales -->
    <div class="mb-6">
      <h3 class="text-md font-semibold text-gray-700 mb-2">Totales Generales</h3>
      <ul class="space-y-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
         <li class="flex justify-between"><span>Harina:</span> <span class="font-bold">{{ format(totalFlour) }}g</span></li>
         <li class="flex justify-between"><span>Agua:</span> <span class="font-bold">{{ format(totalWater) }}g</span></li>
         <li class="flex justify-between"><span>Sal:</span> <span class="font-bold">{{ format(totalSalt) }}g</span></li>
         <li class="flex justify-between"><span>Aceite:</span> <span class="font-bold">{{ format(totalOil) }}g</span></li>
         <li class="flex justify-between pt-2 border-t mt-1 font-bold text-gray-800">
            <span>Peso Total:</span> <span>{{ format(totalWeight) }}g</span>
         </li>
      </ul>
    </div>

    <!-- Preferentos -->
    <div v-if="prefermentsList.length > 0" class="mb-6 space-y-4">
      <h3 class="text-md font-semibold text-blue-700">1. Preferentos</h3>
      
      <div v-for="(p, idx) in prefermentsList" :key="idx" class="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm">
        <h4 class="font-bold text-blue-800 mb-1">{{ p.type }} ({{ p.percentage }}%)</h4>
        <p class="text-xs text-blue-600 mb-2 italic">{{ p.instructions }}</p>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
           <div class="flex justify-between"><span>Harina:</span> <span class="font-medium">{{ format(p.flour) }}g</span></div>
           <div class="flex justify-between"><span>Agua:</span> <span class="font-medium">{{ format(p.water) }}g</span></div>
           <div v-if="p.yeast > 0" class="flex justify-between"><span>Levadura:</span> <span class="font-medium">{{ format(p.yeast) }}g</span></div>
           <div v-if="p.name === 'Masa Madre'" class="col-span-2 text-xs text-gray-500 mt-1">Usa tu MM activa</div>
        </div>
      </div>
    </div>

    <!-- Masa Final -->
    <div>
      <h3 class="text-md font-semibold text-green-700 mb-2">
        {{ prefermentsList.length > 0 ? '2. Masa Final (Mezcla)' : 'Mezcla Directa' }}
      </h3>
      <ul class="space-y-2 text-gray-600 bg-green-50 p-4 rounded-xl border border-green-100 text-sm">
        <li class="flex justify-between"><span>Harina Restante:</span> <span class="font-bold">{{ format(finalDough.flour) }}g</span></li>
        <li class="flex justify-between">
           <span>Agua Restante:</span> 
           <span :class="{'text-red-500 font-bold': finalDough.water < 0, 'font-bold': true}">
             {{ format(finalDough.water) }}g
           </span>
        </li>
        <li class="flex justify-between"><span>Sal:</span> <span class="font-medium">{{ format(finalDough.salt) }}g</span></li>
        <li class="flex justify-between"><span>Aceite:</span> <span class="font-medium">{{ format(finalDough.oil) }}g</span></li>
        <li class="flex justify-between"><span>Levadura Refuerzo:</span> <span class="font-medium">{{ format(finalDough.yeast) }}g</span></li>
      </ul>
      <div v-if="finalDough.water < 0" class="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
         ⚠️ ¡Cuidado! Tus preferentos usan más agua de la indicada en la hidratación total. Sube la hidratación o baja los preferentos.
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  totalFlour: Number,
  totalWater: Number,
  totalSalt: Number,
  totalOil: Number,
  totalWeight: Number,
  prefermentsList: Array,
  finalDough: Object
})

const format = (n) => Math.round(n || 0)
</script>