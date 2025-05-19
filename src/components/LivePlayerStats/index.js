import { useMatchContext } from "../../context/matchContext";

import {StatsTable, PlayerStatsSection, PlayerHead, PlayerName, StatName} from './styledComponents'

const LivePlayerStats = () => {
    const {playerStatsData, playersInField} = useMatchContext();
    const {batter, nonStriker, currBowler} = playersInField;

    const renderBatterRow = name => {
        if(!name || !playerStatsData[name]) return null;

        const stats = playerStatsData[name];
        if(!stats) return <p>Player doesn't exist</p>;

        return (
            <tr>
                <PlayerName>{name === batter ? `${name}*` : name}</PlayerName>
                <td>{stats.runsScored}</td>
                <td>{stats.ballsFaced}</td>
                <td>{stats.fours}</td>
                <td>{stats.sixes}</td>
                <td>{stats.sRate}</td>
            </tr>
        );
    };

    const renderBowlerRow = () => {
        if(!currBowler || !playerStatsData[currBowler]) return null;

        const stats = playerStatsData[currBowler];
        if(!stats) return <p>Player Doesn't exist</p>;

        return (
            <tr>
                <PlayerName>{currBowler}</PlayerName>
                <td>{`${stats.oversBowled.overs}.${stats.oversBowled.deliveries}`}</td>
                <td>{stats.runsGiven}</td>
                <td>{stats.wicketsTaken}</td>
                <td>{stats.extras}</td>
                <td>{stats.economy}</td>
            </tr>
        );
    };

    return (
        <PlayerStatsSection>
            <StatsTable>
                <thead>
                    <tr>
                        <PlayerHead>Batter</PlayerHead>
                        <StatName>R</StatName>
                        <StatName>B</StatName>
                        <StatName>4s</StatName>
                        <StatName>6s</StatName>
                        <StatName>SR</StatName>
                    </tr>
                </thead>
                <tbody>
                    {renderBatterRow(batter)}
                    {renderBatterRow(nonStriker)}
                </tbody>
            </StatsTable>

            <StatsTable>
                <thead>
                    <tr>
                        <PlayerHead>Bowler</PlayerHead>
                        <StatName>O</StatName>
                        <StatName>R</StatName>
                        <StatName>W</StatName>
                        <StatName>E</StatName>
                        <StatName>ECO</StatName>
                    </tr>
                </thead>
                <tbody>
                    {renderBowlerRow()}
                </tbody>
            </StatsTable>
        </PlayerStatsSection>
    )
}

export default LivePlayerStats;