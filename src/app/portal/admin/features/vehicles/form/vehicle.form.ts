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

import { VRSTA_GORIVA_OPTIONS, VEHICLE_TYPE_OPTIONS } from '../data/vehicle.constants';
import type { VehicleFormModel } from '../data/vehicle.model';

export const AdminVehicleForm = defineForm<VehicleFormModel>()({
  mode: 'stepper',
  steps: [
    {
      id: 'registration',
      titleKey: 'portal.admin.features.vehicles.form.steps.registration',
      kind: 'fields',
      sections: [
        {
          id: 'document',
          titleKey: 'portal.admin.features.vehicles.form.sections.document.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.document.subtitle',
          icon: LucideFileText,
          fields: [
            {
              key: 'registarskaOznaka',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.registarskaOznaka',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.registarskaOznaka',
              colSpan: 2,
            },
            {
              key: 'datumPrveRegistracije',
              type: 'date',
              labelKey: 'portal.admin.features.vehicles.form.fields.datumPrveRegistracije',
              colSpan: 2,
            },
            {
              key: 'datumIzdavanjaDozvole',
              type: 'date',
              labelKey: 'portal.admin.features.vehicles.form.fields.datumIzdavanjaDozvole',
              colSpan: 2,
            },
            {
              key: 'brojDokumenta',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojDokumenta',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojDokumenta',
              colSpan: 2,
            },
            {
              key: 'serijskiBrojDozvole',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.serijskiBrojDozvole',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.serijskiBrojDozvole',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'owner',
      titleKey: 'portal.admin.features.vehicles.form.steps.owner',
      kind: 'fields',
      sections: [
        {
          id: 'vlasnik',
          titleKey: 'portal.admin.features.vehicles.form.sections.vlasnik.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.vlasnik.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'vlasnikPrezime',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikPrezime',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.vlasnikPrezime',
              colSpan: 2,
            },
            {
              key: 'vlasnikIme',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikIme',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.vlasnikIme',
              colSpan: 2,
            },
            {
              key: 'vlasnikPrebivaliste',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.vlasnikPrebivaliste',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.vlasnikPrebivaliste',
              colSpan: 'full',
            },
            {
              key: 'jmbgVlasnika',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.jmbgVlasnika',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.jmbgVlasnika',
              colSpan: 2,
            },
          ],
        },
        {
          id: 'korisnik',
          titleKey: 'portal.admin.features.vehicles.form.sections.korisnik.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.korisnik.subtitle',
          icon: LucideUser,
          fields: [
            {
              key: 'korisnikPrezime',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.korisnikPrezime',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.korisnikPrezime',
              colSpan: 2,
            },
            {
              key: 'korisnikIme',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.korisnikIme',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.korisnikIme',
              colSpan: 2,
            },
            {
              key: 'korisnikPrebivaliste',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.korisnikPrebivaliste',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.korisnikPrebivaliste',
              colSpan: 'full',
            },
            {
              key: 'jmbgKorisnika',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.jmbgKorisnika',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.jmbgKorisnika',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'identity',
      titleKey: 'portal.admin.features.vehicles.form.steps.identity',
      kind: 'fields',
      sections: [
        {
          id: 'vehicleIdentity',
          titleKey: 'portal.admin.features.vehicles.form.sections.identity.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.identity.subtitle',
          icon: LucideVan,
          fields: [
            {
              key: 'marka',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.marka',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.marka',
              colSpan: 2,
            },
            {
              key: 'tipVozila',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.tipVozila',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.tipVozila',
              colSpan: 2,
            },
            {
              key: 'komercijalnaOznaka',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.komercijalnaOznaka',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.komercijalnaOznaka',
              colSpan: 2,
            },
            {
              key: 'brojSasije',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojSasije',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojSasije',
              colSpan: 2,
            },
            {
              key: 'vehicleType',
              type: 'select',
              labelKey: 'portal.admin.features.vehicles.form.fields.vehicleType',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.vehicleType',
              colSpan: 2,
              options: [...VEHICLE_TYPE_OPTIONS],
            },
            {
              key: 'boja',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.boja',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.boja',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'mass',
      titleKey: 'portal.admin.features.vehicles.form.steps.mass',
      kind: 'fields',
      sections: [
        {
          id: 'massCapacity',
          titleKey: 'portal.admin.features.vehicles.form.sections.mass.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.mass.subtitle',
          icon: LucideScale,
          fields: [
            {
              key: 'najvecaDozvoljenaMasa',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.najvecaDozvoljenaMasa',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.najvecaDozvoljenaMasa',
              colSpan: 2,
            },
            {
              key: 'masaVozila',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.masaVozila',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.masaVozila',
              colSpan: 2,
            },
            {
              key: 'nosivostKg',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.nosivostKg',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.nosivostKg',
              colSpan: 2,
            },
            {
              key: 'brojOsovina',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojOsovina',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojOsovina',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'engine',
      titleKey: 'portal.admin.features.vehicles.form.steps.engine',
      kind: 'fields',
      sections: [
        {
          id: 'engineSpecs',
          titleKey: 'portal.admin.features.vehicles.form.sections.engine.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.engine.subtitle',
          icon: LucideGauge,
          fields: [
            {
              key: 'radnaZapremina',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.radnaZapremina',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.radnaZapremina',
              colSpan: 2,
            },
            {
              key: 'snagaKw',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.snagaKw',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.snagaKw',
              colSpan: 2,
            },
            {
              key: 'vrstaGoriva',
              type: 'select',
              labelKey: 'portal.admin.features.vehicles.form.fields.vrstaGoriva',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.vrstaGoriva',
              colSpan: 2,
              options: [...VRSTA_GORIVA_OPTIONS],
            },
            {
              key: 'brojMotora',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojMotora',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojMotora',
              colSpan: 2,
            },
            {
              key: 'odnosSnagaMasa',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.odnosSnagaMasa',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.odnosSnagaMasa',
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      id: 'registrationValidity',
      titleKey: 'portal.admin.features.vehicles.form.steps.registrationValidity',
      kind: 'fields',
      sections: [
        {
          id: 'validity',
          titleKey: 'portal.admin.features.vehicles.form.sections.validity.title',
          subtitleKey: 'portal.admin.features.vehicles.form.sections.validity.subtitle',
          icon: LucideCalendar,
          fields: [
            {
              key: 'vazenjeRegistracije',
              type: 'date',
              labelKey: 'portal.admin.features.vehicles.form.fields.vazenjeRegistracije',
              colSpan: 2,
            },
            {
              key: 'homologacijskaOznaka',
              type: 'text',
              labelKey: 'portal.admin.features.vehicles.form.fields.homologacijskaOznaka',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.homologacijskaOznaka',
              colSpan: 2,
            },
            {
              key: 'brojMestaSedenje',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojMestaSedenje',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojMestaSedenje',
              colSpan: 2,
            },
            {
              key: 'brojMestaStajanje',
              type: 'number',
              labelKey: 'portal.admin.features.vehicles.form.fields.brojMestaStajanje',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.brojMestaStajanje',
              colSpan: 2,
            },
            {
              key: 'zabranaOtudjenjaDo',
              type: 'date',
              labelKey: 'portal.admin.features.vehicles.form.fields.zabranaOtudjenjaDo',
              colSpan: 2,
            },
            {
              key: 'podaciNaCipu',
              type: 'textarea',
              labelKey: 'portal.admin.features.vehicles.form.fields.podaciNaCipu',
              placeholderKey: 'portal.admin.features.vehicles.form.placeholders.podaciNaCipu',
              colSpan: 'full',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  actions: {
    previous: { labelKey: 'shared.form.common.previous' },
    next: { labelKey: 'shared.form.common.next' },
    submit: { labelKey: 'portal.admin.features.vehicles.form.actions.create', icon: LucidePlus },
  },
});

export const AdminVehicleFormEditActions = {
  submit: { labelKey: 'portal.admin.features.vehicles.form.actions.update', icon: LucideSave },
};
