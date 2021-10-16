import {Role} from '@constants';
import axios from 'axios';
import {SERVER} from '@constants';
import {
  AdminState,
  BoardInsertData,
  BoardUpdateData,
  PlaceInsertData,
  PlaceUpdateData,
} from './types';

export async function getUserList(role: string): Promise<AdminState> {
  try {
    const users = await axios.get(`${SERVER}/user/role/${role}`,
        {withCredentials: true});
    return users.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function getUnitList(): Promise<AdminState> {
  try {
    const units = await axios.get(`${SERVER}/unit/listForSuperAdmin`,
        {withCredentials: true});
    return units.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function authUserApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/user/${id}`, {
      isConfirmed: true,
    }, {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function authUnitApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/unit/${id}`, {
      isConfirmed: true,
    }, {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function deleteUserApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/user/${id}`,
        {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function deleteUnitApi(id: number) : Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/unit/${id}`,
        {withCredentials: true});

    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function updateUserRoleApi(id: number,
    roleId: number) : Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/user/${id}`, {
      roleId: roleId,
    }, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function getBoardList(): Promise<AdminState> {
  try {
    const boards = await axios.get(`${SERVER}/board/list/`,
        {withCredentials: true});
    return boards.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function updateBoardApi(data: BoardUpdateData):
  Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/board/${data.id}`,
        data, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function insertBoardApi(data: BoardInsertData):
  Promise<AdminState> {
  try {
    const result = await axios.post(`${SERVER}/board/create`,
        data, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}


export async function deleteBoardApi(id: number):
  Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/board/${id}`,
        {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}


export async function getPlaceList(): Promise<AdminState> {
  try {
    const places = await axios.get(`${SERVER}/place/`,
        {withCredentials: true});
    return places.data;
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function updatePlaceApi(data: PlaceUpdateData):
  Promise<AdminState> {
  try {
    const result = await axios.patch(`${SERVER}/place/${data.id}`,
        data, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}

export async function insertPlaceApi(data: PlaceInsertData):
  Promise<AdminState> {
  try {
    const result = await axios.post(`${SERVER}/place`,
        data, {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}


export async function deletePlaceApi(id: number):
  Promise<AdminState> {
  try {
    const result = await axios.delete(`${SERVER}/place/${id}`,
        {withCredentials: true});
    return {
      result: 'success',
    };
  } catch (err: any) {
    return {result: 'error', message: err};
  }
}
