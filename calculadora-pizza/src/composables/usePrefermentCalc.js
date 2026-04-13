import { ref, computed } from 'vue'

export function usePrefermentCalc() {
  const type = ref('Poolish')
  const totalGrams = ref(500)

  const result = computed(() => {
    if (!totalGrams.value || totalGrams.value <= 0) return null

    let flourRatio, waterRatio, yeastRatio, instructions

    if (type.value === 'Poolish') {
      flourRatio = 0.5
      waterRatio = 0.5
      yeastRatio = 0.001
      instructions = '100% Hidratación. Fermentar 12-16h a temperatura ambiente.'
    } else if (type.value === 'Biga') {
      flourRatio = 1 / 1.45
      waterRatio = 0.45 / 1.45
      yeastRatio = 0.003
      instructions = '45% Hidratación. Fermentar 16-24h a 16-18°C.'
    } else if (type.value === 'Masa Madre') {
      flourRatio = 0.5
      waterRatio = 0.5
      yeastRatio = 0
      instructions = 'Masa Madre al 100% hidratación. Usa tu MM activa.'
    }

    const flour = totalGrams.value * flourRatio
    return {
      flour,
      water: totalGrams.value * waterRatio,
      yeast: yeastRatio > 0 ? flour * yeastRatio : 0,
      total: totalGrams.value,
      instructions
    }
  })

  return { type, totalGrams, result }
}
