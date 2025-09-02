'use client'

import { Shield, Zap, Users, BarChart3, Lock, Globe } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      title: 'AI-Powered Analysis',
      description:
        'Advanced machine learning algorithms analyze URLs and detect suspicious patterns in real-time with 98.7% accuracy.',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'Community Protection',
      description:
        'Crowdsourced reporting system that helps protect millions of users worldwide through collaborative intelligence.',
      icon: Users,
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      title: 'Real-Time Monitoring',
      description:
        'Continuous monitoring of reported sites and automatic updates to threat databases for instant protection.',
      icon: BarChart3,
      gradient: 'from-green-400 to-teal-500',
    },
    {
      title: 'Secure & Private',
      description:
        'Your data is encrypted end-to-end and protected. We never share personal information with third parties.',
      icon: Lock,
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'Global Coverage',
      description:
        'Protecting users across all countries and languages with localized threat intelligence and 24/7 monitoring.',
      icon: Globe,
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      title: 'Verified Reports',
      description:
        'All reports are reviewed by our expert team and community moderators to ensure accuracy and reliability.',
      icon: Shield,
      gradient: 'from-emerald-400 to-green-500',
    },
  ]

  return (
    <section className="py-24 bg-gradient-features relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-primary rounded-full blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-secondary rounded-full blur-3xl opacity-5 translate-x-1/2 translate-y-1/2" />

      <div className="container px-4 relative">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-primary">ScamVerse</span>?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Our platform combines cutting-edge technology with community collaboration to provide
            the most comprehensive scam protection available in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <div
                key={index}
                className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200/50 relative overflow-hidden"
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-primary/20 transition-all duration-500" />
              </div>
            )
          })}
        </div>

        {/* Features illustration section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/features-illustration.svg"
              alt="ScamVerse Features"
              className="w-full h-auto max-w-xl mx-auto hover:scale-105 transition-transform duration-700 drop-shadow-xl"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Advanced Protection at Your Fingertips
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the next generation of scam protection with our intuitive interface,
                powered by artificial intelligence and backed by a global community of security
                experts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">99.9% Uptime Guarantee</h4>
                  <p className="text-gray-600">Always-on protection when you need it most</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Lightning Fast Analysis</h4>
                  <p className="text-gray-600">Get results in under 3 seconds</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Community</h4>
                  <p className="text-gray-600">Join 12,000+ active protection agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
