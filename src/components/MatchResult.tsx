import { MatchResult as MatchResultType } from '../types';
import { Trophy, Clock, Circle, Flag, Target, MessageSquare } from 'lucide-react';

interface MatchResultProps {
  result: MatchResultType;
  onPlayAgain: () => void;
}

export const MatchResult = ({ result, onPlayAgain }: MatchResultProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal':
        return <Circle className="h-4 w-4 text-green-500" />;
      case 'yellow_card':
        return <Flag className="h-4 w-4 text-yellow-500" />;
      case 'red_card':
        return <Flag className="h-4 w-4 text-red-500" />;
      case 'substitution':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'goal':
        return 'bg-green-100 border-green-300';
      case 'yellow_card':
        return 'bg-yellow-100 border-yellow-300';
      case 'red_card':
        return 'bg-red-100 border-red-300';
      case 'substitution':
        return 'bg-blue-100 border-blue-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">比赛结果</h2>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>90分钟比赛结束</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <span className="text-6xl">{result.homeTeam.flag}</span>
            <div className="text-2xl font-bold mt-2">{result.homeTeam.name}</div>
            <div className="text-sm opacity-80">主队</div>
          </div>
          
          <div className="text-center">
            <div className="text-6xl font-bold">{result.homeScore}</div>
            <div className="text-2xl font-bold text-yellow-400 mt-4">
              {result.winner === 'draw' ? '平局' : result.winner === result.homeTeam.name ? '胜利' : '失败'}
            </div>
            {result.winner !== 'draw' && (
              <Trophy className="h-8 w-8 mx-auto mt-2 text-yellow-400" />
            )}
          </div>
          
          <div className="flex-1 text-center">
            <span className="text-6xl">{result.awayTeam.flag}</span>
            <div className="text-2xl font-bold mt-2">{result.awayTeam.name}</div>
            <div className="text-sm opacity-80">客队</div>
          </div>
          
          <div className="text-center">
            <div className="text-6xl font-bold">{result.awayScore}</div>
            <div className="text-2xl font-bold text-yellow-400 mt-4">
              {result.winner === 'draw' ? '平局' : result.winner === result.awayTeam.name ? '胜利' : '失败'}
            </div>
            {result.winner === result.awayTeam.name && (
              <Trophy className="h-8 w-8 mx-auto mt-2 text-yellow-400" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2 text-green-600" />
            比赛统计
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">控球率</span>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-green-600">{result.stats.homePossession}%</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                    style={{ width: `${result.stats.homePossession}%` }}
                  ></div>
                </div>
                <span className="font-bold text-blue-600">{result.stats.awayPossession}%</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">射门次数</span>
              <div className="flex space-x-8">
                <span className="font-bold text-green-600">{result.stats.homeShots}</span>
                <span className="font-bold text-blue-600">{result.stats.awayShots}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">射正次数</span>
              <div className="flex space-x-8">
                <span className="font-bold text-green-600">{result.stats.homeShotsOnTarget}</span>
                <span className="font-bold text-blue-600">{result.stats.awayShotsOnTarget}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">传球成功率</span>
              <div className="flex space-x-8">
                <span className="font-bold text-green-600">{result.stats.homePassAccuracy}%</span>
                <span className="font-bold text-blue-600">{result.stats.awayPassAccuracy}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Circle className="h-5 w-5 mr-2 text-green-600" />
            比赛事件
          </h3>
          
          {result.events.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {result.events.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${getEventColor(event.type)}`}
                >
                  {getEventIcon(event.type)}
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {event.team === result.homeTeam.name ? (
                        <span className="text-green-600">{event.team}</span>
                      ) : (
                        <span className="text-blue-600">{event.team}</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{event.description}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-500">{event.minute}'</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Circle className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <div>本场比赛暂无事件发生</div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          再玩一次
        </button>
      </div>
    </div>
  );
};
