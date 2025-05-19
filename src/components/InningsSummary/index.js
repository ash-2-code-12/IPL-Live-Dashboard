import { useMatchContext } from "../../context/matchContext";
import matchData from "../../data/match_data.json";
import {InningsSummarySection, TeamName, ScoreWicketContainer, ReqRRTargetContainer} from './styledComponents'
import {RedSpan, BlueSpan, Label, GreenSpan} from '../../styledComponents'

const InningsSummary = () => {
  const {
    currentInningsId,
    t1Stats,
    t2Stats
  } = useMatchContext();

  const matchOver = currentInningsId > 1;
  const outcome = matchData.info?.outcome;

  const getMatchResult = () => {
    if (!outcome) return null;
    let res ;

    if (outcome.by.runs)
      res = `${t1Stats.name} won by ${outcome.by.runs} runs`;

    if (outcome.by.wickets)
      res = `${t2Stats.name} won by ${outcome.by.wickets} wickets`;

    return res;
  };

  const renderStats = (teamId, stats, isLive) => {
    if (currentInningsId < teamId) {
      return <h3 style={{fontSize: '16px'}}>Yet to bat</h3>;
    }

    const { totalRuns, wicketsGone, over, deliveryNo, currRR} = stats;
    const ballsInOver = deliveryNo % 6;

    return (
        <h3>
          <BlueSpan>{totalRuns}</BlueSpan>/<RedSpan>{wicketsGone}</RedSpan>
          {" ("}<GreenSpan>{`${over}.${ballsInOver}`}</GreenSpan>{") "}
          <span style={{marginLeft: '12px', fontSize: '13px'}}>{isLive ? `CRR: ${currRR}` : `Final RR: ${currRR}`}</span>
        </h3>
    );
  };

  return (
    <InningsSummarySection>
      
      <ScoreWicketContainer>
        <TeamName>{t1Stats.name}</TeamName>
        {renderStats(0, t1Stats, currentInningsId === 0)}
      </ScoreWicketContainer>

      <ScoreWicketContainer>
        <TeamName>{t2Stats.name}</TeamName>
        {renderStats(1, t2Stats, currentInningsId === 1)}
      </ScoreWicketContainer>
      {currentInningsId===1 && t2Stats.reqRR && (
          <ReqRRTargetContainer>
            <p><Label>Req. rr:</Label> <span style={{fontWeight: '500'}}>{t2Stats.reqRR}</span></p>
            <p><Label>Target</Label> <span style={{fontWeight: '500'}}>{t2Stats.target}</span></p>
          </ReqRRTargetContainer>
        )}

      {matchOver && (
        <>
          
          <p>{getMatchResult()}</p>
    
        <p>Player of the Match: <BlueSpan>{matchData.info.player_of_match[0]}</BlueSpan></p>
        </>
      )}
    </InningsSummarySection>
  );
};

export default InningsSummary;
