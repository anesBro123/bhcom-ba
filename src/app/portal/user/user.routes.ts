import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { FindPageComponent } from './features/find/find-page.component';
import { FreightFormPageComponent } from './features/freight/form/freight-form-page.component';
import { HomePageComponent } from './features/home/home-page.component';
import { OfferPageComponent } from './features/offer/offer-page.component';
import { OurListingsPageComponent } from './features/our-listings/our-listings-page.component';
import { TransportFormPageComponent } from './features/transport/form/transport-form-page.component';
import { WarehouseFormPageComponent } from './features/warehouse/form/warehouse-form-page.component';
import { USER_PORTAL_CONFIG } from './user-portal.config';

export default [
  {
    path: '',
    component: PortalShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: USER_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomePageComponent,
        data: { titleKey: 'portal.user.pages.home.title' },
      },
      {
        path: 'find',
        component: FindPageComponent,
        data: { titleKey: 'portal.user.pages.find.title' },
      },
      {
        path: 'our-listings',
        component: OurListingsPageComponent,
        data: { titleKey: 'portal.user.pages.ourListings.title' },
      },
      {
        path: 'offer',
        component: OfferPageComponent,
        data: { titleKey: 'portal.user.pages.offer.title' },
      },
      {
        path: 'transport/create',
        component: TransportFormPageComponent,
        data: { titleKey: 'portal.user.pages.createTransport.title' },
      },
      {
        path: 'transport/:id/edit',
        component: TransportFormPageComponent,
        data: { titleKey: 'portal.user.pages.editTransport.title' },
      },
      {
        path: 'freight/create',
        component: FreightFormPageComponent,
        data: { titleKey: 'portal.user.pages.createFreight.title' },
      },
      {
        path: 'freight/:id/edit',
        component: FreightFormPageComponent,
        data: { titleKey: 'portal.user.pages.editFreight.title' },
      },
      {
        path: 'warehouse/create',
        component: WarehouseFormPageComponent,
        data: { titleKey: 'portal.user.pages.createWarehouse.title' },
      },
      {
        path: 'warehouse/:id/edit',
        component: WarehouseFormPageComponent,
        data: { titleKey: 'portal.user.pages.editWarehouse.title' },
      },
    ],
  },
] satisfies Routes;
