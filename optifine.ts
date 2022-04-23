import { compareVersions } from "https://deno.land/x/compare_versions@0.4.0/mod.ts";
import { Select, GenericListOption } from './deps.ts'
import { readerFromStreamReader, copy } from "https://deno.land/std@0.135.0/streams/conversion.ts";

export default async function process() {
    const res = await fetch("https://nitroxenon-minecraft-forge-v1.p.rapidapi.com/optifine/versionlist", {
        headers : {
            'x-rapidapi-key': "a6f51f9ea2mshf179951f6fc0d97p1b476ejsndba62ed12b1d",
            'x-rapidapi-host': "nitroxenon-minecraft-forge-v1.p.rapidapi.com"
        }
    })
    
    const data = await res.json().then((data : Array<OptifineVersion>) => {
        return data
    })
    
    const versions = data.filter((dt) => compareVersions.validate(dt.mcversion)).sort((a,b) => compareVersions(a.mcversion, b.mcversion)).reverse()
    
    const selected = JSON.parse(await Select.prompt({
        message : "Select Optifine Version",
        options : versions.map((version) => {
            return { name : `${version.mcversion} ${version.type} ${version.patch}`, value : JSON.stringify(version) } as GenericListOption
        })
    })) as OptifineVersion
    
    
    const link = `https://optifine.net/downloadx?f=${selected.filename}&x=b17317915b4c0734b52fd69b73b1d015`
    
    const downloadRes = await fetch(link)
    const file = await Deno.open(`./${selected.filename}`, { create : true, write : true })
    const reader = readerFromStreamReader(downloadRes.body!.getReader())
    
    await copy(reader, file)
}


interface OptifineVersion {
    _id : string,
    mcversion : string,
    patch : string,
    type : string,
    __v : number,
    filename : string
}