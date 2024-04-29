import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    createdBy: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    isDeleted: {type: Boolean, default: false},
    category: {type: String, required: true},
    imageUrl: {type: String, required: true, default: ""}
},
{
    timestamps: true
})

export const productModel = mongoose.model('Product', productSchema);