import { addDays } from 'date-fns';
import { Platform } from 'react-native'; //nao precisa mais...

export function getPlatformDate(date: Date){
  let fix = true;  //apenas uma correcao para nao precisa mais do Platform
    if(fix){
      return addDays(date, 1);
    }else{
      return date;
    }
}
