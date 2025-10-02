// export interface IUpcomingFeatures {
// 	title: string;
// 	description: string;
// }
// export interface IProjectChallenges {
// 	title: string;
// 	description: string;
// }

export interface IProject {
	name: string;
	title: string;
	description: string;
	thumbnail: string;
	technologies: string[];
	features: string[];
	frontEndGithubRepo: string;
	backEndGithubRepo: string;
	liveLink: string;
	// upcomingFeatures?: IUpcomingFeatures[]
	// projectChallenges?: IProjectChallenges[]
}