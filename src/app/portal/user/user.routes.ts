import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { FreightFormPageComponent } from './features/freight/form/freight-form-page.component';
import { FreightAllTablePageComponent } from './features/freight/table-all/freight-all-table-page.component';
import { FreightOurTablePageComponent } from './features/freight/table-our/freight-our-table-page.component';
import { HomePageComponent } from './features/home/home-page.component';
import { OfferPageComponent } from './features/offer/offer-page.component';
import { TransportFormPageComponent } from './features/transport/form/transport-form-page.component';
import { TransportAllTablePageComponent } from './features/transport/table-all/transport-all-table-page.component';
import { TransportOurTablePageComponent } from './features/transport/table-our/transport-our-table-page.component';
import { WarehouseFormPageComponent } from './features/warehouse/form/warehouse-form-page.component';
import { WarehouseAllTablePageComponent } from './features/warehouse/table-all/warehouse-all-table-page.component';
import { WarehouseOurTablePageComponent } from './features/warehouse/table-our/warehouse-our-table-page.component';
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
        path: 'offer',
        component: OfferPageComponent,
        data: { titleKey: 'portal.user.pages.offer.title' },
      },
      {
        path: 'transport/our',
        component: TransportOurTablePageComponent,
        data: { titleKey: 'portal.user.pages.ourTransport.title' },
      },
      {
        path: 'transport',
        component: TransportAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.marketplaceTransport.title' },
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
        path: 'freight/our',
        component: FreightOurTablePageComponent,
        data: { titleKey: 'portal.user.pages.ourFreight.title' },
      },
      {
        path: 'freight',
        component: FreightAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.marketplaceFreight.title' },
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
        path: 'warehouse/our',
        component: WarehouseOurTablePageComponent,
        data: { titleKey: 'portal.user.pages.ourWarehouse.title' },
      },
      {
        path: 'warehouse',
        component: WarehouseAllTablePageComponent,
        data: { titleKey: 'portal.user.pages.marketplaceWarehouse.title' },
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
