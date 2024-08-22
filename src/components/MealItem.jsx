import PropTypes from 'prop-types'
import {getCurrencyFormatter} from '../util'
const MealItem = ({meal}) => {
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
                    <button className='button'>ADD TO CART</button>
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