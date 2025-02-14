import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChampIcon from './components/ChampIcon.tsx';
import champBuilder from './pages/ChampBuilder.tsx';

function App() {
  const [ lolData, setLolData ] = useState(null);
  const [loading, setLoading ] = useState<boolean>(true);

  async function getLeagueData() {
    try {
      const leagueData = await axios.get('https://ddragon.leagueoflegends.com/cdn/15.1.1/data/en_US/champion.json')
      setLolData(leagueData.data.data); 
      setLoading(false);

    }catch (error) {
      console.log(`ERROR: ${error}`) 
    }
  }

  useEffect(() => {
    return () => {
      getLeagueData();
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
