import matchData from '../../data/match_data.json'
import {Title, MatchDetailsContainer, Details} from './styledComponents'
import {RedSpan, BlueSpan, GreenSpan, Label} from '../../styledComponents'

const MatchDetails = () => {
    const {info} = matchData;
    const [team1, team2] = info.teams;
    const venue = info.venue;
    const event = info.event.name;
    const matchType = info.event.stage;
    const dateString = info.dates[0];
    const dateObj = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    const date = dateObj.toLocaleDateString('en-US', options);

    const {winner , decision} = info.toss;

    return (
        <MatchDetailsContainer>
            <Title>{team1} <GreenSpan>vs</GreenSpan> {team2} - <BlueSpan>Live Cricket Scores</BlueSpan>, <RedSpan>Commentary</RedSpan></Title>
            <Details>
                <p><Label>Event :{" "}</Label> {event}, {matchType}</p>
                <p><Label>Venue :{" "}</Label> {venue}</p>
                <p><Label>Date & Time :{" "}</Label>{date}  7:30 PM </p>
                <p><BlueSpan>{winner}</BlueSpan> won the Toss & chose to <RedSpan>{decision}</RedSpan></p>
            </Details>
        </MatchDetailsContainer>
    )
}

export default MatchDetails;