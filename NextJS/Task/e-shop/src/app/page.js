import HomeComponent from "./component/home";

export default function Home() {
  return (
    <HomeComponent />
  );

  // const userData = useSelector((data) => data.usersData.userData);
  
  // const [isCart, setIsCart] = useState(!!userData?.cart?.cartItems?.length);
  // useEffect(() => {
  //   if (isCart && !!userData?.cart?.cartItems?.length) {
  //     return ;
  //   }
  //   setIsCart(!!userData?.cart?.cartItems?.length)
  // }, [userData?.cart?.cartItems?.length]);

  // return (
  //   <>
  //     {
  //       isCart
  //         ?
  //         <>
  //           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
  //             <Grid item xs={12} sm={12} md={7} lg={8} >
  //               <ProductList />
  //             </Grid>
  //             <Grid item xs={12} sm={12} md={5} lg={4} >
  //               <Cart />
  //             </Grid>
  //           </Grid>
  //         </>
  //         :
  //         <>
  //           <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  //             <Grid item xs={12} sm={12} md={12} lg={12} >
  //               <ProductList />
  //             </Grid>
  //           </Grid>
  //         </>
  //     }


  //   </>
  // );
}
