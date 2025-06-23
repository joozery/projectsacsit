
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Edit, Trash2 } from 'lucide-react';

const SpeakerCard = ({ speaker, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100 p-6"
    >
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
          <AvatarImage src={speaker.photoUrl} alt={speaker.name} />
          <AvatarFallback className="bg-gray-200">
            <User className="h-12 w-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-xl font-bold text-gray-800">{speaker.name}</h3>
        <p className="text-violet-600 font-medium">{speaker.title}</p>
        <p className="text-sm text-gray-500">{speaker.company}</p>
        <p className="mt-4 text-sm text-gray-600 text-center flex-grow min-h-[60px]">{speaker.bio}</p>
      </div>
      <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-gray-100">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-2" /> แก้ไข
        </Button>
        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700" onClick={onDelete}>
          <Trash2 className="w-4 h-4 mr-2" /> ลบ
        </Button>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
