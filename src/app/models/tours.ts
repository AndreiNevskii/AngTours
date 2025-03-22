export interface ITour { 
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    type?: string;
    createdAt?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    cardNumber?: string;
    citizenship?: string;

}


export interface ITourServerRes {
    tours: ITour[]
}


            