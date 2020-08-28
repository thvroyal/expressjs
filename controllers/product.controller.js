var Product = require('../models/product.model');
module.exports = {
    product: (req,res) => {
        Product.find().then(function(products){
            let page = parseInt(req.query.page) || 1;
            const PER_PAGE = 9;
            let maxPage = Math.floor(products.length / PER_PAGE) + 1;
            let begin = (page - 1) * PER_PAGE;
            let end = page * PER_PAGE;
            let pagination = [];
            for (let i = page - 1; i<= page + 1; i++) if (i <= maxPage) pagination.push(i);
            let items = products.slice(begin, end);
            if (page >= 1 && page <=maxPage) {
                res.render('product',{
                    items: items,
                    page: page,
                    pag: pagination,
                    maxPage: maxPage
                });
            } else {
                res.redirect('?page=1');
            }
           
        })
    }
}