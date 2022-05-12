import { FC, useState } from 'react';
import ImageResource from '../models/ImageResource';
import './ItemResult.css';

type ImageResultProps = {
  children?: Node[];
  image: ImageResource;
  selectedImg: ImageResource | null;
  setSelectedImg: (e: ImageResource) => void;
};

const ItemResult: FC<ImageResultProps> = ({ image, selectedImg, setSelectedImg }: ImageResultProps) => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  return <button
    className={`itemResult ${selectedImg?.id === image.id ? 'selected' : ''}`}
    onClick={() => setSelectedImg(image)}>
    <img
      style={imgLoaded ? {} : { display: 'none' }}
      src={image.largeImageURL}
      alt={image.tags}
      aria-label={image.tags}
      onLoad={() => setImgLoaded(true)}
    />
    <div className="desc">
      {image.tags}
    </div>
  </button>
}

export default ItemResult;