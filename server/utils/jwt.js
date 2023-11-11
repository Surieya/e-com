import jwt from "jsonwebtoken"

const getRefreshToken = function (email) {
    const refreshToken = jwt.sign({
        email,
    },
        process.env.REFRESH_SECRET,
        {expiresIn:'1hr'}
    ) 
    return refreshToken;
}

const getAccessToken = function (_id, email) {
      // ACCESS TOKEN SHOULD INCLUDE ROLES
    const accessToken = jwt.sign({
        _id,
        email
    },
        process.env.ACCESS_SECRET,
        {
         expiresIn:'10mins'
        })
    
    return accessToken;
}

const getDecodedToken =  function (token,secret) {
    const decoded =  jwt.verify(
        token,
        secret,
    )

    return decoded;
}

export { getAccessToken, getRefreshToken, getDecodedToken }