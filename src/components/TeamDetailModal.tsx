import { Team, Player } from '../types';
import { PlayerCard } from './PlayerCard';
import { X, Star, Zap, Shield, Users } from 'lucide-react';

interface TeamDetailModalProps {
  team: Team;
  onClose: () => void;
  onUpdatePlayers: (players: Player[]) => void;
}

export const TeamDetailModal = ({ team, onClose, onUpdatePlayers }: TeamDetailModalProps) => {
  const starters = team.players.filter(p => p.isStarter);
  const substitutes = team.players.filter(p => !p.isStarter);

  const handleToggleStarter = (playerId: string) => {
    const updatedPlayers = team.players.map(p =>
      p.id === playerId ? { ...p, isStarter: !p.isStarter } : p
    );
    onUpdatePlayers(updatedPlayers);
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
                  onToggleStarter={() => handleToggleStarter(player.id)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              替补球员 ({substitutes.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {substitutes.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onToggleStarter={() => handleToggleStarter(player.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
