import 'dotenv/config'
import jwt from 'jsonwebtoken'
const { sign, verify } = jwt
function createToken(user) {
    return sign(
        {
            userEmail: user.userEmail,
            userPwd:user.userPwd
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'1h'
        }
    )
}
export {
    createToken
}