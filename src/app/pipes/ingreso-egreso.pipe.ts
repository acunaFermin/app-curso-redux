import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoUID } from '../ingreso-egreso/detalle/detalle.component';

@Pipe({
  name: 'ingresoEgreso'
})
export class IngresoEgresoPipe implements PipeTransform {

  transform( items: IngresoEgresoUID[] ):IngresoEgresoUID[] {

    //tuve que hacer una copia del array porque si no me tira un error
    let itemsCopy = [...items];

    return itemsCopy.sort( ( a, b ) => {
      
      if( a.tipo === 'ingreso' ) return -1;
      if( a.tipo === 'egreso' ) return 1;

      return 0;
      
    })
  }

}
