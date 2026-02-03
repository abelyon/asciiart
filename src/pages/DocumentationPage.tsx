import { Layout } from '../components/Layout';
import { Documentation } from '../components/Documentation';
import { Updates } from '../components/Updates';
import logo from '../assets/logo.svg';

export const DocumentationPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-green-400 text-base sm:text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            [UPDATES]
          </h1>
        </div>
        <Updates />
        <div className="mb-4 mt-4 sm:mb-6">
          <h1 className="text-green-400 text-base sm:text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            [DOCUMENTATION]
          </h1>
        </div>
        <Documentation />
        <div className="pt-6">
          <div className="flex items-center justify-center">
            <a
              href="https://github.com/abelyon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              <img
                src={logo}
                alt="Logo"
                className="mt-1 w-6 h-6 sm:w-6 sm:h-6 opacity-75 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};
