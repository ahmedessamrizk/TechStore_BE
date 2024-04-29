import { userModel } from "./../../../DB/models/user.model.js";
import { productModel } from "./../../../DB/models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl, category } = req.body;
    const newProduct = new productModel({
      title,
      description,
      price,
      createdBy: req.user._id,
      imageUrl,
      category
    });
    const savedProduct = await newProduct.save();
    return res.status(200).json({ message: "Done", savedProduct });
  } catch (error) {
    return res.status(400).json({ message: "catch error", error });
  }
};



export const updateProduct = async (req, res) => {
  try {
    const { title, description, price, imageUrl, category } = req.body;
    const { id } = req.params;
    const updateProduct = await productModel
      .findOneAndUpdate(
        { _id: id, createdBy: req.user._id },
        { title, description, price, imageUrl, category },
        { new: true }
      )
      .select("title description price imageUrl category");
      return  updateProduct
      ? res.status(200).json({ message: "Done", updateProduct })
      : res
        .status(400)
        .json({ message: "Invalid product id or u aren't authorized" });

  } catch (error) {
    return res.status(400).json({ message: "catch error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await productModel.deleteOne({
      _id: id,
      createdBy: req.user._id,
    });
    return updateProduct
      ? res.status(200).json({ message: "Done" })
      : res
        .status(400)
        .json({ message: "Invalid product id or u aren't authorized" });
  } catch (error) {
    return res.status(400).json({ message: "catch error", error });
  }
};

export const getProductByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const products = await productModel.find({ title: { $regex: `${title}` } });
    return products.length
      ? res.status(200).json({ message: "Done", products })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    return res.status(400).json({ message: "catch error", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    //sort
    //dateDESC dateASC priceDESC priceASC  
    let { dateDesc, dateAsc, priceDesc, priceAsc } = req.query
    const sort = {}
    if (dateDesc == '1') {
      sort.updatedAt = 1
    }
    if (dateAsc == '1') {
      sort.updatedAt = -1
    }
    if (priceDesc == '1') {
      sort.price = -1
    }
    if (priceAsc == '1') {
      sort.price = 1
    }

    //filter by
    //pricegt pricelt category productName
    let { pricegt, pricelt, category, productName } = req.query
    const filter = {}
    if (pricegt) {
      filter.price = { $gte: Number(pricegt) }
    }
    if (pricelt) {
      filter.price = { $lte: Number(pricelt) }
    }

    if (productName) {
      filter.title = { $regex: `${productName}`, $options: 'i' }
    }
    if (category && category != '' && category != 'All') {
      filter.category = { $regex: `${category}`, $options: 'i' }
    }
    const products = await productModel.find(filter).select('-isDeleted').sort(sort).populate(
      {
        path: 'createdBy',
        select: 'firstName lastName'
      }
    )

    return products.length ? res.status(200).json({ message: "Done", products }) : res.status(404).json({ message: "Empty" });
  } catch (error) {
    return res.status(400).json({ message: "catch error", error })
  }
}
