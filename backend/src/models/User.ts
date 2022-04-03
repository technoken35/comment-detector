import {ObjectId} from "mongodb";

class User extends Model{
    public collection:string

    constructor(
        public name: string,
        public email: string,
        private password: string,
        public id?: ObjectId,
        public teamIds?: number[])
    {
        super();
        this.collection = 'users';
    }
}