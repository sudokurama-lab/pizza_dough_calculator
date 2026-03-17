/* src/composables/useAdvancedPizzaMath.js */
import { ref, computed } from 'vue'

export function useAdvancedPizzaMath() {
  // 1. Estados base
  const calcMode = ref('target_weight')
  const availableFlour = ref(1000)
  const pizzas = ref(4)
  const weightPerPizza = ref(280)
  const hydration = ref(65)
  const salt = ref(2.5) // %
  const oil = ref(2) // %
  const yeast = ref(0.1) // % Levadura en masa final (refuerzo)

  // 2. Estado para múltiples prefermentos
  // Cada preferento: { id: number, type: 'Poolish'|'Biga'|'Masa Madre', percentage: number }
  const preferments = ref([
    { id: 1, type: 'Poolish', percentage: 20 }
  ])

  // Helpers para prefermentos
  const addPreferment = () => {
    preferments.value.push({
      id: Date.now(),
      type: 'Poolish',
      percentage: 10
    })
  }

  const removePreferment = (index) => {
    preferments.value.splice(index, 1)
  }

  // 3. Cálculos Totales (Igual que el simple)
  const totalFlour = computed(() => {
    if (calcMode.value === 'total_flour') return availableFlour.value
    const totalPercentage = 1 + hydration.value / 100 + salt.value / 100 + oil.value / 100
    return (pizzas.value * weightPerPizza.value) / totalPercentage
  })

  const totalWeight = computed(() => {
    if (calcMode.value === 'total_flour') {
      const totalPercentage = 1 + hydration.value / 100 + salt.value / 100 + oil.value / 100
      return totalFlour.value * totalPercentage
    }
    return pizzas.value * weightPerPizza.value
  })

  const estimatedPizzas = computed(() => totalWeight.value / weightPerPizza.value)
  const totalWater = computed(() => totalFlour.value * (hydration.value / 100))
  const totalSalt = computed(() => totalFlour.value * (salt.value / 100))
  const totalOil = computed(() => totalFlour.value * (oil.value / 100))

  // 4. Desglose de Prefermentos
  const prefermentsList = computed(() => {
    return preferments.value.map(p => {
      const pFlour = totalFlour.value * (p.percentage / 100)
      let pWater = 0
      let pYeast = 0
      let instructions = ''

      if (p.type === 'Poolish') {
        pWater = pFlour * 1.0 // 100% hidratación
        pYeast = pFlour * 0.001 // 0.1% levadura
        instructions = '100% Hidratación. Fermentar 12-16h TA.'
      } else if (p.type === 'Biga') {
        pWater = pFlour * 0.45 // 45% hidratación
        pYeast = pFlour * 0.01 // 1% levadura fresca (o 0.3% seca -> ajustamos a seco estandard 0.5% aprox o dejamos 1% si es fresca)
        // Usaremos estándar seco: 0.3%
        pYeast = pFlour * 0.003 
        instructions = '45% Hidratación. Fermentar 16-24h a 16-18°C.'
      } else if (p.type === 'Masa Madre') {
        pWater = pFlour // 100% hidratación
        pYeast = 0 // La levadura es la propia masa madre
        instructions = 'Masa Madre activa al 100% hidratación.'
      }

      return {
        ...p,
        flour: pFlour,
        water: pWater,
        yeast: pYeast, // Levadura seca necesaria para este prefermento
        instructions
      }
    })
  })

  // 5. Masa Final (Resta lo aportado por prefermentos)
  const finalDough = computed(() => {
    const totalPrefFlour = prefermentsList.value.reduce((acc, p) => acc + p.flour, 0)
    const totalPrefWater = prefermentsList.value.reduce((acc, p) => acc + p.water, 0)
    
    // El agua restante puede ser negativa si la hidratación total es baja y usas mucho prefermento líquido
    const remainingWater = totalWater.value - totalPrefWater

    return {
      flour: totalFlour.value - totalPrefFlour,
      water: remainingWater,
      salt: totalSalt.value,
      oil: totalOil.value,
      yeast: totalFlour.value * (yeast.value / 100), // Levadura de refuerzo
    }
  })

  return {
    calcMode,
    availableFlour,
    pizzas,
    weightPerPizza,
    hydration,
    salt,
    oil,
    yeast,
    preferments,
    addPreferment,
    removePreferment,
    
    totalWeight,
    totalFlour,
    totalWater,
    totalSalt,
    totalOil,
    estimatedPizzas,
    
    prefermentsList,
    finalDough
  }
}