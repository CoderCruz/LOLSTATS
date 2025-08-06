import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { getItemData } from '../services/lolData.ts';
import { Champion } from '../types';

type ItemType = {
  stats: Record<string, number>;
  image: { full: string };
  name: string;
  maps?: Record<string, boolean>;
};

const ChampBuilder = () => {
  const location = useLocation();
  const champ = location.state as Champion;

  const imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';
  const itemBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/';

  const [baseStats] = useState(champ.stats);
  const [champStats, setChampStats] = useState(champ.stats);
  const [allItems, setAllItems] = useState<ItemType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInput, setUserInput] = useState<string>('');
  const [itemSlots, setItemSlots] = useState<(ItemType | null)[]>(Array(6).fill(null));

  const statKeyMap: Record<string, string> = {
    FlatHPPoolMod: 'hp',
    FlatMPPoolMod: 'mp',
    FlatPhysicalDamageMod: 'attackdamage',
    FlatMagicDamageMod: 'spelldamage',
    FlatArmorMod: 'armor',
    FlatSpellBlockMod: 'spellblock',
    PercentAttackSpeedMod: 'attackspeed',
    FlatCritChanceMod: 'crit',
    FlatMovementSpeedMod: 'movespeed',
  };

  const getItems = async () => {
    const data = await getItemData();
    const validItems = Object.values(data).filter(
      (item: any) => item.maps?.['11']
    ) as ItemType[];
    setItems(validItems);
    setAllItems(validItems);
    setLoading(false);
  };

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );

    setItems(filtered);
  };

  const updateStats = (slots: (ItemType | null)[]) => {
    const newStats = { ...baseStats };

    slots.forEach(slot => {
      if (slot) {
        Object.entries(slot.stats).forEach(([statKey, value]) => {
          const mappedKey = statKeyMap[statKey] || statKey;
          newStats[mappedKey] = (Number(newStats[mappedKey]) || 0) + Number(value);
        });
      }
    });

    setChampStats(newStats);
  };

  const handleAddItem = (item: ItemType) => {
    const slotIndex = itemSlots.findIndex(slot => slot === null);
    if (slotIndex === -1) return;
    const alreadyInSlots = itemSlots.some(slot => slot?.name === item.name);
    if (alreadyInSlots) return;
    const newSlots = [...itemSlots];
    newSlots[slotIndex] = item;
    setItemSlots(newSlots);
    updateStats(newSlots);
  };

  const handleRemoveItem = (index: number) => {
    const newSlots = [...itemSlots];
    newSlots[index] = null;
    setItemSlots(newSlots);
    updateStats(newSlots);
  };

  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-950 flex items-center justify-center text-stone-300 text-lg">
        Loading page...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950 p-4 text-stone-300 flex flex-col">
      <div className="flex flex-col sm:flex-row h-1/2 gap-4">
        <img
          className="w-32 h-32 object-contain border border-stone-700 rounded mx-auto sm:mx-0"
          src={`${imageBaseURL}${champ.image.full}`}
          alt={`image of ${champ.name}`}
        />

        <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap content-start gap-4">
            <div className="col-span-2 sm:w-full text-xl font-bold text-center sm:text-left">
              {champ.name}
            </div>
            {Object.entries(champStats).map(([key, value]) => (
              <div
                key={key}
                className="bg-stone-800 p-2 rounded shadow w-full sm:w-40"
              >
                <h3 className="text-sm text-stone-400">{key}</h3>
                <h3 className="text-md font-semibold">{value}</h3>
              </div>
            ))}
          </div>

          <div className="flex gap-2 justify-center sm:justify-start">
            {itemSlots.map((slot, index) => (
              <div
                key={index}
                className="w-12 h-12 border border-stone-700 rounded flex items-center justify-center bg-stone-900 cursor-pointer"
                onClick={() => handleRemoveItem(index)}
              >
                {slot ? (
                  <img
                    src={`${itemBaseURL}${slot.image.full}`}
                    alt={slot.name}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span className="text-stone-500 text-xs">Empty</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-1/2 mt-4 border-t border-stone-700 pt-4 overflow-y-auto">
        <div className="flex flex-col sm:flex-row px-4 justify-between items-center gap-2 sm:gap-0">
          <h2 className="text-lg font-semibold">Choose Items</h2>
          <input
            type="text"
            value={userInput}
            onChange={filterItems}
            placeholder="Search item..."
            className="w-full sm:w-1/4 h-8 bg-stone-800 border border-stone-700 rounded-md px-4 py-2 text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-600"
          />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <div
                key={index}
                onClick={() => handleAddItem(item)}
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

