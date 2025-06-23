import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Award, 
  Download,
  Eye,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 ฟีเจอร์นี้ยังไม่ได้พัฒนา",
      description: "แต่ไม่ต้องกังวล! ฟังชั้นจะใช้งานได้ในเร็วๆนี้  🚀",
    });
  };

  const metrics = [
    {
      title: 'ใบประกาศนียบัตรทั้งหมด',
      value: '1,234',
      change: '+12%',
      icon: Award,
      color: 'metric-card'
    },
    {
      title: 'ผู้เข้าร่วมทั้งหมด',
      value: '5,678',
      change: '+8%',
      icon: Users,
      color: 'metric-card-2'
    },
    {
      title: 'การดาวน์โหลดวันนี้',
      value: '89',
      change: '+23%',
      icon: Download,
      color: 'metric-card-3'
    },
    {
      title: 'การเข้าชมวันนี้',
      value: '456',
      change: '+15%',
      icon: Eye,
      color: 'metric-card-4'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'สร้างใบประกาศนียบัตรใหม่',
      certificate: 'SACIT Symposium 2025 Day1',
      time: '2 นาทีที่แล้ว',
      status: 'success'
    },
    {
      id: 2,
      action: 'ดาวน์โหลดใบประกาศนียบัตร',
      certificate: 'SACIT Workshop 2025',
      time: '15 นาทีที่แล้ว',
      status: 'info'
    },
    {
      id: 3,
      action: 'อัปเดตข้อมูลผู้เข้าร่วม',
      certificate: 'SACIT Conference 2025',
      time: '1 ชั่วโมงที่แล้ว',
      status: 'warning'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">แดชบอร์ด</h1>
          <p className="text-gray-600">ภาพรวมระบบจัดการใบประกาศนียบัตร</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => handleFeatureClick('export')}
          >
            <Download className="w-4 h-4" />
            <span>ส่งออกรายงาน</span>
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => handleFeatureClick('analytics')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            ดูรายงานเต็ม
          </Button>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${metric.color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            onClick={() => handleFeatureClick('metric')}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">{metric.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-white/80 mr-1" />
                  <span className="text-white/80 text-sm">{metric.change}</span>
                </div>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="dashboard-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">สถิติการออกใบประกาศนียบัตร</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleFeatureClick('chart')}
            >
              <BarChart3 className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600">กราฟแสดงสถิติการออกใบประกาศนียบัตร</p>
              <p className="text-sm text-gray-500 mt-2">คลิกเพื่อดูรายละเอียด</p>
            </div>
          </div>
        </motion.div>

        {/* Chart 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="dashboard-card p-6 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">การกระจายตามประเภท</h3>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleFeatureClick('pie-chart')}
            >
              <PieChart className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-600">กราฟแสดงการกระจายตามประเภท</p>
              <p className="text-sm text-gray-500 mt-2">คลิกเพื่อดูรายละเอียด</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="dashboard-card p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleFeatureClick('activities')}
          >
            ดูทั้งหมด
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onClick={() => handleFeatureClick('activity')}
            >
              <div className={`w-3 h-3 rounded-full ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'info' ? 'bg-blue-500' : 'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.certificate}</p>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {activity.time}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;