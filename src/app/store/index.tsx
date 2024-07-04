// import { create } from 'zustand'

// export type configType={
//     numberOFQuestion:number,
//     category:{id:number,name:string},
//     level:string,
//     type:string,
//     status:string,
//     score:number
// }

// const defaultConfig:configType={
//     numberOFQuestion:1,
//     category:{id:0,name:''},
//     level:'',
//     status:'',
//     score:0,
//     type:''
// }


// const useQuiz = create((set) => ({
//   config:{...defaultConfig},
//   addLevel: (level:string) => set((state) => ({ config: {...state.config,level:level} })),
//   addNumberOFQuestion: (count:number) => set((state) => ({ config: {...state.config,numberOFQuestion:count} })),
//   addCategory: (id:number,name:string) => set((state) => ({ config: {...state.config,category:{id:id,name:name}} })),
//   addStatus: (status:string) => set((state) => ({ config: {...state.config,status:status} })),
//   addScore: (score:number) => set((state) => ({ config: {...state.config,score:score} })),
//   addType: (type:string) => set((state) => ({ config: {...state.config,type:type} }))
// }))


// export default useQuiz
import { create } from 'zustand';
export type ConfigType = {
    numberOFQuestion: number,
    category: { id: number, name: string },
    level: string,
    type: string,
    status: string,
    score: number
};

type State = {
    config: ConfigType;
};

type Actions = {
    addLevel: (level: string) => void;
    addNumberOFQuestion: (count: number) => void;
    addCategory: (id: number, name: string) => void;
    addStatus: (status: string) => void;
    addScore: () => void;
    addType: (type: string) => void;
    clearConfig: () => void; 
};


const defaultConfig: ConfigType = {
    numberOFQuestion: 1,
    category: { id: 0, name: '' },
    level: '',
    status: '',
    score: 0,
    type: ''
};


const useQuiz = create<State & Actions>((set) => ({
    config: { ...defaultConfig },
    addLevel: (level: string) => set((state) => ({ config: { ...state.config, level: level } })),
    addNumberOFQuestion: (count: number) => set((state) => ({ config: { ...state.config, numberOFQuestion: count } })),
    addCategory: (id: number, name: string) => set((state) => ({ config: { ...state.config, category: { id: id, name: name } } })),
    addStatus: (status: string) => set((state) => ({ config: { ...state.config, status: status } })),
    addScore: () => set((state) => ({ config: { ...state.config, score:state.config.score+1 } })),
    addType: (type: string) => set((state) => ({ config: { ...state.config, type: type } })),
    clearConfig: () => set({ config: { ...defaultConfig } })
}));

export default useQuiz;
