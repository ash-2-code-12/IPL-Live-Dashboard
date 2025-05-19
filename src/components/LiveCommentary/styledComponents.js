import styled, {keyframes} from 'styled-components'

export const LiveCommentarySection = styled.section`
    padding-left: 16px; 
`
export const CommentaryBox = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const slideIn = keyframes`
  from {
    transform: translateX(-60px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
export const CommentaryItem = styled.li`
    display: flex;
    padding: 3px 0;
    
  animation: ${slideIn} 0.4s ease-out;
`
export const OverSummary = styled.li`
    background-color: ${({theme}) => theme.secondaryBackground};
    height: 54px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    p{
        margin: 0;
        border-right: 1px solid ${({theme})=>theme.primaryText};
    }
`
export const OverNo = styled.p`
    font-weight: 700;
    font-size: 20px;
    padding: 8px 20px;
`
export const RunsScored = styled.p`
    font-size: 12px; 
    padding: 4px 16px 4px 0;
`
export const Economy = styled.p`
    padding: 10px 16px 12px 0;
    font-size: 12px;
`
export const WicketsTaken = styled.p`
    padding: 3px 16px 3px 0;
    font-size: 12px;
`