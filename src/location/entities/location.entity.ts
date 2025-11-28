import { Character } from "src/character/entities/character.entity";
import { Column, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Location {

    @PrimaryGeneratedColumn()
    id :  number;

    @Column()
    name : string;

    @Column()
    type : string;

    @Column()
    cost : number;

    @OneToOne(() => Character, character => character.location)
    owner : Character;

    @ManyToMany(() => Character, character => character.favPlaces)
    favCharacters : Character[];
   
}
