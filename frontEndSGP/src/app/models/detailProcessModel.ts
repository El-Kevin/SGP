
export class DetailProcess {
    constructor(
        public id_detail: number,
        public elements_snt: string,
        public stage_detail: string,
        public check_status: Boolean,
        public notification_date?: Date,
        public process_id?: number
    
    ) {}
  }
  