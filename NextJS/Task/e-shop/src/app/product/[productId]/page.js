import ProductDetail from "@/app/component/products/product-detail";


export default function Page({ params }) {
    console.log("ProductDetailed Route ", params);
    return (
        <>
            <ProductDetail itemId={params.productId}/>
        </>
    );
}