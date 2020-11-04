import { NavigationExtras, Router } from '@angular/router';

export type PathCommand = string | number;

export class NavigateUtil {

  static navigate(router: Router, ...commands: PathCommand[]): void {
    const url: string = commands.join('/').replace('//', '/');
    router.navigate([...commands])
      .catch(reason => {
        console.log('[Error] navigate to "%s" is failed =>', url, reason);
      })
  }

  static navigateExtras(router: Router, extras: NavigationExtras, ...commands: PathCommand[]): void {
    const url: string = commands.join('/').replace('//', '/');
    router.navigate([...commands], extras)
      .catch(reason => {
        console.log('[Error] navigate to "%s" is failed =>', url, reason);
      });
  }
}
