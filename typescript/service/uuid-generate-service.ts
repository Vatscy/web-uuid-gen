module Service {
    export class UuidGenerateService {
        newUuid() {
            var new4Data = () => {
                var max:number = Math.pow(16, 4) - 1;
                var newNum:number = Math.floor(Math.random() * max);
                return newNum.toString(16);
            };

            var data1:string = new4Data() + new4Data();
            var data2:string = new4Data();
            var data3:string = new4Data();
            var data4:string = new4Data();
            var data5:string = new4Data() + new4Data() + new4Data();

            return data1 + "-" + data2 + "-" + data3 + "-" + data4 + "-" + data5;
        }
    }
}
