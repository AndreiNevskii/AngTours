import { environment } from "../../../environments/environment.development";
import { NearestToursComponent } from "../../pages/tour-item/nearest-tours/nearest-tours.component";

const serverIp = environment.apiUrl;
export const API = {
    auth: `${serverIp}/auth`,
    registration: `${serverIp}/register`,
    tours: `${serverIp}/tours`,
    tour: `${serverIp}/tour`,
    config: `/config/config.json`,
    nearestTours: `${serverIp}/nearestTours`
}