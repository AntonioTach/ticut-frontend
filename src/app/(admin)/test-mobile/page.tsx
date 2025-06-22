export default function TestMobilePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página de Prueba Móvil</h1>
      <p className="text-gray-600 mb-4">
        Esta es una página de prueba para verificar que el sidebar móvil funcione correctamente.
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Instrucciones de Prueba:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>En dispositivos móviles, deberías ver un header fijo en la parte superior</li>
          <li>El botón hamburguesa debería abrir el sidebar</li>
          <li>El sidebar debería deslizarse desde la izquierda</li>
          <li>Al tocar fuera del sidebar, debería cerrarse</li>
          <li>En desktop, el sidebar debería estar siempre visible</li>
        </ul>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Estado del Sidebar:</h3>
        <p className="text-blue-700 text-sm">
          Si puedes ver este contenido, significa que el layout está funcionando correctamente.
          Prueba el botón hamburguesa en la parte superior izquierda en dispositivos móviles.
        </p>
      </div>
    </div>
  );
} 