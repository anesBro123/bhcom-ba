import {
  LucideCalendar,
  LucideFileText,
  LucideGauge,
  LucidePlus,
  LucideSave,
  LucideScale,
  LucideUser,
  LucideVan,
} from '@lucide/angular';

import { defineForm } from '../../../../../shared/form';

import { VRSTA_GORIVA_OPTIONS, VRSTA_VOZILA_OPTIONS } from '../data/vehicle.constants';
import type { VehicleFormModel } from '../data/vehicle.model';

export const AdminVehicleForm = defineForm<VehicleFormModel>()({
  mode: 'stepper',
  titleKey: 'forms.adminVehicle.titleCreate',
  steps: [
    {
      id: 'registration',
      titleKey: 'forms.adminVehicle.steps.registration',
      kind: 'fields',
      sections: [
        {
          id: 'document',
          titleKey: 'forms.adminVehicle.sections.document.title',
          subtitleKey: 'forms.adminVehicle.sections.document.subtitle',
          icon: LucideFileText,
          fields: [
            {
              key: 'registarskaOznaka',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.registarskaOznaka',
              placeholderKey: 'forms.adminVehicle.placeholders.registarskaOznaka',
              colSpan: 2,
            },
            {
              key: 'datumPrveRegistracije',
              type: 'date',
              labelKey: 'forms.adminVehicle.fields.datumPrveRegistracije',
              colSpan: 2,
            },
            {
              key: 'datumIzdavanjaDozvole',
              type: 'date',
              labelKey: 'forms.adminVehicle.fields.datumIzdavanjaDozvole',
              colSpan: 2,
            },
            {
              key: 'brojDokumenta',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.brojDokumenta',
              placeholderKey: 'forms.adminVehicle.placeholders.brojDokumenta',
              colSpan: 2,
            },
            {
              key: 'serijskiBrojDozvole',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.serijskiBrojDozvole',
              placeholderKey: 'forms.adminVehicle.placeholders.serijskiBrojDozvole',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'owner',
      titleKey: 'forms.adminVehicle.steps.owner',
      kind: 'fields',
      sections: [
        {
          id: 'vlasnik',
          titleKey: 'forms.adminVehicle.sections.vlasnik.title',
          subtitleKey: 'forms.adminVehicle.sections.vlasnik.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'vlasnikPrezime',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.vlasnikPrezime',
              placeholderKey: 'forms.adminVehicle.placeholders.vlasnikPrezime',
              colSpan: 2,
            },
            {
              key: 'vlasnikIme',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.vlasnikIme',
              placeholderKey: 'forms.adminVehicle.placeholders.vlasnikIme',
              colSpan: 2,
            },
            {
              key: 'vlasnikPrebivaliste',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.vlasnikPrebivaliste',
              placeholderKey: 'forms.adminVehicle.placeholders.vlasnikPrebivaliste',
              colSpan: 'full',
            },
            {
              key: 'jmbgVlasnika',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.jmbgVlasnika',
              placeholderKey: 'forms.adminVehicle.placeholders.jmbgVlasnika',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'korisnik',
          titleKey: 'forms.adminVehicle.sections.korisnik.title',
          subtitleKey: 'forms.adminVehicle.sections.korisnik.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'korisnikPrezime',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.korisnikPrezime',
              placeholderKey: 'forms.adminVehicle.placeholders.korisnikPrezime',
              colSpan: 2,
            },
            {
              key: 'korisnikIme',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.korisnikIme',
              placeholderKey: 'forms.adminVehicle.placeholders.korisnikIme',
              colSpan: 2,
            },
            {
              key: 'korisnikPrebivaliste',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.korisnikPrebivaliste',
              placeholderKey: 'forms.adminVehicle.placeholders.korisnikPrebivaliste',
              colSpan: 'full',
            },
            {
              key: 'jmbgKorisnika',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.jmbgKorisnika',
              placeholderKey: 'forms.adminVehicle.placeholders.jmbgKorisnika',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'identity',
      titleKey: 'forms.adminVehicle.steps.identity',
      kind: 'fields',
      sections: [
        {
          id: 'vehicleIdentity',
          titleKey: 'forms.adminVehicle.sections.identity.title',
          subtitleKey: 'forms.adminVehicle.sections.identity.subtitle',
          icon: LucideVan,
          fields: [
            {
              key: 'marka',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.marka',
              placeholderKey: 'forms.adminVehicle.placeholders.marka',
              colSpan: 2,
            },
            {
              key: 'tipVozila',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.tipVozila',
              placeholderKey: 'forms.adminVehicle.placeholders.tipVozila',
              colSpan: 2,
            },
            {
              key: 'komercijalnaOznaka',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.komercijalnaOznaka',
              placeholderKey: 'forms.adminVehicle.placeholders.komercijalnaOznaka',
              colSpan: 2,
            },
            {
              key: 'brojSasije',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.brojSasije',
              placeholderKey: 'forms.adminVehicle.placeholders.brojSasije',
              colSpan: 2,
            },
            {
              key: 'vrstaVozila',
              type: 'select',
              labelKey: 'forms.adminVehicle.fields.vrstaVozila',
              placeholderKey: 'forms.adminVehicle.placeholders.vrstaVozila',
              colSpan: 2,
              options: [...VRSTA_VOZILA_OPTIONS],
            },
            {
              key: 'boja',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.boja',
              placeholderKey: 'forms.adminVehicle.placeholders.boja',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'mass',
      titleKey: 'forms.adminVehicle.steps.mass',
      kind: 'fields',
      sections: [
        {
          id: 'massCapacity',
          titleKey: 'forms.adminVehicle.sections.mass.title',
          subtitleKey: 'forms.adminVehicle.sections.mass.subtitle',
          icon: LucideScale,
          fields: [
            {
              key: 'najvecaDozvoljenaMasa',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.najvecaDozvoljenaMasa',
              placeholderKey: 'forms.adminVehicle.placeholders.najvecaDozvoljenaMasa',
              colSpan: 2,
            },
            {
              key: 'masaVozila',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.masaVozila',
              placeholderKey: 'forms.adminVehicle.placeholders.masaVozila',
              colSpan: 2,
            },
            {
              key: 'nosivostKg',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.nosivostKg',
              placeholderKey: 'forms.adminVehicle.placeholders.nosivostKg',
              colSpan: 2,
            },
            {
              key: 'brojOsovina',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.brojOsovina',
              placeholderKey: 'forms.adminVehicle.placeholders.brojOsovina',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'engine',
      titleKey: 'forms.adminVehicle.steps.engine',
      kind: 'fields',
      sections: [
        {
          id: 'engineSpecs',
          titleKey: 'forms.adminVehicle.sections.engine.title',
          subtitleKey: 'forms.adminVehicle.sections.engine.subtitle',
          icon: LucideGauge,
          fields: [
            {
              key: 'radnaZapremina',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.radnaZapremina',
              placeholderKey: 'forms.adminVehicle.placeholders.radnaZapremina',
              colSpan: 2,
            },
            {
              key: 'snagaKw',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.snagaKw',
              placeholderKey: 'forms.adminVehicle.placeholders.snagaKw',
              colSpan: 2,
            },
            {
              key: 'vrstaGoriva',
              type: 'select',
              labelKey: 'forms.adminVehicle.fields.vrstaGoriva',
              placeholderKey: 'forms.adminVehicle.placeholders.vrstaGoriva',
              colSpan: 2,
              options: [...VRSTA_GORIVA_OPTIONS],
            },
            {
              key: 'brojMotora',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.brojMotora',
              placeholderKey: 'forms.adminVehicle.placeholders.brojMotora',
              colSpan: 2,
            },
            {
              key: 'odnosSnagaMasa',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.odnosSnagaMasa',
              placeholderKey: 'forms.adminVehicle.placeholders.odnosSnagaMasa',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'registrationValidity',
      titleKey: 'forms.adminVehicle.steps.registrationValidity',
      kind: 'fields',
      sections: [
        {
          id: 'validity',
          titleKey: 'forms.adminVehicle.sections.validity.title',
          subtitleKey: 'forms.adminVehicle.sections.validity.subtitle',
          icon: LucideCalendar,
          fields: [
            {
              key: 'vazenjeRegistracije',
              type: 'date',
              labelKey: 'forms.adminVehicle.fields.vazenjeRegistracije',
              colSpan: 2,
            },
            {
              key: 'homologacijskaOznaka',
              type: 'text',
              labelKey: 'forms.adminVehicle.fields.homologacijskaOznaka',
              placeholderKey: 'forms.adminVehicle.placeholders.homologacijskaOznaka',
              colSpan: 2,
            },
            {
              key: 'brojMestaSedenje',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.brojMestaSedenje',
              placeholderKey: 'forms.adminVehicle.placeholders.brojMestaSedenje',
              colSpan: 2,
            },
            {
              key: 'brojMestaStajanje',
              type: 'number',
              labelKey: 'forms.adminVehicle.fields.brojMestaStajanje',
              placeholderKey: 'forms.adminVehicle.placeholders.brojMestaStajanje',
              colSpan: 2,
            },
            {
              key: 'zabranaOtudjenjaDo',
              type: 'date',
              labelKey: 'forms.adminVehicle.fields.zabranaOtudjenjaDo',
              colSpan: 2,
            },
            {
              key: 'podaciNaCipu',
              type: 'textarea',
              labelKey: 'forms.adminVehicle.fields.podaciNaCipu',
              placeholderKey: 'forms.adminVehicle.placeholders.podaciNaCipu',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'forms.common.previous' },
    next: { labelKey: 'forms.common.next' },
    submit: { labelKey: 'forms.adminVehicle.actions.create', icon: LucidePlus },
  },
});

export const AdminVehicleFormEditActions = {
  submit: { labelKey: 'forms.adminVehicle.actions.update', icon: LucideSave },
};
