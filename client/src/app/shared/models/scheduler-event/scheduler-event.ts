export class SchedulerEvent {
    _id: string;
    date: Object;
    text: string;
    isActive: boolean;

    constructor(id, date, text, isActive) {
        this._id = id;
        this.date = date;
        this.text = text;
        this.isActive = isActive;
    }
}