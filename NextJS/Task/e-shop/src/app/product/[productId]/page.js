import ProductDetail from "@/app/component/products/product-detail";


export default function Page({ params }) {
    return (
        <>
            <ProductDetail itemId={params.productId}/>
        </>
    );
}