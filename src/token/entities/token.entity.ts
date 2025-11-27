
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Token {

    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column(
        {unique:true}
    )
    token : string;

    @Column(
        {default:true}
    )
    active : boolean;

    @Column(
        {default:10}
    )
    reqLeft : number;


}
