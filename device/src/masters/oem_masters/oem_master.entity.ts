import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('oem_master')
export class OemMaster
{
 
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'name'})
    name:string;
    
    @Column({name:'email'})
    email:string;

}