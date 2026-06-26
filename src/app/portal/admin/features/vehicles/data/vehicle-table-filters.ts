import { VEHICLE_TYPE_OPTIONS } from '../../../../../shared/constants/vehicle-type';

import type { FilterDef } from '../../../../../shared/table/table.types';
import { VRSTA_GORIVA_OPTIONS } from './vehicle.constants';
import type { Vehicle } from './vehicle.model';

const VEHICLE_SEARCH_STRING_FIELDS = [
  'registarskaOznaka',
  'brojDokumenta',
  'serijskiBrojDozvole',
  'vlasnikPrezime',
  'vlasnikIme',
  'vlasnikPrebivaliste',
  'korisnikPrezime',
  'korisnikIme',
  'korisnikPrebivaliste',
  'jmbgVlasnika',
  'jmbgKorisnika',
  'marka',
  'tipVozila',
  'komercijalnaOznaka',
  'brojSasije',
  'boja',
  'brojMotora',
  'homologacijskaOznaka',
  'podaciNaCipu',
] as const satisfies readonly (keyof Vehicle)[];

const VEHICLE_SEARCH_NUMERIC_FIELDS = [
  'najvecaDozvoljenaMasa',
  'masaVozila',
  'nosivostKg',
  'brojOsovina',
  'radnaZapremina',
  'snagaKw',
  'odnosSnagaMasa',
  'brojMestaSedenje',
  'brojMestaStajanje',
] as const satisfies readonly (keyof Vehicle)[];

export const VEHICLE_TABLE_FILTERS: FilterDef<Vehicle>[] = [
  {
    key: 'vehicleType',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.vehicles.table.filters.vehicleType',
    options: [...VEHICLE_TYPE_OPTIONS],
    showOptionIcons: true,
  },
  {
    key: 'vrstaGoriva',
    type: 'optionTiles',
    titleKey: 'portal.admin.features.vehicles.table.filters.vrstaGoriva',
    options: [...VRSTA_GORIVA_OPTIONS],
  },
  {
    key: 'datumPrveRegistracije',
    type: 'dateRange',
    titleKey: 'portal.admin.features.vehicles.table.filters.datumPrveRegistracije',
    field: 'datumPrveRegistracije',
    singleDate: true,
  },
  {
    key: 'datumIzdavanjaDozvole',
    type: 'dateRange',
    titleKey: 'portal.admin.features.vehicles.table.filters.datumIzdavanjaDozvole',
    field: 'datumIzdavanjaDozvole',
    singleDate: true,
  },
  {
    key: 'vazenjeRegistracije',
    type: 'dateRange',
    titleKey: 'portal.admin.features.vehicles.table.filters.vazenjeRegistracije',
    field: 'vazenjeRegistracije',
    singleDate: true,
  },
  {
    key: 'zabranaOtudjenjaDo',
    type: 'dateRange',
    titleKey: 'portal.admin.features.vehicles.table.filters.zabranaOtudjenjaDo',
    field: 'zabranaOtudjenjaDo',
    singleDate: true,
  },
  {
    key: 'search',
    type: 'search',
    titleKey: 'portal.admin.features.vehicles.table.filters.search',
    placeholderKey: 'portal.admin.features.vehicles.table.filters.searchPlaceholder',
    debounceMs: 300,
    searchFields: [...VEHICLE_SEARCH_STRING_FIELDS, ...VEHICLE_SEARCH_NUMERIC_FIELDS],
  },
];

export const VEHICLE_FILTER_STORAGE_KEY = 'bhcom-ba.filters.admin.vehicles';
