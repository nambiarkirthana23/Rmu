import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('agency_master_tbl')
export class AgencyMaster

{
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'name'})
    name:string;
}