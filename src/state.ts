
import { atom, selector } from "recoil";
import { userInfo } from 'zmp-sdk';

export const userState = atom<userInfo>({
  key: "user",
  default: {
    id: '12345678',
    name: 'Zalo',
    avatar: 'ZA',
  }
})

export const inputStore = atom({
  key: "input",
  default:'con cac'
})

export const charCountStore = selector({
  key: 'charCount',
  get:({get}) =>{
    const text = get(inputStore)
    return text.length
  }
})
export  interface todo  {
  id:string,
  title:string,
  isComplete: boolean
}
export const todoList = atom <todo[]>({
  key: "todoList",
  default: []
})