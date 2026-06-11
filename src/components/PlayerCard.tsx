import { Player } from '../types';
import { User, Star } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onToggleStarter: () => void;
}

export const PlayerCard = ({ player, onToggleStarter }: PlayerCardProps) => {
  const positionLabels: Record<string, string> = {
    GK: '门将',
    DF: '后卫',
    MF: '中场',
    FW: '前锋',
  };

  const positionColors: Record<string, string> = {
    GK: 'bg-red-100 text-red-700',
    DF: 'bg-blue-100 text-blue-700',
    MF: 'bg-purple-100 text-purple-700',
    FW: 'bg-green-100 text-green-700',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-3 transition-all duration-200 ${
        player.isStarter ? 'ring-2 ring-green-500' : 'opacity-70 hover:opacity-100'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-800">{player.name}</div>
            <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${positionColors[player.position]}`}>
              {positionLabels[player.position]}
            </div>
          </div>
        </div>
        <button
          onClick={onToggleStarter}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            player.isStarter
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {player.isStarter ? '首发' : '替补'}
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-xs text-gray-500">技能</div>
          <div className="flex items-center justify-center space-x-0.5">
            <Star className="h-3 w-3 text-yellow-500" />
            <span className="font-bold text-sm">{player.skill}</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500">速度</div>
          <div className="font-bold text-sm text-blue-600">{player.speed}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">射门</div>
          <div className="font-bold text-sm text-red-600">{player.shooting}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">传球</div>
          <div className="font-bold text-sm text-purple-600">{player.passing}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">防守</div>
          <div className="font-bold text-sm text-blue-600">{player.defending}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">体力</div>
          <div className="font-bold text-sm text-green-600">{player.stamina}</div>
        </div>
      </div>
    </div>
  );
};
