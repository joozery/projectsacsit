import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminAgenda = () => {
  const [agendaItems, setAgendaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    day: '1',
    startTime: '',
    endTime: '',
    location: '',
    speaker: '',
    type: 'session',
    capacity: '',
    status: 'active'
  });

  // Mock data for testing
  useEffect(() => {
    setAgendaItems([
      {
        id: 1,
        title: 'Opening Ceremony',
        description: 'Welcome speech and introduction to SACIT Symposium 2025',
        day: '1',
        startTime: '09:00',
        endTime: '10:00',
        location: 'Main Hall',
        speaker: 'Dr. Somchai Director',
        type: 'ceremony',
        capacity: '200',
        status: 'active'
      },
      {
        id: 2,
        title: 'Keynote Speech: Sustainable Crafting',
        description: 'Exploring sustainable practices in traditional crafts',
        day: '1',
        startTime: '10:15',
        endTime: '11:15',
        location: 'Conference Room A',
        speaker: 'Prof. Dr. Jane Smith',
        type: 'keynote',
        capacity: '150',
        status: 'active'
      },
      {
        id: 3,
        title: 'Workshop: Lacquer Techniques',
        description: 'Hands-on workshop on traditional lacquer techniques',
        day: '1',
        startTime: '14:00',
        endTime: '16:00',
        location: 'Workshop Room 1',
        speaker: 'Master Craftsman Somkiat',
        type: 'workshop',
        capacity: '30',
        status: 'active'
      },
      {
        id: 4,
        title: 'Panel Discussion: Future of Crafts',
        description: 'Panel discussion on the future of traditional crafts',
        day: '2',
        startTime: '09:30',
        endTime: '11:00',
        location: 'Conference Room B',
        speaker: 'Multiple Speakers',
        type: 'panel',
        capacity: '100',
        status: 'active'
      }
    ]);
  }, []);

  const handleAddItem = () => {
    if (editingItem) {
      // Update existing item
      setAgendaItems(prev => 
        prev.map(item => 
          item.id === editingItem.id 
            ? { ...formData, id: editingItem.id }
            : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now()
      };
      setAgendaItems(prev => [...prev, newItem]);
    }
    
    setShowAddDialog(false);
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      day: '1',
      startTime: '',
      endTime: '',
      location: '',
      speaker: '',
      type: 'session',
      capacity: '',
      status: 'active'
    });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddDialog(true);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this agenda item?')) {
      setAgendaItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const filteredItems = agendaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = selectedDay === 'all' || item.day === selectedDay;
    return matchesSearch && matchesDay;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'ceremony': return 'bg-purple-100 text-purple-800';
      case 'keynote': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-green-100 text-green-800';
      case 'panel': return 'bg-orange-100 text-orange-800';
      case 'session': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'ceremony': return 'พิธีการ';
      case 'keynote': return 'ปาฐกถา';
      case 'workshop': return 'เวิร์กช็อป';
      case 'panel': return 'เสวนา';
      case 'session': return 'การประชุม';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">จัดการกำหนดการงาน</h1>
          <p className="text-gray-600">เพิ่ม แก้ไข และลบรายการในกำหนดการ SACIT Symposium 2025</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มรายการใหม่
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อรายการ, ผู้พูด, หรือสถานที่..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="วันที่" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกวัน</SelectItem>
                <SelectItem value="1">วันที่ 1</SelectItem>
                <SelectItem value="2">วันที่ 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Agenda Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>รายการ</TableHead>
              <TableHead>เวลา</TableHead>
              <TableHead>สถานที่</TableHead>
              <TableHead>ผู้พูด</TableHead>
              <TableHead>ประเภท</TableHead>
              <TableHead>จำนวนผู้เข้าร่วม</TableHead>
              <TableHead className="text-right">การดำเนินการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{item.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {item.startTime} - {item.endTime}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    วันที่ {item.day}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.speaker}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {getTypeText(item.type)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{item.capacity} คน</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}
            </DialogTitle>
            <DialogDescription>
              กรอกข้อมูลรายการในกำหนดการ
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">ชื่อรายการ</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="ชื่อรายการ"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">วันที่</label>
                <Select value={formData.day} onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">วันที่ 1</SelectItem>
                    <SelectItem value="2">วันที่ 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">เวลาเริ่ม</label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">เวลาสิ้นสุด</label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">สถานที่</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="สถานที่"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">ผู้พูด</label>
                <Input
                  value={formData.speaker}
                  onChange={(e) => setFormData(prev => ({ ...prev, speaker: e.target.value }))}
                  placeholder="ชื่อผู้พูด"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ประเภท</label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceremony">พิธีการ</SelectItem>
                    <SelectItem value="keynote">ปาฐกถา</SelectItem>
                    <SelectItem value="workshop">เวิร์กช็อป</SelectItem>
                    <SelectItem value="panel">เสวนา</SelectItem>
                    <SelectItem value="session">การประชุม</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">จำนวนผู้เข้าร่วม</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  placeholder="จำนวนคน"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">สถานะ</label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">เปิดใช้งาน</SelectItem>
                    <SelectItem value="inactive">ปิดใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">รายละเอียด</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="รายละเอียดของรายการ"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              ยกเลิก
            </Button>
            <Button onClick={handleAddItem}>
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'อัปเดต' : 'เพิ่ม'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAgenda; 