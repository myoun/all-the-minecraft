import { process as paper } from './mc-server-generator/process.ts'
import { Select, GenericListOption } from './deps.ts'
import Optifine from './optifine.ts'
import FabricApi from './fabric-api.ts'

const selection : Array<GenericListOption> = [
    { name : "Download Paper Server", value : "paper" },
    { name : "Download Optifine", value : "optifine"},
    { name : "Download Fabric Api", value : "fabric-api"}
]


const selected = await Select.prompt({
    message : "Select Option",
    options : selection
})

switch (selected) {
    case 'paper': {
        await paper()
        break;
    }

    case 'optifine' : {
        await Optifine();
        break;
    }

    case 'fabric-api' : {
        await FabricApi();
        break;
    }

}