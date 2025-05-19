import { useEffect, useState } from "react";
import { useMatchContext } from "../../context/matchContext"
import { LiveCommentarySection, CommentaryBox, CommentaryItem, OverSummary, OverNo, RunsScored, WicketsTaken, Economy } from "./styledComponents";
import { GreenSpan, RedSpan, BlueSpan, Label } from "../../styledComponents";


const getCommentaryText = (delivery) => {
  const { bowler, batter, non_striker, runs } = delivery;
  const isWicket = delivery.wickets !== undefined;
  const isExtra = delivery.extras !== undefined;

  const comment = [`${bowler} to ${batter}, `];

  if (isWicket) {
    const { kind, fielders, player_out } = delivery.wickets[0];
    const fieldersInvolved = fielders ? fielders.map(f => f.name).join(' and ') : "";
    comment.push(<RedSpan style={{fontWeight: '500'}}>Wicket!!!{" "}</RedSpan>)

    if (kind === 'caught') comment.push( `Caught by ${fieldersInvolved}, ${player_out} departs...`);
    else if (kind === 'run out') comment.push(`Run Out by ${fieldersInvolved}, ${player_out} departs...`);
    else comment.push(`Bowled! Excellent delivery by ${bowler}, ${player_out} departs...`);
  } else if (runs.total === 0) {
    comment.push(`Amazingly bowled, DOT ball.`);
  } else {
    if (runs.batter === 6){
        comment.push(<GreenSpan style={{fontWeight:'500'}}>SIX!!!{" "}</GreenSpan>)
        comment.push(`Amazingly timed, shot into the stands `);
    }
    else if (runs.batter === 4){
        comment.push(<Label style={{fontWeight:'500'}}>FOUR!!!{" "}</Label>)
        comment.push(`Sliced into gap, boundary`);
    }
    else if (runs.batter === 1){
        comment.push(<BlueSpan style={{fontWeight:'500'}}>Single...{" "}</BlueSpan>)
        comment.push(`${non_striker} takes the crease`);
    }
    else if(runs.batter!==0) comment.push(`Flicked, Quick ${runs.batter} runs `);
  }

  if (isExtra) {
    const extraType = Object.keys(delivery.extras)[0];
    comment.push(`${extraType}, ${runs.extras} given, total: ${runs.total}`);
  }

  return <>{comment}</>;
};



