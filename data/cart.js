export const cart = [];

export function addToCart(productId) {
    let matchingItem;

    // check if the product is already in cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

    // change the cart data based on the result
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.push({
                productId: productId,
                quantity: 1
                });
            };
}
