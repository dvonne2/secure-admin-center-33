
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Activity, Shield, TrendingUp, FileText, Calendar } from 'lucide-react';

const roleStats = {
  superadmin: [
    { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
    { title: "System Health", value: "99.9%", icon: Activity, change: "+0.1%" },
    { title: "Security Events", value: "23", icon: Shield, change: "-15%" },
    { title: "Performance", value: "Fast", icon: TrendingUp, change: "+5%" },
  ],
  admin: [
    { title: "Managed Users", value: "456", icon: Users, change: "+8%" },
    { title: "Active Reports", value: "12", icon: FileText, change: "+3%" },
    { title: "System Alerts", value: "5", icon: Shield, change: "-2%" },
    { title: "Efficiency", value: "94%", icon: TrendingUp, change: "+2%" },
  ],
  manager: [
    { title: "Team Members", value: "15", icon: Users, change: "+1%" },
    { title: "Active Projects", value: "8", icon: FileText, change: "+2%" },
    { title: "This Week Tasks", value: "24", icon: Calendar, change: "+6%" },
    { title: "Completion Rate", value: "87%", icon: TrendingUp, change: "+4%" },
  ],
  user: [
    { title: "My Tasks", value: "7", icon: FileText, change: "+2%" },
    { title: "Completed", value: "23", icon: TrendingUp, change: "+5%" },
    { title: "Meetings Today", value: "3", icon: Calendar, change: "0%" },
    { title: "Progress", value: "78%", icon: Activity, change: "+12%" },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = roleStats[user.role] || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user.username}! Here's your {user.role} overview.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 
                               stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'}>
                  {stat.change}
                </span>
                {" "}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Logged into system</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Updated profile settings</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Generated monthly report</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {user.role === 'superadmin' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Create new user account
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    View system logs
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Backup database
                  </button>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Manage user permissions
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Generate reports
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Review audit logs
                  </button>
                </>
              )}
              {user.role === 'manager' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Assign team tasks
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Schedule team meeting
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Review project progress
                  </button>
                </>
              )}
              {user.role === 'user' && (
                <>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Update task status
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Submit time report
                  </button>
                  <button className="w-full text-left p-2 hover:bg-muted rounded-md text-sm">
                    Request time off
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
