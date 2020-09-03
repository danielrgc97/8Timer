import { interval } from 'rxjs';

export interface Caja{
    // Propiedades globales para cualquier tipo
    id: number;
    type: string;
    enabled: boolean;
    circuitState: number;

    // Propiedades de los timers
    timerName: string;
    timerValue: number;
    countingValue: number;
    displayString: string;
        // Variables para uso de la funcion setInterval
    counting: boolean;
    interval;

    // Propiedades de los circuitos
    circuitPos: number;
    circuitName: string;
    circuitLaps: number;
    visible: boolean;
}

