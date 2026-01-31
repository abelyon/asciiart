import { Layout } from '../components/Layout';
import { Documentation } from '../components/Documentation';
import { Updates } from '../components/Updates';

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
        <div className="mb-4 mt-5 sm:mb-6">
          <h1 className="text-green-400 text-base sm:text-lg md:text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            [DOCUMENTATION]
          </h1>
        </div>
        <Documentation />
      </div>
    </Layout>
  );
};
