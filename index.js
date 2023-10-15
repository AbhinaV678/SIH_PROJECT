import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import fetch from 'node-fetch';

const app = express();
const port = 3000;
var handled = false;
var category = "Error";
var arrayOfInputs =[];
app.use(
    fileUpload({
        limits: {
            fileSize: 5000000,
        },
        abortOnLimit: true,
        uploadTimeout: 0,
        limitHandler: function(req, res, next){
            handled= true;
            res.send("FILE SIZE EXCEEDED 5MB.");
        }
    })
);


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.post('/upload', async (req, res) => {
    // Get the file that was set to the field named "image"
     //see if you can use _dirname in future
     if(handled===true){
        return ;
     }
    
     var input1 = req.body["float-input1"];
     arrayOfInputs.push(input1);
     var input2 = req.body["float-input2"];
     arrayOfInputs.push(input2);
     var input3 = req.body["float-input3"];
     arrayOfInputs.push(input3);
     var input4 = req.body["float-input4"];
     arrayOfInputs.push(input4);
     var input5 = req.body["float-input5"];
     arrayOfInputs.push(input5);
     var input6 = req.body["float-input6"];
     arrayOfInputs.push(input6);
     var input7 = req.body["float-input7"];
     arrayOfInputs.push(input7);


     //res.render("index.ejs",{arrayOfTasks:arrayOfTasks});
     
            try {
                const response = await fetch('http://127.0.0.1:5000/getData', {
                    method: 'post', 
                    body: JSON.stringify(arrayOfInputs),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                //Pass the variable below to the frontend
                category = data["resultant"];
                console.log(category);
            } catch (error) {
                console.log(error);
            }
           
            return res.status(200).send(`${category}`);
        
   
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});





