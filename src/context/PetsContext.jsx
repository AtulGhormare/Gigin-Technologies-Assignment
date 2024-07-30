import { createContext, useEffect, useState } from "react";

export const PetsContext = createContext();

export default function PetsProvider({ children }) {
  const [state, setState] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pets`);
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchDataById = async ({ id }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pets?id=${id}`);
      const data = await res.json();
      setState(data.pets)
    } catch (error) {
      console.log(error);
      throw error;
    }  
  }
  const fetchDataBreedByAnimal = async ({ animal }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/breeds?animal=${animal}`);
      const data = await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }  
  }
  const fetchDataBySearch = async ({ animal, location, breed}) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pets?animal=${animal}&location=${location}&breed=${breed}`);
      const data = await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }  
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PetsContext.Provider value={{ state, fetchDataById, fetchDataBreedByAnimal, fetchDataBySearch }}>{children}</PetsContext.Provider>
  );
}
