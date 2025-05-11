import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { getItemData } from '../services/lolData.ts';

const ChampBuilder = () => {
  const location = useLocation();
  const { state } = location;
  const imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';
  const itemBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/';
  const [champStats, setChampStats] = useState(state.stats);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

    
  const getItems = async () => {
    const items = await getItemData()
    console.log(items)
    setItems(Object.values(items));
    setLoading(false);
  }

  
  useEffect(() => {
    return async () => await getItems()
  }, [])

   console.log(items)
   if (loading) {
      return (
        <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-stone-300 text-lg">
          Loading champions...
        </div>
      );
    }

  
  return (
    <div className="h-screen bg-gray-950 p-4 text-stone-300 flex flex-col">
      <div className="flex h-1/2 gap-4">
        <img
          className="w-32 h-32 object-contain border border-stone-700 rounded"
          src={`${imageBaseURL}${state.image.full}`}
          alt={`image of ${state.name}`}
        />

        <div className="flex flex-wrap content-start gap-4 overflow-y-auto">
          <div className="w-full text-xl font-bold">{state.name}</div>
          {Object.entries(champStats).map(([key, value]) => (
            <div key={key} className="w-40 bg-stone-800 p-2 rounded shadow">
              <h3 className="text-sm text-stone-400">{key}</h3>
              <h3 className="text-md font-semibold">{value}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom half: Items... Info needed; name, image, on hover -> description, cost*/}
      <div className="h-1/2 mt-4 border-t border-stone-700 pt-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Choose Items</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {Array.isArray(items) && items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-stone-800 p-2 rounded hover:bg-stone-700 cursor-pointer transition"
            >
              <img
                className="w-12 h-12 object-contain mb-1"
                src={`${itemBaseURL}${item.image.full}`}
                alt={item.name}
              />
              <span className="text-sm text-center">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChampBuilder;
