import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

//ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

//ng-charts
import { ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstadisticaComponent {
  cantItemsEgreso: number = 0;
  cantItemsIngreso: number = 0;

  totalEgreso:number = 0;
  totalIngreso:number = 0;

  /**
   * ng-charts
   */

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Ingresos','Egresos',  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ ] },
    ]
  };

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor( private store:Store<AppState>, private ref: ChangeDetectorRef ){

    this.store.select('ingresoEgreso').subscribe(({items}) => {
      this.totalEgreso = 0;
      this.totalIngreso = 0;
      this.cantItemsIngreso = 0;
      this.cantItemsEgreso = 0;

      console.log(items)
  
      for( let item of items ){
        if(item.tipo === 'ingreso'){
          this.cantItemsIngreso ++;
          this.totalIngreso += item.monto;
        }else{
          this.cantItemsEgreso ++;
          this.totalEgreso += item.monto;
        }
      }
  
      this.doughnutChartData.datasets[0].data = [ this.totalIngreso, this.totalEgreso]

      this.ref.markForCheck();
  
    })
  }
}
