export class Artikel {
    id: number;
    naziv: string;
    opis: string;
}

export class NakupovalniSeznam {
    id: number;
    naziv: string;
    opis: string;
    ustvarjen: string;
    artikli: Artikel[]
}
