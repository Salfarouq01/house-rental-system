import { Injectable } from '@angular/core';
import { Tenant } from '../Models/tenant.model';


@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private tenants: Tenant[] = [];

  getAll(): Tenant[] {
    return this.tenants;
  }

  getById(id: number): Tenant | undefined {
    return this.tenants.find(t => t.id === id);
  }

  add(tenant: Tenant): void {

    const id = this.tenants.length
      ? Math.max(...this.tenants.map(t => t.id)) + 1
      : 1;

    this.tenants.push({
      ...tenant,
      id
    });

  }

  update(tenant: Tenant): void {

    const index = this.tenants.findIndex(t => t.id === tenant.id);

    if (index !== -1) {
      this.tenants[index] = tenant;
    }

  }

  delete(id: number): void {
    this.tenants = this.tenants.filter(t => t.id !== id);
  }

}