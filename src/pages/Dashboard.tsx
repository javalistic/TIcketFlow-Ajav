import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import Footer from "../components/footer";
import { Ticket, CheckCircle, Clock, LogOut, Plus, ArrowRight, BarChart3, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    // Load ticket statistics from localStorage
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const stats = {
      total: tickets.length,
      open: tickets.filter((t: any) => t.status === "open").length,
      inProgress: tickets.filter((t: any) => t.status === "in_progress").length,
      closed: tickets.filter((t: any) => t.status === "closed").length,
    };
    setStats(stats);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Decorative Circles */}
      <div className="fixed top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-1 " />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                TicketFlow
              </h1>
              <p className="text-sm text-slate-600">
                Welcome back, <span className="font-semibold text-slate-800">{user?.name}</span>!
              </p>
            </div>
          </div>
          <Button 
            onClick={logout} 
            variant="outline" 
            size="sm"
            className="border-slate-300/80 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Track and manage your team's tickets with real-time insights and analytics
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Tickets */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Total Tickets
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stats.total}</div>
                <p className="text-xs text-slate-500">
                  All time tickets created
                </p>
                <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 transition-all duration-300" />
              </CardContent>
            </Card>

            {/* Open Tickets */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-t-lg" />
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Open Tickets
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Ticket className="w-5 h-5 text-green-600" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {stats.open}
                </div>
                <p className="text-xs text-slate-500">
                  Awaiting action
                </p>
                <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-3 transition-all duration-300" />
              </CardContent>
            </Card>

            {/* In Progress */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 rounded-t-lg" />
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  In Progress
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-amber-600" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  {stats.inProgress}
                </div>
                <p className="text-xs text-slate-500">
                  Being worked on
                </p>
                <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-3 transition-all duration-300" />
              </CardContent>
            </Card>

            {/* Resolved */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-500 rounded-t-lg" />
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                  Resolved
                </CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-5 h-5 text-gray-600" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-600 mb-1">
                  {stats.closed}
                </div>
                <p className="text-xs text-slate-500">
                  Completed tickets
                </p>
                <div className="w-0 group-hover:w-12 h-1 bg-gradient-to-r from-gray-500 to-slate-500 rounded-full mt-3 transition-all duration-300" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <BarChart3 className="w-5 h-5 text-blue-600" aria-hidden="true" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Link to="/tickets" className="flex-1 group">
                <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Ticket className="w-5 h-5 mr-3" aria-hidden="true" />
                  Manage Tickets
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/tickets?action=create" className="flex-1 group">
                <Button className="w-full h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <Plus className="w-5 h-5 mr-3" aria-hidden="true" />
                  Create New Ticket
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Additional Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Performance Metrics */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Users className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Resolution Rate</span>
                    <span className="text-lg font-bold text-green-600">
                      {stats.total > 0 ? Math.round((stats.closed / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Active Tickets</span>
                    <span className="text-lg font-bold text-amber-600">
                      {stats.open + stats.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50/50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Efficiency Score</span>
                    <span className="text-lg font-bold text-blue-600">
                      {stats.total > 0 ? Math.round((stats.closed / (stats.open + stats.inProgress || 1)) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-slate-800">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p>Assign tickets to team members for faster resolution</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p>Use priority levels to focus on critical issues</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p>Regularly update ticket status to keep everyone informed</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                    <p>Use filters to quickly find tickets by status or priority</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;