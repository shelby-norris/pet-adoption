import { useState, useEffect } from "react";
import "./App.scss";
import { createItem, listAllItems } from "./utils/dynamo.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function App() {
  const [pets, setPets] = useState([]);
  const [open, setOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    (async () => {
      const items = await listAllItems("pet-table");
      console.log(items);
      setPets(items);
    })();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          <Button onClick={handleOpen}>Update</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Pet Info
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form onSubmit={(event) => handleAddPet(event)}>
                  <label htmlFor="">Name</label>
                  <input type="text" name="petName" id="petName" />
                  <br />
                  <label htmlFor="">Age</label>
                  <input type="number" name="petAge" id="petAge" />
                  <br />

                  <label htmlFor="">Adopted</label>
                  <input type="checkbox" name="isAdopted" id="isAdopted" />
                  <br />
                  <button type="submit">Update</button>
                </form>
              </Typography>
            </Box>
          </Modal>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
