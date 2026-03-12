// src/composables/usePizzaMath.js
import { ref, computed } from 'vue'

export function usePizzaMath() {
  // 1. ESTADOS REACTIVOS (Estos serán los inputs del usuario)
  const calcMode = ref('target_weight') // 'target_weight' (por pizzas) o 'total_flour' (por harina)
  const availableFlour = ref(1000) // Harina en gramos si usamos el segundo modo
  const pizzas = ref(4)
  const weightPerPizza = ref(270)
  const hydration = ref(70)
  const salt = ref(2.5)
  const fermentType = ref('Levadura Seca') // Opciones: 'Levadura Seca', 'Levadura Fresca', 'Poolish', 'Biga'.

  const OIL_PERCENTAGE = 0.02 // 2% de aceite sobre la harina, se puede ajustar o hacer dinámico si se desea


  // 2. CÁLCULOS BASE DINÁMICOS
  // Si el modo es 'total_flour', la harina total es directamente lo que ingresas.
  const totalFlour = computed(() => {
    if (calcMode.value === 'total_flour') return availableFlour.value
    
    const totalPercentage = 1 + (hydration.value / 100) + (salt.value / 100)
    return (pizzas.value * weightPerPizza.value) / totalPercentage
  })

  // Si el modo es 'total_flour', el peso total se calcula sumando los ingredientes.
  const totalWeight = computed(() => {
    if (calcMode.value === 'total_flour') {
      const totalPercentage = 1 + (hydration.value / 100) + (salt.value / 100)
      return totalFlour.value * totalPercentage
    }
    return pizzas.value * weightPerPizza.value
  })

  // Calcular cuántas pizzas salen según el peso total y el peso por pizza
  const estimatedPizzas = computed(() => {
    return totalWeight.value / weightPerPizza.value
  })

  const totalWater = computed(() => totalFlour.value * (hydration.value / 100))
  const totalSalt = computed(() => totalFlour.value * (salt.value / 100))
  const totalOil = computed(() => totalFlour.value * OIL_PERCENTAGE)

  // 3. CÁLCULOS DE PREFERMENTO
  const preferment = computed(() => {
    if (fermentType.value === 'Poolish') {
      const flour = totalFlour.value * 0.20
      return { name: 'Poolish', flour: flour, water: flour * 1.00, yeast: flour * 0.001, instructions: "Mezcla harina, agua y levadura hasta integrar. Tapa y fermenta 12-16h a temperatura ambiente. Estará listo cuando esté burbujeante y empiece a colapsar." }
    }
    if (fermentType.value === 'Biga') {
      const flour = totalFlour.value * 0.20
      return { name: 'Biga', flour: flour, water: flour * 0.45, yeast: flour * 0.001, instructions: "Mezcla brevemente sin amasar del todo (debe quedar seca y grumosa). Tapa y fermenta 16-24h a 16-18°C." 
 }
    }
    if (fermentType.value === 'Masa Madre') {
      // Usamos el 20% del peso de la harina como cantidad total de masa madre a agregar
      const sourdoughTotalWeight = totalFlour.value * 0.20
      // Como es 100% hidratación, mitad es agua y mitad es harina
      const halfWeight = sourdoughTotalWeight / 2
      return { name: 'Masa Madre', flour: halfWeight, water: halfWeight, yeast: 0, instructions: "Usa masa madre activa (100% hidratación) en su pico de actividad. Si tienes tu propia masa madre, pesa exactamente la cantidad 'Total a obtener' indicada abajo."
 } // No lleva levadura extra
    }
    return null
  })

  // 4. CÁLCULOS DE LA MASA FINAL
  const finalDough = computed(() => {
    // Si hay prefermento, restamos sus cantidades. Si no, restamos 0.
    const prefFlour = preferment.value ? preferment.value.flour : 0
    const prefWater = preferment.value ? preferment.value.water : 0
    
    let yeast = 0
    let currentYeastType = fermentType.value

    // Calculamos la levadura para la masa directa (si no hay prefermento)
    if (fermentType.value === 'Levadura Seca') {
      yeast = totalFlour.value * 0.01 // 1%
    } else if (fermentType.value === 'Levadura Fresca') {
      yeast = totalFlour.value * 0.03 // 3%
    } else if (preferment.value) {
       yeast = 0 
       currentYeastType = 'Ya incluida en el prefermento'
    }

    return {
      flour: totalFlour.value - prefFlour,
      water: totalWater.value - prefWater,
      salt: totalSalt.value,
      oil: totalOil.value,
      yeast: yeast,
      yeastType: currentYeastType
    }
  })

  // 5. EXPORTAR PARA USAR EN LOS COMPONENTES
  return {
    pizzas,
    weightPerPizza,
    hydration,
    salt,
    fermentType,
    calcMode,
    availableFlour,
    totalWeight,
    totalFlour,
    totalWater,
    totalSalt,
    totalOil,
    preferment,
    finalDough,
    estimatedPizzas
  }
}