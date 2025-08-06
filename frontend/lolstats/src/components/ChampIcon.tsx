import { Champion } from '../types';
import { useNavigate } from "react-router";
import { getChampData } from '../services/lolData.ts';

interface ChampIconProps {
  champData: Record<string, Champion>;
}

const ChampIcon = ({ champData }: ChampIconProps) => {
  const navigate = useNavigate();
  const champsArray = Object.values(champData);
  const imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';

  const navigateChampBuilder = async (name: string) => {
    const champInfo = await getChampData(name, champsArray);
    navigate('/champ-builder', {
      state: champInfo,
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-7xl w-full px-4">
        {champsArray.map((champ) => (
          <div
            key={champ.name}
            className="bg-stone-800 hover:bg-stone-700 cursor-pointer p-2 rounded-md text-center transition duration-150"
            onClick={() => navigateChampBuilder(champ.name)}
          >
            <img
              src={`${imageBaseURL}${champ.image.full}`}
              alt={`Image of ${champ.name}`}
              className="w-20 h-20 object-contain mx-auto rounded"
            />
            <h4 className="mt-2 text-stone-300 text-sm">{champ.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampIcon;

