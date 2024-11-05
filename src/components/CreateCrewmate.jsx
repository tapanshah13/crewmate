import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './CreateCrewmate.css';


function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert([{ name, speed: parseInt(speed), color }]);
    if (error) console.error(error);
    else console.log('Crewmate created:', data);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
  <label>Name:</label>
  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

  <label>Speed (mph):</label>
  <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />

  <label>Color:</label>
  <select value={color} onChange={(e) => setColor(e.target.value)}>
    <option value="Red">Red</option>
    <option value="Green">Green</option>
    <option value="Blue">Blue</option>
    <option value="Yellow">Yellow</option>
    <option value="Orange">Orange</option>
    <option value="Pink">Pink</option>
    <option value="Purple">Purple</option>
  </select>

  <button type="submit">Create Crewmate</button>
</form>

  );
}

export default CreateCrewmate;
