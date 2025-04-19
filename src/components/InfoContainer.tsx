import React, { useTheme } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X, MapPin, Hash, Calendar, Package, Users, Zap } from 'lucide-react';

interface InfoContainerProps {
  data: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    wilaya: string;
    status: 'normal' | 'warning' | 'alert';
    items: string[];
    date: string;
    workers: number;
    powerConsumption: number;
  };
  onClear: () => void;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ data, onClear }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`border w-full lg:w-[25vw] ${isDark ? 'border-neutral-700' : 'border-neutral-300'} bg-card text-card-foreground shadow-sm`}>
      <CardHeader className="p-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
          <button
            onClick={onClear}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          {/* Status Badge */}
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              data.status === 'normal' ? 'bg-[#4d8a8f]' :
              data.status === 'warning' ? 'bg-[#ffcc00]' :
              'bg-[#ff3333]'
            }`} />
            <span className="text-sm font-medium capitalize">{data.status}</span>
          </div>

          {/* Location Info */}
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <MapPin size={12} className="text-primary mr-2" />
              <span>{data.wilaya}</span>
            </div>
            <div className="flex items-center text-sm">
              <Hash size={12} className="text-primary mr-2" />
              <span>ID: {data.id}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-1">
            <div className="text-sm font-medium">Delivery Details</div>
            <div className="text-sm">
              <div className="flex items-center">
                <Calendar size={12} className="text-primary mr-2" />
                <span>Date: {data.date}</span>
              </div>
              <div className="mt-1">
                <div className="flex items-center">
                  <Package size={12} className="text-primary mr-2" />
                  <span>Items:</span>
                </div>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {data.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-1">
            <div className="text-sm font-medium">Stats</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Users size={12} className="text-primary mr-2" />
                <span>{data.workers} workers</span>
              </div>
              <div className="flex items-center">
                <Zap size={12} className="text-primary mr-2" />
                <span>{data.powerConsumption} MW</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoContainer; 