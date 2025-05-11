import axios from 'axios';
export const versionData = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

export const getLeagueData = async (): {} => {
  try {
    const leagueData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/champion.json`);
    return leagueData;
  }catch (error) {
    console.log(`ERROR: ${error}`) 
  }
}

export const getChampData = async (name: string, champArray: []): {} => {
    if(!champArray) {
	const leagueInfo = await getLeagueData().data.data;
	const champsList: [] = Object.values(leagueInfo)
	const champData = champList.find(champ => champ.name === name);
	return champData; 	
    } else {
     return champArray.find(champ => champ.name === name);
   }
   
}

export const getItemData = async(): {} => {
  try {
    const itemData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/item.json`);
    return itemData.data.data;
  } catch(error) {
    console.log(`ERROR: ${error}`);
  }
}
