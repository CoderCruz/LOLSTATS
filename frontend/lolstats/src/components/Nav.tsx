import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getLeagueData } from '../services/lolData.ts';
import { Champion } from '../types.ts';

const Nav = () => {
  const [userInput, setUserInput] = useState('');
  const [champions, setChampions] = useState<Champion[]>([]);
  const [recommendations, setRecommendations] = useState<Champion[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChamps = async () => {
      const champData = await getLeagueData();

      if (!champData || typeof champData !== 'object') {
        console.error('Invalid champ data structure:', champData);
        return;
      }

      const championsArray = Object.values(champData);
      setChampions(championsArray);
    };

    fetchChamps();
  }, []);

  const onChampSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    if (!champions.length) return;

    const filtered = champions.filter((champ) =>
      champ.name.toLowerCase().includes(input.toLowerCase())
    );
    setRecommendations(filtered);
  };

  const handleSelect = (champ: Champion) => {
    navigate('/champ-builder', {
      state: {
        name: champ.name,
        image: champ.image,
        stats: champ.stats,
      },
    });

    setUserInput('');
    setRecommendations([]);
  };

  return (
    <nav className="w-full bg-gray-950 px-4 py-4 flex flex-col md:flex-row md:items-center justify-between text-stone-300 relative z-50 border-b border-stone-800">
      {/* Logo */}
      <div className="text-2xl font-bold mb-3 md:mb-0">
        <Link to="/" className="hover:text-white transition">
          LOLSTATS
        </Link>
      </div>

      {/* Search Box */}
      <div className="relative w-full md:max-w-md">
        <input
          type="text"
          value={userInput}
          onChange={onChampSearch}
          placeholder="Search champion..."
          className="w-full bg-stone-800 border border-stone-700 rounded-md px-4 py-2 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600"
        />
        {recommendations.length > 0 && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-stone-900 border border-stone-700 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
            {recommendations.map((champ) => (
              <li
                key={champ.name}
                className="px-4 py-2 hover:bg-stone-700 cursor-pointer transition-colors"
                onClick={() => handleSelect(champ)}
              >
                {champ.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;

