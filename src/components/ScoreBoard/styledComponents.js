import styled from 'styled-components';

export const PlayerStatsSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
export const StatsTable = styled.table`
    border-collapse: collapse;

    thead{
        background-color: ${({theme})=> theme.secondaryBackground};
    }
    th,td {
        text-align: left;
    }
    tr{
        padding: 0px 8px;
    }
    
`
export const TableRow =styled.tr`
     color: ${({isPlaying, theme})=> isPlaying ? 'green': theme.primaryText} !important;
        ${({isPlaying})=> isPlaying ? `font-weight: 500 !important;`: ""}
        ${({isPlaying})=>console.log("isPlaying:" ,isPlaying)}
`
export const PlayerHead = styled.th`
    width: 160px;
    padding-left: 8px !important;
    font-weight: 500;

`
export const PlayerName = styled.td`
    width: 160px;
    padding-left: 8px !important;
`
export const StatName = styled.th`
    width: 44px;
`

export const ScoreboardContainer = styled.div`
`;

export const ScoreTitle = styled.h3`
  font-weight: 500;
`;