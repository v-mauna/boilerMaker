//action creators
const LOAD_USERS = 'LOAD_USERS';

const GET_ONE_USER = 'GET_ONE_USER';

const CREATE_USER = 'CREATE_USER';

const UPDATE_USER = 'UPDATE_USER'

const DELETE_USER = 'DELETE_USER';

export const loadUsers= (users) => {
  return {
    type: LOAD_USERS,
    users
  }
}

const getOneUser = (student)=>{
  return{
      type: GET_ONE_STUDENT,
      student
  }
}

export const createUser = (newUser) => {
  return {
    type: CREATE_USER,
    newUser
  }
}

const updateUser= (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id
  }
}

const defaultUser = {};

export default function(state = defaultUser,action){
  switch(action.type){
    default:
      return state
  }
}