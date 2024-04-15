import IRepository from "./IRepository";
import { UserModel } from "../models/UserModel";

export default interface ISampleUserRepository extends IRepository<Omit<UserModel, 'password'>> {
    findOne(email: string): Promise<UserModel | null>;
}
