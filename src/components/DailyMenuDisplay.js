import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { dailyMenuActions } from '../store/dailyMenu-Slice';


const DailyMenuDisplay = () => {

    const menuItems = useSelector(state => state.dailyMenu);
    console.log(menuItems);

    const dispatch = useDispatch();

    const handleDelete = (item) => {
        dispatch(dailyMenuActions.removeFromMenu(item))
    }

  return (
      <ul>{menuItems.items.map(item => (
          <li id={item.id} onClick={() => handleDelete(item)}>{item.name} - {item.calories} kcal</li>
      ))}
      </ul>
  )
}

export default DailyMenuDisplay