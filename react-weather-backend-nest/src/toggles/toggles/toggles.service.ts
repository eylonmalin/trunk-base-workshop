import {HttpService, Injectable} from '@nestjs/common';
import {createRequestConfigWithProxy} from "../../utils/proxy";
import {AxiosRequestConfig} from "axios";

export type StringToBoolean = { [key: string]: boolean };

const arrayToObject = (array, keyField, valueField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item[valueField]
        return obj
    }, {})

@Injectable()
export class TogglesService {
    private requestConfig: AxiosRequestConfig = createRequestConfigWithProxy();

    constructor(private httpService: HttpService) {}

    private async retrieveFeaturesFromUnleash(): Promise<StringToBoolean> {
        const response = await this.httpService
            .get('https://unleash.herokuapp.com/api/client/features', this.requestConfig)
            .toPromise();
        const filteredArray = response.data.features.filter(entry => entry.name.startsWith('tbw'));
        return arrayToObject(filteredArray, 'name', 'enabled');
    }

    getAllFeatures(): Promise<StringToBoolean> {
        return this.retrieveFeaturesFromUnleash();
    }
}
