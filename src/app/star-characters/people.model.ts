import { Character } from "./character.model";

export interface People<T> {
    count: number;
    next: string;
    previous: string;
    results: any[];
}