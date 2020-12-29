import * as dotenv from "dotenv";
dotenv.config();

export const port: number = +process.env.PORT || 3003;
export const mongoUri: string = process.env.MONGO_URI;
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtRefresh: string = process.env.JWT_REFRESH;
export const jwtExpiresIn: number = +process.env.JWT_EXPIRESIN;
export const jwtRefresyExpiresIn: number = +process.env.JWT_REFRESH_EXPIRESIN;
// export const jwtAlgorithm: string = process.env.JWT_ALGORITHM;
export const url: string = process.env.URL;
