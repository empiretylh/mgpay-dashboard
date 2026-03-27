'use client';

import { Book, HelpCircle, FileText } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    { q: 'How do I integrate MG Pay into my application?', a: 'Use our REST API with your service app API token. See the API documentation for details.' },
    { q: 'What payment methods are supported?', a: 'We support KBZ Pay, Wave Pay, and AYA Pay for Myanmar market.' },
    { q: 'How do I handle webhooks?', a: 'Configure your callback URL in the service app settings. We\'ll send POST requests to that URL on transaction events.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help & Documentation</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Resources and guides for MG Pay
          </p>
        </div>
      </div>

      <div className="p-8 max-w-[1000px] mx-auto space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Book, title: 'API Documentation', desc: 'Complete API reference' },
            { icon: FileText, title: 'Quick Start Guide', desc: 'Get started in minutes' },
            { icon: HelpCircle, title: 'FAQs', desc: 'Common questions answered' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-md transition-all cursor-pointer">
              <item.icon size={32} className="text-green-600 mb-3" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
