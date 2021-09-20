import {useEffect} from "react";
import axios from "axios";
import './App.css';

function App() {
  useEffect(() => {
    async function fetchData(){
      const URL = 'https://iras-vintage-shop.myshopify.com/api/2021-07/graphql.json';
      
      let config = {
        headers: {
          "X-Shopify-Storefront-Access-Token": "d1233fd65218b41ad385b5f5049336fa",
        }
      };

      const data = {
        query: `
          {
            products(first: 10) {
              edges {
                cursor
                node {
                  id
                  title
                  description
                  handle
                  variants(first: 3) {
                    edges {
                      cursor
                      node {
                        id
                        title
                        quantityAvailable
                        priceV2 {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      };

      const products = await axios.post(URL, data, config);
      console.log(products);
    }
  
    fetchData();

  })
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ira's Vintage Shop React Front End
        </p>
      </header>
    </div>
  );
}

export default App;
