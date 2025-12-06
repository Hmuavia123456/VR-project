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
      price: { monthly: 0, yearly: 0 },
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
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      tagline: 'Most popular for professionals',
      price: { monthly: 16, yearly: 13 },
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
    { name: 'Number of Tours', basic: '3', pro: 'Unlimited', business: 'Unlimited' },
    { name: 'Storage', basic: '10 GB', pro: '50 GB', business: 'Unlimited' },
    { name: 'Max Resolution', basic: '2K', pro: '4K', business: '8K' },
    { name: '360° Videos', basic: false, pro: true, business: true },
    { name: 'Custom Branding', basic: false, pro: true, business: true },
    { name: 'White-Label', basic: false, pro: true, business: true },
    { name: 'Analytics', basic: 'Basic', pro: 'Advanced', business: 'Advanced' },
    { name: 'API Access', basic: false, pro: false, business: true },
    { name: 'Multi-User Accounts', basic: false, pro: false, business: true },
    { name: 'Support', basic: 'Email', pro: 'Priority', business: 'Dedicated' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="section bg-background-light">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-primary-900 mb-6">
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
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center ${
                  billingCycle === 'yearly'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700'
                }`}
              >
                Yearly
                <span className={`ml-2 text-xs px-2 py-1 rounded-full font-semibold ${
                  billingCycle === 'yearly'
                    ? 'bg-white/20 text-white'
                    : 'bg-primary-500/20 text-primary-600'
                }`}>
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
                    ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white shadow-strong'
                    : index === 0
                    ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-medium'
                    : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-medium'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg shadow-primary-500/50">
                    Most Popular ⭐
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
                    className="block w-full text-center py-3 rounded-lg font-medium mb-8 transition-all bg-white text-primary-800 hover:bg-neutral-100 shadow-md"
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
      <section className="section bg-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              See what's included in each plan
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary-600 to-primary-700">
                    <th className="text-left p-5 font-bold text-white">Feature</th>
                    <th className="text-center p-5 font-bold text-white">
                      <div>Basic</div>
                      <div className="text-xs font-normal mt-1 opacity-90">FREE</div>
                    </th>
                    <th className="text-center p-5 font-bold text-white bg-primary-800/50">
                      <div>Pro</div>
                      <div className="text-xs font-normal mt-1 opacity-90">$13/mo</div>
                    </th>
                    <th className="text-center p-5 font-bold text-white">
                      <div>Business</div>
                      <div className="text-xs font-normal mt-1 opacity-90">$79/mo</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={feature.name} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 font-medium text-neutral-900">{feature.name}</td>
                      <td className="p-4 text-center text-neutral-700">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-400">—</span>
                          )
                        ) : (
                          <span className="font-medium text-sm">{feature.basic}</span>
                        )}
                      </td>
                      <td className="p-4 text-center text-neutral-700 bg-primary-50/30">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-400">—</span>
                          )
                        ) : (
                          <span className="font-medium text-sm">{feature.pro}</span>
                        )}
                      </td>
                      <td className="p-4 text-center text-neutral-700">
                        {typeof feature.business === 'boolean' ? (
                          feature.business ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <span className="text-neutral-400">—</span>
                          )
                        ) : (
                          <span className="font-medium text-sm">{feature.business}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-primary-50">
        <div className="container-custom max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel and manage your subscription settings anytime through your Account settings page. No cancellation fees or penalties apply.',
              },
              {
                q: 'Is there a discount for annual plans?',
                a: 'Yes, we offer a 20% discount when you choose annual billing for any plan. Save more with yearly commitment.',
              },
              {
                q: 'How long do free virtual tours remain active?',
                a: 'Free virtual tours stay active forever, but you cannot create new ones or edit existing tours after your trial period ends.',
              },
              {
                q: 'What happens to my tours if I cancel?',
                a: 'Already created virtual tours remain live and accessible forever, but you will not be able to edit them or create new tours.',
              },
              {
                q: 'Do you provide help creating virtual tours?',
                a: 'Virtulee is a self-service platform. We provide comprehensive video tutorials and documentation to help you create stunning virtual tours independently.',
              },
              {
                q: 'Can I remove the "Powered by Virtulee" watermark?',
                a: 'The "Powered by Virtulee" watermark is automatically removed for users with an active Pro or Business subscription plan.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <h4 className="text-lg font-bold text-primary-900">{faq.q}</h4>
                <p className="text-neutral-600 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-6 text-primary-900">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-neutral-600 max-w-2xl mx-auto">
              Start your 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-800 transition-colors">
                Start Free Trial
              </Link>
              <Link
                href="/explore"
                className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold text-lg shadow-xl hover:bg-primary-600 transition-colors"
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
