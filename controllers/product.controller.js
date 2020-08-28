var Product = require('../models/product.model');
module.exports = {
    product: (req,res) => {
    //     var page = parseInt(req.query.page) || 1;
    //     var perPage = 9;
    //     var maxPage= Math.floor(db.get('products').size().value()/perPage)+1;
    //     var begin = (page - 1)* perPage;
    //     var end = page*perPage;
    //     var pagination = [];
    //     for (let i = page-1; i<=page + 1; i++) if (i<=maxPage) pagination.push(i);
    //     var items = db.get('products').value().slice(begin, end);
    //     if (page>=1 && page<=maxPage){
    //     res.render('product',{
    //         items: items,
    //         page: page,
    //         pag: pagination,
    //         maxPage: maxPage
    //     });
    // } else {
    //     res.redirect('?page=1');
    // }
        Product.find().then(function(products){
            res.render('product',{
                items: products,
                page: 2,
                pag: [1,2,3],
                maxPage: 10
            })
        })
    }
}