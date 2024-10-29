export interface User{
    id?: number 
	fname?: any 
    lname?:any
    username?:any
	email?: string 
	password?: string 
    dob?:any
	created_at?: string 
	is_active?: boolean
}
export interface UserFilter{
	id?:number
	fname?: string
    lname?:any
    username?:any
	email?: string  
    dob?:any
	rc?: number
	page?: number
}