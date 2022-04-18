class Movement {
    constructor() {
        this.instant = new Map;
        this.constant = new Map;
    };

    addInstant(force) {
        this.instant.set(force, force.apply());
    }; 

    removeInstant(force) {
        this.instant.delete(force);
    };

    addConstant(force) {
        this.constant.set(force, force.apply());
    };

    removeConstant(force) {
        this.constant.set(force);
    };

    clear() {
        this.instant.clear();
        this.constant.clear();
        return this;
    };

    *init() {

        while(true) {

            let vectors = [];

            this.constant.forEach(iterator => vectors.push(iterator.next().value));
            this.instant.forEach((iterator, force) => {
                vectors.push(iterator.next().value);

                this.instant.delete(force);
            });

            yield vectors.reduce((a, b) => a.add(b));
        };
    };
};

export { Movement }