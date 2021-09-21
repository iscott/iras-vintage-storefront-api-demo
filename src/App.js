import {useEffect} from "react";
import axios from "axios";
import './App.css';

import Header from './components/Header';

function App() {

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

  // const products = [
  //   {
  //     id: 1,
  //     name: 'Earthen Bottle',
  //     href: '#',
  //     price: '$48',
  //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
  //     imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  //   },
  //   {
  //     id: 2,
  //     name: 'Nomad Tumbler',
  //     href: '#',
  //     price: '$35',
  //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  //     imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  //   },
  //   {
  //     id: 3,
  //     name: 'Focus Paper Refill',
  //     href: '#',
  //     price: '$89',
  //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  //     imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  //   },
  //   {
  //     id: 4,
  //     name: 'Machined Mechanical Pencil',
  //     href: '#',
  //     price: '$35',
  //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  //     imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  //   },
  // ]

  const products = [];
  useEffect(() => {
    async function fetchData(){
      const response = await axios.post(URL, data, config);
      const products = response.data.data.products.edges;
      console.log(products);
    }
  
    fetchData();

  })
  
  return (
    <div className="App">
      <Header />
      <h1 className="pt-12 text-4xl font-extrabold tracking-tight text-gray-900">Ira's Vintage Shop (React Front End)</h1>        
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
