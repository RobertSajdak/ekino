namespace TMDB {
	export type TRes<TData> = {
		page: number;
		results: TData;
		total_pages: number;
		total_results: number;
	};
	export type TMovie = {
		backdrop_path: string;
		id: number;
		original_title: string;
		overview: string;
		poster_path: string;
		media_type: string;
		adult: boolean;
		title: string;
		original_language: string;
		genre_ids: number[];
		popularity: number;
		release_date: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	};
	export type TTV = {
		adult: boolean;
		backdrop_path: string;
		genre_ids: number[];
		id: number;
		origin_country: string[];
		original_language: string;
		original_name: string;
		overview: string;
		popularity: number;
		poster_path: string;
		first_air_date: string;
		name: string;
		vote_average: number;
		vote_count: number;
	};

	export type TMovieDetails = {
		adult: boolean;
		backdrop_path: string;
		belongs_to_collection: TCollection;
		budget: number;
		genres: TGenre[];
		homepage: string;
		id: number;
		imdb_id: string;
		origin_country: string[];
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: TProductionCompany[];
		production_countries: TProductionCountry[];
		release_date: string;
		revenue: number;
		runtime: number;
		spoken_languages: TSpokenLanguage[];
		status: string;
		tagline: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	};

	export type TCast = {
		adult: boolean,
		gender: number,
		id: number,
		known_for_department: string,
		name: string,
		original_name: string,
		popularity: number,
		profile_path: string,
		cast_id: number,
		character: string,
		credit_id: string,
		order: number
	}

	export type TMovieDetailsWithCredits = TMovieDetails & {
		credits: {
			cast: TCast[];
		}
	}

	type TCollection = {
		id: number;
		name: string;
		poster_path: string;
		backdrop_path: string;
	};

	export type TGenre = {
		id: number;
		name: string;
	};

	export type TGenres = {
		genres: TGenre[]
	};

	export type TCountry = {
		iso_3166_1: string,
		english_name: string,
		native_name: string
	}

	type TProductionCompany = {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	};

	type TProductionCountry = {
		iso_3166_1: string;
		name: string;
	};

	type TSpokenLanguage = {
		english_name: string;
		iso_639_1: string;
		name: string;
	};

	export type TImages = {
		backdrops: TImage[] | [];
		logos: TImage[] | [];
		posters: TImage[] | [];
		id: number;
	};

	export type TImage = {
		aspect_ratio: number;
		height: number;
		iso_639_1: string;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	};

	export type TTVDetails = {
		adult: boolean;
		backdrop_path: string;
		created_by: TCreatedBy[];
		episode_run_time: number[];
		first_air_date: string;
		genres: TGenre[];
		homepage: string;
		id: number;
		in_production: boolean;
		languages: string[];
		last_air_date: string;
		last_episode_to_air: TEpisode;
		name: string;
		next_episode_to_air: TEpisode | null;
		networks: TNetwork[];
		number_of_episodes: number;
		number_of_seasons: number;
		origin_country: string[];
		original_language: string;
		original_name: string;
		overview: string;
		popularity: number;
		poster_path: string;
		production_companies: TProductionCompany[];
		production_countries: TProductionCountry[];
		seasons: TSeason[];
		spoken_languages: TSpokenLanguage[];
		status: string;
		tagline: string;
		type: string;
		vote_average: number;
		vote_count: number;
	}

	export type TTVDetailsWithCredits = TTVDetails & {
		credits: {
			cast: TCast[]
		}
	}

	type TCreatedBy = {
		id: number;
		credit_id: string;
		name: string;
		original_name: string;
		gender: number;
		profile_path: string;
	};

	type TEpisode = {
		id: number;
		overview: string;
		name: string;
		vote_average: number;
		vote_count: number;
		air_date: string;
		episode_number: number;
		episode_type: string;
		production_code: string;
		runtime: number;
		season_number: number;
		show_id: number;
		still_path: string;
	};

	type TNetwork = {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	};

	type TSeason = {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
		vote_average: number;
	};
	export type TSearchMovieReq = {
		query: string;
		include_adult?: boolean;
		language?: string;
		primary_release_date?: string;
		page?: number;
		region?: string;
		year?: string;
	}
	export type TSearchTVReq = {
		query: string;
		include_adult?: boolean;
		language?: string;
		first_air_date?: string;
		page?: number;
		year?: string;
	}
	export type TDiscoverMovieReq = {
		language?: string;
		primary_release_year?: number;
		with_genres?: string;
		with_origin_country?: string;
	}
	export type TDiscoverTVReq = {
		language?: string;
		first_air_date_year?: number;
		with_genres?: string;
		with_origin_country?: string;
	}
}

export default TMDB;
