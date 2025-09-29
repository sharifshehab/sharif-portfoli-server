export interface IUpcomingFeatures {
	title: string;
	description: string;
}
export interface IProjectChallenges {
	title: string;
	description: string;
}

export interface IProject {
	name: string;
	subTitle: string;
	description: string;
	thumbnail: string;
	technology: string[];
	features: string[];
	githubRepo: string;
	liveLink: string;
	upcomingFeatures?: IUpcomingFeatures[]
	projectChallenges?: IProjectChallenges[]
}