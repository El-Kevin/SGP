export class Process {
    constructor(
      public id: string,
      public nombre_proceso: string,
      public fecha_inicio: Date,
      public anio_proceso: number,
      public estado_proceso: string,
      public fecha_fin?: Date
    ) {}
  }
  