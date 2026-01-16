import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import {
  Ticket,
  CheckCircle,
  Clock,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30 ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Decorative circles */}
        <div className="absolute w-64 h-64 -top-20 -right-20 md:w-96 md:h-96 bg-white/5 rounded-full backdrop-blur-sm border border-white/10" />
        <div className="absolute w-48 h-48 top-1/2 -left-24 md:w-72 md:h-72 bg-white/5 rounded-full backdrop-blur-sm border border-white/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">
                  Streamline your workflow today
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Streamline Your
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Workflow
                </span>
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-blue-100/90 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 leading-relaxed">
                The modern ticket management solution that helps teams track,
                manage, and resolve issues faster than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                <Link to="/auth/signup">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 text-lg shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 backdrop-blur-sm transition-all duration-200 font-medium px-8 py-3 text-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-blue-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                {/* Main Dashboard Image Container */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  {/* Mock Dashboard UI */}
                  <div className="bg-white rounded-xl shadow-lg p-4 space-y-4 cursor-pointer ">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6  rounded-lg flex items-center justify-center">
                          <Ticket className="w-4 h-4 text-purple-300" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          TicketFlow
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { color: "bg-green-500", count: "12", label: "Open" },
                        {
                          color: "bg-amber-500",
                          count: "8",
                          label: "Progress",
                        },
                        { color: "bg-gray-500", count: "24", label: "Closed" },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="text-center p-2 bg-slate-50 rounded-lg "
                        >
                          <div
                            className={`w-3 h-3 ${stat.color} rounded-full mx-auto mb-1`}
                          ></div>
                          <div className="text-xs font-bold text-slate-800">
                            {stat.count}
                          </div>
                          <div className="text-xs text-slate-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Ticket List */}
                    <div className="space-y-2">
                      {[
                        {
                          title: "QR code scanner optimization",
                          status: "bg-green-500",
                          priority: "bg-red-400",
                        },
                        {
                          title: "Multi-event bundle pricing",
                          status: "bg-amber-500",
                          priority: "bg-yellow-400",
                        },
                        {
                          title: "Customer refund policy guide",
                          status: "bg-gray-500",
                          priority: "bg-green-400",
                        },
                      ].map((ticket, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                        >
                          <div
                            className={`w-2 h-2 ${ticket.status} rounded-full`}
                          ></div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-slate-800 truncate">
                              {ticket.title}
                            </div>
                          </div>
                          <div
                            className={`w-2 h-2 ${ticket.priority} rounded-full`}
                          ></div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-500 text-white text-xs font-medium py-2 px-3 rounded text-center">
                        New Ticket
                      </div>
                      <div className="flex-1 bg-slate-200 text-slate-700 text-xs font-medium py-2 px-3 rounded text-center">
                        View All
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl -z-10 transform scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-transparent relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 mb-4">
              <BarChart3 className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              Everything you need to manage tickets
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Powerful features designed to help your team stay organized,
              productive, and focused on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Ticket,
                title: "Create Tickets",
                description:
                  "Quickly create and categorize tickets with detailed information and priority levels",
                color: "from-orange-500 to-red-500",
                bgColor: "bg-orange-50",
                iconColor: "text-orange-600",
              },
              {
                icon: Clock,
                title: "Track Progress",
                description:
                  "Monitor ticket status in real-time with clear visual indicators and notifications",
                color: "from-blue-500 to-cyan-500",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
              },
              {
                icon: CheckCircle,
                title: "Resolve Faster",
                description:
                  "Streamlined workflows help your team resolve issues efficiently and effectively",
                color: "from-green-500 to-emerald-500",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
              },
              {
                icon: BarChart3,
                title: "Analytics",
                description:
                  "Get insights into your team's performance with comprehensive dashboards",
                color: "from-purple-500 to-indigo-500",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${feature.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-slate-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                <div
                  className={`w-0 group-hover:w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full mt-4 transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-dot-white/[0.2] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Animated circles */}
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/10 rounded-full backdrop-blur-sm border border-white/5 animate-pulse" />
        <div className="absolute w-80 h-80 -top-32 -left-32 bg-blue-500/10 rounded-full backdrop-blur-sm border border-white/5 animate-pulse delay-700" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Join thousands of teams who are already managing their tickets
              more efficiently and delivering better results with TicketFlow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth/signup">
                <Button className="bg-white text-slate-900 hover:bg-white/90 hover:scale-105 transition-all duration-200 font-semibold px-8 py-3 text-lg shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/auth/login">
                <Button
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-200 font-medium px-8 py-3 text-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Schedule Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              No credit card required • Free 14-day trial • Setup in minutes
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
