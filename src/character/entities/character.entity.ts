import { Location } from "src/location/entities/location.entity";
import { JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";

export class Character {

    id: number;
    name:string;
    salary:number;
    employee : boolean;
    property : Location;
    favPlaces : Location[];

    @OneToOne(() => Location, location => location.owner)
    character.property: Location;

    @ManyToMany(() => Location, location => location.favCharacters)
    @JoinTable()
    favPlaces: Location[];

}
