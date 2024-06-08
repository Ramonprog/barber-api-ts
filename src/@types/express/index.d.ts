declare namespace Express { 
  export interface Request {
    user_id: string;
  }
}

// apos fazer o declare namespace Express, o typescript entende que o Request do express agora tem uma propriedade user_id
//precisa descomentar o typeRoots e colocar ese caminho "typeRoots": ["./src/@types"],       