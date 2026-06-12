import { useState } from 'react';
import { Team, Player } from '../types';
import { PlayerCard } from './PlayerCard';
import { X, Star, Zap, Shield, Users, AlertCircle, Move } from 'lucide-react';

interface TeamDetailModalProps {
  team: Team;
  onClose: () => void;
  onUpdatePlayers: (players: Player[]) => void;
}

export const TeamDetailModal = ({ team, onClose, onUpdatePlayers }: TeamDetailModalProps) => {
  const [error, setError] = useState('');
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);

  const starters = team.players.filter(p => p.isStarter);
  const substitutes = team.players.filter(p => !p.isStarter);

  const handleDragStart = (e: React.DragEvent, player: Player) => {
    setDraggedPlayer(player);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetPlayer: Player) => {
    e.preventDefault();
    
    if (!draggedPlayer || !targetPlayer.isStarter) {
      setDraggedPlayer(null);
      return;
    }

    const updatedPlayers = team.players.map(p => {
      if (p.id === draggedPlayer.id) {
        return { ...p, isStarter: true };
      }
      if (p.id === targetPlayer.id) {
        return { ...p, isStarter: false };
      }
      return p;
    });

    onUpdatePlayers(updatedPlayers);
    setDraggedPlayer(null);
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-green-700 to-green-900 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">{team.flag}</span>
              <div>
                <h2 className="text-2xl font-bold">{team.name}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>世界排名: {team.ranking}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>实力: {team.strength}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Zap className="h-5 w-5 mx-auto mb-1" />
              <div className="text-2xl font-bold">{team.attack}</div>
              <div className="text-sm opacity-80">进攻</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Shield className="h-5 w-5 mx-auto mb-1" />
              <div className="text-2xl font-bold">{team.defense}</div>
              <div className="text-sm opacity-80">防守</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <Users className="h-5 w-5 mx-auto mb-1" />
              <div className="text-2xl font-bold">{team.midfield}</div>
              <div className="text-sm opacity-80">中场</div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 px-4 py-3 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              首发阵容 ({starters.length}/11)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {starters.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onDragStart={(e) => handleDragStart(e, player)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, player)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              替补球员 ({substitutes.length})
              <span className="ml-2 flex items-center text-sm font-normal text-gray-500">
                <Move className="h-4 w-4 mr-1" />
                拖动替换首发
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {substitutes.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onDragStart={(e) => handleDragStart(e, player)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, player)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
