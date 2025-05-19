import { useMatchContext } from "./context/matchContext";

import MatchDetails from "./components/MatchDetails";

import matchData from './data/match_data.json';
import { useEffect, useState } from "react";
import LiveCommentary from "./components/LiveCommentary";
import InningsSummary from "./components/InningsSummary";
import RecentDeliveries from "./components/RecentDeliveries";
import LivePlayerStats from "./components/LivePlayerStats";
import MatchPredictor from "./components/MatchPredictor";
import {darkTheme, lightTheme} from './data/themes'
import {ThemeProvider} from 'styled-components'
import GlobalStyle from "./GlobalStyle";

import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'


import {AppContainer, Header, ContentContainer, StatsPredictorSection, StatsRecentDSection, Seperator, RedSpan, BlueSpan, Toggler} from './styledComponents'
import Scoreboard from "./components/ScoreBoard";

const getAllDeliveries = innings => {
  const allDeliveries = innings.overs.reduce((acc, over) => {
    over.deliveries.forEach((delivery, idx) => {
      acc.push({
        ...delivery, 
        over: over.over, 
        deliveryNo: idx+1, 
        team:innings.team 
      });
    });
    return acc;
  }, [])
  return allDeliveries;
}

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(JSON.parse(localStorage.getItem('savedIsDarkTheme')) || false);
  const themeData = isDarkTheme ? darkTheme : lightTheme;
  const innings1 = matchData.innings[0];
  const innings2 = matchData.innings[1];
  const {t1Stats, t2Stats, currentInningsId, setPlayersInField, setPlayerStatsData} = useMatchContext();
  const [showScoreBoardOverPredictor, setShowBoardOverPredictor] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prev => {
      const next = !prev;
      localStorage.setItem('savedIsDarkTheme', JSON.stringify(next));
      return next;
    });
  };
 
  useEffect(()=>{
    const initialPlayers = {
      batter: innings1.overs[0].deliveries[0].batter,
      nonStriker: innings1.overs[0].deliveries[0].non_striker,
      currBowler: innings1.overs[0].deliveries[0].bowler
    };
    setPlayersInField(initialPlayers);

    const defaultStats = {name: "", runsScored: 0, ballsFaced: 0, fours: 0, sixes: 0, sRate: 0.00, oversBowled: {overs: 0, deliveries: 0}, runsGiven: 0, wicketsTaken: 0, extras: 0, economy: 0.00};
    const allPlayerStats = {};
    const players = matchData.info.players;
    for(const team in players){
      for(const player of players[team]){
        allPlayerStats[player] = {...defaultStats, name: player, team: team};
      }
    }
    setPlayerStatsData(allPlayerStats);
    
  }, []);
  
  return (
    <ThemeProvider theme={themeData}>
      <GlobalStyle isDarkTheme={isDarkTheme} />
      <AppContainer>
        <Header>
          <img src="/ipl-app-logo.png" alt="app-logo" />
          <button onClick={toggleTheme}>
            {isDarkTheme ? (
              <FiSun size="28" color="#ffffff" />
            ) : (
              <FaMoon size="24" color="#000000" />
            )}
          </button>
        
        </Header>

        <ContentContainer>
          <MatchDetails />

          <Seperator />

          <InningsSummary />

          <Seperator style={{marginBottom:"8px"}} />
          <Toggler onClick={() => setShowBoardOverPredictor(prev => !prev)}>
            {showScoreBoardOverPredictor ? "Show Current Play" : "Show Scoreboard"}
          </Toggler>

          {showScoreBoardOverPredictor ? 
              <Scoreboard />
              : 
              <StatsPredictorSection>
                  <StatsRecentDSection>
                    <LivePlayerStats />
                  <RecentDeliveries />
                </StatsRecentDSection>
                {currentInningsId > 0 && <MatchPredictor />}
              </StatsPredictorSection> 
            }

          <Seperator style={{marginTop: '12px'}} />    

          {currentInningsId>0 && (
            <>
              <div>
                <p><strong>2nd Innings :</strong> <RedSpan style={{marginLeft: '12px'}}>Batting : {" "}</RedSpan>{t2Stats.name}{" "}<BlueSpan style={{marginLeft: '12px'}}>Bowling : {" "}</BlueSpan>{t1Stats.name}</p>
                <LiveCommentary deliveries={getAllDeliveries(innings2)}  />
              </div>
              <Seperator style={{marginTop: '0px'}} />
            </>
          ) }
          
          <div>
            <p><strong>1st Innings :</strong> <RedSpan style={{marginLeft: '12px'}}>Batting : {" "}</RedSpan>{t1Stats.name}{" "}<BlueSpan style={{marginLeft: '12px'}}>Bowling : {" "}</BlueSpan>{t2Stats.name}</p>
            <LiveCommentary deliveries={getAllDeliveries(innings1)}  />
          </div>
        </ContentContainer>
  
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
