export class AddSchedulerEvent {
    date: Object;
    text: string;
    isActive: boolean;

    constructor(date, text) {
        this.date = date;
        this.text = text;
        this.isActive = true;
    }
}