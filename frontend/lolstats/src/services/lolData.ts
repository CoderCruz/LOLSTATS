import axios from 'axios';
import { Champion } from '../types';

const getVersion = async (): Promise<string> => {
  const res = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  return res.data[0];
};

export const getLeagueData = async (): Promise<Record<string, Champion>> => {
  try {
    const version = await getVersion();
    const res = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
    const championsMap = res.data.data;
    return championsMap;
  } catch (error) {
    console.error(`ERROR in getLeagueData: ${error}`);
    return {};
  }
};

export const getChampData = async (name: string, champArray?: Champion[]): Promise<Champion | undefined> => {
  if (champArray && champArray.length > 0) {
    return champArray.find(champ => champ.name === name);
  }
  
  const champsMap = await getLeagueData();
  return Object.values(champsMap).find(champ => champ.name === name);
};

export const getItemData = async (): Promise<{ [key: string]: any }> => {
  try {
    const version = await getVersion();
    const itemData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/item.json`);
    return itemData.data.data;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    return {};
  }
};

