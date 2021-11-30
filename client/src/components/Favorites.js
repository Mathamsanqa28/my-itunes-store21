import React from "react";
import Card from "./Card";

//syling with icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//create functional component to render cards using the Card component
function Favorites() {
	if (sessionStorage.getItem("favList") === null) {
		const favs = [];
		sessionStorage.setItem("favList", JSON.stringify(favs));
		}

	//session storage data and store in global variable
	let favList = JSON.parse(sessionStorage.getItem("favList"));
	let count = 0;

	//map the session storage data
	function getFavs() {
		return (
			favList.map(result => {
				count = count + 1;
				return (
				<div className="fav-items">
					<Card
					id={result.id}
					key={result.key}
					kind={result.kind}
					link={result.link}
					name={result.name}
					artistName={result.artistName}
					imgThumbnail={result.imgThumbnail}/>
					<br />
					<button className='btn btn-lg btn-info deleteFav' onClick={(e) => deleteFav()}>Remove
						<FontAwesomeIcon icon={faTrash} color="red" />
					</button>
				</div>
			)}
		))
	}

	//delete item from array, update to JSON and session storage
	function deleteFav() {
		let delFav = [];
		delFav = favList.splice(1); //splice() will start removing items from index 1
		sessionStorage.setItem("favList", JSON.stringify(delFav));
		window.location.reload();
	}

	return (
		<>
			<h2>Favorites List</h2>
			<>
			{/* triggers getFav function if array length is more than 0*/}
				{favList.length !== 0 ? getFavs() : ''} 
			</>
		</>
	)
}
export default Favorites;