// Import required packages
const express = require('express');
const cors = require('cors');
const app = express();
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

const generateTheroticalContent = (page, limit) => {
    

    // Define characters for generating content
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
    const contentLength = 50;
    const detailsLength = 500;
    
    const jsonContent = [];
    let pageNumber = 1;
   
    while (pageNumber < 2) {
        let itemNumber = 1;
        jsonContent.push(
            
                {
                    page: page,
                    items: [
                       
                    ]
                }
            
        )
        while (itemNumber < limit) {
            let charCount = 0;
            let itemContent = "";
            let itemDetails = "";
            while (charCount < contentLength) {
                let randomNumber = Math.floor(Math.random() * characters.length);
                itemContent =itemContent+ characters.charAt(randomNumber);
                charCount = charCount + 1;
            }
            while (charCount < detailsLength) {
                let randomNumber = Math.floor(Math.random() * characters.length);
                itemDetails =itemDetails+ characters.charAt(randomNumber);
                charCount = charCount + 1;
            }
            let newItem={
                item: itemNumber,
                description: itemContent,
                moreDetails: itemDetails
            }
            jsonContent[pageNumber-1].items.push(newItem);
                
           
             itemContent = "";
            itemNumber = itemNumber + 1;
        }
        pageNumber = pageNumber + 1;

    }
    
    return jsonContent;


}

const generateRequestedContent = (page, limit) => {
    

        // Define characters for generating content
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
    const contentLength = 50;
    const detailsLength = 200;
    
    const jsonContent = [];
    let pageNumber = 1;
    
    while (pageNumber < page) {
        let itemNumber = 1;
        jsonContent.push(
            
                {
                    page: pageNumber,
                    items: [
                       
                    ]
                }
            
        )
        while (itemNumber < limit) {
            let charCount = 0;
            let itemContent = "";
            let itemDetails = "";
            while (charCount < contentLength) {
                        // Generate random content
                let randomNumber = Math.floor(Math.random() * characters.length);
                itemContent =itemContent+ characters.charAt(randomNumber);
                charCount = charCount + 1;
            }
            while (charCount < detailsLength) {
                     // Generate random details
                let randomNumber = Math.floor(Math.random() * characters.length);
                itemDetails =itemDetails+ characters.charAt(randomNumber);
                charCount = charCount + 1;
            }
            let newItem={
                item: itemNumber,
                description: itemContent,
                moreDetails: itemDetails
            }
            jsonContent[pageNumber-1].items.push(newItem);
                
             // Reset itemContent for the next iteration
             itemContent = "";
            itemNumber = itemNumber + 1;
        }
        pageNumber = pageNumber + 1;

    }

    return jsonContent;
}

//for api request from front end queries(infinite scrolling)
app.get(`/api/page=:page&limit=:limit`, (req, res) => {

     const content = generateTheroticalContent(req.params.page, req.params.limit);
        res.send(content);
   
});


// for backend queries
app.get(`/api/page=:page&limit=:limit`, (req, res) => {
   
       const content = generateRequestedContent(req.params.page, req.params.limit);
          res.send(content);
     
  });

app.listen(3001);