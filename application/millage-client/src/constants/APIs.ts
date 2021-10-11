export const SERVER         = '/api';
export const SOCKET_SERVER  = '';

// export const SERVER         = 'https://millage.ml/api';
// export const SOCKET_SERVER  = 'https://millage.ml';


export const BOARD_API                      = `${SERVER}/board`;
export const GET_BOARD_LIST_API             = `${BOARD_API}/list`;
export const GET_BOARD_LIST_WITH_POSTS_API  = `${BOARD_API}/listWithPosts`;
export const CREATE_BOARD_API               = `${BOARD_API}/create`;
export const GET_BOARD_API                  = BOARD_API;

export const POST_API               = `${SERVER}/post`;
export const GET_POST_API           = POST_API;
export const TOGGLE_POST_HEART_API  = `${POST_API}/heart`;
