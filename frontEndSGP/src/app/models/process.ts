
  export class Process {
    constructor(
      public id_process: string,
      public process_name: string,
      public start_date: Date,
      public process_year: number,
      public process_status: string,
      public user_table_id?: number,
      public end_date?: Date
    
    ) {}
  }
  