// {/* <ul>
// 	{/* Набір елементів списку із зображеннями */}
// 	<li>
// 		<div>
// 		  <img src="" alt="" />
// 		</div>
// 	</li>
// </ul> */}
import ImageCard from "../ImageCard/ImageCard";
import { forwardRef } from "react";
import css from "./ImageGallery.module.css";

const ImageGallery = forwardRef(function ImageGallery(
    { images, openModal },
    ref
  ) {
    return (
      <ul className={css.gallery} ref={ref}>
        {images.map((image) => {
          return (
            <li className={css.galleryItem} key={image.id}>
              <ImageCard
                id={image.id}
                description={image.alt_description}
                small={image.urls.small}
                openModal={openModal}   
              />
            </li>
          );
        })}
      </ul>
    );
  });
  
  export default ImageGallery;