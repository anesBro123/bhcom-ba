import { defineDetail } from '../../../../../shared/detail';

import { VEHICLE_TYPE_OPTIONS, VRSTA_GORIVA_OPTIONS } from '../data/vehicle.constants';
import type { Vehicle } from '../data/vehicle.model';

export const VehicleDetail = defineDetail<Vehicle>()({
  sections: [
    {
      id: 'registration',
      titleKey: 'portal.admin.features.vehicles.form.steps.registration',
      fields: [
        {
          key: 'datumPrveRegistracije',
          type: 'date',
          labelKey: 'portal.admin.features.vehicles.form.fields.datumPrveRegistracije',
        },
        {
          key: 'datumIzdavanjaDozvole',
          type: 'date',
          labelKey: 'portal.admin.features.vehicles.form.fields.datumIzdavanjaDozvole',
        },
        {
          key: 'brojDokumenta',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojDokumenta',
        },
        {
          key: 'serijskiBrojDozvole',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.serijskiBrojDozvole',
        },
      ],
    },
    {
      id: 'owner',
      titleKey: 'portal.admin.features.vehicles.form.steps.owner',
      fields: [
        {
          key: 'vlasnikPrezime',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikPrezime',
        },
        {
          key: 'vlasnikIme',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikIme',
        },
        {
          key: 'vlasnikPrebivaliste',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikPrebivaliste',
        },
        {
          key: 'jmbgVlasnika',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.jmbgVlasnika',
        },
        {
          key: 'korisnikPrezime',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.korisnikPrezime',
        },
        {
          key: 'korisnikIme',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.korisnikIme',
        },
        {
          key: 'korisnikPrebivaliste',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.korisnikPrebivaliste',
        },
        {
          key: 'jmbgKorisnika',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.jmbgKorisnika',
        },
      ],
    },
    {
      id: 'identity',
      titleKey: 'portal.admin.features.vehicles.form.steps.identity',
      fields: [
        {
          key: 'tipVozila',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.tipVozila',
        },
        {
          key: 'komercijalnaOznaka',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.komercijalnaOznaka',
        },
        {
          key: 'brojSasije',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojSasije',
        },
        {
          key: 'vehicleType',
          type: 'translate',
          labelKey: 'portal.admin.features.vehicles.form.fields.vehicleType',
          options: [...VEHICLE_TYPE_OPTIONS],
        },
        {
          key: 'boja',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.boja',
        },
      ],
    },
    {
      id: 'mass',
      titleKey: 'portal.admin.features.vehicles.form.steps.mass',
      fields: [
        {
          key: 'najvecaDozvoljenaMasa',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.najvecaDozvoljenaMasa',
        },
        {
          key: 'masaVozila',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.masaVozila',
        },
        {
          key: 'nosivostKg',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.nosivostKg',
        },
        {
          key: 'brojOsovina',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojOsovina',
        },
      ],
    },
    {
      id: 'engine',
      titleKey: 'portal.admin.features.vehicles.form.steps.engine',
      fields: [
        {
          key: 'radnaZapremina',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.radnaZapremina',
        },
        {
          key: 'snagaKw',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.snagaKw',
        },
        {
          key: 'vrstaGoriva',
          type: 'translate',
          labelKey: 'portal.admin.features.vehicles.form.fields.vrstaGoriva',
          options: [...VRSTA_GORIVA_OPTIONS],
        },
        {
          key: 'brojMotora',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojMotora',
        },
        {
          key: 'odnosSnagaMasa',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.odnosSnagaMasa',
        },
      ],
    },
    {
      id: 'registrationValidity',
      titleKey: 'portal.admin.features.vehicles.form.steps.registrationValidity',
      fields: [
        {
          key: 'vazenjeRegistracije',
          type: 'date',
          labelKey: 'portal.admin.features.vehicles.form.fields.vazenjeRegistracije',
        },
        {
          key: 'homologacijskaOznaka',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.homologacijskaOznaka',
        },
        {
          key: 'brojMestaSedenje',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojMestaSedenje',
        },
        {
          key: 'brojMestaStajanje',
          type: 'number',
          labelKey: 'portal.admin.features.vehicles.form.fields.brojMestaStajanje',
        },
        {
          key: 'zabranaOtudjenjaDo',
          type: 'date',
          labelKey: 'portal.admin.features.vehicles.form.fields.zabranaOtudjenjaDo',
        },
        {
          key: 'podaciNaCipu',
          type: 'text',
          labelKey: 'portal.admin.features.vehicles.form.fields.podaciNaCipu',
        },
      ],
    },
  ],
});
