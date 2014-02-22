/**
 * モジュールの作成や動作の定義。
 */
module App {
    export var appName = "web-uuid-gen";

    // モジュールの定義
    angular.module(
        appName,
        ["ngRoute", appName + ".controller", appName + ".service", appName + ".filter", appName + ".directive"],
        ()=> {
        }
    )
        // モジュールとして登録する。angular.module() -> .config() -> .run() で1セット。
        .run(($rootScope:ng.IRootScopeService, $routeParams:ng.route.IRouteParamsService)=> {
        });

    // モジュールの定義。
    angular.module(
        // モジュール名
        appName + ".service",
        // 依存モジュールはなし
        [],
        // .configで設定する項目はなし
        ()=> {
        }
    )
        .factory("uuidGenerateService", ($http:ng.IHttpService):Service.UuidGenerateService=> {
            return new Service.UuidGenerateService();
        });

    angular.module(
        appName + ".controller",
        [appName + ".service"],
        ()=> {
        }
    )
        .controller("UuidGenerateController", Controller.UuidGenerateController);

    // モジュールの定義。directiveに関するモジュール。
    angular.module(
        appName + ".directive",
        [],
        ()=> {
        }
    )
        .directive("tgFileBind", ()=> {
            return (scope:any, elm:any, attrs:any) => {
                elm.bind("change", (evt:any) => {
                    scope.$apply((scope:any)=> {
                        scope[attrs.name] = evt.target.files;
                    });
                });
            };
        })
        .directive("tgContenteditable", ($parse:ng.IParseService)=> {
            return {
                require: "ngModel",
                link: (scope:any, elm:any, attrs:any, ctrl:ng.INgModelController) => {
                    var value = $parse(attrs.ngModel)(scope);

                    elm.attr("contenteditable", "");
                    // view -> model
                    var viewToModel = () => {
                        scope.$apply(()=> {
                            ctrl.$setViewValue(elm.html());
                        });
                    };
                    elm.bind("blur", viewToModel);
                    elm.bind("keyup", viewToModel);
                    elm.bind("keydown", viewToModel);

                    // model -> view
                    ctrl.$render = () => {
                        elm.html(ctrl.$viewValue);
                    };

                    // load init value from DOM
                    if (value) {
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                    } else {
                        ctrl.$setViewValue(elm.html());
                    }
                }
            };
        });

    // モジュールの定義。filterに関するモジュール。
    angular.module(
        appName + ".filter",
        [],
        ()=> {
        }
    )
    /**
     * 指定した要素を {@type Array} 内から除外するフィルタ。
     * @function
     * @param {Array|Object} options
     * @param {Array} [options.exclude] 除外する対象
     * @param {function} [options.compare]
     */
        .filter("rmDuplicated", ()=> {
            return (input:any[], options:any)=> {
                if (angular.isUndefined(input)) {
                    return input;
                } else if (!angular.isArray(input)) {
                    console.error("input is not array.", input);
                    return input;
                }
                var excludeList:any;
                if (angular.isUndefined(options)) {
                    console.error("options is required.");
                    return input;
                } else if (angular.isArray(options)) {
                    excludeList = options;
                } else if (angular.isArray(options.exclude)) {
                    excludeList = options.exclude;
                }
                var compareFn = (a:any, b:any) => {
                    return a.$key.keystr === b.$key.keystr;
                };
                if (angular.isUndefined(options)) {
                } else if (angular.isFunction(options.compare)) {
                    compareFn = options.compare;
                }

                var result:any[] = [];
                input.forEach((data)=> {
                    if (!excludeList.some((exclude:any) => compareFn(data, exclude))) {
                        result.push(data);
                    }
                });

                return result;
            };
        }
    );
}

/**
 * Initializing
 */
$(function() {
    $("#refresh-button").tooltip();
});