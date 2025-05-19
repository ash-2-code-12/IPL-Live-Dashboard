import { useState } from "react";
import { useMatchContext } from "../../context/matchContext";
import matchData from '../../data/match_data.json'
import { Toggler } from "../../styledComponents";
import { PlayerHead, PlayerName, PlayerStatsSection, ScoreboardContainer, ScoreTitle, StatName, StatsTable, TableRow } from "./styledComponents";

const ScoreBoard = () =>{
    const {playerStatsData, currentInningsId, playersInField} = useMatchContext();
    const {batter, nonStriker, currBowler} = playersInField;
    const [showFirstInnings, setShowFirstInnings] = useState(true);
    
    const getAllPlayers = teamName => {
        const players = [];
        for(const player in playerStatsData){
            const stats = playerStatsData[player];
            if(stats.team === teamName){
                players.push({...stats, name: player});
            }
        }
        return players;
    }
    const getBowlers = teamName => {
       const bowlers = [];
        for (const player in playerStatsData) {
            const stats = playerStatsData[player];
            const deliveries = stats.oversBowled?.deliveries || 0;
            const overs = stats.oversBowled?.overs || 0;
            if (stats.team === teamName && (overs > 0 || deliveries > 0)) {
                bowlers.push({ name: player, ...stats });
            }
        }
        return bowlers;

    }
    const renderTables = inningId => {
        const isFirst = inningId===0;
        const battingTeam = isFirst ? matchData.info.teams[0] : matchData.info.teams[1];
        const bowlingTeam = !isFirst ?  matchData.info.teams[0] : matchData.info.teams[1];

        const batters = getAllPlayers(battingTeam);
        const bowlers = getBowlers(bowlingTeam);

        return (
            <PlayerStatsSection key={inningId}>
                <div>
                    <ScoreTitle>{battingTeam} Batting</ScoreTitle>
                    <StatsTable>
                        <thead>
                            <tr>
                                <PlayerHead>Batter</PlayerHead>
                                <StatName>R</StatName>
                                <StatName>B</StatName>
                                <StatName>4s</StatName>
                                <StatName>6s</StatName>
                                <StatName>SRate</StatName>
                            </tr>
                        </thead>
                        <tbody>
                            {batters.map(({name, runsScored, ballsFaced, fours, sixes, sRate })=>(
                                <TableRow key={name} isPlaying={name===batter || name===nonStriker}>
                                    <PlayerName>{name}{name===batter && "*"}</PlayerName>
                                    <td>{ballsFaced > 0 ? runsScored: "-"}</td>
                                    <td>{ballsFaced > 0 ? ballsFaced: "-"}</td>
                                    <td>{ballsFaced > 0 ? fours: "-"}</td>
                                    <td>{ballsFaced > 0 ? sixes: "-"}</td>
                                    <td>{ballsFaced > 0 ? sRate: "-"}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </StatsTable>
                </div>
                <div>
                    <ScoreTitle>{bowlingTeam} Bowling</ScoreTitle>
                    <StatsTable>
                        <thead>
                            <tr>
                                <PlayerHead>Bowler</PlayerHead>
                                <StatName>O</StatName>
                                <StatName>R</StatName>
                                <StatName>W</StatName>
                                <StatName>ext</StatName>
                                <StatName>Eco</StatName>
                            </tr>
                        </thead>
                        <tbody>
                            {bowlers.map(({name, oversBowled, extras, runsGiven, wicketsTaken, economy})=>(
                                <TableRow key={name} isPlaying={name===currBowler}>
                                    <PlayerName>{name}{name===currBowler && "*"}</PlayerName>
                                    <td>{`${oversBowled.overs}.${oversBowled.deliveries}`}</td>
                                    <td>{runsGiven}</td>
                                    <td>{wicketsTaken}</td>
                                    <td>{extras}</td>
                                    <td>{economy}</td>
                                </TableRow>
                            ))}
                        </tbody>
                    </StatsTable>
                </div>
            </PlayerStatsSection>
        )
    }

    return (
        <ScoreboardContainer>
            {currentInningsId > 0 && <Toggler onClick={()=> setShowFirstInnings(prev=> !prev)}>Show {showFirstInnings ? " 2 " : " 1 " } Innings</Toggler>}
            {renderTables(showFirstInnings ? 0: 1)}
        </ScoreboardContainer>
    )
}

export default ScoreBoard;