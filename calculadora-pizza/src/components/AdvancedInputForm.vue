<!-- src/components/AdvancedInputForm.vue -->
<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 class="text-xl font-bold mb-5 text-purple-800 border-b pb-2">Configuración Avanzada</h2>

    <div class="space-y-6">
      <!-- Mismo selector de modo -->
      <div class="bg-purple-50 p-1 rounded-lg flex space-x-1">
        <button
          @click="calcMode = 'target_weight'"
          :class="calcMode === 'target_weight' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-700'"
          class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
        >
          Por N° Pizzas
        </button>
        <button
          @click="calcMode = 'total_flour'"
          :class="calcMode === 'total_flour' ? 'bg-white shadow-sm text-purple-700' : 'text-gray-500 hover:text-gray-700'"
          class="flex-1 py-2 text-sm font-medium rounded-md transition-all"
        >
          Por Harina Total
        </button>
      </div>

      <!-- Inputs Básicos -->
      <div class="grid grid-cols-2 gap-4">
        <div v-if="calcMode === 'target_weight'">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Pizzas</label>
          <input type="number" v-model="pizzas" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
        <div v-if="calcMode === 'target_weight'">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Peso (g)</label>
          <input type="number" v-model="weightPerPizza" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
        <div v-if="calcMode === 'total_flour'" class="col-span-2">
          <label class="block text-xs font-semibold text-gray-500 uppercase">Harina Total (g)</label>
          <input type="number" v-model="availableFlour" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
      </div>

      <!-- Porcentajes Globales -->
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase">Hidratación %</label>
          <input type="number" step="0.5" v-model="hydration" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase">Sal %</label>
          <input type="number" step="0.1" v-model="salt" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-500 uppercase">Aceite %</label>
          <input type="number" step="0.5" v-model="oil" class="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
        </div>
      </div>

      <!-- Sección de Prefermentos -->
      <div class="border-t pt-4">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex justify-between items-center">
          Prefermentos y Fermentos
          <button @click="$emit('add-preferment')" class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200">+ Añadir</button>
        </h3>
        
        <div v-for="(pref, index) in preferments" :key="pref.id" class="flex gap-2 mb-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
          <select v-model="pref.type" class="text-sm border-gray-300 rounded-md py-1">
            <option value="Poolish">Poolish</option>
            <option value="Biga">Biga</option>
            <option value="Masa Madre">Masa Madre</option>
          </select>
          <div class="flex items-center flex-1">
            <input type="number" v-model="pref.percentage" class="w-16 text-sm border-gray-300 rounded-md py-1 mr-1" />
            <span class="text-xs text-gray-500">%</span>
          </div>
          <button @click="$emit('remove-preferment', index)" class="text-red-400 hover:text-red-600">
             &times;
          </button>
        </div>
        
        <div v-if="preferments.length === 0" class="text-xs text-center text-gray-400 italic py-2">
          Sin prefermentos (Método directo)
        </div>
      </div>

      <!-- Refuerzo Levadura Final -->
      <div class="border-t pt-4">
        <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Levadura en Masa Final (%)</label>
        <div class="flex items-center gap-2">
           <input type="number" step="0.01" v-model="yeast" class="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 bg-gray-50 p-2 border" />
           <p class="text-xs text-gray-400">Refuerzo para la masa final.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  preferments: Array
})

// Usamos defineModel para v-model en Vue 3.4+, o props/emits normales si es anterior.
// Aquí asumimos la estructura de props/emits del componente padre manual para compatibilidad general.
const calcMode = defineModel('calcMode')
const availableFlour = defineModel('availableFlour')
const pizzas = defineModel('pizzas')
const weightPerPizza = defineModel('weightPerPizza')
const hydration = defineModel('hydration')
const salt = defineModel('salt')
const oil = defineModel('oil')
const yeast = defineModel('yeast')
</script>