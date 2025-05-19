import styled from 'styled-components';

export const PlayerStatsSection = styled.section`
    margin-bottom: 28px;
`
export const StatsTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;

    thead{
        background-color: ${({theme})=> theme.secondaryBackground};
    }
    th,td {
        padding: 6px 0px;
        text-align: left;
    }
    
`
export const PlayerHead = styled.th`
    width: 160px;
    padding-left: 8px !important;
`
export const PlayerName = styled.td`
    width: 160px;
    padding-left: 8px !important;
`
export const StatName = styled.th`
    width: 44px;
`