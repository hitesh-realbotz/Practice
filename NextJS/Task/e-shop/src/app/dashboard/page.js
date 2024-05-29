import { useDispatch } from "react-redux";
import { getProduct } from "../store/productSlice";

export default function Page() {

    const dispatch = useDispatch();
    const p = dispatch(getProduct());
    console.log(p);
    return (
        <>
            <h1>Dashboard Page</h1>
        </>
    );
}