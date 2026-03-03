'use client';
import { faqs, supportChannels } from '@/app/lib/data';

export default function SupportPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
      <p className="text-gray-500 mb-8">How can we help you today?</p>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {supportChannels.map((channel, idx) => (
          <div key={idx} className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-4xl mb-4 block">{channel.icon}</span>
            <h3 className="font-bold mb-1">{channel.title}</h3>
            <p className="text-sm text-gray-500">{channel.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group border-b border-gray-100 pb-4">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                {faq.question}
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}