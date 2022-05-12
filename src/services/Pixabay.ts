import ImageList from '../models/ImageList';

export class PixabayApi {
  apiUrl: string = 'https://pixabay.com/api/?';


  /*
  * It turns out that typing a fetch request is kind of annoying. I utilized the wonderful Kent C Dobbs
 * for some help.
 * https://kentcdodds.com/blog/using-fetch-with-type-script
 */
  async search(term: string): Promise<ImageList> {
    const res = await fetch(this.apiUrl + new URLSearchParams({
      key: '27318557-791fcff14ff685ad536055f95',
      q: term,
      image_type: 'photo',
      safeSearch: 'true',
    }));

    const data = await res.json();

    if (res.ok) {
      const images = data;

      if (images) {
        return images;
      } else {
        return Promise.reject(new Error(`No images found for ${term}.`));
      }
    } else {
      return Promise.reject('Something went wrong.');
    }
  }
}