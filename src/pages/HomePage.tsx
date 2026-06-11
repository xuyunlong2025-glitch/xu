import { useState } from 'react';
import { Team } from '../types';
import { TeamCard } from '../components/TeamCard';
import { TeamDetailModal } from '../components/TeamDetailModal';
import { useGameStore } from '../store/gameStore';
import { Trophy, Search, Filter, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const { teams, updateTeamPlayers } = useGameStore();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'attack' | 'defense' | 'ranking'>('all');

  const filteredTeams = teams
    .filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (filterBy) {
        case 'attack':
          return b.attack - a.attack;
        case 'defense':
          return b.defense - a.defense;
        case 'ranking':
          return a.ranking - b.ranking;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <Trophy className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">世界杯预测</h1>
        <p className="text-gray-600">选择您喜爱的队伍，模拟精彩比赛</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索队伍..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">全部</option>
            <option value="ranking">世界排名</option>
            <option value="attack">进攻能力</option>
            <option value="defense">防守能力</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onClick={() => setSelectedTeam(team)}
          />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <div className="text-gray-500">没有找到匹配的队伍</div>
        </div>
      )}

      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate('simulate')}
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          开始模拟比赛 ⚽
        </button>
      </div>

      {selectedTeam && (
        <TeamDetailModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onUpdatePlayers={(players) => updateTeamPlayers(selectedTeam.id, players)}
        />
      )}
    </div>
  );
};
