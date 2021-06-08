import { Injectable } from '@nestjs/common';

@Injectable()
export class TogglesService {
    getAllFeatures() {
        return {
            'tbw-true': true,
            'tbw-false': false
        };
    }
}
