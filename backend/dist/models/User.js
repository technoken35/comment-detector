"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User extends Model {
    constructor(name, email, password, id, teamIds) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
        this.teamIds = teamIds;
        this.collection = 'users';
    }
}
