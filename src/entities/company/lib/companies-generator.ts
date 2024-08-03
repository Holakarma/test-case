import {generateID} from "shared/lib";

const companies = Array.from({length: 10}).map((_, i) => ({
    id: generateID(),
    name: `company-${i + 1}`,
    address: `${i + 1}-st street`
}))


export default companies;