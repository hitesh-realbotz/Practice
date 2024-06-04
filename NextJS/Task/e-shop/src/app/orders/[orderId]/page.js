import OrderDetail from "@/app/component/orders/order-detail";


export default function Page ({ params }) {    
    return (
        <>
            <OrderDetail orderId={params.orderId}/>
        </>
    );
}