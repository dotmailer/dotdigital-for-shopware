export default class CartInsight {
    init(data) {
        this.send(data);
    }

    send(data) {
        if (data.customer_email) {
            window.ddg.identify({ email: data.customer_email });
        }

        if (!data.cart_id) {
            return;
        }

        const insightData = {
            programId: data.program_id,
            cartDelay: data.cart_delay,
            cartId: data.cart_id,
            cartPhase: data.cart_phase,
            currency: data.currency,
            subtotal: data.subtotal,
            shipping: data.shipping,
            discountAmount: data.discount_amount,
            taxAmount: data.tax_amount,
            grandTotal: data.grand_total,
            cartUrl: data.cart_url,
            products: this.mapLineItems(data.line_items),
        };

        if (data.cart_phase === 'ORDER_CHECKOUT') {
            window.ddg.checkout(insightData);
        } else if (data.cart_phase === 'ORDER_COMPLETE') {
            insightData.orderId = data.cart_id;
            window.ddg.purchaseComplete(insightData);
        } else {
            window.ddg.cartUpdate(insightData);
        }
    }

    mapBaseItem(item) {
        return {
            productId: item.id,
            sku: item.sku,
            name: item.name,
            unitPrice: item.unit_price,
            salePrice: item.sale_price,
            quantity: item.quantity,
            totalPrice: item.total_price,
            imageUrl: item.image_url,
            productUrl: item.product_url,
        };
    }

    mapLineItems(lineItems) {
        let mapped = [];
        if (lineItems && lineItems.length) {
            mapped = lineItems.map(this.mapBaseItem);
        }
        return mapped;
    }
}
