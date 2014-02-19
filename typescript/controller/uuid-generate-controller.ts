module Controller {
    "use strict";

    export interface Scope extends ng.IScope {
        uuid: string;
    }

    export class UuidGenerateController {

        constructor(public $scope:Scope, public uuidGenerateService:Service.UuidGenerateService) {
            $scope.uuid = uuidGenerateService.newUuid();
        }

    }
}
