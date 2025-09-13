import { TrendingUp, Users, Award, Globe } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Happy Clients",
      description: "Businesses trust our marketing solutions",
    },
    {
      icon: TrendingUp,
      value: "150%",
      label: "Average ROI",
      description: "Return on investment for our clients",
    },
    {
      icon: Award,
      value: "98%",
      label: "Success Rate",
      description: "Client satisfaction and retention",
    },
    {
      icon: Globe,
      value: "25+",
      label: "Countries",
      description: "Global reach and presence",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-green-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-white mb-4">Proven Results That Speak</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Our data-driven approach delivers measurable success for businesses worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <stat.icon className="w-12 h-12 text-white mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <p className="text-purple-100 text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
