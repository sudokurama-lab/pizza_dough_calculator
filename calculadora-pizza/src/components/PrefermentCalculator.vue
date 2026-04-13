<template>
  <div class="max-w-md mx-auto space-y-6">
    <!-- Inputs -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <h2 class="text-xl font-bold text-gray-800 border-b pb-2">Calculadora de Prefermento</h2>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Prefermento</label>
        <select
          v-model="type"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
        >
          <option>Poolish</option>
          <option>Biga</option>
          <option>Masa Madre</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cantidad Total (g)</label>
        <input
          v-model.number="totalGrams"
          type="number"
          min="1"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
          placeholder="Ej: 500"
        />
      </div>
    </div>

    <!-- Result card -->
    <div v-if="result" class="bg-blue-50 p-5 rounded-2xl border border-blue-100 shadow-sm text-sm">
      <h3 class="font-bold text-blue-800 text-base mb-1">{{ type }}</h3>
      <p class="text-xs text-blue-600 italic mb-3">{{ result.instructions }}</p>
      <ul class="space-y-1 text-gray-700">
        <li class="flex justify-between">
          <span>Harina:</span><span class="font-bold">{{ fmt(result.flour) }}g</span>
        </li>
        <li class="flex justify-between">
          <span>Agua:</span><span class="font-bold">{{ fmt(result.water) }}g</span>
        </li>
        <li v-if="result.yeast > 0" class="flex justify-between">
          <span>Levadura seca:</span><span class="font-bold">{{ fmt(result.yeast, 2) }}g</span>
        </li>
        <li v-else class="text-xs text-gray-500 italic">Usa tu Masa Madre activa</li>
        <li class="flex justify-between pt-2 border-t border-blue-200 mt-1 font-bold text-blue-800">
          <span>Total:</span><span>{{ fmt(result.total) }}g</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { usePrefermentCalc } from '../composables/usePrefermentCalc.js'
const { type, totalGrams, result } = usePrefermentCalc()
const fmt = (n, decimals = 0) => Number(n || 0).toFixed(decimals)
</script>
