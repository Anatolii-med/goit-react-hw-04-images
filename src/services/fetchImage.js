// 22642975-54ab0d01d9c1b1285598c5aff
const key = '22642975-54ab0d01d9c1b1285598c5aff';

const fetchFunc = async (imageData, pagination) => {
    const response = await fetch(
        `https://pixabay.com/api/?q=${imageData}&page=${pagination}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const imgArr = await response.json();
    return imgArr;
};

export default fetchFunc;
