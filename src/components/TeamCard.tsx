import { Team } from '../types';
import { Star, Shield, Zap, Users } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onClick: () => void;
  selected?: boolean;
}

export const TeamCard = ({ team, onClick, selected }: TeamCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        selected ? 'ring-4 ring-green-500' : ''
      }`}
    >
      <div className="bg-gradient-to-br from-green-700 to-green-900 p-4 text-white">
        <div className="flex items-center justify-between">
          <span className="text-4xl">{team.flag}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">{team.ranking}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-2">{team.name}</h3>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-full px-4 py-2">
            <span className="text-lg font-bold text-green-700">{team.strength}</span>
            <span className="text-gray-500 ml-2">综合实力</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-red-50 rounded-lg p-2">
            <Zap className="h-4 w-4 mx-auto text-red-500 mb-1" />
            <span className="text-xs text-gray-500">进攻</span>
            <div className="font-bold text-red-600">{team.attack}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <Shield className="h-4 w-4 mx-auto text-blue-500 mb-1" />
            <span className="text-xs text-gray-500">防守</span>
            <div className="font-bold text-blue-600">{team.defense}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-2">
            <Users className="h-4 w-4 mx-auto text-purple-500 mb-1" />
            <span className="text-xs text-gray-500">中场</span>
            <div className="font-bold text-purple-600">{team.midfield}</div>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
          查看详情
        </button>
      </div>
    </div>
  );
};
