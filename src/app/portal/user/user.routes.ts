import { Routes } from '@angular/router';
import { PORTAL_CONFIG } from '../common/models/portal-config.model';
import { PortalShellComponent } from '../shell/portal-shell/portal-shell.component';
import { PagePlaceholderComponent } from '../pages/page-placeholder/page-placeholder.component';
import { CreateVehiclePageComponent } from './features/fleet/vehicles/create-vehicle-page.component';
import { CreateShipmentPageComponent } from './features/shipments/create-shipment/create-shipment-page.component';
import { ShipmentsPageComponent } from './features/shipments/shipments-page.component';
import { USER_PORTAL_CONFIG } from './user-portal.config';

export default [
  {
    path: '',
    component: PortalShellComponent,
    providers: [{ provide: PORTAL_CONFIG, useValue: USER_PORTAL_CONFIG }],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.dashboardOverview.title',
          subtitleKey: 'portal.user.pages.dashboardOverview.subtitle',
        },
      },
      {
        path: 'dashboard/live-map',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.liveMap.title',
          subtitleKey: 'portal.user.pages.liveMap.subtitle',
        },
      },
      {
        path: 'dashboard/fleet-status',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.fleetStatus.title',
          subtitleKey: 'portal.user.pages.fleetStatus.subtitle',
        },
      },
      {
        path: 'shipments',
        component: ShipmentsPageComponent,
      },
      {
        path: 'shipments/track',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.trackShipment.title',
          subtitleKey: 'portal.user.pages.trackShipment.subtitle',
        },
      },
      {
        path: 'shipments/create',
        component: CreateShipmentPageComponent,
      },
      {
        path: 'shipments/delayed',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.delayedShipments.title',
          subtitleKey: 'portal.user.pages.delayedShipments.subtitle',
        },
      },
      {
        path: 'fleet/vehicles',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.vehicleList.title',
          subtitleKey: 'portal.user.pages.vehicleList.subtitle',
        },
      },
      {
        path: 'fleet/vehicles/create',
        component: CreateVehiclePageComponent,
      },
      {
        path: 'fleet/maintenance',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.maintenanceLogs.title',
          subtitleKey: 'portal.user.pages.maintenanceLogs.subtitle',
        },
      },
      {
        path: 'fleet/drivers',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.driverAssignments.title',
          subtitleKey: 'portal.user.pages.driverAssignments.subtitle',
        },
      },
      {
        path: 'vendors',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.vendorDirectory.title',
          subtitleKey: 'portal.user.pages.vendorDirectory.subtitle',
        },
      },
      {
        path: 'vendors/add',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.addVendor.title',
          subtitleKey: 'portal.user.pages.addVendor.subtitle',
        },
      },
      {
        path: 'clients',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.clientsList.title',
          subtitleKey: 'portal.user.pages.clientsList.subtitle',
        },
      },
      {
        path: 'clients/feedback',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.clientFeedback.title',
          subtitleKey: 'portal.user.pages.clientFeedback.subtitle',
        },
      },
      {
        path: 'orders',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.allOrders.title',
          subtitleKey: 'portal.user.pages.allOrders.subtitle',
        },
      },
      {
        path: 'orders/scheduled',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.scheduledDeliveries.title',
          subtitleKey: 'portal.user.pages.scheduledDeliveries.subtitle',
        },
      },
      {
        path: 'orders/returns',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.returns.title',
          subtitleKey: 'portal.user.pages.returns.subtitle',
        },
      },
      {
        path: 'orders/cancellations',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.cancellations.title',
          subtitleKey: 'portal.user.pages.cancellations.subtitle',
        },
      },
      {
        path: 'reports/delivery-performance',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.deliveryPerformance.title',
          subtitleKey: 'portal.user.pages.deliveryPerformance.subtitle',
        },
      },
      {
        path: 'reports/revenue',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.revenueAnalysis.title',
          subtitleKey: 'portal.user.pages.revenueAnalysis.subtitle',
        },
      },
      {
        path: 'reports/fleet-efficiency',
        component: PagePlaceholderComponent,
        data: {
          titleKey: 'portal.user.pages.fleetEfficiency.title',
          subtitleKey: 'portal.user.pages.fleetEfficiency.subtitle',
        },
      },
    ],
  },
] satisfies Routes;
