// import HttpError from 'exception/HttpError';
// import {existsSync, mkdirSync} from 'fs';
// import {diskStorage} from 'multer';
// import getProcessEnv from './getProcessEnv';
// import uuidRandom from './uuidRandom';

// export const multerOptions = {
//   fileFilter: (request, file, callback) => {
//     if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
//       // 이미지 형식은 jpg, jpeg, png만 허용합니다.
//       callback(null, true);
//     } else {
//       callback(new HttpError(400, '지원하지 않는 이미지 형식입니다.'), false);
//     }
//   },

//   storage: diskStorage({
//     destination: (request, file, callback) => {
//       const uploadPath: string = 'public';

//       if (!existsSync(uploadPath)) {
//         // public 폴더가 존재하지 않을시, 생성합니다.
//         mkdirSync(uploadPath);
//       }

//       callback(null, uploadPath);
//     },

//     filename: (request, file, callback) => {
//       callback(null, uuidRandom(file));
//     },
//   }),
// };

// export const createImageURL = (file): string => {
//   const serverAddress: string = getProcessEnv('SERVER_ADDRESS');
//   return `${serverAddress}/upload/${file.filename}`;
// };
