import {createContext, useContext, useState} from 'react'

const MatchContext = createContext();

export const MatchProvider = ({children}) => {
    const [currentDeliveries, setCurrentDeliveries] = useState([]);
    const [currentInningsId, setCurrentInningsId] = useState(0);
    const [playersInField, setPlayersInField] = useState({
        batter: "",
        nonStriker: "",
        currBowler: "",
    });
    const [playerStatsData, setPlayerStatsData] = useState({});
    const [recentDeliveries, setRecentDeliveries] = useState([]);
    const [t1Stats, setT1Stats] = useState({
        name: "SRH",
        totalRuns: 0,
        wicketsGone: 0,
        currRR: 0.0,
        over: 0,
        deliveryNo: 0,
    })
    const [t2Stats, setT2Stats] = useState({
        name: "RR",
        totalRuns: 0,
        wicketsGone: 0,
        currRR: 0.0,
        target: 0,    // exclusive
        reqRR: 0.0,   // exclusive
        over: 0,
        deliveryNo: 0,
    })

    const calcCurrRR = (totalRuns, over, deliveryNo) => {
        const totalOvers = over + deliveryNo / 6;
        return totalOvers > 0 ? parseFloat((totalRuns / totalOvers).toFixed(2)) : 0.0;
    };

    const calcReqRR = (runsScored, targetScore, over, deliveryNo) =>{
        const ballsBowled = over*6 + deliveryNo;
        const ballsRemaining = 120 - ballsBowled;
        const runsRemaining = targetScore  - runsScored;
        return ballsRemaining > 0 ? parseFloat((runsRemaining*6/ballsRemaining).toFixed(2)) : Infinity;
    }

    const addRuns = (runs, type) => {
    if (currentInningsId === 0) {
        setT1Stats(prev => {
            const newTotalRuns = prev.totalRuns + runs;
            const newDeliveryNo = type === 'extras' ? prev.deliveryNo : prev.deliveryNo + 1;
            const currRR = calcCurrRR(newTotalRuns, prev.over, newDeliveryNo);

            return {
                ...prev,
                totalRuns: newTotalRuns,
                deliveryNo: newDeliveryNo,
                currRR,
            };
        });
    } else {
        setT2Stats(prev => {
            const newTotalRuns = prev.totalRuns + runs;
            const newDeliveryNo = type === 'extras' ? prev.deliveryNo : prev.deliveryNo + 1;
            const currRR = calcCurrRR(newTotalRuns, prev.over, newDeliveryNo);
            const reqRR = calcReqRR(newTotalRuns, prev.target, prev.over, newDeliveryNo);

            return {
                ...prev,
                totalRuns: newTotalRuns,
                deliveryNo: newDeliveryNo,
                currRR,
                reqRR,
            };
        });
    }
};

const addWicket = () => {
    if (currentInningsId === 0) {
        setT1Stats(prev => {
            const newDeliveryNo = prev.deliveryNo + 1;
            const currRR = calcCurrRR(prev.totalRuns, prev.over, newDeliveryNo);

            return {
                ...prev,
                wicketsGone: prev.wicketsGone + 1,
                deliveryNo: newDeliveryNo,
                currRR,
            };
        });
    } else {
        setT2Stats(prev => {
            const newDeliveryNo = prev.deliveryNo + 1;
            const currRR = calcCurrRR(prev.totalRuns, prev.over, newDeliveryNo);
            const reqRR = calcReqRR(prev.totalRuns, prev.target, prev.over, newDeliveryNo);
            
            return {
                ...prev,
                wicketsGone: prev.wicketsGone + 1,
                deliveryNo: newDeliveryNo,
                currRR,
                reqRR,
            };
        });
    }
};

    const updateOver = overNo => {
        if(currentInningsId===0) {
            setT1Stats(prev => ({...prev, 
                over: overNo, 
                deliveryNo: 0, 
            }))
        } else {
            setT2Stats(prev => ({...prev, 
                over: overNo, 
                deliveryNo: 0,
            }))
        }
    }

    const value = {
        currentDeliveries, 
        setCurrentDeliveries,
        currentInningsId,
        setCurrentInningsId,
        recentDeliveries,
        setRecentDeliveries,
        t1Stats,
        t2Stats,
        setT2Stats,
        addRuns,
        addWicket,
        updateOver,
        playersInField, 
        setPlayersInField,
        playerStatsData, 
        setPlayerStatsData,
        speed: 2000,
    }
    
    return (
        <MatchContext.Provider value={value}>
            {children}
        </MatchContext.Provider>
    );
}

export const useMatchContext = () => useContext(MatchContext);