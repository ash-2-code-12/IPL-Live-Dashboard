import styled from "styled-components"

export const RedSpan = styled.span`
    color: #db3038;
`

export const BlueSpan = styled.span`
    color: #6f77c9;
`
export const GreenSpan = styled.span`
    color:rgb(111, 201, 118);
`
export const Label = styled.span`
    font-weight: 500;
    color:rgb(186, 53, 133);
`
export const Seperator = styled.hr`
    margin: 20px 0;
    color: ${({theme})=> theme.secondaryText};
`
export const AppContainer = styled.main`
    min-width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Header = styled.header`
    height: 64px;
    align-self: stretch;
    padding: 0 24px 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme})=> theme.secondaryBackground};
    color:  ${({theme})=> theme.primaryText};

    img{
        width: 80px;
    }
`
export const ContentContainer = styled.section`
    max-width: 1100px;
    padding: 0 12px 40px 12px;
`
export const StatsPredictorSection = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

`
export const StatsRecentDSection = styled.div`
    width: 380px;

`
export const Toggler = styled.button`
    background-color: ${({theme})=> theme.secondaryBackground};
    color: ${({theme})=> theme.button};
    padding: 8px 12px;
    border-radius: 12px;
    margin-bottom: 12px;
`