const LiveCommentary = ({deliveries}) =>{
    const {setCurrentDeliveries, setCurrentInningsId, setPlayersInField, setPlayerStatsData, recentDeliveries, setRecentDeliveries, addRuns, addWicket, updateOver, t1Stats, setT2Stats, speed} = useMatchContext();
    const [index, setIndex] = useState(0);
    const [commentaryItems, setCommentaryItems] = useState([]);
    const [lastOverRendered, setLastOverRendered] = useState(-1);

    useEffect(() => {
        if(index >= deliveries.length) return; // to stop once innings all deliveries over
        
        const timer = setTimeout(()=>{
            const currentDelivery = deliveries[index];
            if (!currentDelivery) return;
            let deliveryRes;

            const {batter, bowler, non_striker, runs, extras, wickets} = currentDelivery;

            setPlayersInField({
                batter: batter,
                nonStriker: non_striker,
                currBowler: bowler,
            });

            setCurrentDeliveries(prev => [...prev, currentDelivery]);

            setPlayerStatsData(prev => {
                let stats = {...prev}

                const batterStats = {...stats[batter]}; // update batter's stats
                batterStats.runsScored += runs.batter;
                batterStats.ballsFaced += extras ? 0 : 1;
                if (runs.batter === 4) batterStats.fours += 1;
                if (runs.batter === 6) batterStats.sixes += 1;
                batterStats.sRate = ((batterStats.runsScored/ batterStats.ballsFaced) * 100).toFixed(2) || 0;
                stats[batter] = {...batterStats};

                const bowlerStats = {...stats[bowler]}; //updating bowlers state
                bowlerStats.runsGiven += runs.total;
                if(wickets){
                    bowlerStats.wicketsTaken += wickets.length;
                }
                if(extras){
                    bowlerStats.extras += runs.extras;
                }
                if(!extras){
                    const {overs, deliveries} = bowlerStats.oversBowled;
                    if(deliveries<5){
                        bowlerStats.oversBowled = {overs, deliveries: deliveries+1};
                    } else {
                        bowlerStats.oversBowled = {overs: overs+1, deliveries: 0};
                    }
                }
                const ballsBowled = bowlerStats.oversBowled.overs * 6 + bowlerStats.oversBowled.deliveries;
                bowlerStats.economy = ballsBowled > 0 ? (((bowlerStats.runsGiven * 6) / ballsBowled)).toFixed(2) : 0.00;
                stats[bowler] = {...bowlerStats};

                return stats;
            })

            const isWicket = wickets !== undefined;
            const isExtra = extras !== undefined;

            if (isWicket) {
                addWicket();
                deliveryRes = 'W';
            }
            if (runs.batter > 0 || runs.total===0) {
                addRuns(runs.batter, 'bat');
                deliveryRes = runs.batter;
            }
            if(isExtra){
                addRuns(runs.extras, 'extras');
                deliveryRes = `e${runs.extras}`
            }
            setRecentDeliveries(prev => [...prev, deliveryRes])
            
            const deliveryLabel = `${currentDelivery.over}.${currentDelivery.deliveryNo}`; //denote ball - 0.1, 0.2...
            setCommentaryItems(prev => [
                <CommentaryItem key={`${index}-ball`}>
                    <span style={{marginRight: '12px', fontWeight: '600'}}>{deliveryLabel}</span> <span>{getCommentaryText(currentDelivery)}</span>
                </CommentaryItem>,
                ...prev,
            ])

            const isOverEnd = !deliveries[index + 1] || deliveries[index + 1].over !== currentDelivery.over; //if next ballhas diff over prop
            if(isOverEnd && currentDelivery.over !== lastOverRendered) {
                updateOver(currentDelivery.over+1);

                const currentOver = deliveries.filter(d => d.over===currentDelivery.over);
                const overRuns = currentOver.reduce((sum, curr)=> sum+curr.runs.total, 0);
                const wickets = currentOver.filter(d => d.wickets !== undefined).length;
                const extras = currentOver.filter(d => d.extras !== undefined).reduce((sum, curr) => sum+=curr.runs.extras, 0);
                let overDeliveries = recentDeliveries.slice(-5);
                overDeliveries = [...overDeliveries, deliveryRes];
                setRecentDeliveries(prev=> [...prev, "|"])


                setCommentaryItems(prev => [
                    <OverSummary key={`${index}-summary`}>
                        <OverNo>{currentDelivery.over+1}</OverNo>
                        <RunsScored>
                            Runs Scored: <span style={{fontWeight: 500, fontSize: '14px'}}>{overRuns}</span><br />
                            <span style={{paddingTop: '8px'}}>
                                {overDeliveries.map((each, idx) =><span style={{fontWeight: '500', marginRight: '6px'}} key={idx}>{each}</span>)}
                            </span>
                        </RunsScored>
                        <WicketsTaken>
                            Wickets: <span style={{fontWeight: 500, fontSize: '14px'}}>{wickets}</span>
                            <br />
                            Extras :  <span style={{fontWeight: 500, fontSize: '14px'}}>{extras}</span>
                        </WicketsTaken>
                        <Economy>
                            Eco: <span style={{fontWeight: 500, fontSize: '14px'}}>{(overRuns/6).toFixed(2)}</span>
                        </Economy>
                            
                    </OverSummary>,
                    ...prev
                ]);
                
                setLastOverRendered(currentDelivery.over);
            }

            setIndex(prev => prev+1);// to point to next delivery

            if(index+1 === deliveries.length){ //end of innings
                setCurrentInningsId(prev => prev+1);
                setT2Stats(prev => ({...prev, target: t1Stats.totalRuns+1}))
                setRecentDeliveries([]);
            }

        }, speed)
        return () => clearTimeout(timer); //to clear timer when unmount

    }, [index, deliveries]);

    return (
        <LiveCommentarySection>
            <CommentaryBox>{commentaryItems}</CommentaryBox>
        </LiveCommentarySection>
    );
}

export default LiveCommentary
