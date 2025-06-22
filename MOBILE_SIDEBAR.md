# Sidebar Móvil - Barbería Hunters

## Características Implementadas

### 🎯 Funcionalidades Principales

1. **Sidebar Responsive**
   - Se oculta automáticamente en pantallas pequeñas (< 1024px)
   - Se muestra como sidebar fijo en pantallas grandes (≥ 1024px)

2. **Header Móvil**
   - Header fijo en la parte superior en dispositivos móviles
   - Muestra el título de la página actual
   - Botón hamburguesa para abrir/cerrar el sidebar

3. **Navegación Táctil**
   - Elementos del menú optimizados para pantallas táctiles
   - Espaciado mejorado para facilitar la interacción
   - Feedback visual mejorado

4. **Gestión de Estado**
   - Hook personalizado `useSidebar` para manejar el estado
   - Cierre automático al cambiar de página
   - Cierre automático al redimensionar la ventana

### 🔧 Componentes Creados

#### `useSidebar` Hook
```typescript
const { isOpen, toggleSidebar, closeSidebar, openSidebar } = useSidebar()
```

**Funcionalidades:**
- Estado del sidebar (abierto/cerrado)
- Cierre automático en desktop
- Detección de clics fuera del sidebar
- Gestión de eventos de redimensionamiento

#### `MobileHeader` Component
```typescript
<MobileHeader onToggleMenu={toggleSidebar} />
```

**Características:**
- Header fijo en móvil
- Título dinámico según la página actual
- Botón hamburguesa integrado
- Diseño limpio y moderno

#### `Sidebar` Component (Actualizado)
**Mejoras móviles:**
- Overlay para cerrar al tocar fuera
- Animaciones suaves de entrada/salida
- Botón de cierre en la esquina superior derecha
- Cierre automático al navegar

### 📱 Breakpoints Utilizados

- **Móvil/Tablet:** `< 1024px` (lg)
- **Desktop:** `≥ 1024px` (lg)

### 🎨 Clases CSS Principales

```css
/* Sidebar móvil */
fixed lg:static inset-y-0 left-0 z-40 w-80
transform transition-transform duration-300 ease-in-out
translate-x-0 (abierto) / -translate-x-full (cerrado)

/* Header móvil */
lg:hidden fixed top-0 left-0 right-0 z-30

/* Overlay */
lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40
```

### 🚀 Uso

1. **En el Layout:**
```tsx
import { Sidebar, MobileHeader } from "@/components/admin";
import { useSidebar } from "@/hooks/useSidebar";

const { toggleSidebar } = useSidebar();

return (
  <div>
    <MobileHeader onToggleMenu={toggleSidebar} />
    <Sidebar />
    {/* Contenido */}
  </div>
);
```

2. **Navegación automática:**
- El sidebar se cierra automáticamente al hacer clic en un elemento del menú
- Se cierra al tocar fuera del sidebar
- Se cierra al redimensionar la ventana a desktop

### 🔄 Flujo de Interacción

1. **En Móvil:**
   - Usuario toca el botón hamburguesa → Sidebar se abre
   - Usuario navega → Sidebar se cierra automáticamente
   - Usuario toca fuera → Sidebar se cierra

2. **En Desktop:**
   - Sidebar siempre visible
   - No hay botón hamburguesa
   - Layout tradicional

### 🎯 Beneficios

- ✅ **UX Mejorada:** Navegación intuitiva en móvil
- ✅ **Responsive:** Funciona perfectamente en todos los dispositivos
- ✅ **Accesible:** ARIA labels y navegación por teclado
- ✅ **Performance:** Animaciones optimizadas
- ✅ **Mantenible:** Código modular y reutilizable 