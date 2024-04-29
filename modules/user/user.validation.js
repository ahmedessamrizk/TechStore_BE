import joi from 'joi'

export const getUserByID = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({ allowUnknown: true }),
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}

export const softDeleteProfile = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({ allowUnknown: true }),
    params: joi.object().required().keys({
        id: joi.string().required().min(24).max(24)
    })
}

export const blockUser = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({
        email: joi.string().email().required()
    })

}
export const makeAdmin = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({ allowUnknown: true }),
    body: joi.object().required().keys({
        adminValue: joi.number().required()
    })

}

export const SignOut = {
    headers: joi.object().required().keys({
        authorization: joi.string().required()
    }).options({ allowUnknown: true })
}