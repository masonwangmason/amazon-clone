import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe ('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    
    // load the products from backend
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    // hook: help load and render mock html elements to be tested on
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        // also loading the js-payment-summary section to avoid error
        document.querySelector('.js-test-container').innerHTML = `
            <div class = "js-order-summary" ></div>
            <div class = "js-payment-summary" ></div>
        `;

        // Mock localStorage to return an empty cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        // Load the cart from storage (which is mocked to be empty)
        loadFromStorage();

        renderOrderSummary();
    })

    it('displays the cart', () => {
        // check if there are two cart item containers
        expect(document.querySelectorAll('.js-cart-item-container').length
            ).toEqual(2);
        
        // check whether the quantity of products is correct
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1'); 

        
        // remove the mock test container HTML from the testing page
        document.querySelector('.js-test-container').innerHTML = ``;
    });

    it('removes a product', () => {
        // delete the productId1 through its delete button
        document.querySelector(`.js-delete-link-${productId1}`)
            .click();

        // check if there's only 1 product left 
        expect(document.querySelectorAll('.js-cart-item-container').length
            ).toEqual(1);
        
        // check whether productId1 has been deteled sucessfully (equal to null)
        expect(document.querySelector(`.js-cart-item-container-${productId1}`))
            .toEqual(null);
        // check whether productId2 still exists
        expect(document.querySelector(`.js-cart-item-container-${productId2}`))
            .not.toEqual(null);

        // check whether the cart has been updated correctly
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        // remove the mock test container HTML from the testing page
        document.querySelector('.js-test-container').innerHTML = ``;
    })
})