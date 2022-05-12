import ImageResource from './ImageResource';

type ImageList = {
  total: number;
  totalHits: number;
  hits: ImageResource[];
}

export default ImageList;