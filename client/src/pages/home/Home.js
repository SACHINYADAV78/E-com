import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Category from "../../component/category/Category";
import Hero from "../../component/hero/Hero";
import Product from "../../component/product/Product";
import { axiosClient } from "../../utils/axiosclient";
import "./Home.scss";

function Home() {
    const categories = useSelector(state=> state.categoryReducer.categories)
    const [topProducts, setTopProducts] = useState(null);

    async function fetchData() {
        
        const topProductsResponse = await axiosClient.get(
            "/products?filters[isTopPic][$eq]=true&populate=image"
        );

        
        setTopProducts(topProductsResponse.data.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="Home">
            <Hero />
            <section className="collection container">
                <div className="info">
                    <h2 className="heading">Shop By Categories</h2>
                    <p className="subheading">
                        Shop from the best, our Film and TV Posters Collection.
                    </p>
                </div>
                <div className="content">
                    {categories?.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
            </section>

            <section className="collection container">
                <div className="info">
                    <h2 className="heading">Our Top Picks</h2>
                    <p className="subheading">
                        All New Designs, Same Old Details.
                    </p>
                </div>
                <div className="content">
                    {topProducts?.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;