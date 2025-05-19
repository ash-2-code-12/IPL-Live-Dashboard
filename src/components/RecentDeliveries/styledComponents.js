import styled from "styled-components";

export const RecentDSection = styled.section`
    margin-left: 20px;
`

export const DeliveryRes = styled.span`
    color: ${({val, theme})=> val==='W'? 'red' : (val===6 || val===4) ? 'green' : theme.secondaryText};
`