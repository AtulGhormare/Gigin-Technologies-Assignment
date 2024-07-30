import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetPetsQuery } from "../services/pets";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const PetList = () => {
  const [open, setOpen] = React.useState(false);
  const { data, error, isLoading } = useGetPetsQuery();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <>
      {error ? (
        <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
          Oh no, there was an error
        </Typography>
      ) : isLoading ? (
        <Typography variant="h3" sx={{ textAlign: "center", mt: 4 }}>
          Loading...
        </Typography>
      ) : data ? (
        <>
          <Box>
            <Button onClick={handleOpen} variant="contained" sx={{ mt: 2 }}>
              Open modal
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Search Pet with query
                </Typography>
                <Input placeholder="animal" sx={{ width: "100%", mt: 2 }} />
                <Input placeholder="breed" sx={{ width: "100%", mt: 2 }} />
                <Input placeholder="location" sx={{ width: "100%", mt: 2 }} />
                <Button variant="outlined" sx={{ mt: 4 }}>
                  Search
                </Button>
              </Box>
            </Modal>
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                mt: "2.5rem",
                gap: "0.5rem 1rem",
              }}
            >
              {data.pets.map((pet) => (
                <Card variant="outlined" sx={{ width: 400 }} key={pet.id}>
                  <CardContent>
                    <CardMedia
                      sx={{ display: "flex", overflowX: "scroll" }}
                      className="cardMedia"
                    >
                      {pet.images.map((image, index) => (
                        <CardMedia
                          component="img"
                          height="194"
                          image={image}
                          alt="image not found"
                          key={index}
                        />
                      ))}
                    </CardMedia>
                    <Typography variant="h6">{pet.name}</Typography>
                    <Typography>animal: {pet.animal} </Typography>
                    <Typography>breed: {pet.breed} </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`${pet.id}`)}
                    >
                      read more
                    </Typography>
                  </CardActions>
                </Card>
              ))}
            </Container>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default PetList;
