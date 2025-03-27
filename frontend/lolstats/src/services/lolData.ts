import axios from 'axios';


export async function getLeagueData() {
    try {
      const versionData = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
      const leagueData = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${versionData.data[0]}/data/en_US/champion.json`)
      console.log(leagueData)
      return leagueData;
      setLolData(leagueData.data.data);
      setLoading(false);

    }catch (error) {
      console.log(`ERROR: ${error}`) 
    }
  }

export const getChampData = (name: string) => {
    const champData = champsArray.find(champ => champ.name === name);
    console.log(name, champData)
    navigate('/champBuilder', { 
      state: champData 
    });
  }

