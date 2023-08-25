interface User {
    name: string, 
    age: number,
    email: string
}
class Post {
    name: string;
    id: number;
    constructor(name: string, id: number) { this.name = name; this.id = id; }
}

import {Transform} from 'stream/Transform';

console.log(Transform)