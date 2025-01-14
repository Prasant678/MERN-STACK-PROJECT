const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://prasantrao917:Prasant567@cluster0.yzxfbbv.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("404 not Found", err);
        else {
            console.log("connected successfully");
            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory")
                foodCategory.find({}).toArray(function(err, catData) {
                    if(err) 
                        console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                }) 
                // if (err)
                //     console.log(err);

                // else
                //     global.food_items = data;
                //     // console.log(global.food_items);
            });
        }
    });
}

module.exports = mongoDB;
