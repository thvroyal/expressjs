"use strict";

var Product = require('../models/product.model');

module.exports = {
  product: function product(req, res) {
    Product.find().then(function (products) {
      var page = parseInt(req.query.page) || 1;
      var PER_PAGE = 9;
      var maxPage = Math.floor(products.length / PER_PAGE) + 1;
      var begin = (page - 1) * PER_PAGE;
      var end = page * PER_PAGE;
      var pagination = [];

      for (var i = page - 1; i <= page + 1; i++) {
        if (i <= maxPage) pagination.push(i);
      }

      var items = products.slice(begin, end);

      if (page >= 1 && page <= maxPage) {
        res.render('product', {
          items: items,
          page: page,
          pag: pagination,
          maxPage: maxPage
        });
      } else {
        res.redirect('?page=1');
      }
    });
  }
};