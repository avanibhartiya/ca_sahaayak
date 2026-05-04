import { 
  Users, 
  Save, 
  FileCheck, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  Calculator,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
  const stats = [
    { name: "Active Clients", value: "48", icon: Users, change: "+2 this month", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Calculations Saved", value: "1,240", icon: Save, change: "84% efficiency", color: "text-green-600", bg: "bg-green-50" },
    { name: "Reports Generated", value: "312", icon: FileCheck, change: "Oct 2023", color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Pending Reviews", value: "07", icon: Clock, change: "Next 48 hours", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const tools = [
    { name: "Capital Gains", desc: "Complex LTCG/STCG with indexing", icon: TrendingUp, href: "/dashboard/capital-gains" },
    { name: "Advance Tax", desc: "Quarterly tax liability estimations", icon: Calculator, href: "/dashboard/advance-tax" },
    { name: "GST Utility", desc: "GSTR-1, 3B & Reconciliation tools", icon: ShieldCheck, href: "#" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-blue-600 font-semibold text-sm mb-1 uppercase tracking-wider">Workspace</p>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, CA Rahul Sharma</h2>
          <p className="text-gray-600 max-w-2xl mb-6">
            Your workspace is ready. You have <span className="font-semibold text-blue-600">4 pending tax audits</span> for this week and <span className="font-semibold text-blue-600">12 client reports</span> to finalize.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/dashboard/capital-gains" 
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Launch Capital Gains Tool
            </Link>
            <Link 
              href="/dashboard/profile" 
              className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Review Firm Profile
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 flex gap-8">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Assessment Year</p>
            <p className="text-xl font-bold text-gray-900">2024-25</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase">Today's Date</p>
            <p className="text-xl font-bold text-gray-900">Oct 24, 2023</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs text-gray-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Quick Access Tools</h3>
          <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
            View All Tools <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.name} 
              href={tool.href}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-500 transition-all group"
            >
              <div className="p-3 bg-gray-50 rounded-xl w-fit mb-4 group-hover:bg-blue-50 transition-colors">
                <tool.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{tool.name}</h4>
              <p className="text-sm text-gray-500">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Client / Entity</th>
                <th className="px-6 py-4">Tool Used</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {[
                { date: "2023-10-24", client: "Mehta Exports Pvt Ltd", tool: "GST Reconciliation", status: "Success", statusColor: "text-green-600 bg-green-50" },
                { date: "2023-10-23", client: "Dr. Ananya Roy", tool: "Capital Gains", status: "Success", statusColor: "text-green-600 bg-green-50" },
                { date: "2023-10-23", client: "Blue Sky Logistics", tool: "Advance Tax Q3", status: "Pending", statusColor: "text-orange-600 bg-orange-50" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{row.client}</td>
                  <td className="px-6 py-4 text-gray-600">{row.tool}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 font-semibold hover:underline">View</button>
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
