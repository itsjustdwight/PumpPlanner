import mongoose from "mongoose"

const mongoURI = "mongodb://localhost:27017/pumpplannerdb"

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const exerciseSchema = new mongoose.Schema({
    name: String,
    type:String,
    muscle: String,
    equipment: String,
    weight: String,
    difficulty: String,
})

const Exercise = mongoose.model("Exercise", exerciseSchema);

export { mongoose, Exercise };