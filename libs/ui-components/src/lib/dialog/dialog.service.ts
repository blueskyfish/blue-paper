import { ComponentType, Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { GLOBAL_DIALOG_CONFIG, IDialogConfig } from './dialog.config';
import { DialogHandler } from './dialog.handler';

/**
 *
 */
@Injectable()
export class DialogService {

  constructor(
    private injector: Injector, private overlay: Overlay,
  ) { }

  open<R, D = {}, T = any>(component: ComponentType<T>, data: D, config: IDialogConfig): DialogHandler<D, R> {

    const overlayConfig = this.getOverlayConfig(config);

    const overlayRef = this.overlay.create(overlayConfig);

    const dialogHandlerRef = new DialogHandler<D, R>(overlayRef, data);

    const portalInjector = this.getCreateInjector(dialogHandlerRef);

    const componentRef = new ComponentPortal(component, null, portalInjector);

    overlayRef.attach(componentRef);

    if (!config.disableClose) {
      overlayRef.backdropClick().subscribe(() => dialogHandlerRef.dismiss());
    }

    return dialogHandlerRef;
  }


  private getCreateInjector<D, R>(dialogHandlerRef: DialogHandler<D, R>): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: DialogHandler,
          useValue: dialogHandlerRef,
        }
      ],
    });
  }

  private getOverlayConfig(config: IDialogConfig): OverlayConfig {
    return {
      ...GLOBAL_DIALOG_CONFIG,
      ...config,
      maxHeight: '95vh',
      maxWidth: '95vw',
      hasBackdrop: true,
      positionStrategy: this.getPositionStrategy(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    };
  }

  private getPositionStrategy(): PositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically('-25vh');
  }
}
