export default class Distance {
   distance?:number
   // start_lon?:number
   // start_lat?:number
   // end_lat?:number
   // end_lon?:number
   // type_dist?:string //SMP, PMSP
   duration?:number //sec
   locality_id?:number
   mc_id?:number
   mc_facility_id?:number
   limit = 6

   getArray(){
      return [this.distance, this.duration, this.locality_id, this.mc_id, this.mc_facility_id]
   }
}