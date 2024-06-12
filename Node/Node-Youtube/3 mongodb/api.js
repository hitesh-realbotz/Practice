// //MongoDb API
// const dbConnect = require('./mongodb');
// const express = require('express');
// const mongodb = require('mongodb');
// const app = express();

// app.use(express.json());

// app.get('/', async (res, resp) => {
//     let data = await dbConnect();
//     data = await data.find().toArray();
//     resp.send(data);
// });

// app.post("/", async (req, resp) => {
//     let data = await dbConnect();
//     let result = await data.insertOne(req.body)
//     resp.send(result)

// })

// app.put("/:name", async (req, resp) => {
//     const data = await dbConnect();
//     let result = data.updateOne(
//         { name: req.params.name },
//         { $set: req.body }
//     )
//     resp.send({ status: "updated" });
// })

// app.delete("/:id", async (req,resp)=>{
//     console.log(req.params.id);
//     const data = await dbConnect();
//     const result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
//     // const result = await data.deleteOne({_id: parseInt(req.params.id)})
//     resp.send(result);
// })

// app.listen(5000);




//Mongoose API
const express = require('express');
require("./config");
const Product = require('./product');
const app = express();

app.use(express.json());
app.post("/create", async (req, resp) => {
    let data = new Product(req.body);
    const result = await data.save();
    resp.send(result);
});

app.get("/list", async (req, resp) => {
    let data = await Product.find();
    resp.send(data);
})

app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await Product.deleteOne(req.params);
    resp.send(data);
})


app.put("/update/:_id",async (req, resp) => {
    console.log(req.params)
    let data = await Product.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
});

app.get("/search/:key",async (req,resp)=>{
    let data = await Product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {brand:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

});

//File upload
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
            // cb(null, file.originalname)
        }
    })
}).single('file_name');

app.post("/upload", upload, (req, resp) => {
    resp.send("file upload")
});

app.listen(5000);

