import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NumeroData } from '../interfaces/numeros';
import { FirestoreService } from '../services/firestore.service';




@Component({
  selector: 'app-enacment-prueba-colores',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './EnacmentPrueba-colores.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnacmentPruebaColoresComponent {

  numeroIngresado: number | null = null;

  private firebaseService = inject(FirestoreService)

//Se almacena la informacion en arreglos y agregamos tipado de los numeros
  numeros: NumeroData[] = [];
  multiplos3: number[] = [];
  multiplos5: number[] = [];
  multiplos7: number[] = [];
  procesado = false;

  //Se asigna el color que se la dará a cada divisor
  private readonly opciones = [
    { divisor: 3, color: 'text-green-700' },
    { divisor: 5, color: 'text-red-700' },
    { divisor: 7, color: 'text-blue-700' },
  ];

  async procesarNumero(): Promise<void> {

    //Salir de la funcion si no hay numero o es 0
    if (this.numeroIngresado === null || this.numeroIngresado <= 0) {
      return;
    }

    //limpia los datos
    this.resetearDatos();

    //recorre cada numero hasta el numero ingresado
    for (let i = 0; i <= this.numeroIngresado; i++) {
      const { divisores, color } = this.obtenerDivisoresYColor(i);

      //Se mandan los nuevos parametros del numero ingresado por el
      this.numeros.push({
        number: i,
        color,
        divisores,
        divisorPrincipal: divisores.length ? Math.min(...divisores) : null,
      });

      //se verifica que el numero sea mayor que 0 antes de ejecutar la funcion agregarMultiplo
      if (i > 0) {
        this.agregarMultiplo(i);
      }
    }

    this.procesado = true;

    try {
      await this.firebaseService.addDta('numeros', {
        numeroIngresado: this.numeroIngresado,
        numeros: this.numeros,
        multiplos3: this.multiplos3,
        multiplos5: this.multiplos5,
        multiplos7: this.multiplos7,
        fecha: new Date().toISOString()
      });
      console.log("Datos enviados a Firestore correctamente.");
    } catch (error) {
      console.error("Error al enviar datos a Firestore:", error);
    }



  }

  //limpia los datos para que no choquen con futuros datos ingresados
  private resetearDatos(): void {
    this.numeros = [];
    this.multiplos3 = [];
    this.multiplos5 = [];
    this.multiplos7 = [];
  }


  private obtenerDivisoresYColor(num: number): { divisores: number[]; color: string } {
    //si es cero es un arreglo vacio y se pone el color cero
    if (num === 0) {
      return { divisores: [], color: 'text-black' };
    }

    //se filtral los numeros que divididos entre los divisores no den decimales y se extrae solo el divisor
    const divisores = this.opciones
      .filter((opcion) => num % opcion.divisor === 0)
      .map((opcion) => opcion.divisor);

    const color =
    //si hay divisores, devuelve el valor minimo, si no hay divisores, seran negros
      divisores.length > 0
        ? this.opciones.find((opcion) => opcion.divisor === Math.min(...divisores))?.color || 'text-black'
        : 'text-black';

    return { divisores, color };
  }

  private agregarMultiplo(num: number): void {
    //se verifica si el numero es divisible por el divisor, si es asi se agrega
    if (num % 3 === 0) {
      this.multiplos3.push(num);
    }
    if (num % 5 === 0) {
      this.multiplos5.push(num);
    }
    if (num % 7 === 0) {
      this.multiplos7.push(num);
    }
  }
}
