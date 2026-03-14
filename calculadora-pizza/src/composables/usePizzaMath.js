/* src/composables/usePizzaMath.js */
import { ref, computed } from 'vue'

export function usePizzaMath() {
  // 1. ESTADOS REACTIVOS
  const calcMode = ref('target_weight')
  const availableFlour = ref(1000)
  const pizzas = ref(4)
  const weightPerPizza = ref(270)
  const hydration = ref(70)
  const salt = ref(2.5)
  const fermentType = ref('Levadura Seca')

  const OIL_PERCENTAGE = 0.02

  // 2. CÁLCULOS BASE DINÁMICOS
  const totalFlour = computed(() => {
    if (calcMode.value === 'total_flour') return availableFlour.value
    const totalPercentage = 1 + hydration.value / 100 + salt.value / 100
    return (pizzas.value * weightPerPizza.value) / totalPercentage
  })

  const totalWeight = computed(() => {
    if (calcMode.value === 'total_flour') {
      const totalPercentage = 1 + hydration.value / 100 + salt.value / 100
      return totalFlour.value * totalPercentage
    }
    return pizzas.value * weightPerPizza.value
  })

  const estimatedPizzas = computed(() => {
    return totalWeight.value / weightPerPizza.value
  })

  const totalWater = computed(() => totalFlour.value * (hydration.value / 100))
  const totalSalt = computed(() => totalFlour.value * (salt.value / 100))
  const totalOil = computed(() => totalFlour.value * OIL_PERCENTAGE)

  // 3. CÁLCULOS DE PREFERMENTO
  const preferment = computed(() => {
    if (fermentType.value === 'Poolish') {
      const flour = totalFlour.value * 0.2
      return {
        name: 'Poolish',
        flour: flour,
        water: flour * 1.0,
        yeast: flour * 0.001,
        instructions:
          'Mezcla harina, agua y levadura hasta integrar. Tapa y fermenta 12-16h a temperatura ambiente. Estará listo cuando esté burbujeante y empiece a colapsar.'
      }
    }
    if (fermentType.value === 'Biga') {
      const flour = totalFlour.value * 0.3
      return {
        name: 'Biga',
        flour: flour,
        water: flour * 0.45,
        yeast: flour * 0.001,
        instructions:
          'Mezcla brevemente sin amasar del todo (debe quedar seca y grumosa). Tapa y fermenta 16-24h a 16-18°C.'
      }
    }
    if (fermentType.value === 'Masa Madre') {
      const sourdoughTotalWeight = totalFlour.value * 0.2
      const halfWeight = sourdoughTotalWeight / 2
      return {
        name: 'Masa Madre',
        flour: halfWeight,
        water: halfWeight,
        yeast: 0,
        instructions:
          "Usa masa madre activa (100% hidratación) en su pico de actividad. Si tienes tu propia masa madre, pesa exactamente la cantidad 'Total a obtener' indicada abajo."
      }
    }
    return null
  })

  // 4. CÁLCULOS DE LA MASA FINAL (ACTUALIZADO)
  const finalDough = computed(() => {
    const prefFlour = preferment.value ? preferment.value.flour : 0
    const prefWater = preferment.value ? preferment.value.water : 0

    let yeast = 0
    let currentYeastType = fermentType.value
    let instructions = ''

    if (fermentType.value === 'Levadura Seca') {
      yeast = totalFlour.value * 0.01 // 1%
      instructions =
        'Mezclar la harina con la levadura. Disolver la sal en el agua. Incorporar gradualmente el agua a la harina, amasando hasta integrar. Añadir el aceite al final. Reposar (20-40 min).'
    } else if (fermentType.value === 'Levadura Fresca') {
      yeast = totalFlour.value * 0.03 // 3%
      instructions =
        'Disolver la levadura en el agua. Añadir harina y sal. Amasar hasta obtener una masa homogénea. Incorporar el aceite al final. Reposar (20-40 min).'
    } else if (fermentType.value === 'Biga') {
      // Corregido: 2% sobre harina total
      yeast = totalFlour.value * 0.02
      currentYeastType = 'Levadura Seca (Refuerzo)'
      instructions =
        'Disolver la levadura seca y la biga en el agua restante hasta integrar. Incorporar harina y sal, y amasar hasta desarrollar el gluten. Finalmente, integrar el aceite de oliva y dejar reposar en bloque (20-40 min). Una vez reposada, amasar ligeramente y dejar fermentar en bloque (8-12h) a temperatura ambiente con la masa protegida. Una vez fermentada, formar las bolas de pizza y guardar en un recipiente (2-3 h) o hasta que doble el tamaño antes de estirar.'
    } else if (fermentType.value === 'Poolish') {
      yeast = 0
      currentYeastType = 'Ya incluida en el prefermento'
      instructions =
        'Disolver el Poolish en el agua restante. Incorporar la harina y la sal. Amasar hasta lograr una masa lisa. Integrar el aceite de oliva al final. Reposar en bloque (20-40 min).'
    } else if (fermentType.value === 'Masa Madre') {
      yeast = 0
      currentYeastType = 'Ya incluida en el prefermento'
      instructions =
        'Disolver la Masa Madre en el agua. Incorporar harina y sal. Amasar hasta desarrollar el gluten. Integrar el aceite. Fermentación en bloque larga según temperatura (2-4h a TA).'
    }

    return {
      flour: totalFlour.value - prefFlour,
      water: totalWater.value - prefWater,
      salt: totalSalt.value,
      oil: totalOil.value,
      yeast: yeast,
      yeastType: currentYeastType,
      instructions
    }
  })

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
