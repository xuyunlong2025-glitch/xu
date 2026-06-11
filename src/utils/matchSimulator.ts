import { Team, MatchResult, MatchEvent, MatchStats } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const calculateTeamStrength = (team: Team): number => {
  const starters = team.players.filter((p) => p.isStarter);
  if (starters.length === 0) return team.strength;

  const avgSkill = starters.reduce((sum, p) => sum + p.skill, 0) / starters.length;
  const avgStamina = starters.reduce((sum, p) => sum + p.stamina, 0) / starters.length;
  
  return Math.round((team.strength * 0.6) + (avgSkill * 0.25) + (avgStamina * 0.15));
};

const generateEvents = (homeTeam: Team, awayTeam: Team): MatchEvent[] => {
  const events: MatchEvent[] = [];
  const homeStrength = calculateTeamStrength(homeTeam);
  const awayStrength = calculateTeamStrength(awayTeam);
  
  const homeStarters = homeTeam.players.filter(p => p.isStarter);
  const awayStarters = awayTeam.players.filter(p => p.isStarter);
  
  const allHomePlayers = [...homeStarters];
  const allAwayPlayers = [...awayStarters];
  
  const goalProbability = (teamStrength: number, opponentStrength: number, minute: number): number => {
    const baseProb = (teamStrength / (teamStrength + opponentStrength)) * 0.02;
    const minuteFactor = minute < 30 ? 0.7 : minute > 75 ? 1.5 : 1;
    return baseProb * minuteFactor;
  };

  for (let minute = 1; minute <= 90; minute++) {
    if (Math.random() < goalProbability(homeStrength, awayStrength, minute)) {
      const scorer = allHomePlayers[Math.floor(Math.random() * allHomePlayers.length)];
      events.push({
        minute,
        type: 'goal',
        player: scorer.name,
        team: homeTeam.name,
        description: `${scorer.name} 进球!`,
      });
    }

    if (Math.random() < goalProbability(awayStrength, homeStrength, minute)) {
      const scorer = allAwayPlayers[Math.floor(Math.random() * allAwayPlayers.length)];
      events.push({
        minute,
        type: 'goal',
        player: scorer.name,
        team: awayTeam.name,
        description: `${scorer.name} 进球!`,
      });
    }

    if (Math.random() < 0.008) {
      const isHome = Math.random() > 0.5;
      const players = isHome ? allHomePlayers : allAwayPlayers;
      const player = players[Math.floor(Math.random() * players.length)];
      events.push({
        minute,
        type: 'yellow_card',
        player: player.name,
        team: isHome ? homeTeam.name : awayTeam.name,
        description: `${player.name} 吃到黄牌`,
      });
    }

    if (Math.random() < 0.0015) {
      const isHome = Math.random() > 0.5;
      const players = isHome ? allHomePlayers : allAwayPlayers;
      const player = players[Math.floor(Math.random() * players.length)];
      events.push({
        minute,
        type: 'red_card',
        player: player.name,
        team: isHome ? homeTeam.name : awayTeam.name,
        description: `${player.name} 被红牌罚下`,
      });
    }
  }

  return events.sort((a, b) => a.minute - b.minute);
};

const calculateStats = (homeTeam: Team, awayTeam: Team, events: MatchEvent[]): MatchStats => {
  const homeStrength = calculateTeamStrength(homeTeam);
  const awayStrength = calculateTeamStrength(awayTeam);
  
  const totalStrength = homeStrength + awayStrength;
  const homePossession = Math.round((homeStrength / totalStrength) * 100);
  
  const homeShots = Math.floor(Math.random() * 8) + 8 + Math.floor(homeStrength / 15);
  const awayShots = Math.floor(Math.random() * 8) + 8 + Math.floor(awayStrength / 15);
  
  const homeGoals = events.filter(e => e.type === 'goal' && e.team === homeTeam.name).length;
  const awayGoals = events.filter(e => e.type === 'goal' && e.team === awayTeam.name).length;
  
  const homeShotsOnTarget = Math.min(homeShots, homeGoals + Math.floor(Math.random() * 4) + 2);
  const awayShotsOnTarget = Math.min(awayShots, awayGoals + Math.floor(Math.random() * 4) + 2);

  return {
    homePossession,
    awayPossession: 100 - homePossession,
    homeShots,
    awayShots,
    homeShotsOnTarget,
    awayShotsOnTarget,
    homePassAccuracy: 75 + Math.floor(Math.random() * 15) + Math.floor(homeStrength / 20),
    awayPassAccuracy: 75 + Math.floor(Math.random() * 15) + Math.floor(awayStrength / 20),
  };
};

export const simulateMatch = (homeTeam: Team, awayTeam: Team): MatchResult => {
  const events = generateEvents(homeTeam, awayTeam);
  const stats = calculateStats(homeTeam, awayTeam, events);
  
  const homeScore = events.filter(e => e.type === 'goal' && e.team === homeTeam.name).length;
  const awayScore = events.filter(e => e.type === 'goal' && e.team === awayTeam.name).length;
  
  let winner = 'draw';
  if (homeScore > awayScore) winner = homeTeam.name;
  else if (awayScore > homeScore) winner = awayTeam.name;

  return {
    id: generateId(),
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    winner,
    events,
    stats,
  };
};
