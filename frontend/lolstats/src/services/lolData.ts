import axios from 'axios';
export const versionData = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

interface Champ {
  name: string;
  [key: string]: any;
}

interface ChampDataResponse {
  data: {
    [champion: string]: Champ;
  };
}

interface ItemDataResponse {
  data: {
    [key: string]: any;
  };
}

export const getLeagueData = async (): Promise<Record<string, any>> => {
  try {
    const res = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/champion.json`);
    return res.data.data;
  } catch (error) {
    console.error(`ERROR in getLeagueData: ${error}`);
    return {};
  }
};

export const getChampData = async (name: string, champArray?: Champ[]): Promise<Champ | undefined> => {
  if (!champArray) {
    const leagueInfo = await getLeagueData();
    if (!leagueInfo) return undefined;
    const champsList: Champ[] = Object.values(leagueInfo.data);
    return champsList.find(champ => champ.name === name);
  } else {
    return champArray.find(champ => champ.name === name);
  }
};

export const getItemData = async (): Promise<{ [key: string]: any }> => {
  try {
    const itemData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/item.json`);
    return itemData.data.data;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return {};
  }
};

