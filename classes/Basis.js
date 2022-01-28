import { UnitVector } from "./UnitVector.js";

class Basis {
    constructor(ih, jh) {
        this.ih = ih;
        this.jh = jh;
    };

    asMatrix() {};
};

Basis.cartesian = new Basis(UnitVector.xAxis, UnitVector.yAxis);


export { Basis };