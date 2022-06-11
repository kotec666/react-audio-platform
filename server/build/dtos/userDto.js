"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.id = model.id;
        this.login = model.login;
        this.email = model.email;
        this.role = model.role;
        this.pseudonym = model.pseudonym;
        this.isActivated = model.isActivated;
        this.activationLink = model.activationLink;
    }
}
exports.default = UserDto;
