import { useState } from 'react';

const Nav = () => {
  const [ userInput, setUserInput ]: String = useState('');
  return(
    <div className="w-full bg-gray-950 pb-6 h-1/9 flex justify-between padd">
      <div className="justify-start text-neutral-400 text-3xl font-bold">
        <h1>LOLSTATS</h1>
      </div>
      <div>
        <input 
          onClick={() => {}}
          className="bg-white rounded-mm"
        />
      </div>
    </div>
  )
};

export default Nav;
