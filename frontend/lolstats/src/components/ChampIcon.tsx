import { useNavigate } from "react-router";
import { getChampData } from '../services/lolData.ts';

const ChampIcon = ({ champData } = props) => { 
  const navigate = useNavigate();
  const champsArray: [] = Object.values(champData);
  const imageBaseURL: string = 'https://ddragon.leagueoflegends.com/cdn/15.2.1/img/champion/';
  
  
  const navigateChampBuilder = async (name: string) => {
    const champInfo = await getChampData(name, champsArray)
    console.log(`ChampINfo: ${champInfo}`)
    navigate('/champBuilder', { 
      state: champInfo 
    });

  }

  return(
    <div className="w-2/3 flex flex-row flex-wrap justify-center">
      {champsArray.map((champ, index) => ( 
        <div className="" key={index} onClick={() => {navigateChampBuilder(champ.name)}}>
          <img src={`${imageBaseURL}${champ.image.full}`} alt={`image of ${champ.name}`}/>
          <h4 className="text-neutral-400 text-center">{champ.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default ChampIcon;
