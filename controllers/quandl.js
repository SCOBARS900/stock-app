var Stocks = require('../models/stock');
var Quandl = require('quandl');
var async = require('async');

module.exports = {
    
    
    quandlFind: function(req, res, next) {
       stockCodes = [];
       dataDisplay = [];
        
        
        Stocks.find ({ }, function(err, data) {
       if (err) {
           throw err;
       } 
        
       if (data) {
           var allCodes = data.map(function(stock) {
              stockCodes.push(stock.code);
              dataDisplay.push(stock);
           });
           
              
       } 
       
        next();
       });
    }, 
    
    
    quandlAuthenticate: function(req, res, next) {
        allStockData = [];
        counter = 0;
        
        var quandl = new Quandl({
          auth_token: process.env.QUANDL_KEY,
          api_version: 3
        });
        
        
        if (stockCodes.length > 0) {
            
        for (i = 0; i < stockCodes.length; i++) {
        
        quandl.dataset({
          source: "WIKI",
          table: stockCodes[i],
        }, {
          order: "asc",
          exclude_column_names: true,
          // Notice the YYYY-MM-DD format 
          start_date: "2015-01-30",
          end_date: "2015-02-28",
          column_index: 4
        }, function(err, response){
            if(err)
                throw err;
            
            if (response) {
                var dataJ = JSON.parse(response);
            
                allStockData.push(dataJ);
                counter++; 
                
                if (counter == stockCodes.length) {
                next();
                } 
                
                
            }
                
        });
          
        }
        } else {
            next();
        }
        
    },
    
    quandlAllStock: function(req, res, next) {
        console.log("allstockfunction");
        
        var allPrices = allStockData.map(function(stock) {
           
            stock.dataset.data.map(function(prices) {
              // console.log(prices); 
            });
            
            
        });
    
        next();
         
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}

