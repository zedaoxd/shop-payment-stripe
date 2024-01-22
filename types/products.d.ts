type DummyProduct = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
};

type Product = {
    id: string,
    name: string,
    description: string?,
    price: string | number,
    currency: string,
    image: string,
    images?: string[],
}