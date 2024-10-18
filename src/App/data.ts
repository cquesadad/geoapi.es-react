export interface Municipios {
    update_date: string;
    size:        number;
    data:        Datum[];
}

export interface Datum {
    CMUM:   string;
    CPRO?:   string;
    CUN?:    string;
    DMUN50: string;
}


export interface Poblaciones {
    update_date: string;
    size:        number;
    data:        DatumPoblaciones[];
}

export interface DatumPoblaciones {
    CPRO?:     string;
    CMUM:     string;
    CUN:      string;
    NENTSI50: string;
}

export interface Cpos {
    update_date: string;
    size:        number;
    data:        DatumCpos[];
}

export interface DatumCpos {
    CPRO?: string;
    CMUM?: string;
    CUN:  string;
    CPOS: string;
    CVIA?: string;
}

