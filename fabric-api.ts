import { Select, GenericListOption } from "./deps.ts"
import { readerFromStreamReader, copy } from "https://deno.land/std@0.135.0/streams/conversion.ts";

const apiServer = "https://api.modrinth.com/v2"

export default async function process() {
    const fabricRes = await fetch(`${apiServer}/project/fabric-api/version`)
    const versions = await fabricRes.json()


    const selected = JSON.parse(await Select.prompt({
        message : "Select Fabric Api Version",
        options : versions.map((version: any) => {
            return {
                name : version.name,
                value : JSON.stringify(version)
            } as GenericListOption
        })
    }))


    for await (const element of selected.files) {
        const downloadRes = await fetch(element.url)
        const file = await Deno.open(`./${element.filename}`, { create : true, write : true })
        const reader = readerFromStreamReader(downloadRes.body!.getReader())

        copy(reader, file)
    }
}

