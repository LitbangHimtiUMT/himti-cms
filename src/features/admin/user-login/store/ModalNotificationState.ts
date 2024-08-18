import { atomWithReset } from "jotai/utils";

export const SendAllState = atomWithReset({
    show: false,
    id: "",
    name: ""
})