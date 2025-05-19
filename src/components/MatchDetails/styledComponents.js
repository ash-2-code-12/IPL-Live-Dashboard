import styled from "styled-components";

export const MatchDetailsContainer = styled.section`
    margin: 20px 0 0 0;
`
export const Details = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    p{
        margin: 0;
        padding: 0;
    }
`
export const ColoredSpan = styled.span`
    color: ${({color})=> color};
`
export const Title = styled.h2`
    font-weight: 600;
    margin: 8px 0;
`