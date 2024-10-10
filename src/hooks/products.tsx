import React, {useState, useEffect} from "react";
import axios, {AxiosError} from "axios";
import { Iproduct } from "../interfaces/Iproduct";

export function useProducts(){

    const [products, setProducts] = useState<Iproduct[]>([])
    async function fetchProducts() {
        const response = await axios.get<Iproduct[]>('https://fakestoreapi.com/products?limit=7')
        setProducts(response.data)
     }
     
         useEffect(()=>{
             fetchProducts()
         },
         []
         )

    return{
        products
    }
}