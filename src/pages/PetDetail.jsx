import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useGetPetsByIdQuery } from "../services/pets";

const PetDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetPetsByIdQuery(id);

  return (
    <>
      {error ? (
        <Typography variant="h5">Oh no, there was an error</Typography>
      ) : isLoading ? (
        <Typography variant="h3" sx={{textAlign: "center", mt: 4}}>Loading...</Typography>
      ) : data ? (
        <>
          {data.pets.map((pet) => (
            <Card
              variant="outlined"
              key={pet.id}
              sx={{ width: "50%", mx: "auto", mt: "2.5rem" }}
            >
              <CardContent>
                <CardMedia
                  sx={{ display: "flex", overflowX: "scroll" }}
                  className="cardMedia"
                >
                  {pet.images.map((image, index) => (
                    <CardMedia
                      component="img"
                      image={image}
                      alt="image not found"
                      key={index}
                      sx={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}}
                    />
                  ))}
                </CardMedia>
                <Typography variant="h3">{pet.name}</Typography>
                <Typography>{pet.breed}</Typography>
                <Typography>{pet.animal}</Typography>
                <Typography>{pet.city}</Typography>
                <Typography>{pet.state}</Typography>
                <Typography>{pet.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </>
      ) : null}
    </>
  );
};

export default PetDetail;
