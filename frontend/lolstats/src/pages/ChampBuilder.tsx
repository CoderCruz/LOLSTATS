import { useLocation } from 'react-router';
import { useState } from 'react';

const ChampBuilder = () => {
  const location = useLocation();
  const { state } = location;
  const imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';

  const [champStats, setChampStats] = useState(state.stats);
  console.log(champStats);


function formatKey(key) {
  return (
    key
      // Replace underscores with spaces
      .replace(/_/g, ' ')
      // Insert a space before any capital letter that follows a lowercase
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize the first character
      .replace(/^./, (match) => match.toUpperCase())
  );
}

  return (
    <div className="w-screen bg-gray-950 p-1 flex flex-col h-screen text-stone-300">
      <img
        className="w-1/17 h-1/15"
        src={`${imageBaseURL}${state.image.full}`}
        alt={`image of ${state.name}`}
      />
      <div>
        <h4>{state.name}</h4>
        {/* Use map instead of forEach, and fix the h3 closing tags */}
        {Object.entries(champStats).map(([key, value]) => (
          <div key={key}>
            <h3>{formatKey(key)}</h3>
            <h3>{value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampBuilder;
