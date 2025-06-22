export default function TestMobilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Página de Prueba Móvil</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Esta es una página de prueba para verificar que el sidebar móvil funcione correctamente.
      </p>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Instrucciones de Prueba:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>En dispositivos móviles, deberías ver un header fijo en la parte superior</li>
          <li>El botón hamburguesa debería abrir el sidebar</li>
          <li>El sidebar debería deslizarse desde la izquierda</li>
          <li>Al tocar fuera del sidebar, debería cerrarse</li>
          <li>En desktop, el sidebar debería estar siempre visible</li>
          <li>Prueba el botón de cambio de tema en el header móvil o en el sidebar</li>
        </ul>
      </div>
      
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Estado del Sidebar:</h3>
        <p className="text-blue-700 dark:text-blue-200 text-sm">
          Si puedes ver este contenido, significa que el layout está funcionando correctamente.
          Prueba el botón hamburguesa en la parte superior izquierda en dispositivos móviles.
          También puedes cambiar entre tema claro y oscuro usando los botones de tema.
        </p>
      </div>
    </div>
  );
} 