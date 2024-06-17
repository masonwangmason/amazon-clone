import {addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
        // Spy on localStorage.setItem to monitor its calls
        spyOn(localStorage, 'setItem');
        
        // Mock localStorage to return an empty cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOprionId: '1'
            }]);
        });
        // Load the cart from storage (which is mocked to be empty)
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect (cart.length).toEqual(1);
        
        // check whether setItem was called from addToCart
        expect (localStorage.setItem).toHaveBeenCalledTimes(1);

        // extra checks on the mock cart item
        expect (cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect (cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        // Spy on localStorage.setItem to monitor its calls
        spyOn(localStorage, 'setItem');
        
        // Mock localStorage to return an empty cart
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        // Load the cart from storage (which is mocked to be empty)
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect (cart.length).toEqual(1);
        
        // check whether setItem was called from addToCart
        expect (localStorage.setItem).toHaveBeenCalledTimes(1);

        // extra checks on the mock cart item
        expect (cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect (cart[0].quantity).toEqual(1);
    });
})