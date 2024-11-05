import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import './Gallery.css';


function Gallery() {
  const [crewmates, setCrewmates] = useState([]);

  const handleDelete = async (id) => {
    const { error } = await supabase.from('crewmates').delete().eq('id', id);
    if (error) console.error(error);
    else setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
  };
  
  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name:");
    const { error } = await supabase.from('crewmates').update({ name: newName }).eq('id', id);
    if (error) console.error(error);
    else setCrewmates(crewmates.map((c) => (c.id === id ? { ...c, name: newName } : c)));
  };

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase.from('crewmates').select('*');
      if (error) console.error(error);
      else setCrewmates(data);
    };
    fetchCrewmates();
  }, []);

  

  return (
    <div>
      <h1>Your Crewmate Gallery</h1>
      {crewmates.length > 0 ? (
        <div className="gallery">
        {crewmates.map((crewmate) => (
          <div key={crewmate.id} className="crewmate-card">
            <h2>{crewmate.name}</h2>
            <p>Speed: {crewmate.speed} mph</p>
            <p>Color: {crewmate.color}</p>
            <button className="edit" onClick={() => handleUpdate(crewmate.id)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(crewmate.id)}>Delete</button>
          </div>
        ))}
      </div>
      
      ) : (
        <p>No crewmates found. Create some!</p>
      )}
    </div>
  );
}

export default Gallery;
