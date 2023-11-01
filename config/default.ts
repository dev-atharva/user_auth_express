import dotenv from "dotenv"
export default {
  port: 3000,
  dburi: "mongodb://localhost:27017/auth_node",
  logLevel: "info",
  smtp: {
    user: "ikx5gi7ykxx2lzfi@ethereal.email",
    pass: "FuyEQc2CjVMRH9H2TZ",
    host: "smtp.ethereal.email",
    post: 587,
    secure: false,
  },
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
};
