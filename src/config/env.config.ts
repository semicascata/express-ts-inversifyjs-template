import * as dotenv from "dotenv";
dotenv.config();

export const port: number = +process.env.PORT || 3003;
export const mongoUri: string = process.env.MONGO_URI;
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtRefresh: string = process.env.JWT_REFRESH;
export const url: string = process.env.URL;
