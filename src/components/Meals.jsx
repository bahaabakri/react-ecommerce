import { useEffect, useContext } from "react";
import { getAllMeals } from "../request";
import Snackbar from "@mui/material/Snackbar";
import Spinner from "./Spinner";
import useFetch from "../hooks/useFetch";
import MealItem from "./MealItem";
import {getGeoInfo} from "../request"
import useHttp from "../hooks/useHttp";
import SnackBarContext from '../state/SnackBarContext'
const httpConfig = {}
const Meals = () => {
  const {showSnackBar} = useContext(SnackBarContext)
  const { 
    error:errorInFetchingMeals,
    isLoading,
    sendHttpRequest:getMealsHttpReq,
    data: meals} 
    = useHttp([], 'http://localhost:3000/meals', httpConfig)
//   const [currency, setCurrency] = useState()
//   useEffect(() => {
//     const getUserCurrency = async() => {
//         // console.log(await getGeoInfo());
        
//         setCurrency((await getGeoInfo()).currency)
//     }
//     getUserCurrency()
//   }, [])
  useEffect(() => {
    const sendRequest = async() => {
            await getMealsHttpReq()  
            if (errorInFetchingMeals) {
              showSnackBar(errorInFetchingMeals, 'error')
            }
    }
    sendRequest()
  }, [getMealsHttpReq, errorInFetchingMeals])
  return (
    <>
      <h1>What do you craving now?</h1>
      {isLoading && <Spinner />}
      {!isLoading && !errorInFetchingMeals && meals.length > 0
        &&
        <div id="meals">
          {meals.map((meal) => <MealItem meal={meal} key={meal.id} />)}
        </div>
      }
    </>
  );
};
export default Meals;
