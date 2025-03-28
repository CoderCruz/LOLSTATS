import { useState, useEffect } from 'react';
import axios from 'axios';
import ChampIcon from './components/ChampIcon.tsx';
import champBuilder from './pages/ChampBuilder.tsx';
import { getLeagueData } from './services/lolData.ts';

function App() {
  const [ lolData, setLolData ] = useState(null);
  const [loading, setLoading ] = useState<boolean>(true);
  
  useEffect(() => {
    return async () => {
      const leagueData = await getLeagueData();
      console.log(`LeagueData: ${leagueData}`)
      setLolData(leagueData.data.data)
      setLoading(false);
    }
  }, [])

  return(
    loading ? 'Loading...' 
      :
    <div className="w-screen bg-gray-950 p-1 flex flex-col">
      <div className="flex justify-center">
        <ChampIcon champData={lolData}/>
      </div>
    </div>
  )  
}

export default App
