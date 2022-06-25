export type PetType = {
    id: string,
    age: string,
    health: string,
    location: string,
    name: string,
    status: string,
    type: string,
    thumbnail: string
}

export const locationOptions = [
    "La Paz",
    "Cochabamba",
    "Santa Cruz",
    "Oruro",
    "Potosi",
    "Chuquisaca",
    "Tarija",
    "Beni",
    "Pando"
]

export const statusOptions = [
    "Vaccinated",
    "Not Vaccinated"
]

export const healthOptions = [
    "Healthy",
    "Debilitated",
    "Sick"
]
export const typeOptions = [
    "Dog",
    "Cat"
]