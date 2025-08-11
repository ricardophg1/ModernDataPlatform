import { Star } from 'lucide-react';

interface UpgradeModalProps {
  onNavigate: (section: string) => void;
}

export const UpgradeModal = ({ onNavigate }: UpgradeModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white text-center">
      <div className="bg-gray-800 p-12 rounded-lg shadow-lg">
        <Star className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Upgrade to Unlock This Feature</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          This feature is only available on our Team and Enterprise plans.
          Upgrade your plan to access advanced capabilities like Data Pipelines, Jobs, and AI Models.
        </p>
        <button
          onClick={() => onNavigate('pricing')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          View Plans & Upgrade
        </button>
      </div>
    </div>
  );
};
