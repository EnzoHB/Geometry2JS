import { Vector } from "../class/Vector.js";

class Canvas {
    constructor(screen) {
        this.bound = screen.getBoundingClientRect();
        this.screen = screen;
        this.capturing = true;
        this.onhold = [];
        this.sets = [];
        this.events = [];

        const width = window.innerWidth;
        const height = window.innerHeight - this.bound.y

        screen.height = height;
        screen.width = width;

        screen.addEventListener('click', event => {
            if (!this.capturing) return;

            const x = event.clientX - this.bound.left;
            const y = event.clientY - this.bound.top;

            const vector = new Vector(x, y);

            this.onhold.push(vector);
            this.events.forEach(listener => listener(vector, event));
        });
    };

    onCreate(callback) {
        this.events.push(callback)
    };

    remove(callback) {
        //this.events.find(callback);
    };

    onSequence(times) {
        var that = this;
        var times = times - 1;
        var now = 0;

        return { do: callback => {
            
            that.onCreate(listener);
            let onhold; 

            function listener(vector, event) {
                if (now != times) return now++;
    
                onhold = that.onhold;
                that.sets.push(onhold);
                callback(onhold, event);
    
                that.onhold = [];

                now = 0;
            };
        }}
    };

    onOnly(times) {
        var that = this;
        var times = times;
        var now = 0;

        return { do: callback => {
            
            that.onCreate(listener);

            function listener(vector, event) {
                if (now != times) return now++;
    
                that.sets.push(that.onhold);
                callback(that.onhold, event);
    
                that.onhold = [];
                that.remove(listener);
                that.stopCapturing();

                now = 0;
            };
        }}
    };

    stopCapturing() {
        this.capturing = false;
        return this;
    };

    resumeCapturing() {
        this.capturing = true;
        return this;
    };


};

export { Canvas }