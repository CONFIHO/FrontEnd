import { ComponentType } from '@angular/cdk/portal';

export abstract class IModalService {
    
  abstract open(component: ComponentType<any>): void;
}
