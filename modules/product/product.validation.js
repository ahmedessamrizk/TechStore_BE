import joi from "joi"

export const  addProduct = {
    body: joi.object().required().keys({
        title: joi.string().min(3).required(),
        description: joi.string().min(3).required(),
        price: joi.number().required(),
        category: joi.string().required(),
        imageUrl: joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true})
}

export const  updateProduct = {
    body: joi.object().required().keys({
        title: joi.string().min(3).required(),
        description: joi.string().min(3).required(),
        price: joi.number().required(),
        category: joi.string().required(),
        imageUrl: joi.string().required()
    }),
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true}),
    params: joi.object().required().keys({
        id: joi.string().min(24).max(24).required()
    })
}

export const  deleteProduct = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true}),
    params: joi.object().required().keys({
        id: joi.string().min(24).max(24).required()
    })
}

export const  softDeleteProduct = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true}),
    params: joi.object().required().keys({
        id: joi.string().min(24).max(24).required()
    })
}

export const  getProductsByID = {
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}

export const  getProductsByTitle = {
    query: joi.object().required().keys({
        title: joi.string().required().allow('')
    })
}

export const  likeProduct = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true}),
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}

export const  unLikeProduct = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({allowUnknown: true}),
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}