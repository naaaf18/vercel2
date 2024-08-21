import { useParams } from "react-router-dom"
import { useEffect,useState  } from "react";
import { imageURL } from "../constants";
import useRestaurant from "../utils/useRestaurant";
import Shimmer from "./shimmer";
import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
function RestaurantMenu() {
    const {id}=useParams();
    const res = useRestaurant(id)

    const dispatch =useDispatch()
   const addFoodItem=(item)=>{
    dispatch(addItem(item))
   }

  return (res.length===0) ? (
    <Shimmer />
  ) : (
    <div className="flex">
    <div className="" >
      <h1 >Restaurant ID {id}</h1>
      <h1>{res.cards[2]?.card?.card?.info?.name}</h1>
      <h1>{res.cards[2]?.card?.card?.info?.city}</h1>

      <img className='h-50 w-50'src={imageURL+ res.cards[2]?.card?.card?.info?.cloudinaryImageId}/>
      <h3>{res.cards[2]?.card?.card?.info?.avgRating}star</h3>
      <h3>{res.cards[2]?.card?.card?.info?.costForTwoMessage}</h3>
      </div>
  
      <h1>Menu</h1>

      <div className="flex m-2 p-2" >
      <ul data-testid="menu1" >
  {(() => {
    const categories = res.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories;
    if (categories) {
      // If categories exist, use the original path
      return Object.values(categories[0].itemCards || []).map((item) => (
        <li key={item.card.info.id}>
          {item.card.info.name} <button data-testid='addbtn' className="p-2 bg-red-300">- add </button>
        </li>
      ));
    } else {
      // If categories are missing, try a fallback path (assuming an alternative path exists)
      const fallbackItemCards = res.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];
      return Object.values(fallbackItemCards).map((item) => (
        <li key={item.card.info.id}>
          {item.card.info.name} <button data-testid='addbtn'className="p-2 bg-red-300" onClick={()=>addFoodItem(item)}>-add </button>
        </li>
      ));
    }
  })()}
  {Object.values(res.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || []).length === 0 && (
    <li key="no-menu">There is no menu available for this restaurant.</li>
  )}
</ul>
</div>
    </div>
  )
}
//.cards[5]?.groupedcard?.cardGroupMap?.regular?.cards[2].card?.card?.categories[0].itemCards[0]
export default RestaurantMenu
//{console.log(Object.values(res.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards[2].card?.card?.categories[0]?.itemCards))}</h3>
//<ul>
//{Object.values (res.cards[5]?.groupedCard?.cardGroupMap?.REGULAR.cards[2].card?.card?.categories[0]?.itemCards).map((item)=>(
//<li key={item.card.info.id} >{item.card.info.name} </li>
//)) }
//</ul>




//button className="p-2 m-2 h-15 w-15 bg-green-800" onClick={()=>handleAddItem()}>Add items</button>
