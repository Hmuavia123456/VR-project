'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Pricing Page
 * Displays pricing plans with monthly/yearly toggle and comparison table
 */
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly') // 'monthly' or 'yearly'

  const plans = [
    {
      name: 'Basic',
      tagline: 'Perfect for getting started',
      price: { monthly: 19, yearly: 15 },
      features: [
        '3 published projects',
        '360° photo tours',
        'Basic hotspots',
        '10 GB storage',
        'Mobile responsive',
        'Email support',
        'Standard analytics',
        'SSL security',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro',
      tagline: 'Most popular for professionals',
      price: { monthly: 39, yearly: 31 },
      features: [
        'Unlimited projects',
        '360° photos + videos',
        'Advanced hotspots',
        '50 GB storage',
        'Custom branding',
        'Priority support',
        'Advanced analytics',
        'White-label option',
        'Remove watermark',
        'Custom domain',
        'Lead capture forms',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Business',
      tagline: 'For teams and enterprises',
      price: { monthly: 99, yearly: 79 },
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Multi-user accounts (5+)',
        'Live 360° video chat',
        'Floor plan creator',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'Training sessions',
        'Priority features',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  const comparisonFeatures = [
    { name: 'Number of Tours', basic: '5', pro: 'Unlimited', business: 'Unlimited' },
    { name: 'Max Resolution', basic: '720p', pro: '4K', business: '8K' },
    { name: 'Storage', basic: '1 GB', pro: '50 GB', business: '500 GB' },
    { name: 'Custom Branding', basic: false, pro: true, business: true },
    { name: 'Analytics', basic: 'Basic', pro: 'Advanced', business: 'Advanced' },
    { name: 'API Access', basic: false, pro: false, business: true },
    { name: 'Support', basic: 'Email', pro: 'Priority', business: 'Dedicated' },
    { name: 'Team Collaboration', basic: false, pro: false, business: true },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section bg-[#CFE0DA]/30">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#173142] mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#236476] text-white'
                    : 'text-neutral-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-[#236476] text-white'
                    : 'text-neutral-700'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-[#7DAD3F]/20 text-[#7DAD3F] px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#236476] to-[#1a5060] text-white shadow-glow'
                    : index === 0
                    ? 'bg-gradient-to-br from-[#4A9FB3] to-[#236476] text-white shadow-glow'
                    : 'bg-gradient-to-br from-[#7DAD3F] to-[#5a8a2f] text-white shadow-glow'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#7DAD3F] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <p className="mb-6 text-white/90">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-white">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="ml-2 text-white/80">
                        /month
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-sm mt-1 text-white/80">
                        Billed ${plan.price.yearly * 12}/year
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href="/register"
                    className={`block w-full text-center py-3 rounded-lg font-medium mb-8 transition-all ${
                      plan.popular
                        ? 'bg-white text-[#236476] hover:bg-neutral-100'
                        : index === 0
                        ? 'bg-white text-[#236476] hover:bg-neutral-100'
                        : 'bg-white text-[#7DAD3F] hover:bg-neutral-100'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-background-gray">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-center text-[#173142] mb-12">
            Compare Plans
          </h2>

          <div className="bg-white rounded-xl shadow-medium overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-bold text-neutral-900">Feature</th>
                  <th className="text-center p-4 font-bold text-neutral-900">Basic</th>
                  <th className="text-center p-4 font-bold text-neutral-900">Pro</th>
                  <th className="text-center p-4 font-bold text-neutral-900">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name}>
                    <td className="p-4 font-medium text-neutral-900">{feature.name}</td>
                    <td className="p-4 text-center text-neutral-600">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? (
                          <span className="text-[#7DAD3F]">✓</span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )
                      ) : (
                        feature.basic
                      )}
                    </td>
                    <td className="p-4 text-center text-neutral-600">
                      {typeof feature.pro === 'boolean' ? (
                        feature.pro ? (
                          <span className="text-[#7DAD3F]">✓</span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )
                      ) : (
                        feature.pro
                      )}
                    </td>
                    <td className="p-4 text-center text-neutral-600">
                      {typeof feature.business === 'boolean' ? (
                        feature.business ? (
                          <span className="text-[#7DAD3F]">✓</span>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )
                      ) : (
                        feature.business
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-center text-[#173142] mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Absolutely! All plans come with a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, MasterCard, Amex) and PayPal.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees.',
              },
            ].map((faq, index) => (
              <div key={index} className="card">
                <h4 className="text-lg font-bold text-[#173142] mb-2">{faq.q}</h4>
                <p className="text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-[#7DAD3F] to-[#5a8a2f] text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Start your 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-[#7DAD3F] px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:bg-neutral-100 transition-colors">
                Start Free Trial
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 bg-white/10 border-2 border-white text-white rounded-lg font-semibold text-lg shadow-xl hover:bg-white/20 transition-colors"
              >
                View Demo Tours
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
