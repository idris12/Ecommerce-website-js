"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cart = function () {
    function cart() {
        _classCallCheck(this, cart);

        this.cartName = "cart_storage";
    }

    _createClass(cart, [{
        key: "items_refresh",
        value: function items_refresh(items) {
            sessionStorage.setItem(this.cartName, JSON.stringify(items));
            return items;
        }
    }, {
        key: "itemFormat",
        value: function itemFormat(name, quantity, base_price) {
            quantity = parseInt(quantity);
            base_price = parseFloat(base_price);

            return {
                name: name,
                quantity: quantity,
                base_price: base_price,
                total: quantity * base_price
            };
        }
    }, {
        key: "items",
        get: function get() {
            var items = sessionStorage.getItem(this.cartName);

            // if NOT empty
            if (items) {
                items = JSON.parse(items);
            } else {
                // if empty
                items = [];
            }

            return items;
        },
        set: function set(item) {
            var items = this.items;
            items.push(item);

            sessionStorage.setItem(this.cartName, JSON.stringify(items));

            return items;
        }
    }, {
        key: "totalPrice",
        get: function get() {
            var items = this.items,
                total = 0;

            $(items).each(function (i, d) {
                total += d.total;
            });

            return total;
        }
    }]);

    return cart;
}();

var crt = new cart();

var javascriptCart = function () {
    function javascriptCart() {
        _classCallCheck(this, javascriptCart);

        this.add_to_cart = ".add_to_cart";
        this.item_quantity = '.item_quantity';
        this.item_name = ".item_name";

        // functions on load
        this.addToCart();
        this.cartOutput();
        this.removeItem();
    }

    _createClass(javascriptCart, [{
        key: "addToCart",
        value: function addToCart() {
            var t = this;

            $(this.add_to_cart).click(function (e) {
                e.preventDefault();

                var name = $(this).parent('div').children(t.item_name).text(),
                    quantity = $(this).parent('div').children(t.item_quantity).val() || 1,
                    price = $(this).data('price');

                crt.items = crt.itemFormat(name, quantity, price);

                alert("\"" + name + "\" has been added to the cart.");
            });
        }
    }, {
        key: "cartOutput",
        value: function cartOutput() {
            var items = crt.items,
                totalQuantity = 0,
                totalPrice = 0,
                html = '';

            $(items).each(function (i, d) {
                totalQuantity += d.quantity;
                totalPrice += d.total;

                html += '<tr>';
                html += "<td>" + d.name + "</td>";
                html += "<td>" + d.quantity + "</td>";
                html += "<td>" + d.total + "</td>";
                html += "<td><a href=\"#\" class=\"remove_item_from_cart\" data-index-number=\"" + i + "\"><i class=\"glyphicon glyphicon-trash\"></i></a></td>";
                html += '</tr>';
            });

            $('.cart_output').html(html);

            var totalOutput = "<tr><th>Total</th><th>" + totalQuantity + "</th><th>" + totalPrice + "</th><th></th></tr>";
            $('.cart_total').html(totalOutput);
        }
    }, {
        key: "removeItem",
        value: function removeItem() {
            var self = this;

            $('body').on('click', '.remove_item_from_cart', function (e) {
                e.preventDefault();

                var indexNumber = $(this).data('index-number'),
                    items = crt.items,
                    new_items = [];
                $(items).each(function (i, d) {
                    if (i !== indexNumber) {
                        new_items.push(d);
                    }
                });

                crt.items_refresh(new_items);

                // refresh cart output
                self.cartOutput();
            });
        }
    }]);

    return javascriptCart;
}();

var jsc = new javascriptCart();
//# sourceMappingURL=javascript.js.map