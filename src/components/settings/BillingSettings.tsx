import React from 'react';
import { CreditCard, Package, History } from 'lucide-react';

export function BillingSettings() {
  const currentPlan = {
    name: 'Pro',
    price: '$49',
    period: 'month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations'
    ]
  };

  const billingHistory = [
    {
      date: 'Mar 1, 2024',
      amount: '$49.00',
      status: 'Paid',
      invoice: '#INV-001'
    },
    {
      date: 'Feb 1, 2024',
      amount: '$49.00',
      status: 'Paid',
      invoice: '#INV-002'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Current Plan */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="bg-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-white">{currentPlan.name}</h4>
              <p className="text-slate-400">
                {currentPlan.price}/{currentPlan.period}
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              Upgrade Plan
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CreditCard className="h-6 w-6 text-slate-400" />
            <div>
              <p className="text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-slate-400">Expires 12/24</p>
            </div>
          </div>
          <button className="text-blue-400 hover:text-blue-300 transition">
            Update
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="bg-slate-700/50 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left p-4 text-slate-400">Date</th>
                <th className="text-left p-4 text-slate-400">Amount</th>
                <th className="text-left p-4 text-slate-400">Status</th>
                <th className="text-right p-4 text-slate-400">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item, index) => (
                <tr key={index} className="border-b border-slate-600 last:border-0">
                  <td className="p-4 text-white">{item.date}</td>
                  <td className="p-4 text-white">{item.amount}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 transition">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}