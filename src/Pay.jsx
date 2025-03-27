
import * as PortOne from "@portone/browser-sdk/v2";
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

function Pay() {
  
  const [ payments, setPayments ] = useState([]);

  const PAYSATAUS = {
    "PAID": "결제완료",
    "FAILED": "결제실패",
  }

  const products = [
    {
      productId: 1,
      productName: "상품1",
      price: 5000,
    },

    {
      productId: 2,
      productName: "상품2",
      price: 10000,
    },
  ];

  const handlePaymentClick = async (productId) => {

    const foundProduct = products.find(p => p.productId === productId)

    try {
      const paymentResponse = await PortOne.requestPayment({

        storeId: import.meta.env.VITE_PORTONE_STOREID,
        paymentId: uuid(),
        orderName: "product",
        totalAmount: foundProduct.price,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        channelKey: "channel-key-2ddfd112-33ac-4c5d-8d4d-a98848300f31",
        customer: {
          customerId: "testuser",
          fullName: "이재현",
        },
        products: [
          {
            id: foundProduct.productId.toString(),
            name: foundProduct.productName,
            amount: foundProduct.price,
            quantity: 1
          }
        ],
      });

      console.log(paymentResponse);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchClick = async () => {
    const jwtResponse =  await axios.post("https://api.portone.io/login/api-secret", {
      "apiSecret": import.meta.env.VITE_PORTONE_API_KEY,
    });
    const accessToken = jwtResponse.data.accessToken;

    const paymentsResponse = await axios.get("https://api.portone.io/payments", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        requsetBody: JSON.stringify({
          page: {
            Number: 0,
            size: 10,
          },
          filter: {
            storeId: import.meta.env.VITE_PORTONE_STOREID,
            istest: true,
          },
        }),
      }
    });
    console.log(paymentsResponse.data.items);
    setPayments(paymentsResponse.data.items.map(items => ({
      status: items.status,
      mid: items.merchantId,
      orderName: items.orderName,
      totalAmount: items.amount.total,
      products: items.products,
    })));
  }

  return (
    <>
     <ul>
        {
          products.map(p =>
            <li key={p.productId}> 상품명: {p.productName}, 가격: {p.price} <button onClick={() => handlePaymentClick(p.productId)}>구매하기</button></li>
          )
        }
     </ul>
     <ul>
      <button onClick={handleSearchClick}>검색</button>
     </ul>
     <ul>
      {
        payments.map(p =>
          <li>결제상태: {PAYSATAUS[p.status]}, mid: {p.mid}, 주문명: {p.orderName}, 총액: {p.totalAmount}
          <ul>
            {p.products.map(product =>
              <li>상품ID: {product.id}, 상품명: {product.name}, 가격: {product.amount}</li>
            )}
          </ul>
          </li>
        )
      }
     </ul>
    </>
  )
}

export default Pay
