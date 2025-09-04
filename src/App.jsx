import { useState, useEffect } from "react";
import "./App.scss";
import { createItem, listAllItems } from "./utils/dynamo.js";

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async () => {
      const items = await listAllItems("pet-table");
      console.log(items);
      setPets(items);
    })();
  }, []);

  const handleAddPet = async (event) => {
    event.preventDefault();

    const newPet = {};

    newPet.id = Date.now().toString();
    newPet.name = event.target.petName.value;
    newPet.age = parseInt(event.target.petAge.value);
    newPet.isAdopted = event.target.isAdopted.checked;

    console.log(newPet);

    await createItem("pet-table", newPet);

    setPets((oldPets) => {
      return [...oldPets, newPet];
    });
  };

  return (
    <>
      <header>
        <h1>Pet Adoption</h1>
      </header>
      <main>
        <form onSubmit={(event) => handleAddPet(event)}>
          <h2>New Pet Info</h2>
          <label htmlFor="">Name</label>
          <input type="text" name="petName" id="petName" />
          <br />
          <label htmlFor="">Age</label>
          <input type="number" name="petAge" id="petAge" />
          <br />

          <label htmlFor="">Adopted</label>
          <input type="checkbox" name="isAdopted" id="isAdopted" />
          <br />
          <button type="submit">Add Pet</button>
        </form>

        <section>
          <h2>Available Pets</h2>
          {pets.length == 0 ? (
            <p>All Pets Adopted! Yay!</p>
          ) : (
            <div>
              {pets &&
                pets.map((petObject, index) => {
                  return (
                    <div key={index}>
                      <p>{petObject.name}</p>
                      <p>{petObject.age}</p>
                      <p>{petObject.isAdopted ? "Adopted" : "Needs a Home"}</p>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
