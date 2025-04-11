export interface ITour { 
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    type: string;
    date: string;
    locationId: string;
    country?: ICountriesResponseItem;
    code?: string;
}


export interface ITourServerRes {
    tours: ITour[]
}

export interface TourType {
    key: string;
    label: string;}


export interface ICountriesResponseItem {
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url: string;
}
            
export interface IFilterTypeLogic {
    key: 'all' | 'single' | 'group';
    label?: string;
}