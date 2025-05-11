
import { useState, useEffect } from 'react';
import ChampIcon from './components/ChampIcon.tsx';
import { getLeagueData } from './services/lolData.ts';

function App() {
  const [lolData, setLolData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const leagueData = await getLeagueData();
      setLolData(leagueData.data.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-stone-300 text-lg">
        Loading champions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-stone-300 px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Build Your Champion</h1>
        <p className="text-stone-400 text-sm sm:text-base">
          Select a champion below to view stats and customize builds.
        </p>
      </div>

      <ChampIcon champData={lolData} />
    </div>
  );
}

export default App;
