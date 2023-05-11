import { Pessoas } from "./pessoa.interface";

export interface Users {

    _embedded: Embedded;
    page: Page;
    _links: Links;
    
}

export interface Embedded {
    pessoas: Pessoas[];
}

export interface Page {
    number: number;
    size: number;
    totalElements: number;
    totalPage: number;
}

export interface Links {
    profile: string;
    search: string;
    self: string;
}