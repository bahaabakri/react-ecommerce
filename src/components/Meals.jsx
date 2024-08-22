import { useEffect, useState } from "react";
import { getAllMeals } from "../request";
import Snackbar from "@mui/material/Snackbar";
import Spinner from "./Spinner";
import useFetch from "../hooks/useFetch";
import MealItem from "./MealItem";
import {getGeoInfo} from "../request"

const Meals = () => {
  const {
    open,
    error,
    isLoading,
    data: meals,
    setOpen,
  } = useFetch(getAllMeals);

//   const [currency, setCurrency] = useState()
//   useEffect(() => {
//     const getUserCurrency = async() => {
//         // console.log(await getGeoInfo());
        
//         setCurrency((await getGeoInfo()).currency)
//     }
//     getUserCurrency()
//   }, [])
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
        message={error}
      />
      <h1>What do you craving now?</h1>
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <div id="meals">
          {meals.map((meal) => <MealItem meal={meal} key={meal.id} />)}
        </div>
      )}
    </>
  );
};
export default Meals;
