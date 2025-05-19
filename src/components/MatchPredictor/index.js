import { useMatchContext } from "../../context/matchContext"
import {PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip} from 'recharts';
import { PredictorContainer } from "./styledComponents";

const MatchPredictor = () => {
    const {currentInningsId, t1Stats, t2Stats} = useMatchContext();
    if (currentInningsId < 1) return null; // hide until 2nd innings start

    const {wicketsGone, currRR, reqRR, over, deliveryNo} = t2Stats;

    const wicketsLeft = 10 - wicketsGone;
    const ballsBowled = over*6 + deliveryNo;
    const ballsRemaining = Math.max(120 - ballsBowled, 0);

    const rrRatio = reqRR > 0 ? currRR / reqRR : 1; // higher is good for team 2
    const wicketsRatio = wicketsLeft / 10; // higher is good for team 2
    const oversRatio = ballsRemaining / 120; //higher is good for team2

    const rrWeight = 0.45;   // high impact
    const wicketsWeight = 0.33;  // medium impact
    const oversWeight = 0.22;  // less impact

    let t2WinProb = ((rrRatio*rrWeight + wicketsRatio*wicketsWeight + oversRatio*oversWeight) * 100).toFixed(2) ;
    t2WinProb = Math.max(0, Math.min(100, parseFloat(t2WinProb))); // to keep prob in range: [0, 100]
    const t1WinProb = 100 - t2WinProb

    const probData = [
        {name: `${t2Stats.name} ${t2WinProb}%`, value: t2WinProb},
        {name: `${t1Stats.name} ${t1WinProb}%`, value: t1WinProb}
    ];
    if(currentInningsId>1){ //matchOver
        probData[0].name = t2Stats.name;
        probData[1].name = t1Stats.name;
        if(t2WinProb>t1WinProb){
            probData[0].value = 100;
            probData[1].value = 0;
        } else {
            probData[0].value = 0;
            probData[1].value = 100;
        }
    }

    return (
        <PredictorContainer>
            <h3>Winning Probability</h3>
            <ResponsiveContainer>
                <PieChart style={{height: '80%'}}>
                    <Pie
                        data = {probData}
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        paddingAngle={4}
                        label={({name, value}) => `${name}: ${(value)}%`}
                    >
                        <Cell fill={'#F43F5E'}/>
                        <Cell fill={'#8B5CF6'}/>
                    </Pie>
                    <Tooltip />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </PredictorContainer>
    )
}

export default MatchPredictor