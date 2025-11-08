// js/models.js
export class UserModel {
    constructor({ name = "", email = "", phone = "", picture = "" } = {}) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.picture = picture;
    }
}
export class NameEstimate {
    constructor({ name = "", age = null, gender = null, country = [] } = {}) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.country = country;
    }
}
export class SimpleFact { constructor({ fact = "" } = {}) { this.fact = fact; } }
export class JokeModel {
    constructor({ id = "", value = "" } = {}) {
        this.id = id;
        this.value = value;
    }
}
export class PriceModel {
    constructor({ timeUpdated = "", btcUSD = "" } = {}) {
        this.timeUpdated = timeUpdated;
        this.btcUSD = btcUSD;
    }
}