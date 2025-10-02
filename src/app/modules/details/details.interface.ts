
export interface IEducation {
	title: string;
	institute: string;
	session: string;
}
export interface IDetails {
	about: string;
	education: IEducation[]
}