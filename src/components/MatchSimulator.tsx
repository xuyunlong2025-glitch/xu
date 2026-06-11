import { useState } from 'react';
import { Team, MatchResult } from '../types';
import { useGameStore } from '../store/gameStore';
import { simulateMatch } from '../utils/matchSimulator';
import { Play, RotateCcw, ArrowRightLeft } from 'lucide-react';

interface MatchSimulatorProps {
  onMatchComplete: (result: MatchResult) => void;
}

export const MatchSimulator = ({ onMatchComplete }: MatchSimulatorProps) => {
  const { teams, selectedHomeTeam, selectedAwayTeam, selectHomeTeam, selectAwayTeam, resetSelection, isSimulating, setIsSimulating } = useGameStore();
  const [selectedTeamType, setSelectedTeamType] = useState<'home' | 'away'>('home');
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  const availableTeams = teams.filter(team => {
    if (!selectedHomeTeam) return true;
    if (!selectedAwayTeam) return team.id !== selectedHomeTeam.id;
    return team.id !== selectedHomeTeam.id && team.id !== selectedAwayTeam.id;
  });

  const handleSelectTeam = (team: Team) => {
    if (selectedTeamType === 'home') {
      selectHomeTeam(team);
    } else {
      selectAwayTeam(team);
    }
    setShowTeamSelector(false);
  };

  const handleSwapTeams = () => {
    if (selectedHomeTeam && selectedAwayTeam) {
      selectHomeTeam(selectedAwayTeam);
      selectAwayTeam(selectedHomeTeam);
    }
  };

  const handleStartMatch = async () => {
    if (!selectedHomeTeam || !selectedAwayTeam) return;
    
    setIsSimulating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = simulateMatch(selectedHomeTeam, selectedAwayTeam);
    onMatchComplete(result);
    setIsSimulating(false);
  };

  const handleReset = () => {
    resetSelection();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">选择比赛队伍</h2>
        <p className="text-gray-600">选择两支队伍进行比赛模拟</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">主队</div>
              <button
                onClick={() => { setSelectedTeamType('home'); setShowTeamSelector(true); }}
                className={`w-full p-6 rounded-xl border-2 border-dashed transition-all ${
                  selectedHomeTeam
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                }`}
              >
                {selectedHomeTeam ? (
                  <div>
                    <span className="text-5xl">{selectedHomeTeam.flag}</span>
                    <div className="text-xl font-bold text-gray-800 mt-2">{selectedHomeTeam.name}</div>
                    <div className="text-sm text-gray-500">实力: {selectedHomeTeam.strength}</div>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <div className="text-4xl mb-2">⚽</div>
                    <div>点击选择主队</div>
                  </div>
                )}
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={handleSwapTeams}
              disabled={!selectedHomeTeam || !selectedAwayTeam}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowRightLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="text-3xl font-bold text-gray-400">VS</div>
          </div>
          
          <div className="flex-1">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">客队</div>
              <button
                onClick={() => { setSelectedTeamType('away'); setShowTeamSelector(true); }}
                className={`w-full p-6 rounded-xl border-2 border-dashed transition-all ${
                  selectedAwayTeam
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                {selectedAwayTeam ? (
                  <div>
                    <span className="text-5xl">{selectedAwayTeam.flag}</span>
                    <div className="text-xl font-bold text-gray-800 mt-2">{selectedAwayTeam.name}</div>
                    <div className="text-sm text-gray-500">实力: {selectedAwayTeam.strength}</div>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <div className="text-4xl mb-2">⚽</div>
                    <div>点击选择客队</div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            <span>重置</span>
          </button>
          <button
            onClick={handleStartMatch}
            disabled={!selectedHomeTeam || !selectedAwayTeam || isSimulating}
            className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {isSimulating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>模拟中...</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>开始比赛</span>
              </>
            )}
          </button>
        </div>
      </div>

      {showTeamSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gray-800 text-white p-4">
              <h3 className="text-xl font-bold">选择{selectedTeamType === 'home' ? '主队' : '客队'}</h3>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableTeams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => handleSelectTeam(team)}
                    className="p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors text-left"
                  >
                    <span className="text-3xl">{team.flag}</span>
                    <div className="font-bold text-gray-800 mt-2">{team.name}</div>
                    <div className="text-sm text-gray-500">排名: {team.ranking}</div>
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowTeamSelector(false)}
              className="w-full p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
