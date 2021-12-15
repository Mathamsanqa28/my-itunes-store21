import React, {useState,useEffect} from 'react';
import BSCard from 'react-bootstrap/Card';

//style with icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {faLink} from '@fortawesome/free-solid-svg-icons';

//create functional card component and pass props
function Card(props) {
    const [isFav, setFav] = useState(false);
    const [display,setDisplay] = useState(false);
    const [click, setClicked] = useState(false);

    let btnClicked = click? 'button-clicked' : 'button-not-clicked';

    function addToFavs() {
        if (sessionStorage.getItem('favList') === null) {
            const favs = [];
            sessionStorage.setItem('favList', JSON.stringify(favs));   
        }
        let addFav = JSON.parse(sessionStorage.getItem('favList'));
        setClicked(true);

        const newFav = {
            id:props.id,
            key:props.key,
            kind:props.kind,
            link:props.link,
            name:props.name,
            artistName:props.artistName,
            imgThumbnail:props.imgThumbnail,
        };

        //prevent duplicates
        for (let i=0; i <addFav.length; i++) {
            if (addFav[i].name === newFav.name) {
                setFav(!isFav);
                alert("Item already added");
                return;
            }
        }
        //push new item into array
        addFav.push(newFav)
        sessionStorage.setItem('favList', JSON.stringify(addFav));
        alert('Item added successfully');
        setDisplay(true);
        window.location.reload();
    }

    useEffect(() => {
        // let array = JSON.parse(sessionStorage.getItem('favList'));
        // for (let i = 0; i < array.length; i++){
            // sessionStorage.setItem('favList', JSON.stringify(array));

        // if (sessionStorage.getItem('favList') !== null) {
        //     setDisplay(true);
        //     }

        if (display === true) {
            for (let i = 0; i < 1; i++) {
                setDisplay(false);
            }
        }

        }, [isFav, display]
    )

    return (
        <BSCard className='display-card-body card-group mb-2 h-50'>
            <div className='card'>
            <BSCard.Link href={props.link}>
                <BSCard.Img src={props.imgThumbnail} className='card-img'/>
            </BSCard.Link>
            <BSCard.Body>
                <BSCard.Title><strong>{props.name}</strong></BSCard.Title>
                <BSCard.Subtitle className='mb-2 text-muted'>{props.id}</BSCard.Subtitle>
                <BSCard.Subtitle className='mb-2 card-type'>{props.kind}</BSCard.Subtitle>
                <BSCard.Text>{props.artistName}</BSCard.Text>
                <BSCard.Link className={`${btnClicked} card-link`} href={props.link}>Link to Item<FontAwesomeIcon icon={faLink} color='white' />
                </BSCard.Link>
                <br />
                <BSCard.Link className={`${btnClicked} card-link`} id='addFavbtn' onClick={() => addToFavs()}>Favorite<FontAwesomeIcon icon={faHeart} color='brown'/>
                </BSCard.Link>
            </BSCard.Body>
            </div>
        </BSCard>
        
    )
}
export default Card;