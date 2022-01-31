class Validate {};

Validate.instance = (instance, arg, name) => {
    if (arg instanceof instance) return;

    throw new TypeError(`${name || 'Argument' } is not an instance of ${instance.name}\n${typeof arg == 'object'? JSON.stringify(arg) : arg}`);
};

Validate.type = (type, arg, name) => {
    if (typeof arg == type) return;

    throw new TypeError(`${name || 'Argument'} is not of the type ${type}\n${typeof arg == 'object'? JSON.stringify(arg) : arg}`);
};

Validate.array = (arg, name) => {
    if (Array.isArray(arg)) return;

    throw new TypeError(`${name || 'Argument'} is not an array\n${typeof arg == 'object'? JSON.stringify(arg) : arg}`);
};

export { Validate };