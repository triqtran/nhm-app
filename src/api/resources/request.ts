import { ApiResponse } from "api/caller";

export type ContinueResourceKind = 'Game' | 'Book';
export type ExerciseGameKind = 'pin_yin' | 'vocabulary';

export type ContinueResources = {
  object_name: string;
  object_background_image: string;
  type: ContinueResourceKind;
  object_other_info: {
    current_level: number;
    total_correct_answers: number;
  };
}

export type BookType = {
  name?: string;
  short_description?: string;
  description?: string;
  total_chapters?: number;
  current_chapters?: number;
  background_image?: string;
  url_file?: string;
};

export type ExerciseGameType = {
  name?: string;
  description?: string;
  intro?: string;
  type?: ExerciseGameKind;
  background_image?: string;
  total_level?: number;
  current_level?: number;
  total_levels_completed?: number;
  total_correct_answers?: number;
  how_to_play?: string;
  stars_to_win?: number;
  is_finish?: boolean;
};

export type StudentOwnerData = {
  current?: Array<ContinueResources>;
  books?: Array<BookType>;
  games?: Array<ExerciseGameType>;
};

export type GetStudentOwnerRes = {
  success: boolean;
  data: StudentOwnerData;
};

export type ListBooksRes = {
  success: boolean;
  data: Array<BookType>;
};

export type ListExerciseGamesRes = {
  success: boolean;
  data: Array<ExerciseGameType>;
};

export type GetBookDetailRes = {
  success: boolean;
  data: BookType;
};

export type GetExerciseGameDetailRes = {
  success: boolean;
  data: ExerciseGameType;
};

export default interface IResourceAPI {
  getStudentOwner: () => Promise<ApiResponse<GetStudentOwnerRes>>;
  listBooks: () => Promise<ApiResponse<ListBooksRes>>;
  listExerciseGames: () => Promise<ApiResponse<ListExerciseGamesRes>>;
  getBookDetail: (bookId: number) => Promise<ApiResponse<ListBooksRes>>;
  getExerciseGameDetail: (exgameId: number) => Promise<ApiResponse<GetExerciseGameDetailRes>>;
}

/*
{
    "success": true,
    "data": {
        "current": [
            {
                "object_name": "HSK Pin Yin Game",
                "object_background_image": "https://s3.ap-southeast-1.amazonaws.com/storage.nihaoma.com/uploads/2023711/151821_0263.852788d9d-6fe2.04ffd86bd.png",
                "type": "Game",
                "object_other_info": {
                    "current_level": "3",
                    "total_correct_answers": 4
                }
            }
        ],
        "books": [
            {
                "background_image": "https://s3.ap-southeast-1.amazonaws.com/storage.nihaoma.com/uploads/2023711/151712_83ca.1d2f9f89e-126d.bc30655b7.png",
                "name": "Vocabulary Book",
                "short_description": "Test",
                "description": "Test",
                "total_chapters": 10,
                "current_chapter": 10,
                "url_file": "https://s3.ap-southeast-1.amazonaws.com/storage.nihaoma.com/uploads/2023711/151712_83ca.1d2f9f89e-126d.bc30655b7.png"
            }
        ],
        "games": [
            {
                "background_image": "https://s3.ap-southeast-1.amazonaws.com/storage.nihaoma.com/uploads/2023711/151821_0263.852788d9d-6fe2.04ffd86bd.png",
                "total_level": 10,
                "name": "HSK Pin Yin Game",
                "description": "Test",
                "how_to_play": "Just play",
                "intro": "Practice listening",
                "current_level": "1",
                "total_correct_answers": 10,
                "stars_to_win": 10,
                "type": "pin_yin",
                "total_levels_completed": 1,
                "is_finish": false
            },
            {
                "background_image": "https://s3.ap-southeast-1.amazonaws.com/storage.nihaoma.com/uploads/2023711/151821_0263.852788d9d-6fe2.04ffd86bd.png",
                "total_level": 10,
                "name": "HSK Vocabulary Game",
                "description": "Test",
                "how_to_play": "Just play",
                "intro": "Practice listening",
                "current_level": null,
                "total_correct_answers": null,
                "stars_to_win": 10,
                "type": "vocabulary",
                "total_levels_completed": 0,
                "is_finish": false
            }
        ]
    }
}
*/