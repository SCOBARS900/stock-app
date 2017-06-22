var express = require('express');
var router = express.Router();
var quandlFunctions = require('../controllers/quandl.js');
var Stocks = require('../models/stock');
var Quandl = require('quandl');


router.get('/', quandlFunctions.quandlFind, quandlFunctions.quandlAuthenticate, quandlFunctions.quandlAllStock,  function(req, res) {
    res.render('home.ejs', { datadisplay: dataDisplay });
    console.log("final consolelog");
});


router.post('/newstock', function(req, res) {
        searchStock = req.body.stock.toUpperCase();
    
    
        var quandl = new Quandl({
          auth_token: process.env.QUANDL_KEY,
          api_version: 3
        });
    
        quandl.search(searchStock, { format: "json", database_code: 'WIKI' }, function(err, response){
            if (err) {
                console.log(err);
            } 
        
            if (response) {
                var dataJ = JSON.parse(response);
                if (dataJ.datasets.length > 0) {
                   var stockName = dataJ.datasets[0].name;
                   var stockCode = dataJ.datasets[0].dataset_code;
                
                    Stocks.findOne({ 'code': stockCode }, function(err, data) {
                        if (err) {
                            throw err;
                        } 

                        if (data) {
                            console.log("Stock Already in DB");
                            res.redirect('/'); 
                        } else {
                            var newStocks = new Stocks();
                            newStocks.code = stockCode;
                            newStocks.name = stockName;
                            newStocks.save(function(err) {
                            if(err) {
                                throw err;
                            }
                            });  
                            res.redirect('/'); 

                        }

                    }); 
                    } else {
                        console.log("lower than 0");
                        res.redirect('/'); 
                    }
                
                
            } else {
                console.log("No response.");
                res.redirect('/'); 
            }
    
        });
          

    
});










module.exports = router;