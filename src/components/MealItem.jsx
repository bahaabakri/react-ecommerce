import PropTypes from 'prop-types'
import {getCurrencyFormatter} from '../util'
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../state/CartContext'
const MealItem = ({meal}) => {
    const {items, addItem} = useContext(CartContext)
    console.log(items)
    const onAddToCart = () => {
        addItem(meal)
    }
    return (
        <div className='meal-item'>
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                <h3>{meal.name}</h3>
                <div className='meal-item-description'>
                    {meal.description}
                </div>
                <div className='meal-item-price'>
                    {getCurrencyFormatter.format(meal.price)}
                </div>
                <div className='meal-item-actions'>
                    <Button onClick={onAddToCart}>ADD TO CART</Button>
                </div>
            </article>

        </div>
    )
}
MealItem.propTypes = {
    meal: PropTypes.object,
    currency: PropTypes.string
}
export default MealItem