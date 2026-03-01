# Contexto del Proyecto
Eres un desarrollador experto en Vue 3 (Composition API) y matemáticas de panadería. Necesito construir una calculadora de masa para pizza. El usuario definirá el tamaño y la cantidad de pizzas, y la aplicación devolverá la receta exacta.

# Especificaciones Técnicas
- Framework: Vue 3 con Composition API (script setup).
- Estilos: Tailwind CSS (o CSS puro si prefieres).
- Lenguaje: JavaScript (o TypeScript).

# Requerimientos de Interfaz (Inputs)
El componente de formulario debe tener los siguientes campos reactivos:
- Número de pizzas (número entero, por defecto 4).
- Peso por pizza en gramos (número, por defecto 250).
- Porcentaje de hidratación (número, por defecto 65).
- Porcentaje de sal (número, por defecto 2.5).
- Tipo de fermento (menú desplegable con las siguientes opciones: Levadura Seca, Levadura Fresca, Masa Madre, Poolish, Biga).

# Requerimientos de Lógica (Cálculos y Prefermentos)
Crea un composable `usePizzaMath.js` para manejar los cálculos usando porcentajes de panadero.
1. Calcula el Peso Total de la masa (Pizzas * Peso por pizza).
2. Calcula la Harina Total base. Fórmula: Harina Total = Peso Total / (1 + %Agua + %Sal). (Nota: Los porcentajes deben usarse en decimales, ej. 65% es 0.65).
3. Lógica de Prefermentos (Poolish y Biga):
   - Ambos usan por defecto un 20% de la Harina Total.
   - Poolish: 100% de hidratación (Agua del prefermento = Harina del prefermento).
   - Biga: 45% de hidratación (Agua del prefermento = Harina del prefermento * 0.45).
   - Levadura en prefermento: 0.1% del peso de la Harina del prefermento.
4. Cálculo de la Masa Final (cuando se usa prefermento):
   - Harina Final = Harina Total - Harina del Prefermento
   - Agua Final = Agua Total - Agua del Prefermento
   - La sal (100%) va en la masa final.
   - Si se usa levadura extra para la masa final, añadir 0.2% del peso de la Harina Total (ajustable en el futuro).

# Salida Esperada (Outputs en la Interfaz)
La interfaz debe mostrar los resultados divididos claramente si el usuario selecciona Poolish o Biga:
- Sección 1: "Fórmula del Prefermento" (Mostrando cantidades de Harina, Agua y Levadura para preparar el día anterior).
- Sección 2: "Masa Final" (Mostrando la Harina restante, Agua restante, toda la Sal y el Prefermento ya fermentado que se debe agregar).
- Sección 3: "Totales de la Receta" (El resumen de todo combinado).
