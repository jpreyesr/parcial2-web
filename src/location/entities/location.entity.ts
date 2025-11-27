import { Character } from "src/character/entities/character.entity";

export class Location {

    id :  number;
    name : string;
    type : string;
    cost : number;
    owner : Character;
    favCharacters : Character[];
}
