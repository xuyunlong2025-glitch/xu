import { useState } from 'react';
import { Team } from '../types';
import { TeamDetailModal } from '../components/TeamDetailModal';
import { useGameStore } from '../store/gameStore';
import { Users, Star, Zap, Shield, ArrowRight } from 'lucide-react';

export const TeamsPage = () => {
  const { teams, updateTeamPlayers } = useGameStore();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const sortedTeams = [...teams].sort((a, b) => a.ranking - b.ranking);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Users className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">队伍管理</h2>
        <p className="text-gray-600">查看和管理所有参赛队伍</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-700 to-green-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">排名</th>
              <th className="px-6 py-4 text-left font-semibold">队伍</th>
              <th className="px-6 py-4 text-left font-semibold">进攻</th>
              <th className="px-6 py-4 text-left font-semibold">防守</th>
              <th className="px-6 py-4 text-left font-semibold">中场</th>
              <th className="px-6 py-4 text-left font-semibold">综合实力</th>
              <th className="px-6 py-4 text-left font-semibold">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTeams.map((team, index) => (
              <tr key={team.id} className="hover:bg-green-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {index === 0 && <Star className="h-5 w-5 text-yellow-500 mr-2" />}
                    <span className="font-bold text-gray-800">{team.ranking}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{team.flag}</span>
                    <div>
                      <div className="font-bold text-gray-800">{team.name}</div>
                      <div className="text-sm text-gray-500">{team.country}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-red-500" />
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: `${team.attack}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{team.attack}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${team.defense}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{team.defense}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${team.midfield}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{team.midfield}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-center font-bold">
                    {team.strength}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <span>查看详情</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
