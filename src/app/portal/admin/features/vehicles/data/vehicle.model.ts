export interface VehicleFormModel {
  registarskaOznaka: string;
  datumPrveRegistracije: string;
  datumIzdavanjaDozvole: string;
  brojDokumenta: string;
  serijskiBrojDozvole: string;

  vlasnikPrezime: string;
  vlasnikIme: string;
  vlasnikPrebivaliste: string;
  korisnikPrezime: string;
  korisnikIme: string;
  korisnikPrebivaliste: string;
  jmbgVlasnika: string;
  jmbgKorisnika: string;

  marka: string;
  tipVozila: string;
  komercijalnaOznaka: string;
  brojSasije: string;
  vehicleType: string;
  boja: string;

  najvecaDozvoljenaMasa: number | null;
  masaVozila: number | null;
  nosivostKg: number | null;
  brojOsovina: number | null;

  radnaZapremina: number | null;
  snagaKw: number | null;
  vrstaGoriva: string;
  brojMotora: string;
  odnosSnagaMasa: number | null;

  vazenjeRegistracije: string;
  homologacijskaOznaka: string;
  brojMestaSedenje: number | null;
  brojMestaStajanje: number | null;
  zabranaOtudjenjaDo: string;
  podaciNaCipu: string;
}

export interface Vehicle extends VehicleFormModel {
  id: string;
}

export type VrstaGoriva = 'benzin' | 'dizel' | 'gas' | 'elektricni' | 'hibrid';
