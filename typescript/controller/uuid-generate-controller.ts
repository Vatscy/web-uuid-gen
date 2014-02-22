module Controller {
    export interface Scope extends ng.IScope {
        uuid: string;
        refreshUuid: () => void;
    }

    export class UuidGenerateController {

        constructor(public $scope:Scope, public uuidGenerateService:Service.UuidGenerateService) {
            $scope.uuid = uuidGenerateService.newUuid();

            $scope.refreshUuid = () => {
                $scope.uuid = uuidGenerateService.newUuid();
            };
        }
    }
}
