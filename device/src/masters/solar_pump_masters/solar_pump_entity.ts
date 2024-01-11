import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'solar_pump_master'})
export class SolarPump{
   
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'description'})
    description:string;
    


}