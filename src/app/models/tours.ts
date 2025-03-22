export interface ITour { 
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    type?: string;
}


export interface ITourServerRes {
    tours: ITour[]
}