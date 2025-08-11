import { CheckCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    features: [
      '1 User',
      '1 Project',
      '1GB Storage',
      'Community Support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Team',
    price: '$20',
    priceSuffix: '/ user / month',
    features: [
      'Unlimited Users',
      'Unlimited Projects',
      '100GB Storage',
      'Notebooks & Dashboards',
      'Shared Channels',
      'Email Support',
    ],
    cta: 'Upgrade to Team',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'All features in Team',
      'Unlimited Storage',
      'Data Pipelines & Jobs',
      'AI Models Section',
      'Single Sign-On (SSO)',
      'Dedicated Support',
    ],
    cta: 'Contact Sales',
  },
];

export const PricingPage = () => {
  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Find the right plan for your team</h1>
        <p className="text-lg text-gray-400 text-center mb-12">
          Start for free, then upgrade to a paid plan to unlock more features.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`border rounded-lg p-6 flex flex-col ${
                tier.highlighted ? 'border-purple-500' : 'border-gray-700'
              }`}
            >
              <h2 className="text-2xl font-semibold">{tier.name}</h2>
              <p className="mt-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.priceSuffix && <span className="text-gray-400">{tier.priceSuffix}</span>}
              </p>
              <button
                className={`w-full mt-6 py-2 rounded-md font-semibold ${
                  tier.highlighted
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {tier.cta}
              </button>
              <ul className="mt-8 space-y-4 text-gray-300 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
