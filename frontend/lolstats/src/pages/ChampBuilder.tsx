import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { getItemData } from '../services/lolData.ts';

const ChampBuilder = () => {
  const location = useLocation();
  const { state } = location;
  const imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';
  const itemBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/';
  const [champStats, setChampStats] = useState(state.stats);
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<String>("");

    
  const getItems = async () => {
    const items = await getItemData()
    const validItems = []
    Object.values(items).forEach(item => {
      if(item.maps?.["11"]) validItems.push(item)
    })
    setItems(validItems);
    setAllItems(validItems);
    setLoading(false);
  }

  const filterItems = e => {
    let input = e.target.value;
    setUserInput(input)
    const filtered = allItems.filter(item => 
      item.name.toLowerCase().includes(input.toLowerCase())
    )
    setItems(filtered)
    

  }

  
  useEffect(() => {
    getItems()
  }, [])

   if (loading) {
      return (
        <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-stone-300 text-lg">
          Loading page...
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

      
      <div className="h-1/2 mt-4 border-t border-stone-700 pt-4 overflow-y-auto">
        <div className="flex px-4 justify-between items-center">
          <h2 className="text-lg font-semibold">Choose Items</h2>
          <input
            type="text"
            value={userInput}
            onChange={filterItems}
            placeholder="Search item..."
            className="w-1/4 h-8 bg-stone-800 border border-stone-700 rounded-md px-4 py-2 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
          {Array.isArray(items) &&
            items.map((item, index) => (
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
