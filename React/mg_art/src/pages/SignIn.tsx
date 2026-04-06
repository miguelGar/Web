import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { Mail, Lock } from 'lucide-react';

export function SignIn() {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      notifyError('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      // Simular login - en producción conectarías con un backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Guardar sesión en localStorage
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0],
      }));

      notifySuccess('¡Bienvenido!');
      navigate('/');
    } catch (error) {
      notifyError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  }, [formData, navigate, notifySuccess, notifyError]);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[--color-primary] mb-2">Iniciar sesión</h1>
        <p className="text-gray-600 mb-8">Accede a tu cuenta mg_art</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[--color-primary] mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[--color-accent] transition-colors"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[--color-primary] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[--color-accent] transition-colors"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[--color-accent] text-[--color-primary] font-semibold py-2 px-4 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 space-y-3 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link
              to="/signup"
              className="text-[--color-accent] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded px-1"
            >
              Crear cuenta
            </Link>
          </p>
          <p className="text-gray-600">
            <button
              type="button"
              className="text-[--color-accent] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[--color-accent] rounded px-1 bg-transparent border-0 cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
