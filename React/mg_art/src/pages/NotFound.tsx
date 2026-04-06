import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center animate-in">
      <h1 className="text-6xl font-bold text-[--color-primary] mb-4">404</h1>
      
      <h2 className="text-4xl font-bold text-gray-700 mb-2">Página no encontrada</h2>
      
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>

      <div className="text-6xl mb-8">🎨</div>

      <Link
        to="/"
        className="inline-block bg-[--color-accent] text-[--color-primary] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-accent]"
      >
        ← Volver al Catálogo
      </Link>

      <div className="mt-12 pt-8 border-t border-gray-200 w-full max-w-md">
        <p className="text-gray-600 text-sm">
          Si crees que esto es un error, por favor{' '}
          <a 
            href="mailto:support@mg-art.com"
            className="text-[--color-accent] hover:underline"
          >
            contáctanos
          </a>
        </p>
      </div>
    </div>
  );
}
