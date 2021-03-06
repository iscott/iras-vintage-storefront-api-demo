import {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

import Header from './components/Header';
const API_KEY = "d1233fd65218b41ad385b5f5049336fa";

function App() {
  const [products, setProducts] = useState([]);

  const URL = 'https://iras-vintage-shop.myshopify.com/api/2021-07/graphql.json';
      
  let config = {
    headers: {
      "X-Shopify-Storefront-Access-Token": API_KEY,
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
              media(first: 10) {
                edges {
                  node {
                    mediaContentType
                    alt
                    ...mediaFieldsByType
                  }
                }
              }
            }
          }
        }
      }

      fragment mediaFieldsByType on Media {
        ...on ExternalVideo {
          id
          host
          embeddedUrl
        }
        ...on MediaImage {
          image {
            originalSrc
          }
        }
        ...on Model3d {
          sources {
            url
            mimeType
            format
            filesize
          }
        }
        ...on Video {
          sources {
            url
            mimeType
            format
            height
            width
          }
        }
      }
    `
  };

  useEffect(() => {
    async function fetchData(){
      const response = await axios.post(URL, data, config);
      let products = response.data.data.products.edges;
      console.log(products);
      setProducts(products);
    }
  
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="App">
      <Header />
      <section className="w-full h-screen">
        <img src="https://i.imgur.com/Odg8LV6.jpg" className="object-cover w-full h-full" alt="Mid-century modern living room with TV and couch" />
        {/* Photo credit: https://www.thespruce.com/amazing-retro-style-decorating-1977439 */}
      </section>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">What we've got</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" style={{cursor: "pointer"}}>
            {products.map((product) => (
              <div key={product.node.id} href="/" className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.node.media.edges[0].node.image.originalSrc}
                    alt={product.node.media.edges[0].node.alt}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.node.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${product.node.variants.edges[0].node.priceV2.amount * 1}</p>
                <button
                    type="submit"
                    className="mt-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                  >
                    Buy
                  </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
