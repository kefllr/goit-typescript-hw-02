import css from "./ImageCard.module.css"

const ImageCard = ({id,description,small, openModal}) =>{
    return(
        <div>
        <img 
            className={css.img}
            id={id}
            src={small}
            alt={description}
            onClick={()=>openModal(id)}
            width="240px"
            height="280px" />
        </div>
    )
}
export default ImageCard;